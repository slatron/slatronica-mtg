<template>
  <div id="app" class="text-blue-600">
    <header class="bg-black fixed w-full top-0 z-10">
      <NavControls />
    </header>
    <main class="pt-10 md:pt-16 z-0">
      <router-view/>
    </main>
    <router-view name="footer"/>
  </div>
</template>

<script>
import NavControls from '@/components/NavControls.vue'
export default {
  name: 'MainApp',
  components: {
    NavControls
  }
}
</script>
