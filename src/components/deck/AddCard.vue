<template>
  <div class="add-card-container" v-show="open_form">
    <div
      class="window-shade"
      v-on:click="closeForm()"
    ></div>
    <div class="add-cardform z-20">
      <form v-on:submit.prevent="addDeckCard">
        <h2>Add New Card</h2>
        <div class="card-selected">
          Selected: {{card_selected}}
        </div>
        <fieldset class="autocomplete-fieldset">
          <label for="search_term">Search Names</label>
          <input type="text" v-model="search_term">
          <ul class="autocomplete-list" v-show="autocomplete_names.length">
            <li v-for="name in autocomplete_names">
              <a v-on:click="selectName(name)">{{name}}</a>
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <label for="scryfall_id">Name</label>
          <input type="text" name="name" v-model="name">
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
    </div>
  </div>
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
      name: '',
      has_alter: false,
      msg: '',
      autocomplete_names: [],
      card_selected: ''
    }
  },
  computed: {
    open_form () {
      return this.$store.state.add_click
    }
  },
  watch: {
    search_term: function (newTerm, oldTerm) {
      this.autocomplete_names = []
      this.debounceSearchCards()
    }
  },
  created: function() {
    this.debounceSearchCards = tools().debounce(this.searchCards, 500)
  },
  methods: {
    selectName: function(name) {
      this.autocomplete_names = []
      api.get_card_named(name)
        .then(card => {
          this.card_selected = card.data.name
          this.scryfall_id = card.data.id
        })
        .catch(err => console.error(err))
    },
    searchCards: function() {
      this.autocomplete_names = ['** ...loading... **']
      api.search_scryfall_names(this.search_term)
        .then(cards => {
          this.autocomplete_names = cards.data.data
        })
        .catch(err => console.error(err))
    },
    closeForm: function () {
      this.$store.commit('triggerAdd')
    },
    removeMsg: function () {
      this.msg = ''
    },
    addDeckCard: function() {
      const newCard = {
        scryfall_id: this.scryfall_id,
        name: this.name,
        has_alter: this.has_alter
      }
      this.$store.dispatch('addDeckCard', {
        'card': newCard
      })
      this.closeForm()
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 24px;
    margin-bottom: 0.5em;
  }
  .add-card-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .add-cardform {
    padding: 0.5em;
    background: #efefef;
    border-radius: 0 1rem 1rem 0;
    position: fixed;
    top: 80px;
    left: 10%;
    right: 10%;
    input {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .add-cardform {
      top: 140px;
      left: 30%;
      right: 30%;
    }
  }
  input {
    float: right;
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

    background: #eee;

    li {
      border-bottom: 1px solid #000;
      color: #000;
      font-size: 11px;
      padding: 1px 4px;
      cursor: pointer;
    }

    li:hover {
      background: #d5d4d3;
    }
  }
</style>
