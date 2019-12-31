<template>
  <div class="card-container">
    <div>
      <router-link to="/">
        View All Cards
      </router-link>
    </div>
    <FlipCard
      v-if="card.scryfall_id"
      :card-data="card"
    />
  </div>
</template>

<script>
import { deckTools } from '@/utils/deckTools'
import FlipCard from '@/components/common/FlipCard'
import api from '@/api/api'

export default {
  name: 'SingleGalleryCard',
  components: {
    FlipCard
  },
  data () {
    return {
      'card': {}
    }
  },
  created: function () {
    let cardID = this.$route.params.cardID
    api.get_cards()
      .then(async (cards) => {
        let alters = cards.data
        const pageCard = alters.find(card => card.scryfall_id === cardID)
        this.card = await deckTools().combineCardWithScryfallData(pageCard)
      })
      .catch(error => console.warn(error))
  }
}
</script>

<style scoped>
.card-container {
  margin: 0 auto;
  text-align: center;
}
</style>
