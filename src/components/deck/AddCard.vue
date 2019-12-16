<template>
  <form v-on:submit.prevent="addDeckCard">
    <div class="card-selected" v-show="cardLoading || card_selected">
      <b>Selected</b>
      <div class="loading-container-black">
        <img  v-show="cardLoading" src="../../assets/images/loading/horiz-black-bg.gif" alt="loading">
        {{card_selected}}
      </div>
    </div>
    <fieldset class="autocomplete-fieldset">
      <label for="search_term">Search Names (min 3 chars)</label>
      <input type="text" v-model="search_term">
      <ul class="autocomplete-list" v-show="autocompleteLoading || autocomplete_names.length">
        <li v-show="autocompleteLoading" class="list-loading">
          <img src="../../assets/images/loading/horiz-black-bg.gif" alt="loading">
        </li>
        <li
          v-for="name in autocomplete_names"
          v-on:click="selectName(name)"
        >
          {{name}}
        </li>
      </ul>
    </fieldset>
    <fieldset>
      <label for="name">Custom Name</label>
      <input type="text" name="name" v-model="custom_name">
    </fieldset>
    <fieldset>
      <label for="has_alter">Has Alter</label>
      <input type="checkbox" name="has_alter" v-model="has_alter">
    </fieldset>
    <fieldset class="text-right">
      <button type="button" name="button" v-on:click="addDeckCard()">
        Save
      </button>
    </fieldset>
    <fieldset class="error-msg" v-if="msg.length">
      <span v-on:click="removeMsg()">{{msg}}</span>
    </fieldset>
  </form>
</template>

<script>
import api from '@/api/api'
import { tools } from '@/utils/MStools'
export default {
  name: 'addCard',
  data: () => {
    return {
      search_term: '',
      scryfall_id: '',
      custom_name: '',
      has_alter: false,
      msg: '',
      autocomplete_names: [],
      autocompleteLoading: false,
      card_selected: '',
      cardLoading: false
    }
  },
  computed: {
    open_form () {
      return this.$store.state.open_form
    },
    deck_current () {
      return this.$store.state.deck_current
    }
  },
  watch: {
    search_term: function (newTerm, oldTerm) {
      if (newTerm && newTerm !== oldTerm && newTerm.length > 2) {
        this.autocomplete_names = []
        this.debounceSearchCards()
      }
    }
  },
  created: function() {
    this.debounceSearchCards = tools().debounce(this.searchCards, 500)
  },
  methods: {
    selectName: function(name) {
      this.card_selected = ''
      this.scryfall_id = ''
      this.autocomplete_names = []

      let vm = this
      vm.cardLoading = true
      api.get_card_named(name)
        .then(card => {
          this.card_selected = card.data.name
          this.scryfall_id = card.data.id
        })
        .catch(err => console.error(err))
        .finally(() => {
          vm.cardLoading = false
        })
    },
    searchCards: function() {
      this.removeMsg()
      this.autocompleteLoading = true
      let vm = this
      api.search_scryfall_names(this.search_term)
        .then(cards => {
          this.autocomplete_names = cards.data.data
        })
        .catch(err => console.error(err))
        .finally(function() {
          vm.autocompleteLoading = false
        })
    },
    closeForm: function () {
      this.$store.commit('toggleForm')
    },
    removeMsg: function () {
      this.msg = ''
    },
    addDeckCard: function() {
      if (!this.scryfall_id) return false

      const existingIds = tools().pluck(this.deck_current.cards, 'scryfall_id')
      if (existingIds.includes(this.scryfall_id)) {

        const targetId = this.scryfall_id
        const existingCard = this.deck_current.cards.find(card => {
          return card.scryfall_id === targetId
        })
        this.$store.dispatch('updateDeckCard', {
          'card_id': existingCard._id,
          'category': existingCard.category,
          'count_change': 1,
          'update_data': {
            'quantity': existingCard.quantity + 1
          }
        })

      } else {

        const newCard = {
          scryfall_id: this.scryfall_id,
          custom_name: this.custom_name || '',
          has_alter: this.has_alter,
          quantity: 1
        }
        this.$store.dispatch('addDeckCard', {
          'card': newCard
        })
        const newName = this.card_selected;
        this.msg = `Successfully added ${newName}`
        this.search_term        = ''
        this.scryfall_id        = ''
        this.custom_name        = ''
        this.has_alter          = false
        this.autocomplete_names = []
        this.card_selected      = ''

      }
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

  .autocomplete-fieldset {
    position: relative;
  }

  .autocomplete-list {
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;

    position: absolute;
    top: 50px;
    max-height: 100px;
    overflow-y: auto;

    background: #e9e9e9;

    li {
      border-bottom: 1px solid #000;
      color: navy;
      font-size: 14px;
      padding: 2px 6px;
      cursor: pointer;
    }

    li:hover {
      background: #d5d4d3;
    }
    .list-loading {
      background: #000;
    }
  }
  input {
    width: 100%;
  }

</style>
