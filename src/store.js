import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import { tools } from '@/utils/MStools'

Vue.use(Vuex)

// Export store as function to ensure app settings are passed in before any initializations
function builder (data) {

  function _combineListScryfallData(state, cards) {
    // Get all scryfall data to add to local list
    // Then sort deck into categories
    // TODO: implement scryfall data cache
    //       lower api calls for duplicate cards

    const card_ids     = tools().pluck(cards, 'id')
    const cardPromises = card_ids.map(id => api.get_scryfall_card(id))
    Promise.allSettled(cardPromises)
      .then(cardData => {
        const scryeCards = cardData.map(resposeData => resposeData.value.data)
        const combinedDataCardlist = (scryeCards.length === cards.length)
          ? scryeCards.map((scryeCard, idx) => {
              return {...scryeCard, ...cards[idx]}
            })
          : decks[0].cards

        const groupedCards = {}
        combinedDataCardlist.forEach(card => {
          // Make all lands type: "Land"
          // Make all legendary creatures type: "Creature"
          const type = (card.type_line.indexOf('Land') > -1)
            ? 'Land'
            : (card.type_line.indexOf('Creature') > -1)
              ? 'Creature'
              : card.type_line

          if (!groupedCards.hasOwnProperty(type)) {
            groupedCards[type] = []
          }
          tools().fastPush(groupedCards[type], card)
        })
        state.commit('setDecklist', {'deckList': groupedCards})
      })
  }

  return new Vuex.Store({
    state: {
      // Sent to store during app initialization
      app_settings: data,

      // Gallery Data
      original_gallery_list: [],
      gallery_list: [],

      // Decklist Data
      original_decks: [],
      current_deck: {},
      deck_list: []
    },

    mutations: {
      // Gallery Mutations
      setGallery (state, options) {
        const alters = options.alters
        state.original_gallery_list = alters
        state.gallery_list = options.alters.sort(tools().sortBy('date', false))
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
        const deckList = options.deckList
        state.deck_list = deckList
      }

    },

    actions: {
      // Gallery Actions
      initGallery ({commit}) {
        api.get_cards()
          .then(response => {
            let options = {
              'alters': response.data.alters
            }
            commit('setGallery', options)
          })
          .catch(error => {
            console.warn('error getting altered card list: ')
            console.error(error);
          })
      },

      // Decklist Actions
      initDecks (state) {
        api.get_decks()
          .then(response => {
            const decks = response.data.decks
            const deckOptions = {
              'decks': decks
            }
            const selectedDeck = decks[0]
            const selectedDeckOptions = {
              'deck': selectedDeck
            }
            _combineListScryfallData(state, selectedDeck.cards)
            state.commit('setDecks', deckOptions)
            state.commit('selectDeck', selectedDeckOptions)
          })
          .catch(error => {
            console.warn('error getting decks: ')
            console.error(error);
          })
      },
      selectDeck(state, options) {
        _combineListScryfallData(state, options.deck.cards)

        state.commit('selectDeck', {'deck': options.deck})
      }
    }
  })
}

export default builder
