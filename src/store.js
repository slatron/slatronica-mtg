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
      gallery_list: [],

      // Decklist Data
      deck_lists: [],   // All decks from DB
      deck_current: {}, // Selected deck
      deck_sorted: {},  // deck_current represented by categories

      decklist_loading: false,
      card_count: 0,
      empty_cols: [] // Key Names of Empty Cols
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
        state.gallery_list = options.alters.sort(tools().sortBy('date', false))
        state.gallery_list = state.gallery_list.map(deckTools().setAllCardsVisible)
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
        state.gallery_list = options.filter === 'All'
          ? state.gallery_list.map(deckTools().setAllCardsVisible)
          : state.gallery_list.map(card => {
            card.visible = card.tags.includes(options.filter)
            return card
          })

        // Apply Sort
        state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction))
      },
      deleteAlter (state, options) {
        const alterIdx = state.gallery_list.findIndex(alter => alter._id === options.id)
        state.gallery_list.splice(alterIdx, 1)
      },

      // Decklist Mutations
      decklistLoading (state, options) {
        state.decklist_loading = options.loading
      },
      setDecks (state, options) {
        state.deck_lists = options.decks
      },
      selectDeck (state, options) {
        state.deck_current = options.deck
      },
      setDecklist (state, options) {
        state.deck_sorted = options.deck_list
      },
      setCardCount (state, options) {
        state.card_count = options.count
      },
      filterDeckByColor (state, options) {
        state.deck_sorted = deckTools().filterByColor({
          'deck': state.deck_sorted,
          'colors': tools().pluck(options.color_options, 'short'),
          'types': Object.keys(state.deck_sorted),
          'includes': options.includes
        })
        state.empty_cols = deckTools().getEmptyColumns(state.deck_sorted)
      },
      addDeckCard (state, options) {
        const category = deckTools().getCardCategoryName(options.card)
        if (!(category in state.deck_sorted)) {
          state.deck_sorted[category] = []
        }
        options.card = deckTools().prepCardForDeckpageDisplay(options.card)
        options.card.category = category
        tools().fastPush(state.deck_sorted[category], options.card)
        tools().fastPush(state.deck_current.cards, options.card)
        state.deck_sorted = {...state.deck_sorted}
      },
      updateDeckCard (state, options) {
        let sortedListCard = state.deck_sorted[options.category].find(card => card._id === options.card_id)
        let listCard = state.deck_current.cards.find(card => card._id === options.card_id)
        sortedListCard = Object.assign(sortedListCard, options.update_data)
        listCard = Object.assign(listCard, options.update_data)
      },
      removeDeckCard (state, options) {
        let currentCard = state.deck_sorted[options.category].find(card => card._id === options.card_id)
        let originalCard = state.deck_current.cards.find(card => card._id === options.card_id)
        state.deck_sorted[options.category].splice(state.deck_sorted[options.category].indexOf(currentCard), 1)
        state.deck_current.cards.splice(state.deck_current.cards.indexOf(originalCard), 1)

        // Check for empty category delete
        if (state.deck_sorted[options.category].length === 0) {
          delete state.deck_sorted[options.category]
        }
      },
      addNewDeck (state, options) {
        tools().fastPush(state.deck_lists, options.new_deck)
        const newDecklist = state.deck_lists
        state.deck_lists = newDecklist
      }
    },

    actions: {
      // Gallery Actions
      initGallery (state) {
        api.get_cards()
          .then(response => {
            this.dispatch('combineGalleryListWithScryfall', {
              'alters': response.data
            })
          })
          .catch(err => {
            console.warn('error getting altered card list: ')
            console.error(err);
          })
      },
      combineGalleryListWithScryfall (state, options) {
        deckTools().combineGalleryScryfallData(options.alters)
          .then(alters => {
            state.commit('setGallery', {'alters': alters})
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
          .catch(err => console.warn(' ** error posting alter', error))
      },
      putAlter (state, options) {
        api.update_gallery_card(options.alter)
          .then(function(response) {
            if (response.data.errors) {
              console.warn(' ** Error updating alter', response.data.message);
            }
          })
          .catch(error => console.error(' ** error updating alter', error))
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
            state.commit('setDecks', deckOptions)
            this.dispatch('selectDeck', {
              'deck': selectedDeck
            })
          })
          .catch(err => {
            console.warn('error getting decks: ')
            console.error(err);
          })
      },
      selectDeck(state, options) {
        state.commit('decklistLoading', {loading: true})
        state.commit('setDecklist', {'deck_list': {}})
        // TODO: skip api calls if data exists
        //       this should be done with the decktools refactor
        //       we need to separate the deck grouping logic
        deckTools().combineDeckScryfallData(options.deck.cards)
          .then(function(groupedCards) {
            state.commit('setDecklist', {'deck_list': groupedCards})
            state.commit('selectDeck', {
              'deck': options.deck
            })
            const count = deckTools().countCards(options.deck.cards)
            state.commit('setCardCount', {'count': count})
          })
          .catch(err => console.error(' ** error selecting deck: ', error))
          .finally(function() {
            state.commit('decklistLoading', {loading: false})
          })
      },
      addNewDeck(state, options) {
        const newDeck = {
          name: options.new_deck.name,
        }
        api.add_deck(newDeck)
          .then(function(response) {
            state.commit('addNewDeck', {'new_deck': response.data.deck})
          })
          .catch((error) => console.error(' ** error adding new deck: ', error))
      },
      addDeckCard(state, options) {
        state.commit('decklistLoading', {loading: true})
        api.add_deck_card(options.card, state.state.deck_current._id)
          .then(function(response) {
            options.card._id = response.data.card_id
            deckTools().combineCardWithScryfallData(options.card)
              .then(function(card) {
                state.commit('addDeckCard', {'card': card})
                state.commit('setCardCount',{'count': state.state.card_count + 1})
              })
              .catch(function(error) {
                console.error(' ** error adding new card', error)
              })
              .finally(function() {
                state.commit('decklistLoading', {loading: false})
              })
          })
          .catch(err => console.error(' ** error adding new card', err))
      },
      updateDeckCard(state, options) {
        api.update_deck_card(state.state.deck_current._id, options)
          .then(function(response) {
            state.commit('updateDeckCard', options)
            if ('count_change' in options) {
              state.commit('setCardCount', {'count': (state.state.card_count + options.count_change)})
            }
          })
          .catch(err => console.error(err))
      },
      removeDeckCard(state, options) {
        api.remove_deck_card(state.state.deck_current._id, options)
          .then(function(response) {
            state.commit('removeDeckCard', options)
            state.commit('setCardCount', {'count': state.state.card_count - 1})
          })
          .catch(err => console.error(err))
      }
    }
  })
}

export default builder
