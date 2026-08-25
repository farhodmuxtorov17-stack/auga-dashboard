<script setup lang="ts">
// Hali ko'chirilmagan modul — o'lik havola O'RNIGA ishlayotgan etalon ekran ochiladi.
const route = useRoute()
const XARITA: Record<string, string> = {
  'aktivlar': 'aktivlar.html', 'shartnomalar': 'shartnomalar.html', 'hududlar': 'xaritalar.html',
  'hisobotlar': 'hisobotlar.html', 'smart-access': 'smart-access.html', 'hujjatlar': 'hujjatlar.html',
  'monitoring': 'monitoring.html', 'hodisalar': 'hodisalar.html', 'vazifalar': 'vazifalar.html',
  'yer-maydonlari': 'yer-maydonlari.html', 'sotuv': 'sotuv.html', 'arxiv': 'arxiv.html',
  'foydalanuvchilar': 'foydalanuvchilar.html', 'sozlamalar': 'sozlamalar.html', 'yordam': 'holatlar.html', 'xonalar': 'xonalar.html'
}
const slug = computed(() => String(route.params.slug?.[0] ?? ''))
const etalon = computed(() => {
  const f = XARITA[slug.value]
  if (!f) return null
  const q = new URLSearchParams(route.query as Record<string, string>).toString()
  return `https://farhodmuxtorov17-stack.github.io/auga-dashboard/${f}${q ? '?' + q : ''}`
})
</script>

<template>
  <div class="bg-karta rounded-katta shadow-soya p-8 max-w-[560px]">
    <span class="inline-block text-[11px] font-bold uppercase tracking-wider bg-yashil-fon text-[#3E7C0A] rounded-full px-3 py-1">
      Ko'chirish jarayonida
    </span>
    <h1 class="text-[22px] font-bold mt-3 capitalize">{{ slug.replace(/-/g, ' ') }}</h1>
    <p class="text-sm text-matn-3 mt-2 leading-relaxed">
      Bu modul Nuxt klientiga hali ko'chirilmagan. To'liq funksional versiyasi
      etalon tizimda ishlamoqda — quyidagi tugma orqali oching.
    </p>
    <div class="flex gap-3 mt-5">
      <a v-if="etalon" :href="etalon" target="_blank" rel="noopener"
         class="h-11 px-5 inline-flex items-center rounded-el bg-yashil text-white font-bold hover:bg-yashil-toq transition">
        Etalon versiyada ochish
      </a>
      <NuxtLink to="/" class="h-11 px-5 inline-flex items-center rounded-el border border-kirish font-semibold hover:bg-[#F6F7F8] transition">
        Panelga qaytish
      </NuxtLink>
    </div>
  </div>
</template>
