<template>
  <div id="app" class="text-blue-600">

    <nav id="main-navigation" class="navigation z-20 bg-gray-200">
      <ul>
        <li><a href="#">Nav Links</a></li>
        <li><a href="#">Close Menu</a></li>
      </ul>
    </nav>

    <div class="page-wrap">
      <header class="bg-black fixed w-full top-0 z-10">
        <a href="#main-navigation">Menu</a>
        <router-view name="header"/>
      </header
      <main class="pt-10 md:pt-16 z-0">
        <router-view/>
      </main>
      <footer class="text-xs text-blue-700 md:text-sm bg-black fixed bottom-0 right-0 h-4 px-2 pb-6 z-10">
        <router-view name="footer"/>
      </footer>
    </div>

  </div>
</template>

<style scoped lang="scss">
#main-navigation:target {
  width: 20%;
}

#main-navigation:target + .page-wrap {
  width: 80%;
}

.navigation {
  width: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.3s ease;
}

.page-wrap {
  width: 100%;
  float: right;
}
</style>
