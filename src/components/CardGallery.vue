<template>
  <div class="grid-container">
    <h1>Slatronica Alters</h1>
    <GridCard
      v-for="card in gallery_list"
      v-bind:key="card.name"
      v-bind:card-data="card"
    ></GridCard>
  </div>
</template>

<script>
import GridCard from '@/components/GridCard';

export default {
  name: 'CardGallery',
  components: {
    GridCard,
  },
  computed: {
    gallery_list() {
      return this.$store.state.gallery_list;
    }
  },
  created: function() {
    this.$store.dispatch('initGallery');
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
