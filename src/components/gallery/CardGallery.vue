<template>
  <div class="grid-container">
    <div
      class="image-container"
      v-for="card in gallery_list"
    >
      <GalleryCard
        v-bind:key="card.name"
        v-bind:card-data="card"
      ></GalleryCard>
    </div>
  </div>
</template>

<script>
import GalleryCard from '@/components/gallery/GalleryCard'
import FilterControls from '@/components/common/FilterControls'
import api from '@/api/api'

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

.image-container {
  margin: 1em;
  position: relative;
  display: inline-block;
  width: 300px;
  height: 420px;
}

</style>
