<template>
  <div class="deck-container">
    <DeckFormContainer v-if="open_form" />
    <div
      v-show="page_loading"
      class="window-shade"
    />
    <h2 class="text-xl m-3 text-blue-dk tracking-wide">
      <button
        v-if="auth_user"
        @click="openEditDeckForm()"
      >
        <icon-base icon-name="edit-icon">
          <EditIcon />
        </icon-base>
      </button>
      {{ deck_current.name }} |
      <span class="text-sm">{{ deck_current.format }}</span> |
      <span class="text-sm">{{ card_count }} Cards</span> |
      <span class="text-sm">{{ deck_price | formatCurrency }}</span>
    </h2>

    <div class="columns m-1 pl-3 pb-3 overflow-visible flex flex-wrap justify-start flex-initial">
      <div
        v-for="(cards, type) in deck_sorted"
        v-show="!(empty_cols.includes(type))"
        :key="type"
        class="mb-6 mr-6 column"
      >
        <h3 class="text-gray-400">
          {{ type }} ({{ cards | display_count }})
        </h3>
        <ListCard
          v-for="card in cards"
          v-show="card.visible"
          :key="card._id"
          :card-data="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { tools } from '@/utils/MStools'
import IconBase from '@/components/common/IconBase'
import EditIcon from '@/components/icons/edit-pencil'
import ListCard from '@/components/deck/ListCard'
import DeckFormContainer from '@/components/deck/DeckFormContainer'

export default {
  name: 'DeckList',
  components: {
    ListCard,
    DeckFormContainer,
    IconBase,
    EditIcon
  },
  filters: {
    display_count: function (cards) {
      // TODO: Would look nicer as reduce function
      let counted = 0
      cards.forEach(card => {
        counted += card.quantity
      })
      return counted
    },
    formatCurrency: (text) => {
      return tools().formatCurrency(text)
    }
  },
  computed: {
    page_loading () {
      return this.$store.state.layout.page_loading
    },
    deck_sort_by () {
      return this.$store.state.deck.deck_sort_by
    },
    deck_sorted () {
      const original_deck_sorted = this.$store.state.deck.deck_sorted
      for (var key in original_deck_sorted) {
        if (!original_deck_sorted.hasOwnProperty(key)) continue
        const category_list = original_deck_sorted[key]
        original_deck_sorted[key] = category_list.sort(tools().sortBy(this.deck_sort_by, true))
      }
      return original_deck_sorted
    },
    deck_current () {
      return this.$store.state.deck.deck_current
    },
    card_count () {
      return this.$store.state.deck.card_count
    },
    empty_cols () {
      return this.$store.state.deck.empty_cols
    },
    auth_user () {
      return this.$store.state.auth.username
    },
    open_form () {
      return this.$store.state.layout.open_form
    },
    deck_lists () {
      return this.$store.state.deck.deck_lists
    },
    deck_price () {
      return this.$store.state.deck.deck_price
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'DeckPage') {
        this.init()
      }
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    openEditDeckForm () {
      this.$store.commit('toggleForm', { 'tab': 'edit' })
    },
    init () {
      const deck_id_param = this.$route.params.deckID
      if (this.deck_lists.length) {
        const selectedDeck = deck_id_param
          ? this.deck_lists.find(deck => deck._id === deck_id_param) || this.deck_lists[0]
          : this.deck_lists[0]
        this.$store.dispatch('selectDeck', {
          'deck': selectedDeck
        })
      } else {
        this.$store.dispatch('initDecks', deck_id_param)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Move this to layout for multiple pages when slider is built
.deck-container {
  max-width: 1336px;
  margin: 0 auto 360px;
}

.window-shade {
  background-image: url('../../assets/images/loading/big-black-bg.gif');
  background-repeat: no-repeat;
  background-position: center;
}

.column {
  min-width: 280px;
  margin-left: 30px
}
@media (min-width: 768px) {
  .column {
    margin-left: 0;
  }
}
</style>
