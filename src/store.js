import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/data/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gallery_list: []
  },

  mutations: {
    setGallery(state, alters) {
      state.gallery_list = alters;
    }
  },

  actions: {
    initGallery () {
      let store = this;
      api.get_cards()
        .then(function(response) {
          store.commit('setGallery', response.data.alters);
        })
        .catch(function(error) {
          console.warn('error getting altered card list: ', error);
        });
    }
  }

});
