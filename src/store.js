import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/data/api';
import { tools } from '@/utils/MStools';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gallery_list: []
  },

  mutations: {
    setGallery(state, alters) {
      state.gallery_list = alters;
    },
    sortGallery(state, options) {
      state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction));
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
    }
  }

});
