<template>
  <nav class="flex items-center fixed w-full p-1 justify-between flex-wrap bg-black border-b border-gray-500">
    <div class="block">
      <button
        class="flex invisible items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
      </button>
    </div>
    <div class="flex-shrink-0">
      <h1 class="text-xl md:text-3xl text-center">Slatronica Alters</h1>
    </div>
    <div class="block">
      <button
        v-on:click="toggleMenu"
        class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
      </button>
    </div>
    <div
      class="filter-menu w-1/2 sm:w-1/4 lg:w-1/5 xl:w-1/6 block absolute right-0 bg-black z-20 text-right rounded-bl-lg border-b border-gray-500  border-l"
      v-show="open"
    >
      <FilterControls />
    </div>
  </nav>
</template>

<script>
import FilterControls from '@/components/FilterControls'
import api from '@/data/api'

export default {
  name: 'NavControls',
  data () {
    return {
      'open': false
    }
  },
  components: {
    FilterControls
  },
  methods: {
    toggleMenu: function() {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>


nav {
  height: 45px;
}

@media (min-width: 768px) {
  nav {
    height: 55px;
  }
}

.filter-menu {
  top: 44px;
}

@media (min-width: 768px) {
  .filter-menu {
    top: 54px;
  }
}
</style>
