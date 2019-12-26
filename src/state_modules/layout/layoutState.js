export default {
  state: {
    drawer_open: false,
    open_form: false,
    form_tab: 'card',
    page_loading: false
  },

  mutations: {
    toggleDrawer (state, options = {}) {
      state.drawer_open = options.hasOwnProperty('force')
        ? options.force
        : !state.drawer_open
    },
    toggleForm (state, options = {}) {
      if (options.tab) {
        state.form_tab = options.tab
      }
      state.open_form = !state.open_form
    },
    pageLoading (state, options) {
      state.page_loading = options.loading
    }
  }
}
