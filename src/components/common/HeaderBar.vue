<template>
  <nav class="flex items-center fixed w-full p-1 justify-between flex-wrap bg-black border-b border-gray-500">
    <div class="block">
      <button
        class="px-3 py-2 text-gray-500 hover:text-white"
        v-on:click="toggleDrawer"
      >
        <IconBase icon-name="menu"><IconMenu /></IconBase>
      </button>
    </div>
    <div class="flex-shrink-0">
      <h1 class="text-xl md:text-3xl text-center">Slatronica Alters</h1>
    </div>
    <div class="block">
      <button
        v-if="has_filter"
        v-on:click="toggleFilterMenu"
        v-bind:class="{'active': filters_open}"
        class="flex items-center px-3 py-2 border md:border-none rounded text-gray-500 border-gray-500 hover:text-white">
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
import IconMenu from '@/components/icons/menu'

export default {
  name: 'HeaderBar',
  data () {
    return {
      'filters_open': false,
      'has_filter': ['GalleryPage', 'DeckPage'].indexOf(this.$route.name) !== -1
    }
  },
  components: {
    FilterSwitcher,
    IconBase,
    MenuFilter,
    IconMenu
  },
  methods: {
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

<style scoped>
nav {
  height: 45px;
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
</style>
