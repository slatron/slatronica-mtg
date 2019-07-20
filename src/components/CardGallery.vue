<template>
  <div class="grid-container">
    <GridCard
      v-for="card in gallery_list"
      v-bind:key="card.name"
      v-bind:card-data="card"
    ></GridCard>
  </div>
</template>

<script>
import GridCard from '@/components/GridCard';
import api from '@/data/api';

export default {
  name: 'CardGallery',
  components: {
    GridCard
  },
  computed: {
    gallery_list() {
      return this.$store.state.gallery_list;
    }
  },
  created: function() {
    this.$store.dispatch('initGallery');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
