<template>
  <div class="grid-container">
    <section>
      <button
        v-on:click="sortBy('Aname')"
        type="button"
        name="buttonTA"
      >Title - Asc</button>
      <button
        v-on:click="sortBy('Dname')"
        type="button"
        name="buttonTD"
      >Title - Desc</button>
    </section>
    <section>
      <button
        v-on:click="sortBy('Adate')"
        type="button"
        name="buttonTA"
      >Date - Asc</button>
      <button
        v-on:click="sortBy('Ddate')"
        type="button"
        name="buttonTD"
      >Date - Desc</button>
    </section>
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
  methods: {
    sortBy: function(type) {
      let options = {
        field: type.slice(1),
        direction: type[0] === 'A'
      }
      this.$store.commit('sortGallery', options);
    }
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
