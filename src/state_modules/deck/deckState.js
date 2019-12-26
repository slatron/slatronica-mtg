import api from '@/api/api'
import { tools } from '@/utils/MStools'
import { deckTools } from '@/utils/deckTools'

export default {
  state: {
    deck_lists: [],   // All decks from DB
    deck_current: {}, // Selected deck
    deck_sorted: {},  // deck_current represented by categories

    use_custom_categories: true, // view card custom categories?
    deck_sort_by: 'cmc', // key to sort deck categories
    card_count: 0,
    empty_cols: [], // Key Names of Empty Cols
    base_alter_list: []
  },

  mutations: {
    setDecks (state, options) {
      state.deck_lists = options.decks
    },
    selectDeck (state, options) {
      state.deck_current = options.deck
    },
    setDeckSorted (state, options) {
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
      const category = deckTools().getCardCategoryName(options.card, state.use_custom_categories)
      if (!(category in state.deck_sorted)) {
        state.deck_sorted[category] = []
      }
      options.card = deckTools().prepCardForDeckpageDisplay(options.card)
      options.card.category = category
      tools().fastPush(state.deck_sorted[category], options.card)
      tools().fastPush(state.deck_current.cards, options.card)
      state.deck_sorted = {...state.deck_sorted}
    },
    emptyCategoryCheck (state, options) {
      if (state.deck_sorted[options.category].length === 0) {
        delete state.deck_sorted[options.category]
      }
    },
    moveCardCategory (state, options) {
      let card = state.deck_sorted[options.category].splice(state.deck_sorted[options.category].findIndex(card => card._id === options.card_id), 1)[0]
      card = Object.assign(card, options.update_data)
      // check for "*** REMOVE ***"
      // - if so, remove custom_category field
      if (options.update_data.custom_category === '*** REMOVE ***') {
        delete card.custom_category;
      }
      card.category = deckTools().getCardCategoryName(card, state.use_custom_categories)
      // create potential new category if not there
      if (card.category in state.deck_sorted === false) state.deck_sorted[card.category] = []
      tools().fastPush(state.deck_sorted[card.category], card)
      state.deck_sorted = {...state.deck_sorted}
      // Check for empty category delete
      this.commit('emptyCategoryCheck', options)
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

      this.commit('emptyCategoryCheck', options)
    },
    addNewDeck (state, options) {
      tools().fastPush(state.deck_lists, options.new_deck)
      state.deck_lists = {...state.deck_lists}
      this.dispatch('selectDeck', {'deck': options.new_deck})
    },
    updateDeck (state, options) {
      state.deck_current.name = options.name
        ? options.name
        : state.deck_current.name
      state.deck_current.format = options.format
        ? options.format
        : state.deck_current.format
    },
    deleteDeck (state, deck_id) {
      state.deck_lists.splice(state.deck_lists.findIndex(deck => deck._id === deck_id), 1)
      this.commit('toggleForm')
    },
    setSortBy (state, deck_sort_by) {
      state.deck_sort_by = deck_sort_by
    },
    setUseCustomCategories (state, use_custom_categories) {
      state.use_custom_categories = use_custom_categories
      // re-sort current deck
      this.commit('pageLoading', {loading: true})
      this.commit('setDeckSorted', {'deck_list': {}})
      const groupedCards = deckTools().groupCards(state.deck_current.cards, state.deck_current.cards, state.use_custom_categories)
      this.commit('setDeckSorted', {'deck_list': groupedCards})
      this.commit('pageLoading', {loading: false})
    },
    setBaseAlterList (state, alters) {
      state.base_alter_list = alters
    }
  },

  actions: {
    initDecks (state) {
      // store base list of existing altered cards
      if (!state.state.base_alter_list.length) {
        api.get_cards()
          .then(alters => {
            state.commit('setBaseAlterList', alters.data)
          })
          .catch(err => {
            console.warn('error getting alters for base_alter_list: ')
            console.error(err);
          })
      }
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
      const groupCardlistAndSetDeck = function(cards) {
        const groupedCards = deckTools().groupCards(cards, options.deck.cards, state.state.use_custom_categories)
        state.commit('setDeckSorted', {'deck_list': groupedCards})
        state.commit('selectDeck', {
          'deck': options.deck
        })
        const count = deckTools().countCards(options.deck.cards)
        state.commit('setCardCount', {'count': count})
        state.commit('pageLoading', {loading: false})
      }

      state.commit('pageLoading', {loading: true})
      state.commit('setDeckSorted', {'deck_list': {}})

      if (options.deck.cards.length && options.deck.cards[0].object) {
        groupCardlistAndSetDeck(options.deck.cards)
      } else {
        deckTools().combineScryfallData(options.deck.cards)
          .then(function(combinedDataCardlist) {
            options.deck.cards = combinedDataCardlist
            groupCardlistAndSetDeck(combinedDataCardlist)
          })
          .catch(err => {
            console.error(' ** error selecting deck: ', err)
            state.commit('pageLoading', {loading: false})
          })
      }
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
      state.commit('pageLoading', {loading: true})
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
              state.commit('pageLoading', {loading: false})
            })
        })
        .catch(err => console.error(' ** error adding new card', err))
    },
    updateDeckCard(state, options) {
      // Ensure there is update_data
      if ('update_data' in options === false) return false
      api.update_deck_card(state.state.deck_current._id, options)
        .then(function(response) {
          if (options.category_move) {
            state.commit('moveCardCategory', options)
            options.category = (options.update_data.custom_category === '*** REMOVE ***')
              ? deckTools().getCardCategoryName({type_line: options.type}, state.state.use_custom_categories)
              : options.update_data.custom_category
          }
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
    },
    updateDeck (state, options) {
      api.update_deck(state.state.deck_current._id, options)
        .then(function(response) {
          if (response.data.errors) {
            console.warn(' ** Error updating deck', response.data.message);
          }
          state.commit('updateDeck', options)
        })
        .catch(error => console.error(' ** error updating deck', error))
    },
    deleteDeck (state) {
      api.delete_deck(state.state.deck_current._id)
        .then(function() {
          state.commit('deleteDeck', state.state.deck_current._id)
          state.dispatch('selectDeck', {
            'deck': state.state.deck_lists[0]
          })
        })
        .catch(err => {
          console.warn(' ** Err Deleting deck')
          console.error(err);
        })
    }
  }
}
