import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/data/api';
import { tools } from '@/utils/MStools';

Vue.use(Vuex);

// Export store as function to ensure app settings are passed in before any initializations
function builder (data) {

  function _sortMethod(field, direction) {
    return tools().sortBy(field, direction);
  }

  return new Vuex.Store({
    state: {
      original_gallery_list: [],
      gallery_list: [],
      app_settings: data
    },

    mutations: {
      setGallery (state, alters) {
        state.original_gallery_list = alters;
        state.gallery_list = alters.sort(_sortMethod('date', false));
      },
      sortGallery (state, options) {
        state.gallery_list = state.gallery_list.sort(_sortMethod(options.field, options.direction));
      },
      applyFilter (state, options) {
        state.gallery_list = options.filter === 'All' ?
          state.original_gallery_list :
          state.original_gallery_list.filter(card => card.tags.includes(options.filter));

        // Apply Sort
        state.gallery_list = state.gallery_list.sort(_sortMethod(options.field, options.direction));
      }
    },

    actions: {
      initGallery (store) {
        api.get_cards()
          .then(function (response) {
            store.commit('setGallery', response.data.alters);
          })
          .catch(function (error) {
            console.warn('error getting altered card list: ');
            console.error(error);
          });
      }
    }
  });
}

export default builder;
