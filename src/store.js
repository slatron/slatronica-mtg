import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import { tools } from '@/utils/MStools'
import { deckTools } from '@/utils/deckTools'

Vue.use(Vuex)
// Export store as function to ensure app settings are passed in before any initializations
function builder (data) {
  return new Vuex.Store({
    state: {
      // Sent to store during app initialization
      app_settings: data,

      // Logged-in user
      username: '',

      // Layout Data
      drawer_open: false,
      add_click: false, // toggles when user clicks on add button in header

      // Gallery Data
      original_gallery_list: [],
      gallery_list: [],

      // Decklist Data
      original_decks: [],
      current_deck: {},
      original_deck_list: [],
      deck_list: [],
      card_count: 0
    },

    mutations: {
      // Authentication Mutations
      setUsername (state, options = {}) {
        state.username = options.username
      },

      // Layout Mutations
      toggleDrawer (state, options = {}) {
        state.drawer_open = options.hasOwnProperty('force')
          ? options.force
          : !state.drawer_open
      },

      triggerAdd (state, options = {}) {
        state.add_click = !state.add_click
      },

      // Gallery Mutations
      setGallery (state, options) {
        const alters = options.alters
        state.original_gallery_list = alters
        state.gallery_list = options.alters.sort(tools().sortBy('date', false))
      },
      addAlter (state, options) {
        const alter = options.alter
        state.gallery_list.push(alter)
        state.gallery_list.sort(tools().sortBy('date', false))
      },
      sortGallery (state, options) {
        state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction))
      },
      applyFilter (state, options) {
        state.gallery_list = options.filter === 'All' ?
          state.original_gallery_list :
          state.original_gallery_list.filter(card => card.tags.includes(options.filter))

        // Apply Sort
        state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction))
      },
      deleteAlter (state, options) {
        const alterIdx = state.gallery_list.findIndex(alter => alter._id === options.id)
        state.gallery_list.splice(alterIdx, 1)
      },

      // Decklist Mutations
      setDecks (state, options) {
        const decks = options.decks
        state.original_decks = decks
      },
      selectDeck (state, options) {
        const deck = options.deck
        state.current_deck = deck
      },
      setDecklist (state, options) {
        const originalDeckList   = options.deckList
        state.original_deck_list = originalDeckList

        const deckList   = options.deckList
        state.deck_list  = deckList
        // state.sort_keys  = _getSortKeys(deckList)
      },
      setCardCount (state, options) {
        state.card_count = options.count
      },
      filterDeckByColor (state, options) {
        state.deck_list = deckTools().filterByColor({
          'deck': state.original_deck_list,
          'colors': tools().pluck(options.color_options, 'short'),
          'types': Object.keys(state.original_deck_list),
          'includes': options.includes
        })
      },

    },

    actions: {
      // Gallery Actions
      initGallery ({commit}) {
        api.get_cards()
          .then(response => {
            let options = {
              'alters': response.data
            }
            commit('setGallery', options)
          })
          .catch(error => {
            console.warn('error getting altered card list: ')
            console.error(error);
          })
      },
      deleteAlter (state, options) {
        api.delete_alter(options.id)
          .then(() => {
            state.commit('deleteAlter', options)
          })
          .catch(err => {
            console.warn(' ** Err Deleting Alter')
            console.error(err);
          })
      },
      postAlter (state, options) {
        api.post_gallery(options.alter)
          .then(function(response) {
            if (response.data.errors) {
              console.warn(' ** Error posting new alter', response.data.message);
            } else {
              state.commit('triggerAdd')
              state.commit('addAlter', {'alter': options.alter})
            }
          })
          .catch(function(error) {
            console.warn(' ** error posting alter', error)
          })
      },
      putAlter (state, options) {
        api.update_gallery_card(options.alter)
          .then(function(response) {
            if (response.data.errors) {
              console.warn(' ** Error updating alter', response.data.message);
            }
          })
          .catch(function(error) {
            console.error(' ** error updating alter', error)
          })
      },

      // Decklist Actions
      initDecks (state) {
        api.get_decks()
          .then(response => {
            const decks = response.data
            const deckOptions = {
              'decks': decks
            }
            const selectedDeck = decks[0]
            const selectedDeckOptions = {
              'deck': selectedDeck
            }
            state.commit('setDecks', deckOptions)
            this.dispatch('selectDeck', {
              'deck': selectedDeck
            })
          })
          .catch(error => {
            console.warn('error getting decks: ')
            console.error(error);
          })
      },
      selectDeck(state, options) {
        deckTools().combineListScryfallData(options.deck.cards)
          .then(function(groupedCards) {
            state.commit('setDecklist', {'deckList': groupedCards})
            state.commit('selectDeck', {'deck': options.deck})
            const allQuantities = tools().pluck(options.deck.cards, 'quantity')
            const addValuesReducer = (acc, cur) => acc + cur;
            state.commit('setCardCount', {'count': allQuantities.reduce(addValuesReducer)})
          })
      },
      addDeckCard(state, options) {
        api.add_deck_card(options.card, state.state.current_deck._id)
          .then(function(response) {
            if (response.data.errors) {
              console.warn(' ** Error updating alter', response.data.message);
            }
          })
          .catch(function(error) {
            console.error(' ** error updating alter', error)
          })
      }
    }
  })
}

export default builder
