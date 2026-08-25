<script setup lang="ts">
definePageMeta({ layout: false })
const { tanla } = useRol()
const ROLLAR = [
  { nom: 'Rahbar', izoh: 'Portfel va moliyaviy nazorat' },
  { nom: 'Operator', izoh: 'Kunlik operatsiyalar va monitoring' },
  { nom: 'Texnik xodim', izoh: 'Qurilmalar va texnik xizmat' },
  { nom: 'Administrator', izoh: "To'liq boshqaruv" }
]
const tanlangan = ref('Administrator')
const kirish = () => { tanla(tanlangan.value); navigateTo('/') }
</script>

<template>
  <main class="min-h-screen grid place-items-center bg-kanvas font-onest p-6">
    <div class="w-full max-w-[420px] bg-karta rounded-katta shadow-soya p-8">
      <img src="/logo.svg" alt="AUGA" class="h-10 mx-auto" />
      <h1 class="text-center text-xl font-bold mt-4">Tizimga kirish</h1>
      <p class="text-center text-sm text-matn-3 mt-1">Rolni tanlang (namoyish rejimi)</p>
      <div class="mt-6 flex flex-col gap-2.5" role="radiogroup" aria-label="Rol">
        <button v-for="r in ROLLAR" :key="r.nom" @click="tanlangan = r.nom"
          class="text-left px-4 py-3 rounded-ich border transition"
          :class="tanlangan === r.nom ? 'border-yashil bg-yashil-fon' : 'border-kirish hover:bg-[#F6F7F8]'"
          role="radio" :aria-checked="tanlangan === r.nom">
          <b class="block text-[15px]">{{ r.nom }}</b>
          <span class="text-[12.5px] text-matn-3">{{ r.izoh }}</span>
        </button>
      </div>
      <button @click="kirish"
        class="mt-6 w-full h-12 rounded-el bg-yashil text-white font-bold hover:bg-yashil-toq transition">
        Kirish
      </button>
    </div>
  </main>
</template>
