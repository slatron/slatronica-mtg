<template>
  <form>
    <fieldset>
      <label for="deck_compare_target">Compare to</label>
      <select
        id="deck_compare_target"
        v-model="deck_compare_target"
        @change="compare"
      >
        <option
          v-for="deck in other_decks"
          :key="deck._id"
          :value="deck.cards"
        >
          {{ deck.name }}
        </option>
      </select>
    </fieldset>
    <fieldset
      v-if="msg.length"
      class="error-msg"
    >
      <span @click="removeMsg()">{{ msg }}</span>
    </fieldset>
    <div
      v-show="show_compare_cards"
      class="compare-cards-area"
    >
      <div class="col-compare-remove">
        Remove
        <ListCard
          v-for="card in remove_cards"
          :key="card._id"
          :card-data="card"
        />
      </div>
      <div class="col-compare-add">
        Add
        <ListCard
          v-for="card in add_cards"
          :key="card._id"
          :card-data="card"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { deckTools } from '@/utils/deckTools'
import ListCard from '@/components/deck/ListCard'

export default {
  name: 'CompareDecks',
  components: { ListCard },
  data: () => {
    return {
      msg: '',
      deck_compare_target: '',
      remove_cards: [],
      add_cards: []
    }
  },
  computed: {
    other_decks: function () {
      const deck_current = this.$store.state.deck.deck_current
      const others = this.$store.state.deck.deck_lists.filter(function (deck) {
        return deck !== deck_current
      })
      return others
    },
    show_compare_cards () {
      return this.remove_cards.length || this.add_cards.length
    }
  },
  methods: {
    compare: function () {
      const deck_current_cards = this.$store.state.deck.deck_current.cards

      this.remove_cards = deckTools().getDifference(deck_current_cards, this.deck_compare_target)
      const addCards = deckTools().getDifference(this.deck_compare_target, deck_current_cards)

      // call decktools if this.deck_compare_target is missing scryfall object data
      if (!addCards[0].hasOwnProperty('object')) {
        deckTools().combineScryfallData(addCards)
          .then(addCards => {
            this.add_cards = addCards
          })
      } else {
        this.add_cards = addCards
      }
    },
    closeForm: function () {
      this.$store.commit('toggleForm')
    },
    removeMsg: function () {
      this.msg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading-container-black img {
    background: #000;
    padding: 5px;
    display: inline-block;
  }
  fieldset {
    margin-bottom: 0.5em;
  }
  button {
    outline: 0;
    background-color: #2d3748;
    color: #edf2f7;
    cursor: pointer;
    padding: 0.25rem;
    border-color: #2b6cb0;
    border-width: 1px;
    font-size: 0.75rem;
  }
  .error-msg {
    color: red;
    cursor: pointer;
  }
  .compare-cards-area {
    display: grid;
    grid-template: 1fr / 1fr;
    overflow-y: scroll;
    max-height: 250px;
  }
  [class^="col-compare"]{
    grid-row: 1 / span 1;
  }
  .col-compare-remove {
    grid-column: 1 / span 1;
  }
  .col-compare-add {
    grid-column: 2 / span 1;
  }

</style>
