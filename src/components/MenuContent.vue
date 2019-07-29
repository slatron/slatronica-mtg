<template>
  <nav id="menu">
    <router-link to="/">Home</router-link><br>
    <router-link to="/about">About</router-link>
    <FilterControls></FilterControls>
  </nav>
</template>

<script>
import FilterControls from '@/components/FilterControls';

export default {
  name: 'MenuContent',
  components: {
    FilterControls
  }
}
</script>

<style scoped>
</style>
