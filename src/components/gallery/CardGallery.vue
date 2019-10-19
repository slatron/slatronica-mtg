<template>
  <div class="grid-container">
    <div
      class="image-container text-blue-500 tracking-wide"
      v-for="card in gallery_list"
    >
      <FlipCard
        v-bind:key="card.scryfall_id"
        v-bind:card-data="card"
      ></FlipCard>
    </div>
  </div>
</template>

<script>
import FlipCard from '@/components/common/FlipCard'
import api from '@/api/api'

export default {
  name: 'CardGallery',
  data () {
    return {
      'params': this.$route.params
    }
  },
  components: {
    FlipCard
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
  max-width: 1336px;
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
