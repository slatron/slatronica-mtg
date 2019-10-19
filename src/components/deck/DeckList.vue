<template>
  <div class="deck-container">

    <h2 class="text-xl m-3 text-blue-600 tracking-wide">
      {{current_deck.name}} |
      <span class="text-sm">{{current_deck.format}}</span> |
      <span class="text-sm">{{ card_count }} Cards</span>
    </h2>

    <div class="columns m-1 pl-3 pb-3 overflow-visible flex flex-wrap justify-start flex-initial">

      <div
        v-for="(cards, type) in deck_list"
        class="mb-6 mr-6"
      >
        <h3 class="text-gray-400">
          {{type}} ({{cards | display_count}})
        </h3>
        <ListCard
          v-for="card in cards"
          v-bind:key="card.scryfall_id"
          v-bind:card-data="card"
        ></ListCard>
      </div>
    </div>

  </div>
</template>

<script>
import ListCard from '@/components/deck/ListCard'

export default {
  name: 'DeckList',
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
  },
  filters: {
    display_count: function (cards) {
      // TODO: Would look nicer as reduce function
      let counted = 0
      cards.forEach(card => {
        counted += card.quantity
      })
      return counted
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Move this to layout for multiple pages when slider is built
.deck-container {
  max-width: 1336px;
  margin: 0 auto;
}
</style>
