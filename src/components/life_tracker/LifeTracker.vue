<template>
  <div class="full-height-layout">
    <div class="align-row align-header" />
    <div
      class="align-row align-content life-tracker-wrapper"
    >
      <section
        v-for="section in life_sections"
        :key="section.id"
        :class="{'low-players': player_count < 3}"
      >
        <LifeSection
          :key="section.id"
          :section-data="section"
        />
      </section>
    </div>
    <div class="align-row align-footer" />
  </div>
</template>

<script>
import LifeSection from '@/components/life_tracker/LifeSection'

const init = vm => {
  // This creates (vm.player_count) sections
  vm.life_sections = Array.from({length: vm.player_count}, (_, i) => {
    return {
      id: i,
      name: `Player ${i + 1}`,
      life: vm.starting_life,
      counter_name: 'Cmd Dmg',
      counters: 0,
      flip: vm.multiplayer_mode && (i < (vm.player_count / 2))
    }
  })
}

export default {
  name: 'LifeTracker',
  components: {
    LifeSection
  },
  data: function() {
    return {
      life_sections: []
    }
  },
  computed: {
    player_count () {
      return this.$store.state.lifetracker.player_count
    },
    starting_life () {
      return this.$store.state.lifetracker.starting_life
    },
    trigger_reset () {
      return this.$store.state.lifetracker.trigger_reset
    },
    multiplayer_mode () {
      return this.$store.state.lifetracker.multiplayer_mode
    }
  },
  watch: {
    trigger_reset: function() {
      init(this)
    },
    player_count: function() {
      init(this)
    },
    starting_life: function() {
      init(this)
    },
    multiplayer_mode () {
      init(this)
    }
  },
  created: function() {
    init(this)
  }
}
</script>

<style lang="scss" scoped>
.life-tracker-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
}

section {
  color: #000;
  border: 1px solid #fff;
  &.low-players {
    grid-column: 1 / span 2;
  }
  &:nth-child(1) {
    background-color: aqua;
  }
  &:nth-child(2) {
    background-color: pink;
  }
  &:nth-child(3) {
    background-color: yellow;
  }
  &:nth-child(4) {
    background-color: goldenrod;
  }
  &:nth-child(5) {
    background-color: plum;
  }
  &:nth-child(6) {
    background-color: thistle;
  }
}

</style>
