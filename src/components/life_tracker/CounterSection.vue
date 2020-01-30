<template>
  <div>
    <div class="choose-color-section centered" v-show="!color">
      <button
        v-for="color in available_colors"
        :class="`color-chooser bg-${color}`"
        @click="chooseColor(color)"
      >&nbsp;</button>
    </div>
    <div
      class="counter-section centered"
      v-show="color"
      :style="{'background-color': color}"
    >
      <button
        class="down"
        @click="changeCounter(false)"
      >
        -1
      </button>
      <span class="counter-count">
        {{ counters }}
      </span>
      <button
        class="up"
        @click="changeCounter(true)"
      >
        +1
      </button>
    </div>
  </div>
</template>

<script>
const init = vm => {
  vm.color = ''
  vm.counters = 0
  vm.colors_without_me = []
  vm.available_colors = []

  vm.colors_without_me = vm.color_order.filter(function(color) {
    return color !== vm.color_order[vm.player]
  })
  const player_colors = vm.colors_without_me.splice(0, ((vm.player_count - 1) || 1))
  vm.available_colors = player_colors.filter(function(color) {
    return vm.used_colors.indexOf(color) === -1
  })
}

export default {
  name: 'CounterSection',
  props: {
    player: { 'type': Number },
    used_colors: {'type': Array }
  },
  data: function() {
    return {
      counters: 0,
      color: '',
      colors_without_me: [],
      available_colors: []
    }
  },
  computed: {
    color_order () {
      return this.$store.state.lifetracker.color_order
    },
    player_count () {
      return this.$store.state.lifetracker.player_count
    },
    trigger_reset () {
      return this.$store.state.lifetracker.trigger_reset
    },
  },
  created: function () {
    init(this)
  },
  methods: {
    changeCounter: function(up) {
      this.counters = up
        ? this.counters + 1
        : this.counters - 1
    },
    chooseColor: function(color) {
      this.color = color
      this.$emit('set-color', color)
    }
  },
  watch: {
    trigger_reset: function() {
      init(this)
    },
    player_count: function() {
      init(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.counter-section,
.choose-color-section {
  text-align: center;
  width: 71px;
  height: 30px;
}
@media (min-width: 768px) {
  .counter-section,
  .choose-color-section {
    width: 155px;
    height: 68px;
  }
}
.counter-count {
  width: 20px;
}
@media (min-width: 768px) {
  .counter-count {
    width: 40px;
  }
}
.color-chooser {
  padding: 0;
  margin: 0 2px;
  height: 30px;
  width: 50px;
}
@media (min-width: 768px) {
  .color-chooser {
    height: 50px;
  }
}
button.up {
  border: 1px solid green;
}
button.down {
  border: 1px solid red;
}
button {
  font-size: 10px;
  background-color: #fff;
  padding: 0.25em;
  margin: 0 0.25em;
  border-radius: 0.25em;
}
@media (min-width: 768px) {
  button {
    font-size: 16px;
    background-color: #fff;
    border-radius: 0.25em;
  }
}
.bg-aqua      { background-color: aqua; }
.bg-pink      { background-color: pink; }
.bg-yellow    { background-color: yellow; }
.bg-goldenrod { background-color: goldenrod; }
.bg-plum      { background-color: plum; }
.bg-thistle   { background-color: thistle; }
</style>
