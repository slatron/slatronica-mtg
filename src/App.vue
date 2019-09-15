<template>
  <div id="app" class="text-blue-600">
    <header class="bg-black fixed w-full top-0 z-10">
      <router-view name="header"/>
    </header>
    <main class="pt-10 md:pt-16 z-0">
      <router-view/>
    </main>
    <footer class="text-xs text-blue-700 md:text-sm bg-black fixed bottom-0 right-0 h-4 px-2 pb-6 z-10">
      <router-view name="footer"/>
    </footer>
  </div>
</template>
