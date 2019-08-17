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
      deck_list: [
        {
          id: 'd91a527d-51f1-4fb1-9016-fc923fd43a6a',
          quantity: 2,
          name: 'Azorius Signet'
        }
      ],
      app_settings: data
    },

    mutations: {
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
      }
    }
  })
}

export default builder
