<template>
  <div class="card-container">
    <div>
      <router-link to="/">View All Cards</router-link>
    </div>
    <FlipCard
      v-if="card.scryfall_id"
      v-bind:card-data="card"
    ></FlipCard>
  </div>
</template>

<script>
import FlipCard from '@/components/common/FlipCard'
import api from '@/api/api'

export default {
  name: 'SingleGalleryCard',
  data () {
    return {
      'card': {}
    }
  },
  components: {
    FlipCard
  },
  created: function () {
    let cardID = this.$route.params.cardID;
    api.get_cards()
      .then((cards) => {
        let alters = cards.data;
        this.card = alters.find(card => card.scryfall_id === cardID);
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
