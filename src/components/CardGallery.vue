<template>
  <div class="grid-container">
    <FilterControls />
    <GalleryCard
      v-for="card in gallery_list"
      v-bind:key="card.name"
      v-bind:card-data="card"
    ></GalleryCard>
  </div>
</template>

<script>
import GalleryCard from '@/components/GalleryCard'
import FilterControls from '@/components/FilterControls'
import api from '@/data/api'

export default {
  name: 'CardGallery',
  data () {
    return {
      'params': this.$route.params
    }
  },
  components: {
    GalleryCard,
    FilterControls
  },
  computed: {
    gallery_list () {
      return this.$store.state.gallery_list
    }
  },
  created: function () {
    this.$store.dispatch('initGallery');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  max-width: 1120px;
  margin: 0 auto;
  text-align: center;
}
</style>
