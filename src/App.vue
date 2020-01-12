<template>
  <div
    class="text-blue-400 layout-wrap relative"
    :class="{'drawer-open': drawer_open}"
  >
    <nav
      id="drawer"
      class="z-50 bg-gray-200"
    >
      <DrawerContents />
    </nav>

    <div
      v-if="drawer_open"
      class="window-shade z-40 md:hidden"
      @click="toggleDrawer()"
    />

    <header class="bg-black fixed w-full top-0 z-50">
      <router-view name="header" />
    </header>

    <main
      class="default-content z-0"
    >
      <router-view />
    </main>

    <footer class="text-xs text-blue-700 md:text-sm bg-black fixed bottom-0 right-0 h-4 z-10">
      <router-view name="footer" />
    </footer>
  </div>
</template>

<script>
import DrawerContents from '@/components/common/DrawerContents'
import api from '@/api/api'

export default {
  name: 'AppLayout',
  components: {
    DrawerContents
  },
  data () {
    return {
      white_bg: false
    }
  },
  computed: {
    drawer_open () {
      return this.$store.state.layout.drawer_open
    }
  },
  watch: {
    // Close Drawer on route changes
    '$route' (to, from) {
      this.$store.commit('toggleDrawer', { 'force': false })
    }
  },
  created: function () {
    let vm = this
    const token = window.localStorage.getItem('token')
    if (token) {
      api.verify(token)
        .then(function (response) {
          if (response.data.verification.username) {
            vm.$store.commit('setUsername', { username: response.data.verification.username })
          }
        })
        .catch(error => {
          console.warn('Your session has expired. Please login again.', error)
          window.localStorage.removeItem('token')
        })
    }
  },
  methods: {
    toggleDrawer: function () {
      this.$store.commit('toggleDrawer')
    }
  }
}
</script>

<style lang="scss">
.drawer-open > nav#drawer {
  left: 0;
}

.window-shade {
  top: 45px;
  transition-property: left, top;
  transition-duration: .5s, .35s;
  transition-timing-function: ease;
  opacity: 0.75;
  z-index: 20;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  position: fixed;
  background: #000;
}

#drawer,
.window-shade {
  top: 45px;
  transition-property: left, top;
  transition-duration: .5s, .35s;
  transition-timing-function: ease;
}

#drawer {
  width: 250px;
  left: -250px;
  border-top: 3px solid purple;
  border-right: 3px solid purple;
  border-bottom: 3px solid purple;
  border-radius: 0 1rem 1rem 0;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
  max-height: 500px;
}

@media (min-width: 768px) {
  #drawer {
    width: 325px;
    left: -325px;
    max-height: 350px;
  }

  #drawer,
  .window-shade {
    top: 55px;
  }
}

.layout-wrap {
  height: 100%;
}

html, body {
  // transition: background-color 1.5s ease;
  height: 100%;
  margin: 0;
}

main {
  height: 100%;
  padding-top: 45px;
}

@media (min-width: 768px) {
  main {
    padding-top: 55px;
  }
}


// state classes
.hand {
  cursor: pointer;
}

// Shared layout classes
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.centered-vert {
  display: flex;
  align-items: center;
}
.full-height-layout {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.full-height-layout .align-row.align-header {
  flex: 0 1 auto;
}
.full-height-layout .align-row.align-content {
  flex: 1 1 auto;
  // flex-grow: 1;
  // flex-shrink: 1;
  // flex-basis: auto;
}
.full-height-layout .align-row.align-footer {
  flex: 1 1 auto;
}
.double-col-row {
  display: flex;
  section {
    flex-grow: 1;
    &:nth-child(2) {
      text-align: right;
    }
  }
}
.flip {
  transform: rotate(180deg);
}
</style>
