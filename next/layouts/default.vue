<script setup lang="ts">
const { ism, rol, kalit, inisial, menyu, tanla } = useRol()
const route = useRoute()
const profilOchiq = ref(false)
const ROLLAR = ['Rahbar', 'Operator', 'Texnik xodim', 'Administrator']
</script>

<template>
  <div class="grid grid-cols-[268px_minmax(0,1fr)] min-h-screen">
    <!-- Sidebar — etalon: oq 268px, o'ng chiziq, aktiv bandda lime belgi -->
    <aside class="bg-karta border-r border-chiziq sticky top-0 h-screen overflow-y-auto px-5 pt-6 pb-5 flex flex-col">
      <NuxtLink to="/" class="flex items-center gap-3 px-1">
        <img src="/logo.svg" alt="AUGA" class="h-9 w-auto" />
      </NuxtLink>
      <nav class="mt-6 flex flex-col gap-2">
        <NuxtLink v-for="[id, href, nom] in menyu" :key="id" :to="href"
          class="relative flex items-center gap-3 h-[52px] px-4 rounded-[14px] text-[15px] font-medium text-matn-2 transition hover:bg-[#F6F7F8] hover:text-matn"
          :class="route.path === href && 'bg-[#F3F4F6] text-matn font-semibold after:content-[\'\'] after:absolute after:-right-5 after:top-1.5 after:bottom-1.5 after:w-1 after:rounded-l after:bg-lime'">
          {{ nom }}
        </NuxtLink>
      </nav>
      <div class="mt-auto pt-4">
        <NuxtLink to="/yordam"
          class="flex items-center gap-3 h-[62px] px-4 rounded-ich border border-kirish text-[15px] font-semibold text-[#33383E] hover:bg-[#F6F7F8] transition">
          Yordam markazi
        </NuxtLink>
      </div>
    </aside>

    <div class="flex flex-col min-w-0">
      <!-- Topbar -->
      <header class="flex items-center gap-5 px-7 pt-5 pb-4">
        <label class="flex-1 max-w-[860px] flex items-center bg-karta rounded-ich h-14 px-5 shadow-soya cursor-text">
          <input type="search" placeholder="Qidirish..." class="flex-1 bg-transparent outline-none text-[15px]" />
          <span class="text-matn-3">⌕</span>
        </label>
        <div class="relative flex items-center gap-4 bg-karta rounded-karta h-16 pl-5 pr-2.5 shadow-soya">
          <div class="text-right leading-tight">
            <b class="block text-[15px] font-bold">{{ ism }}</b>
            <span class="text-[12.5px] text-matn-4">{{ rol }}</span>
          </div>
          <button class="relative" @click="profilOchiq = !profilOchiq" aria-haspopup="menu" :aria-expanded="profilOchiq">
            <span class="grid place-items-center w-11 h-11 rounded-full text-white font-extrabold text-[15px]"
                  :style="{ background: `linear-gradient(145deg, color-mix(in srgb, var(--rang) 82%, white), var(--rang))`, '--rang': `var(--rol-${kalit})` }">
              {{ inisial }}
            </span>
          </button>
          <Transition name="fade">
            <div v-if="profilOchiq" class="absolute right-0 top-[calc(100%+10px)] z-40 min-w-[220px] bg-karta rounded-[14px] shadow-pin p-2">
              <div class="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-matn-4">Rol almashtirish (demo)</div>
              <button v-for="r in ROLLAR" :key="r" @click="tanla(r); profilOchiq = false"
                class="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F4F5F7]"
                :class="r === rol && 'font-bold'">{{ r }}</button>
            </div>
          </Transition>
        </div>
      </header>
      <main class="px-7 pb-9 flex flex-col gap-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
:root {
  --rol-admin: #22261F; --rol-rahbar: #8A4BD8; --rol-operator: #2F6BCF; --rol-texnik: #1C8A82;
}
.fade-enter-active, .fade-leave-active { transition: opacity .13s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>
