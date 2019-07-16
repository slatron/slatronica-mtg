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
  created: function() {
    let vm = this;
    api.get_cards()
      .then(function(response) {
        vm.gallery_list = response.data.alters;
      })
      .catch(function(error) {
        console.warn('error getting altered card list');
      });
  },
  data() {
    return {
      gallery_list: []
    }
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
