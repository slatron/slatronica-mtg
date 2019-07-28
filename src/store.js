import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/data/api';
import { tools } from '@/utils/MStools';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    original_gallery_list: [],
    gallery_list: [],
    app_settings: {}
  },

  mutations: {
    setSettings(state, settings) {
      state.app_settings = settings;
    },
    setGallery(state, alters) {
      state.original_gallery_list = alters;
      state.gallery_list = alters;
    },
    sortGallery(state, options) {
      state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction));
    },
    applyFilters(state, options) {
      console.log('options: ', options);
      state.gallery_list = state.original_gallery_list.filter(
        card => {
          return card.tags.filter(tag => options.filters.includes(tag)).length;
        }
      );
    }
  },

  actions: {
    initGallery (store) {
      api.get_cards()
        .then(function(response) {
          store.commit('setGallery', response.data.alters);
        })
        .catch(function(error) {
          console.warn('error getting altered card list: ');
          console.error(error);
        });
    },

    initSettings (store) {
      api.get_settings()
        .then(function(response) {
          store.commit('setSettings', response.data);
        })
        .catch(function(error) {
          console.warn('error getting app settings: ');
          console.error(error);
        });
    }

  }

});
