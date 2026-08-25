<script setup lang="ts">
const { qidiruv, hudud, tur, status, HUDUDLAR, TURLAR, STATUSLAR, royxat } = useAktivlar()
const { ruxsatlimi } = useRol()
const tanlangan = ref<string | null>(null)
const faol = computed(() => royxat.value.find(o => o.id === tanlangan.value) ?? royxat.value[0] ?? null)
const insTab = ref<'umumiy' | 'moliyaviy' | 'hujjatlar'>('umumiy')
// Etalon qoidasi: Moliyaviy tab texnik xodimga yopiq (moliya bo'limi unda yo'q)
const moliyaBor = computed(() => ruxsatlimi('hisobotlar') || ruxsatlimi('shartnomalar'))
watch(faol, () => { if (insTab.value === 'moliyaviy' && !moliyaBor.value) insTab.value = 'umumiy' })
</script>

<template>
  <div>
    <div class="flex items-end justify-between gap-4 py-2 flex-wrap">
      <div>
        <h1 class="text-[28px] font-bold tracking-tight">Obyektlar ro'yxati</h1>
        <p class="text-sm text-matn-3 mt-1">Portfel: 1 248 obyekt · quyida namunaviy reyestr</p>
      </div>
    </div>

    <!-- Filtrlar -->
    <div class="flex gap-3 flex-wrap items-center">
      <label class="flex items-center gap-2 bg-karta rounded-el h-12 px-4 shadow-soya flex-1 min-w-[220px] max-w-[380px]">
        <input v-model="qidiruv" type="search" placeholder="Qidirish..." class="flex-1 bg-transparent outline-none text-sm min-w-0" />
        <span class="text-matn-3">⌕</span>
      </label>
      <select v-model="hudud" class="h-12 px-4 rounded-el bg-karta shadow-soya text-sm font-semibold">
        <option v-for="h in HUDUDLAR" :key="h">{{ h }}</option>
      </select>
      <select v-model="tur" class="h-12 px-4 rounded-el bg-karta shadow-soya text-sm font-semibold">
        <option v-for="t in TURLAR" :key="t">{{ t }}</option>
      </select>
      <select v-model="status" class="h-12 px-4 rounded-el bg-karta shadow-soya text-sm font-semibold">
        <option v-for="s in STATUSLAR" :key="s">{{ s }}</option>
      </select>
    </div>

    <div class="grid grid-cols-[minmax(0,1fr)_360px] max-[1240px]:grid-cols-1 gap-[18px] items-start mt-1">
      <!-- Jadval -->
      <div class="bg-karta rounded-karta shadow-soya overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="text-left text-matn-3 border-b border-chiziq">
                <th class="px-5 py-3.5 font-semibold">Obyekt</th>
                <th class="px-4 py-3.5 font-semibold">Hudud</th>
                <th class="px-4 py-3.5 font-semibold">Turi</th>
                <th class="px-4 py-3.5 font-semibold">Holat</th>
                <th class="px-4 py-3.5 font-semibold text-right">Qiymati</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="o in royxat" :key="o.id" @click="tanlangan = o.id"
                  class="border-b border-chiziq last:border-0 cursor-pointer transition hover:bg-[#FAFBF8]"
                  :class="faol?.id === o.id && 'bg-yashil-fon/60'">
                <td class="px-5 py-3">
                  <div class="flex items-center gap-3">
                    <img :src="o.rasm" :alt="o.nom" class="w-[52px] h-11 rounded-lg object-cover flex-none" />
                    <div class="min-w-0">
                      <b class="block truncate">{{ o.nom }}</b>
                      <span class="text-xs text-matn-4">{{ o.kod }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-matn-2">{{ o.hudud }}</td>
                <td class="px-4 py-3 text-matn-2">{{ o.tur }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-1.5 text-[13px] font-semibold rounded-full px-2.5 py-1"
                        :class="o.status === 'Faol' ? 'bg-yashil-fon text-[#3E7C0A]' : 'bg-[#EEF4FE] text-[#2058B0]'">
                    {{ o.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right font-semibold whitespace-nowrap">{{ o.qiymat }}</td>
              </tr>
              <tr v-if="!royxat.length">
                <td colspan="5" class="px-5 py-14 text-center text-matn-3">
                  <b class="block text-matn text-base">Obyekt topilmadi</b>
                  Qidiruv yoki filtrga mos obyekt yo'q.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center px-5 py-3 border-t border-chiziq text-sm">
          <span class="text-matn-3">Jami:</span><b class="ml-2">{{ royxat.length }}</b>
        </div>
      </div>

      <!-- Inspektor -->
      <aside v-if="faol" class="bg-karta rounded-karta shadow-soya p-5 sticky top-4">
        <img :src="faol.rasm" :alt="faol.nom" class="w-full h-40 object-cover rounded-ich" />
        <h2 class="text-lg font-bold mt-3">{{ faol.nom }}</h2>
        <p class="text-xs text-matn-4">{{ faol.kod }} · {{ faol.hududToliq }}</p>

        <div class="flex gap-4 border-b border-chiziq mt-4 text-sm font-semibold text-matn-3">
          <button @click="insTab = 'umumiy'" class="pb-2.5 -mb-px border-b-2"
            :class="insTab === 'umumiy' ? 'border-yashil text-matn' : 'border-transparent'">Umumiy</button>
          <button v-if="moliyaBor" @click="insTab = 'moliyaviy'" class="pb-2.5 -mb-px border-b-2"
            :class="insTab === 'moliyaviy' ? 'border-yashil text-matn' : 'border-transparent'">Moliyaviy</button>
          <button @click="insTab = 'hujjatlar'" class="pb-2.5 -mb-px border-b-2"
            :class="insTab === 'hujjatlar' ? 'border-yashil text-matn' : 'border-transparent'">Hujjatlar</button>
        </div>

        <dl v-if="insTab === 'umumiy'" class="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
          <div><dt class="text-xs text-matn-4">Manzil</dt><dd class="font-semibold mt-0.5">{{ faol.manzil }}</dd></div>
          <div><dt class="text-xs text-matn-4">Maydon</dt><dd class="font-semibold mt-0.5">{{ faol.maydon }}</dd></div>
          <div><dt class="text-xs text-matn-4">Foydalanishga</dt><dd class="font-semibold mt-0.5">{{ faol.sana }}</dd></div>
          <div><dt class="text-xs text-matn-4">Reyting</dt><dd class="font-semibold mt-0.5">{{ faol.ball }} / 100</dd></div>
        </dl>

        <dl v-else-if="insTab === 'moliyaviy'" class="mt-4 flex flex-col gap-2.5 text-sm">
          <div class="flex justify-between"><dt class="text-matn-3">Yillik daromad</dt><dd class="font-semibold">{{ faol.moliya.daromad }}</dd></div>
          <div class="flex justify-between"><dt class="text-matn-3">Xarajatlar</dt><dd class="font-semibold">{{ faol.moliya.xarajat }}</dd></div>
          <div class="flex justify-between"><dt class="text-matn-3">Soliqlar</dt><dd class="font-semibold">{{ faol.moliya.soliq }}</dd></div>
          <div class="flex justify-between"><dt class="text-matn-3">Sug'urta</dt><dd class="font-semibold">{{ faol.moliya.sugurta }}</dd></div>
        </dl>

        <ul v-else class="mt-4 flex flex-col gap-2 text-sm">
          <li v-for="[nom, hajm] in faol.hujjatlar" :key="nom"
              class="flex items-center justify-between gap-3 border border-kirish rounded-el px-3.5 py-2.5">
            <span class="truncate font-medium">{{ nom }}</span>
            <span class="text-xs text-matn-4 flex-none">{{ hajm }}</span>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
