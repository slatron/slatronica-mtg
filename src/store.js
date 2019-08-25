import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import { tools } from '@/utils/MStools'

Vue.use(Vuex)

// Export store as function to ensure app settings are passed in before any initializations
function builder (data) {
  return new Vuex.Store({
    state: {
      original_gallery_list: [],
      gallery_list: [],
      original_decks: [],
      deck_list: [],
      app_settings: data,
      current_deck_id: 1,
      current_deck: {}
    },

    mutations: {
      setGallery (state, options) {
        const alters = options.alters
        state.original_gallery_list = alters
        state.gallery_list = options.alters.sort(tools().sortBy('date', false))
      },
      setDecks (state, options) {
        const decks = options.decks
        state.original_decks  = decks
        state.current_deck    = options.decks[0]
        state.current_deck_id = options.decks[0].id
        state.deck_list       = options.decks[0].cards
      },
      selectDeck (state, options) {
        state.current_deck_id = options.deck_id
        state.current_deck    = state.original_decks.find(deck => deck.id === options.deck_id)
        state.deck_list       = state.current_deck.cards
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
      }
    },

    actions: {
      initGallery (store) {
        api.get_cards()
          .then(response => {
            let options = {
              'alters': response.data.alters
            }
            store.commit('setGallery', options)
          })
          .catch(error => {
            console.warn('error getting altered card list: ')
            console.error(error);
          })
      },
      initDecks (store) {
        api.get_decks()
          .then(response => {
            let options = {
              'decks': response.data.decks
            }
            store.commit('setDecks', options)
          })
          .catch(error => {
            console.warn('error getting decks: ')
            console.error(error);
          })

      }
    }
  })
}

export default builder
