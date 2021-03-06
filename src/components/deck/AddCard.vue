<template>
  <form @submit.prevent>
    <div
      v-show="cardLoading || card_selected"
      class="card-selected"
    >
      <b>Selected</b>
      <div class="card-selected-container">
        <img
          v-show="cardLoading"
          class="loading-img"
          src="../../assets/images/loading/horiz-black-bg.gif"
          alt="loading"
        >
        {{ card_selected }}
      </div>
      <div
        v-if="scryfall_id"
        class="select_card_edition"
      >
        <a
          href="#"
          @click="openSelectEdition"
        >+ select edition</a>
        <div
          v-show="view_select_edition"
          class="edition-container"
        >
          <img
            v-show="editionsLoading"
            class="loading-img"
            src="../../assets/images/loading/horiz-black-bg.gif"
            alt="loading"
          >
          <div
            v-show="editions.length"
            class="select_edition_images"
          >
            <img
              v-for="card in editions"
              :key="card.id"
              :src="card.editionImg"
              class="edition-img"
              @click="selectEdition(card.id)"
            >
          </div>
        </div>
      </div>
    </div>
    <fieldset class="autocomplete-fieldset">
      <label for="search_term">Search Names (min 3 chars)</label>
      <input
        v-model="search_term"
        type="text"
      >
      <ul
        v-show="autocompleteLoading || autocomplete_names.length"
        class="autocomplete-list"
      >
        <li
          v-show="autocompleteLoading"
          class="list-loading"
        >
          <img
            src="../../assets/images/loading/horiz-black-bg.gif"
            alt="loading"
          >
        </li>
        <li
          v-for="(name, idx) in autocomplete_names"
          :key="idx"
          @click="selectName(name)"
        >
          {{ name }}
        </li>
      </ul>
    </fieldset>
    <fieldset>
      <label for="name">Custom Name</label>
      <input
        v-model="custom_name"
        type="text"
        name="name"
      >
    </fieldset>
    <fieldset class="text-right">
      <button
        type="button"
        name="button"
        @click="addDeckCard()"
      >
        Save
      </button>
    </fieldset>
    <fieldset
      v-if="msg.length"
      class="error-msg"
    >
      <span @click="removeMsg()">{{ msg }}</span>
    </fieldset>
  </form>
</template>

<script>
import api from '@/api/api'
import { tools } from '@/utils/MStools'
export default {
  name: 'AddCard',
  data: () => {
    return {
      search_term: '',
      scryfall_id: '',
      custom_name: '',
      msg: '',
      autocomplete_names: [],
      autocompleteLoading: false,
      card_selected: '',
      cardLoading: false,
      view_select_edition: false,
      prints_search_uri: '',
      editionsLoading: false,
      editions: []
    }
  },
  computed: {
    open_form () {
      return this.$store.state.layout.open_form
    },
    deck_current () {
      return this.$store.state.deck.deck_current
    },
    base_alter_list_ids () {
      return tools().pluck(this.$store.state.deck.base_alter_list, 'scryfall_id')
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
  created: function () {
    this.debounceSearchCards = tools().debounce(this.searchCards, 500)
  },
  methods: {
    openSelectEdition: async function () {
      if (this.view_select_edition) {
        this.view_select_edition = false
        this.editions = []
      } else {
        this.editionsLoading = true
        this.view_select_edition = true
        try {
          this.editions = await api.get_card_editions(this.prints_search_uri)
          // solve for double-faced cards
          this.editions.forEach(card => {
            card.editionImg = (card.layout === 'transform')
              ? card.card_faces[0].image_uris.small
              : card.image_uris.small
          })
        } catch (e) {
          console.warn(e)
        } finally {
          this.editionsLoading = false
        }
      }
    },
    selectEdition: function (id) {
      this.scryfall_id = id
      this.view_select_edition = false
      this.editions = []
    },
    selectName: function (name) {
      this.card_selected = ''
      this.scryfall_id = ''
      this.autocomplete_names = []

      let vm = this
      vm.cardLoading = true
      api.get_card_named(name)
        .then(card => {
          this.prints_search_uri = card.data.prints_search_uri
          this.card_selected = card.data.name
          this.scryfall_id = card.data.id
        })
        .catch(err => console.error(err))
        .finally(() => {
          vm.cardLoading = false
        })
    },
    searchCards: function () {
      this.removeMsg()
      this.view_select_edition = false
      this.editions = []
      this.autocompleteLoading = true
      let vm = this
      api.search_scryfall_names(this.search_term)
        .then(cards => {
          this.autocomplete_names = cards.data.data
        })
        .catch(err => console.error(err))
        .finally(function () {
          vm.autocompleteLoading = false
        })
    },
    closeForm: function () {
      this.$store.commit('toggleForm')
    },
    removeMsg: function () {
      this.msg = ''
    },
    addDeckCard: function () {
      if (!this.scryfall_id) return false
      const existingIds = tools().pluck(this.deck_current.cards, 'scryfall_id')
      if (existingIds.includes(this.scryfall_id)) {
        // This card does exists in the list
        // Add quantity to existing card
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
        }).then(() => {
          this.msg = 'Added Quantity to Exisitng Card'
        })
      } else {
        // This card does not exist in the list
        const newCard = {
          scryfall_id: this.scryfall_id,
          custom_name: this.custom_name || '',
          has_alter: this.base_alter_list_ids.some(id => this.scryfall_id === id),
          quantity: 1
        }
        this.$store.dispatch('addDeckCard', {
          'card': newCard
        })
        const newName = this.card_selected
        this.msg = `Successfully added ${newName}`
        this.search_term = ''
        this.scryfall_id = ''
        this.custom_name = ''
        this.autocomplete_names = []
        this.card_selected = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edition-container {
    text-align: center;
  }
  .loading-img {
    background: #000;
    padding: 5px;
  }
  .edition-img {
    display: inline-block;
    width: 130px;
    margin: 7px;
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
  .select_edition_images {
    height: 210px;
    overflow-y: auto;
  }

</style>
