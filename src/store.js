import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/data/api'
import { tools } from '@/utils/MStools'

Vue.use(Vuex)

// Export store as function to ensure app settings are passed in before any initializations
function builder (data) {
  return new Vuex.Store({
    state: {
      original_gallery_list: [],
      gallery_list: [],
      app_settings: data
    },

    mutations: {
      setGallery (state, alters) {
        state.original_gallery_list = alters
        state.gallery_list = alters
      },
      sortGallery (state, options) {
        state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction))
      },
      applyFilters (state, options) {
        state.gallery_list = state.original_gallery_list.filter(
          card => {
            return card.tags.filter(tag => options.filters.includes(tag)).length
          }
        )
      }
    },

    actions: {
      initGallery (store) {
        api.get_cards()
          .then(function (response) {
            store.commit('setGallery', response.data.alters)
          })
          .catch(function (error) {
            console.warn('error getting altered card list: ')
            console.error(error)
          })
      }
    }
  })
}

export default builder
