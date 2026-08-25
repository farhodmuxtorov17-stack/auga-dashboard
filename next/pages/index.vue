<script setup lang="ts">
const { ism } = useRol()
// KPI'lar — etalon index.html dagi admin paneli qiymatlari
const KPI = [
  { yorliq: 'Jami aktivlar', qiymat: '1 248', delta: '↑ 8,2%', toq: true },
  { yorliq: 'Faol obyektlar', qiymat: '1 082', delta: '↑ 5,4%', toq: false },
  { yorliq: 'Umumiy qiymat', qiymat: '12,7 trln so\u02bcm', delta: '↑ 7,6%', toq: true },
  { yorliq: 'Ijara daromadi (oy)', qiymat: '58,4 mlrd so\u02bcm', delta: '↑ 6,1%', toq: false }
]
</script>

<template>
  <div>
    <div class="flex items-end justify-between gap-4 py-2">
      <div>
        <h1 class="text-[28px] font-bold tracking-tight">Boshqaruv paneli</h1>
        <p class="text-sm text-matn-3 mt-1">Xayrli kun, {{ ism.split(' ')[0] }}. Bugungi holat bilan tanishing.</p>
      </div>
    </div>

    <section class="grid grid-cols-4 max-[1500px]:grid-cols-2 max-[560px]:grid-cols-1 gap-[18px]" aria-label="Asosiy ko'rsatkichlar">
      <article v-for="k in KPI" :key="k.yorliq"
        class="bg-karta rounded-karta shadow-soya p-5 flex items-center gap-4 min-h-[116px]">
        <span class="w-16 h-16 rounded-full grid place-items-center text-2xl flex-none"
              :class="k.toq ? 'bg-[#191C18] text-[#C6E93F]' : 'bg-[#DBE685] text-[#465F04]'">▦</span>
        <div class="min-w-0">
          <div class="text-sm text-matn-3">{{ k.yorliq }}</div>
          <div class="flex items-baseline gap-3 flex-wrap">
            <b class="text-[26px] font-bold tracking-tight whitespace-nowrap">{{ k.qiymat }}</b>
            <span class="text-[13px] font-bold text-[#46A712]">{{ k.delta }}</span>
          </div>
          <div class="text-xs text-matn-4">O'tgan oyga nisbatan</div>
        </div>
      </article>
    </section>

    <section class="bg-karta rounded-katta shadow-soya p-6 mt-1">
      <h2 class="text-[17px] font-bold">Ko'chirish holati</h2>
      <p class="text-sm text-matn-3 mt-2 leading-relaxed max-w-[640px]">
        Bu — Nuxt 3 dagi yangi klient. Ekranlar HTML etalondan bosqichma-bosqich
        ko'chiriladi; rol modeli, menyu filtri va dizayn-tokenlar allaqachon shu yerda.
        To'liq funksional etalon: <code class="text-[13px] bg-kanvas px-1.5 py-0.5 rounded">../*.html</code>
      </p>
    </section>
  </div>
</template>
