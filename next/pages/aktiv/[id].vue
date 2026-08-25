<script setup lang="ts">
const route = useRoute()
const id = computed(() => String(route.params.id))
const o = computed(() => MALUMOT[id.value] ?? null)

const yerMi = computed(() => o.value ? /yer/i.test(o.value.tur) : false)
const KORINISHLAR = computed(() =>
  yerMi.value
    ? [{ k: 'tashqi', nom: "Umumiy ko'rinish", rasm: null as string | null }, { k: 'hudud', nom: 'Hudud chegarasi', rasm: '/bino/hudud.png' }]
    : [{ k: 'tashqi', nom: "Tashqi ko'rinish", rasm: null as string | null }, { k: 'qavat', nom: 'Qavatlar kesimi', rasm: '/bino/qavatlar.png' }])
const korinish = ref('tashqi')
watch(id, () => { korinish.value = 'tashqi' })
const sahnaRasm = computed(() => {
  const v = KORINISHLAR.value.find(v => v.k === korinish.value)
  return (v && v.rasm) || (o.value ? o.value.rasm : '')
})

// Qavat zonalari — kesim rejimida bosiladi, xonalar ekraniga (?qavat=N) olib boradi
const ZONALAR = [
  { q: '5', nom: '5 — Penthouse', top: '14%', h: '13%' },
  { q: '4', nom: '4 — Ofis qavati', top: '27%', h: '13%' },
  { q: '3', nom: '3 — Ofis qavati', top: '40%', h: '13%' },
  { q: '2', nom: '2 — Savdo qavati', top: '53%', h: '14%' },
  { q: '1', nom: '1 — Kirish va lobby', top: '67%', h: '16%' }
]

const KALAUTLAR = [
  { yorliq: 'Energiya samaradorligi', qiymat: 'A+ sinf', pos: 'left-[3%] top-[9%]' },
  { yorliq: 'Bandlik darajasi', qiymat: '92%', pos: 'right-[3%] top-[13%]' },
  { yorliq: 'Xavfsizlik tizimi', qiymat: 'Faol', pos: 'left-[2%] top-[54%]' },
  { yorliq: 'Texnik holat', qiymat: 'Yaxshi', pos: 'right-[2%] top-[57%]' }
]

const lightbox = ref<{ rasm: string, nom: string } | null>(null)
</script>

<template>
  <div v-if="o">
    <div class="flex items-center gap-3 py-2">
      <NuxtLink to="/aktivlar" class="w-10 h-10 grid place-items-center rounded-el bg-karta shadow-soya hover:bg-[#F6F7F8]" aria-label="Ro'yxatga qaytish">←</NuxtLink>
      <h1 class="text-[26px] font-bold tracking-tight">Obyekt kartasi 360°</h1>
    </div>

    <section class="bg-karta rounded-katta shadow-soya p-6">
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span class="inline-flex items-center gap-1.5 text-[13px] font-bold rounded-full px-2.5 py-1"
                :class="o.holat === 'Faol' ? 'bg-yashil-fon text-[#3E7C0A]' : 'bg-[#EEF4FE] text-[#2058B0]'">● {{ o.holat }}</span>
          <h2 class="text-[30px] font-extrabold tracking-tight mt-2">{{ o.nom }}</h2>
          <p class="text-sm text-matn-3">{{ o.tur }}</p>
          <p class="text-sm text-matn-2 mt-2">📍 {{ o.manzil }}</p>
        </div>
        <dl class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div class="flex justify-between gap-6"><dt class="text-matn-3">Umumiy maydon</dt><dd class="font-bold">{{ o.maydon }}</dd></div>
          <div class="flex justify-between gap-6"><dt class="text-matn-3">Yer maydoni</dt><dd class="font-bold">{{ o.yer }}</dd></div>
          <div class="flex justify-between gap-6"><dt class="text-matn-3">Qavatlar</dt><dd class="font-bold">{{ o.qavat }}</dd></div>
          <div class="flex justify-between gap-6"><dt class="text-matn-3">Qurilgan yili</dt><dd class="font-bold">{{ o.yil }}</dd></div>
        </dl>
      </div>

      <!-- Sahna -->
      <div class="relative rounded-karta overflow-hidden min-h-[440px] mt-5 bg-gradient-to-b from-[#FDFDFC] to-[#F4F5F2]">
        <img :src="sahnaRasm" :alt="o.nom + ' — ' + korinish" class="absolute inset-0 w-full h-full object-contain p-6 pb-10" />

        <template v-if="korinish === 'tashqi'">
          <div v-for="k in KALAUTLAR" :key="k.yorliq"
               class="absolute z-10 flex items-center gap-2.5 bg-karta rounded-[14px] shadow-pin px-3.5 py-2.5" :class="k.pos">
            <span class="w-9 h-9 rounded-full bg-[#EAF6D3] grid place-items-center text-[#4F8F08]">✓</span>
            <span><span class="block text-[12px] text-matn-3">{{ k.yorliq }}</span>
                  <b class="text-[14px]">{{ k.qiymat }}</b></span>
          </div>
        </template>

        <template v-if="korinish === 'qavat'">
          <NuxtLink v-for="z in ZONALAR" :key="z.q" :to="'/xonalar?qavat=' + z.q"
            class="absolute left-[16%] right-[16%] z-10 rounded-[10px] border-[1.5px] border-dashed border-transparent hover:bg-lime/15 hover:border-lime transition group flex items-center justify-end pr-3"
            :style="{ top: z.top, height: z.h }">
            <span class="opacity-0 group-hover:opacity-100 transition bg-karta rounded-[10px] px-3 py-1.5 text-[13px] font-bold shadow-pin">{{ z.nom }}</span>
          </NuxtLink>
        </template>

        <div class="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 flex gap-2.5">
          <button v-for="v in KORINISHLAR" :key="v.k" @click="korinish = v.k"
            class="h-[42px] px-4 rounded-el text-[13.5px] font-bold shadow-pin transition active:scale-95"
            :class="korinish === v.k ? 'bg-[#CDF162] text-[#2A3A05]' : 'bg-karta text-[#2B3036]'">{{ v.nom }}</button>
        </div>
      </div>

      <p class="text-sm text-matn-2 leading-relaxed mt-5 max-w-[760px]">{{ o.tavsif }}</p>
    </section>

    <!-- Galereya + Infratuzilma -->
    <div class="grid grid-cols-[minmax(0,1fr)_380px] max-[1240px]:grid-cols-1 gap-[18px] mt-4 items-start">
      <section class="bg-karta rounded-karta shadow-soya p-5">
        <h3 class="text-[17px] font-bold mb-3.5">Galereya</h3>
        <div class="grid grid-cols-5 max-[900px]:grid-cols-3 max-[560px]:grid-cols-2 gap-3">
          <button v-for="[rasm, nom, izoh] in GALEREYA" :key="nom" @click="lightbox = { rasm, nom }"
                  class="text-left group">
            <img :src="rasm" :alt="nom" class="w-full h-[92px] object-cover rounded-el outline outline-1 -outline-offset-1 outline-black/5 group-hover:opacity-90 transition" />
            <b class="block text-[13px] mt-1.5 truncate">{{ nom }}</b>
            <span class="text-[11.5px] text-matn-4">{{ izoh }}</span>
          </button>
        </div>
      </section>

      <aside class="bg-karta rounded-karta shadow-soya p-5">
        <h3 class="text-[17px] font-bold mb-3.5">Infratuzilma</h3>
        <dl class="flex flex-col gap-3 text-sm">
          <div><dt class="text-xs text-matn-4">Suv ta'minoti</dt><dd class="font-medium mt-0.5">{{ o.infra.suv }}</dd></div>
          <div><dt class="text-xs text-matn-4">Gaz</dt><dd class="font-medium mt-0.5">{{ o.infra.gaz }}</dd></div>
          <div><dt class="text-xs text-matn-4">Elektr</dt><dd class="font-medium mt-0.5">{{ o.infra.elektr }}</dd></div>
          <div><dt class="text-xs text-matn-4">Kanalizatsiya</dt><dd class="font-medium mt-0.5">{{ o.infra.kanal }}</dd></div>
        </dl>
      </aside>
    </div>

    <!-- Laytboks -->
    <Teleport to="body">
      <div v-if="lightbox" @click="lightbox = null"
           class="fixed inset-0 z-50 bg-black/55 grid place-items-center p-6 cursor-zoom-out">
        <figure class="bg-karta rounded-katta p-4 max-w-[860px] w-full" @click.stop>
          <img :src="lightbox.rasm" :alt="lightbox.nom" class="w-full rounded-ich" />
          <figcaption class="flex items-center justify-between mt-3">
            <b>{{ lightbox.nom }}</b>
            <button @click="lightbox = null" class="h-10 px-4 rounded-el border border-kirish font-semibold hover:bg-[#F6F7F8]">Yopish</button>
          </figcaption>
        </figure>
      </div>
    </Teleport>
  </div>

  <!-- Halol "topilmadi" — noma'lum id hech qachon boshqa obyektni ko'rsatmaydi -->
  <div v-else class="grid place-items-center min-h-[60vh]">
    <div class="text-center max-w-[440px]">
      <h1 class="text-2xl font-bold">Obyekt topilmadi</h1>
      <p class="text-sm text-matn-3 mt-2 leading-relaxed"><b>{{ id }}</b> identifikatoriga mos obyekt reyestrda yo'q.</p>
      <NuxtLink to="/aktivlar" class="inline-flex mt-5 h-11 px-5 items-center rounded-el bg-yashil text-white font-bold hover:bg-yashil-toq">Ro'yxatga qaytish</NuxtLink>
    </div>
  </div>
</template>
