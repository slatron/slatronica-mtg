import api from '@/api/api'
import { tools } from '@/utils/MStools'
import { deckTools } from '@/utils/deckTools'

export default {
  state: {
    gallery_list: []
  },

  mutations: {
    setGallery (state, options) {
      state.gallery_list = options.alters.sort(tools().sortBy('date', false))
      state.gallery_list = state.gallery_list.map(deckTools().setAllCardsVisible)
      this.commit('pageLoading', { loading: false })
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
      state.gallery_list = options.filter === 'All'
        ? state.gallery_list.map(deckTools().setAllCardsVisible)
        : state.gallery_list.map(card => {
          card.visible = card.tags.includes(options.filter)
          return card
        })

      // Apply Sort
      state.gallery_list = state.gallery_list.sort(tools().sortBy(options.field, options.direction))
    },
    deleteAlter (state, options) {
      const alterIdx = state.gallery_list.findIndex(alter => alter._id === options.id)
      state.gallery_list.splice(alterIdx, 1)
    }
  },

  actions: {
    initGallery (state) {
      state.commit('pageLoading', { loading: true })
      api.get_cards()
        .then(response => {
          this.dispatch('combineGalleryListWithScryfall', {
            'alters': response.data
          })
        })
        .catch(err => {
          console.warn('error getting altered card list: ')
          console.error(err)
          state.commit('pageLoading', { loading: false })
        })
    },
    combineGalleryListWithScryfall (state, options) {
      deckTools().combineScryfallData(options.alters)
        .then(alters => {
          state.commit('setGallery', { 'alters': alters })
        })
    },
    deleteAlter (state, options) {
      api.delete_alter(options.id)
        .then(() => {
          state.commit('deleteAlter', options)
        })
        .catch(err => {
          console.warn(' ** Err Deleting Alter')
          console.error(err)
        })
    },
    postAlter (state, options) {
      api.post_gallery(options.alter)
        .then(function (response) {
          if (response.data.errors) {
            console.warn(' ** Error posting new alter', response.data.message)
          } else {
            state.commit('toggleForm')
            state.commit('addAlter', { 'alter': options.alter })
          }
        })
        .catch(err => console.warn(' ** error posting alter', err))
    },
    putAlter (state, options) {
      api.update_gallery_card(options.alter)
        .then(function (response) {
          if (response.data.errors) {
            console.warn(' ** Error updating alter', response.data.message)
          }
        })
        .catch(error => console.error(' ** error updating alter', error))
    }
  }
}
