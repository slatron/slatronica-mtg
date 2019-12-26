<template>
  <nav class="flex items-center fixed w-full p-1 justify-between flex-wrap bg-black border-b border-gray-500">
    <div>
      <button
        class="px-2 py-1 hamburger hamburger--collapse" type="button"
        v-bind:class="{'is-active': drawer_open}"
        v-on:click="toggleDrawer"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
    <div>
      <h1 class="text-blue-600 tracking-wider text-lg md:text-2xl text-center">
        <router-link :to="{name: 'GalleryPage'}">Slatronica Alters</router-link>
      </h1>
    </div>
    <div class="block">
      <button
        v-on:click="toggleForm()"
        v-bind:class="{'invisible': !has_add}"
        class="px-3 py-2 border md:border-none rounded text-gray-500 border-gray-500 hover:text-white">
        <icon-base icon-name="document-add"><DocumentAdd /></icon-base>
      </button>
      <button
        v-on:click="toggleFilterMenu"
        v-bind:class="{'active': filters_open, 'invisible': !has_filter}"
        class="ml-2 px-3 py-2 border md:border-none rounded text-gray-500 border-gray-500 hover:text-white">
        <icon-base icon-name="menu-filter"><MenuFilter /></icon-base>
      </button>
    </div>
    <transition name="slide">
      <div
        class="filter-menu w-1/2 sm:w-1/4 lg:w-1/5 xl:w-1/6 block absolute right-0 bg-black z-20 text-right rounded-bl-lg border-b border-gray-500  border-l"
        v-if="filters_open"
      >
        <FilterSwitcher />
      </div>
    </transition>
  </nav>
</template>

<script>
import FilterSwitcher from '@/components/common/FilterSwitcher'
import api from '@/api/api'
import IconBase from '@/components/common/IconBase'
import MenuFilter from '@/components/icons/menu-filter'
import DocumentAdd from '@/components/icons/document-add'

export default {
  name: 'HeaderBar',
  data () {
    return {
      'filters_open': false,
      'has_filter': ['GalleryPage', 'DeckPage'].indexOf(this.$route.name) !== -1
    }
  },
  computed: {
    drawer_open () {
      return this.$store.state.layout.drawer_open
    },
    has_add () {
      return (['GalleryPage', 'DeckPage'].indexOf(this.$route.name) > -1) && (this.$store.state.auth.username !== '')
    }
  },
  components: {
    FilterSwitcher,
    IconBase,
    MenuFilter,
    DocumentAdd
  },
  methods: {
    toggleForm: function() {
      this.$store.commit('toggleForm', {'tab': 'card'})
    },
    toggleFilterMenu: function() {
      this.filters_open = !this.filters_open
    },
    toggleDrawer: function() {
      this.$store.commit('toggleDrawer')
    }
  },
  watch: {
    '$route' (to, from) {
      this.filters_open = false;
      this.has_filter = ['GalleryPage', 'DeckPage'].indexOf(this.$route.name) !== -1
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  height: 45px;
  transition: height .5s;
}

button.active {
  @apply text-white;
}

@media (min-width: 768px) {
  nav {
    height: 55px;
  }
}

.filter-menu {
  top: 44px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .filter-menu {
    top: 54px;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height .35s;
}

.slide-leave-active,
.slide-enter-to {
  max-height: 100px;
}

.slide-enter,
.slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  max-height: 0;
}

// TODO: Move to external hamburger.css file if needed anywhere else
// These are from John Shu's hambuurger library: https://jonsuh.com/hamburgers/
// - I grabbed only the neccesary styles for the collapse hamburger
.hamburger {outline:none;font:inherit;display:inline-block;overflow:visible;margin:0;padding:5px;cursor:pointer;transition-timing-function:linear;transition-duration:.15s;transition-property:opacity,filter;text-transform:none;border:0;background-color:transparent}
.hamburger.is-active:hover,
.hamburger:hover {color: #fff}
.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner:after,
.hamburger.is-active .hamburger-inner:before {background-color:#e2e8f0}
.hamburger-box {position:relative;display:inline-block;width:40px;height:24px}
.hamburger-inner {top:50%;display:block;margin-top:-2px}
.hamburger-inner,
.hamburger-inner:after,
.hamburger-inner:before {position:absolute;width:40px;height:4px;transition-timing-function:ease;transition-duration:.15s;transition-property:transform;border-radius:4px;background-color:#e2e8f0}
.hamburger-inner:after,
.hamburger-inner:before {display:block;content:""}
.hamburger-inner:before {top:-10px}
.hamburger-inner:after {bottom:-10px}
.hamburger--collapse .hamburger-inner {top:auto;bottom:0;transition-delay:.13s;transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.13s}
.hamburger--collapse .hamburger-inner:after {top:-20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity .1s linear}
.hamburger--collapse .hamburger-inner:before {transition:top .12s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}
.hamburger--collapse.is-active .hamburger-inner {transition-delay:.22s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:translate3d(0,-10px,0) rotate(-45deg)}
.hamburger--collapse.is-active .hamburger-inner:after {top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),opacity .1s linear .22s;opacity:0}
.hamburger--collapse.is-active .hamburger-inner:before {top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .16s,transform .13s cubic-bezier(.215,.61,.355,1) .25s;transform:rotate(-90deg)}
.hamburger--collapse-r .hamburger-inner {top:auto;bottom:0;transition-delay:.13s;transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.13s}
.hamburger--collapse-r .hamburger-inner:after {top:-20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity .1s linear}
.hamburger--collapse-r .hamburger-inner:before {transition:top .12s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}
.hamburger--collapse-r.is-active .hamburger-inner {transition-delay:.22s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:translate3d(0,-10px,0) rotate(45deg)}
.hamburger--collapse-r.is-active .hamburger-inner:after {top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),opacity .1s linear .22s;opacity:0}
.hamburger--collapse-r.is-active .hamburger-inner:before {top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .16s,transform .13s cubic-bezier(.215,.61,.355,1) .25s;transform:rotate(90deg)}
</style>
