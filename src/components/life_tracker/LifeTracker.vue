<template>
  <div
    class="life-tracker-wrapper"
  >
    <section
      v-for="section in life_sections"
      :key="section.id"
    >
      <LifeSection
        :key="section.id"
        :section-data="section"
      />
    </section>
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
      counters: 0
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
    }
  },
  watch: {
    trigger_reset: function() {
      init(this)
    }
  },
  created: function() {
    init(this)
  }
}
</script>

<style scoped>
.life-tracker-wrapper {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

section {
  width: 45%;
  border: 1px solid #fff;
  min-height: 100px;
  margin-bottom: 15px;
}
</style>
