<template>
  <nav class="flex items-center fixed w-full p-1 justify-between flex-wrap bg-black border-b border-gray-500">
    <div class="block">
      <button
        class="flex invisible items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-white hover:border-white">
        <icon-base icon-name="menu"><Menu /></icon-base>
      </button>
    </div>
    <div class="flex-shrink-0">
      <h1 class="text-xl md:text-3xl text-center">Slatronica Alters</h1>
    </div>
    <div class="block">
      <button
        v-if="has_filter"
        v-on:click="toggleMenu"
        v-bind:class="{'active': open}"
        class="flex items-center px-3 py-2 border md:border-none rounded text-gray-500 border-gray-500 hover:text-white">
        <icon-base icon-name="menu-filter"><MenuFilter /></icon-base>
      </button>
    </div>
    <transition name="slide">
      <div
        class="filter-menu w-1/2 sm:w-1/4 lg:w-1/5 xl:w-1/6 block absolute right-0 bg-black z-20 text-right rounded-bl-lg border-b border-gray-500  border-l"
        v-if="open"
      >
        <FilterControls />
      </div>
    </transition>
  </nav>
</template>

<script>
import FilterControls from '@/components/common/FilterControls'
import api from '@/api/api'
import IconBase from '@/components/common/IconBase'
import MenuFilter from '@/components/icons/menu-filter'
import Menu from '@/components/icons/menu'

export default {
  name: 'NavControls',
  data () {
    return {
      'open': false,
      'has_filter': ['GalleryPage', 'DeckPage'].indexOf(this.$route.name) !== -1
    }
  },
  components: {
    FilterControls,
    IconBase,
    MenuFilter,
    Menu
  },
  methods: {
    toggleMenu: function() {
      this.open = !this.open
    }
  },
  watch: {
    '$route' (to, from) {
      this.open = false;
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
