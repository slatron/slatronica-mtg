<template>
  <div id="app" class="text-blue-400" v-bind:class="{'drawer-open': drawer_open}">

    <nav id="drawer" class="navigation h-full z-40 bg-gray-200 overflow-hidden fixed">
      <DrawerContents />
    </nav>

    <div class="page-wrap relative min-h-full pb-5">

      <div
        class="window-shade opacity-75 absolute z-20 left-0 bottom-0 right-0 bg-black md:hidden"
        v-if="drawer_open"
        v-on:click="toggleDrawer()"
      ></div>

      <header class="bg-black fixed w-full top-0 z-30">
        <router-view name="header"/>
      </header>

      <main class="pt-10 md:pt-16 z-0">
        <router-view/>
      </main>

      <footer class="text-xs text-blue-700 md:text-sm bg-black fixed bottom-0 right-0 h-4 px-2 pb-6 z-10">
        <router-view name="footer"/>
      </footer>
    </div>

  </div>
</template>


<script>
import DrawerContents from '@/components/common/DrawerContents'
export default {
  name: 'AppLayout',
  computed: {
    drawer_open () {
      return this.$store.state.drawer_open
    }
  },
  components: {
    DrawerContents
  },
  watch: {
    '$route' (to, from) {
      this.$store.commit('toggleDrawer', {'force': false})
    }
  },
  methods: {
    toggleDrawer: function() {
      this.$store.commit('toggleDrawer')
    }
  }
}
</script>

<style scoped lang="scss">
.drawer-open > nav#drawer {
  left: 0;
}

.navigation,
.window-shade {
  top: 45px;
  transition-property: left, top;
  transition-duration: .5s, .35s;
  transition-timing-function: ease;
}

.navigation {
  width: 300px;
  left: -300px;
}

@media (min-width: 768px) {
  .navigation,
  .window-shade {
    top: 55px;
  }
}

</style>
