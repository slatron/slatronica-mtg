<template>
  <div class="grid-container">
    <FilterControls />
    <GridCard
      v-for="card in gallery_list"
      v-bind:key="card.name"
      v-bind:card-data="card"
    ></GridCard>
  </div>
</template>

<script>
import GridCard from '@/components/GridCard'
import FilterControls from '@/components/FilterControls'

export default {
  name: 'CardGallery',
  components: {
    GridCard,
    FilterControls
  },
  computed: {
    gallery_list () {
      return this.$store.state.gallery_list
    }
  },
  created: function () {
    this.$store.dispatch('initGallery')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
