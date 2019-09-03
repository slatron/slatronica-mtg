<template>
  <div class="deck-container">
    <h2 class="text-xl">{{current_deck.name}} | {{current_deck.format}} | {{ card_count }} Cards</h2>
    <div
      v-for="(cards, type) in deck_list"
      class="mb-6"
    >
      <h3 class="text-gray-400">{{type}}</h3>
      <ListCard
        v-for="card in cards"
        v-bind:key="card.id"
        v-bind:card-data="card"
      ></ListCard>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import ListCard from '@/components/deck/ListCard'

export default {
  name: 'DeckView',
  components: {
    ListCard
  },
  computed: {
    deck_list () {
      return this.$store.state.deck_list
    },
    current_deck () {
      return this.$store.state.current_deck
    },
    card_count () {
      return this.$store.state.card_count
    }
  },
  created: function () {
    this.$store.dispatch('initDecks')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Move this to layout for multiple pages when slider is built
.deck-container {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
