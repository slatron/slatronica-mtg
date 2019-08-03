<template>
  <div class="grid-container">
    <FilterControls v-if="!params.hasOwnProperty('card')" />
    <div v-if="params.hasOwnProperty('card')">
      <a :href="base_url">View All Cards</a>
    </div>
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
import api from '@/data/api'

export default {
  name: 'CardGallery',
  data () {
    return {
      'params': this.$route.params,
      'base_url': api.get_base_url()
    }
  },
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
    this.$store.dispatch('initGallery', this.$route.params);
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
