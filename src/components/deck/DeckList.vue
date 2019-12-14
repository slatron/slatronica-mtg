<template>
  <div class="deck-container">
    <DeckFormContainer/>
    <div
      class="window-shade"
      v-show="page_loading"
    ></div>
    <h2 class="text-xl m-3 text-blue-600 tracking-wide">
      {{deck_current.name}} |
      <span class="text-sm">{{deck_current.format}}</span> |
      <span class="text-sm">{{ card_count }} Cards</span>
    </h2>

    <div class="columns m-1 pl-3 pb-3 overflow-visible flex flex-wrap justify-start flex-initial">
      <div
        v-for="(cards, type) in deck_sorted"
        class="mb-6 mr-6"
        v-show="!(empty_cols.includes(type))"
      >
        <h3 class="text-gray-400">
          {{type}} ({{cards | display_count}})
        </h3>
        <ListCard
          v-for="card in cards"
          v-show="card.visible"
          v-bind:key="card._id"
          v-bind:card-data="card"
        ></ListCard>
      </div>
    </div>

  </div>
</template>

<script>
import ListCard from '@/components/deck/ListCard'
import DeckFormContainer from '@/components/deck/DeckFormContainer'

export default {
  name: 'DeckList',
  components: {
    ListCard,
    DeckFormContainer
  },
  computed: {
    page_loading () {
      return this.$store.state.page_loading
    },
    deck_sorted () {
      return this.$store.state.deck_sorted
    },
    deck_current () {
      return this.$store.state.deck_current
    },
    card_count () {
      return this.$store.state.card_count
    },
    empty_cols () {
      return this.$store.state.empty_cols
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

.window-shade {
  background-image: url('../../assets/images/loading/big-black-bg.gif');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
