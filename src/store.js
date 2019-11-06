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
    const card_ids     = tools().pluck(cards, 'scryfall_id')
    const cardPromises = card_ids.map(id => api.get_scryfall_card(id))
    Promise.all(cardPromises)
      .then(cardData => {
        const scryeCards = cardData.map(responseData => responseData.data)
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

          if (!(type in groupedCards)) {
            groupedCards[type] = []
          }

          // For cards with 2 faces, merge card data with first face
          if ('card_faces' in card) {
            card = {...card, ...card.card_faces[0]}
          }

          // Add "C" to colorless cards for filtering data
          if (card.colors.length === 0) {
            card.colors = ['C']
          }
          tools().fastPush(groupedCards[type], card)
        })

        state.commit('setDecklist', {'deckList': groupedCards})
      })
  }

  // This creates a hash of sorted type categories by card length
  // - could be useful when responsive screens resort deck card types
  //
  // function _getSortKeys(deckList) {
  //   const typesUsed = Object.keys(deckList)
  //   const sortArray = typesUsed.map(type => {
  //     let sortKey = {'name': type}
  //     sortKey.count = deckList[type].length
  //     return sortKey
  //   })
  //   const sortKeys = sortArray.sort(tools().sortBy('count'))
  //   return sortKeys
  // }

  function _filterByColor(options) {
    // Fix for double-faced cards
    let filteredDeck = {}
    options.types.forEach(type => {
      filteredDeck[type] = options.deck[type].filter(card => {
        const intersection = tools().intersection(card.colors, options.colors)
        return options.includes === 'includes'
          ? intersection.length > 0
          : intersection.length === 0
      })
    })
    return filteredDeck
  }

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
        state.deck_list = _filterByColor({
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
        _combineListScryfallData(state, options.deck.cards)
        state.commit('selectDeck', {'deck': options.deck})
        const allQuantities = tools().pluck(options.deck.cards, 'quantity')
        const addValuesReducer = (acc, cur) => acc + cur;
        state.commit('setCardCount', {'count': allQuantities.reduce(addValuesReducer)})
      }
    }
  })
}

export default builder
