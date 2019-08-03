<template>
  <div class="card-container">
    <div>
      <router-link to="/">View All Cards</router-link>
    </div>
    <GridCard
      v-if="card.id"
      v-bind:card-data="card"
    ></GridCard>
  </div>
</template>

<script>
import GridCard from '@/components/GridCard'
import api from '@/data/api'

export default {
  name: 'SingleGalleryCard',
  data () {
    return {
      'card': {}
    }
  },
  components: {
    GridCard
  },
  created: function () {
    let cardID = this.$route.params.cardID;
    let vm = this;
    api.get_cards()
      .then((cards) => {
        let alters = cards.data.alters;
        vm.card = alters.find(card => card.id === cardID);
      })
      .catch(error => console.warn(error));
  }
}
</script>

<style scoped>
.card-container {
  margin: 0 auto;
  text-align: center;
}
</style>
