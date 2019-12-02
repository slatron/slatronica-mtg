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
      original_decks: [],
      current_deck: {},
      original_deck_list: [],
      deck_list: [],
      decklist_loading: false,
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
      addDeckCard (state, options) {
        const category = deckTools().getCardCategoryName(options.card)
        if (!(category in state.deck_list)) {
          state.deck_list[category] = []
        }
        options.card = deckTools().prepCardForDeckpageDisplay(options.card)
        options.card.category = category
        tools().fastPush(state.deck_list[category], options.card)
        tools().fastPush(state.current_deck.cards, options.card)
        state.deck_list = {...state.deck_list}
      },
      updateDeckCard (state, options) {
        let currentCard = state.deck_list[options.category].find(card => card._id === options.card_id)
        let originalCard = state.current_deck.cards.find(card => card._id === options.card_id)
        currentCard = Object.assign(currentCard, options.update_data)
        originalCard = Object.assign(originalCard, options.update_data)
      },
      removeDeckCard (state, options) {
        let currentCard = state.deck_list[options.category].find(card => card._id === options.card_id)
        let currentCardOriginal = state.original_deck_list[options.category].find(card => card._id === options.card_id)
        let originalCard = state.current_deck.cards.find(card => card._id === options.card_id)
        state.deck_list[options.category].splice(state.deck_list[options.category].indexOf(currentCard), 1)
        state.original_deck_list[options.category].splice(state.original_deck_list[options.category].indexOf(currentCard), 1)
        state.current_deck.cards.splice(state.current_deck.cards.indexOf(originalCard), 1)

        // Check for empty category delete
        if (state.deck_list[options.category].length === 0) {
          delete state.deck_list[options.category]
          delete state.original_deck_list[options.category]
        }
      },
      addNewDeck (state, options) {
        tools().fastPush(state.original_decks, options.new_deck)
        const newDecklist = state.original_decks
        state.original_decks = newDecklist
      }
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
        state.commit('decklistLoading', {loading: true})
        deckTools().combineListScryfallData(options.deck.cards)
          .then(function(groupedCards) {
            state.commit('setDecklist', {'deckList': groupedCards})
            state.commit('selectDeck', {'deck': options.deck})
            const allQuantities = tools().pluck(options.deck.cards, 'quantity')
            const addValuesReducer = (acc, cur) => acc + cur;
            const count = allQuantities.length === 0
              ? 0
              : allQuantities.reduce(addValuesReducer)
            state.commit('setCardCount', {'count': count})
          })
          .catch(function(error) {
            console.error(' ** error adding new card', error)
          })
          .finally(function() {
            state.commit('decklistLoading', {loading: false})
          })
      },
      addNewDeck(state, options) {
        const deck_ids = tools().pluck(state.state.original_decks, 'deck_id')
        const newDeck = {
          name: options.new_deck.name,
          deck_id: tools().max(deck_ids) + 1
        }
        api.add_deck(newDeck)
          .then(function(response) {
            state.commit('addNewDeck', {'new_deck': response.data.deck})
          })
          .catch(function(error) {
            console.error(' ** error adding new deck', error)
          })
      },
      addDeckCard(state, options) {
        state.commit('decklistLoading', {loading: true})
        api.add_deck_card(options.card, state.state.current_deck._id)
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
          .catch(function(error) {
            console.error(' ** error adding new card', error)
          })
      },
      updateDeckCard(state, options) {
        api.update_deck_card(state.state.current_deck._id, options)
          .then(function(response) {
            state.commit('updateDeckCard', options)
            if ('count_change' in options) {
              state.commit('setCardCount', {'count': (state.state.card_count + options.count_change)})
            }
          })
          .catch(err => console.error(err))
      },
      removeDeckCard(state, options) {
        api.remove_deck_card(state.state.current_deck._id, options)
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
