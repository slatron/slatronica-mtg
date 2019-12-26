export default {
  state: {
    username: ''
  },
  mutations: {
    setUsername (state, options = {}) {
      state.username = options.username
    }
  }
}
