<template>
  <div id="app" class="text-blue-600">
    <header class="bg-black fixed w-full top-0 h-8 md:h-12 z-10">
      <h1 class="text-xl md:text-3xl text-center">Slatronica Alters</h1>
    </header>
    <main class="pt-8 md:pt-12 z-0">
      <router-view/>
    </main>
    <footer class="text-xs text-blue-700 md:text-sm bg-black fixed bottom-0 right-0 h-4 px-2 pb-6 z-10">
      <p>alters by mike slater</p>
    </footer>
  </div>
</template>

<script>
import api from '@/data/api'
export default {
  name: 'MainApp'
}
</script>
