export default {
  state: {
    player_count: 2,
    starting_life: 20,
    trigger_reset: true
  },

  mutations: {
    setPlayerCount (state, options) {
      state.player_count = options.player_count
    },
    setStartingLife (state, options) {
      state.starting_life = options.starting_life
    },
    triggerResetLife (state) {
      state.trigger_reset = !state.trigger_reset
    },
    triggerAdd (state, options = {}) {
      state.add_click = !state.add_click
    },
  }
}
