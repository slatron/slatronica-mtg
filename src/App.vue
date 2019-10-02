<template>
  <div class="text-blue-400 layout-wrap" v-bind:class="{'drawer-open': drawer_open}">

    <nav id="drawer" class="navigation h-full z-40 bg-gray-200 overflow-hidden fixed">
      <DrawerContents />
    </nav>

    <div class="page-wrap relative">
      <div
        class="window-shade opacity-75 absolute z-20 left-0 bottom-0 right-0 bg-black md:hidden"
        v-if="drawer_open"
        v-on:click="toggleDrawer()"
      ></div>

      <header class="bg-black fixed w-full top-0 z-30">
        <router-view name="header"/>
      </header>

      <main
        class="default-content pt-10 md:pt-16 z-0"
      >
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
import { tools } from '@/utils/MStools'

export default {
  name: 'AppLayout',
  computed: {
    drawer_open () {
      return this.$store.state.drawer_open
    }
  },
  data () {
    return {
      white_bg: false
    }
  },
  components: {
    DrawerContents
  },
  watch: {
    // Close Drawer and set background color
    '$route' (to, from) {
      this.$store.commit('toggleDrawer', {'force': false})
      const setWhiteBg = tools().intersection([to.name], ['BlogPost', 'AboutPage', 'HouseRules', 'HouseMulligan']).length
      document.body.className = setWhiteBg ? 'bg-gray-100' : 'bg-black'
    }
  },
  methods: {
    toggleDrawer: function() {
      this.$store.commit('toggleDrawer')
    }
  }
}
</script>

<style lang="scss">
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
  width: 250px;
  left: -250px;
  border-top: 3px solid purple;
  border-right: 3px solid purple;
  border-bottom: 3px solid purple;
  border-radius: 0 1rem;
}

@media (min-width: 768px) {
  .navigation {
    width: 325px;
    left: -325px;
  }


  .navigation,
  .window-shade {
    top: 55px;
  }
}

body {
  transition: background-color 1.5s ease;
}
</style>
