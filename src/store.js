import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/data/api';
import { tools } from '@/utils/MStools';

Vue.use(Vuex);

// Export store as function to ensure app settings are passed in before any initializations
function builder (data) {
  return new Vuex.Store({
    state: {
      original_gallery_list: [],
      gallery_list: [],
      app_settings: data
    },

    mutations: {
      setGallery (state, options) {
        const alters = options.alters;
        state.original_gallery_list = alters;

        console.log('options passed to init: ', options);
        state.gallery_list = options.params.card ?
          options.alters.filter(card => card.id === options.params.card) :
          options.alters.sort(tools().sortBy('date', false));
      },
      sortGallery (state, options) {
        state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction));
      },
      applyFilter (state, options) {
        state.gallery_list = options.filter === 'All' ?
          state.original_gallery_list :
          state.original_gallery_list.filter(card => card.tags.includes(options.filter));

        // Apply Sort
        state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction));
      }
    },

    actions: {
      initGallery (store, params) {
        api.get_cards()
          .then(response => {
            let options = {
              'alters': response.data.alters,
              'params': params
            }
            store.commit('setGallery', options);
          })
          .catch(error => {
            console.warn('error getting altered card list: ');
            console.error(error);
          });
      }
    }
  });
}

export default builder;
