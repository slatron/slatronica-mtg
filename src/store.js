import Vue from 'vue'
import Vuex from 'vuex'

import authStateModule from '@/state_modules/auth/authState'
import galleryStateModule from '@/state_modules/gallery/galleryState'
import layoutStateModule from '@/state_modules/layout/layoutState'
import deckStateModule from '@/state_modules/deck/deckState'
import lifetrackerStateModule from '@/state_modules/lifetracker/lifetrackerStateModule'

Vue.use(Vuex)
// Export store as function to ensure app settings
//   are passed in before any initializations
function builder (data) {
  return new Vuex.Store({
    modules: {
      auth: authStateModule,
      gallery: galleryStateModule,
      layout: layoutStateModule,
      deck: deckStateModule,
      lifetracker: lifetrackerStateModule
    },
    state: {
      app_settings: data
    }
  })
}

export default builder
