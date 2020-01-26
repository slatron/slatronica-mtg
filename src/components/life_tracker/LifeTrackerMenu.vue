<template lang="html">
  <div class="life-tracker-menu">
    <fieldset>
      <div>
        <label>Player Count</label>
        <select
          v-model="player_count"
          @change="setPlayerCount()"
        >
          <option
            v-for="(count, idx) in [1,2,3,4,5,6]"
            :key="idx"
            :value="count"
          >
            {{ count }}
          </option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <label for="">Starting Life</label>
      <select
        v-model="starting_life"
        @change="setStartingLife()"
      >
        <option
          v-for="(total, idx) in [20,25,30,35,40,45,50,75,100]"
          :key="idx"
          :value="total"
        >
          {{ total }}
        </option>
      </select>
    </fieldset>
    <div class="double-col-row">
      <section>
        <button @click="resetLife()">
          Reset
        </button>
      </section>
      <section>
        <label for="multiplayer_cb">Multiplayer</label>
        <input
          id="multiplayer_cb"
          v-model="multiplayer_mode"
          type="checkbox"
          @change="setMultiplayerMode()"
        >
      </section>
    </div>
    <button
      class="lock-screen-button"
      :class="{'active': lock_enabled}"
      @click="lockScreen()"
    >
      SCREEN LOCK
      <span v-show="lock_enabled">ON</span>
      <span v-show="!lock_enabled">OFF</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LifeTrackerMenu',
  data () {
    return {
      player_count: this.$store.state.lifetracker.player_count,
      starting_life: this.$store.state.lifetracker.starting_life,
      multiplayer_mode: this.$store.state.lifetracker.multiplayer_mode,
      noSleep: new NoSleep(),
      lock_enabled: false
    }
  },
  methods: {
    lockScreen: function() {
      if (!this.lock_enabled) {
        this.noSleep.enable(); // keep the screen on!
        this.lock_enabled = true;
      } else {
        this.noSleep.disable(); // let the screen turn off.
        this.lock_enabled = false;
      }
    },
    setPlayerCount: function () {
      this.$store.commit('setPlayerCount', {
        'player_count': this.player_count
      })
    },
    setStartingLife: function() {
      this.$store.commit('setStartingLife', {
        'starting_life': this.starting_life
      })
    },
    setMultiplayerMode: function() {
      this.$store.commit('setMultiplayerMode', {
        'multiplayer_mode': this.multiplayer_mode
      })
    },
    resetLife: function() {
      this.$store.commit('triggerResetLife')
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset,
div.double-col-row {
  margin: 1em 0.5em;
}
input {
  margin-left: 1em;
}
select {
  width: 4em;
  margin-left: 0.5em;
}
.lock-screen-button {
  padding: 0.5em;
  font-size: 10px;
  background-color: red;
  color: #fff;
  outline: none;
  transition: background-color 1s ease;

  &.active {
    background-color: green;
  }
}
</style>
