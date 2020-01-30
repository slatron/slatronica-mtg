<template>
  <div
    :class="{'flip': sectionData.flip}"
    class="full-height-layout life-section"
  >
    <div class="header-row align-row align-header">
      <section>
        <span
          v-show="!editNameMode"
          @click="editNameToggle()"
        >
          {{ name }}
        </span>
        <form
          v-show="editNameMode"
          class="edit-name-form"
          @submit.prevent
          @click.prevent
          @submit="editNameToggle()"
        >
          <span>Your Name</span>
          <input v-model="name">
          <button
            @click="editNameToggle()"
          >
            X
          </button>
        </form>
      </section>
      <section
        class="counter-area"
        :class="{'active': view_cmdr}"
      >
        <i
          class="ms ms-planeswalker ms-shadow"
          @click="toggleCmdrDmg()"
        />
        <section class="counter-sections">
          <CounterSection
            v-for="(area, idx) in counter_areas"
            :key="idx"
            :player="sectionData.id"
            :used-colors="area.used_colors"
            @set-color="addPlayerCounter"
          />
        </section>
      </section>
    </div>
    <div
      class="align-content centered align-row align-footer"
      @click="changeLife(1, true)"
    >
      {{ sectionData.life }}
    </div>
    <div class="double-col-row">
      <section class="centered">
        <button
          class="down"
          @click="changeLife(1, true)"
        >
          -1
        </button>
        <button
          class="down-big"
          @click="changeLife(5, true)"
        >
          -5
        </button>
      </section>
      <section class="centered">
        <button
          class="up-big"
          @click="changeLife(5, false)"
        >
          +5
        </button>
        <button
          class="up"
          @click="changeLife(1, false)"
        >
          +1
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import CounterSection from '@/components/life_tracker/CounterSection'
export default {
  name: 'LifeSection',
  components: {
    CounterSection
  },
  props: {
    sectionData: { 'type': Object, 'default': {} }
  },
  data: function() {
    return {
      editNameMode: false,
      name: `Player ${this.sectionData.id + 1}`,
      view_cmdr: false,
      counter_areas: [{used_colors: []}],
      used_colors: []
    }
  },
  computed: {
    player_count () {
      return this.$store.state.lifetracker.player_count
    },
    trigger_reset () {
      return this.$store.state.lifetracker.trigger_reset
    }
  },
  watch: {
    'player_count' (to, from) {
      // re-initialize cmd dmg counters when player count changes
      this.used_colors = []
      this.counter_areas = [{used_colors: []}]
    },
    'trigger_reset' () {
      this.used_colors = []
      this.counter_areas = [{used_colors: []}]
    },
  },
  methods: {
    changeLife: function(increment, down) {
      this.sectionData.life = down
        ? this.sectionData.life - increment
        : this.sectionData.life + increment
    },
    editNameToggle: function() {
      this.editNameMode = !this.editNameMode
      if (!this.name) this.name = `Player ${this.sectionData.id + 1}`
    },
    toggleCmdrDmg: function() {
      this.view_cmdr = !this.view_cmdr
    },
    addPlayerCounter: function(color) {
      this.used_colors.push(color)
      const used_colors = []
      this.used_colors.forEach(item => {
        used_colors.push(item)
      })
      if (this.counter_areas.length < (this.player_count - 1))
        this.counter_areas.push({used_colors: used_colors})
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-name-form {
    background: #000;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.95;
    text-align: center;
    z-index: 1000;
    span {
      color: #fdfdfd;
    }
  }

  .header-row {
    font-size: 14px;
  }
  @media (min-width: 768px) {
    .header-row {
      font-size: 24px;
    }
  }
  .header-row button {
    font-size: 10px;
  }
  @media (min-width: 768px) {
    .header-row button {
      font-size: 20px;
    }
  }
  .counter-area {
    background: #efefef;
    border-left: 1px solid #333;
    border-bottom: 1px solid #333;
    border-radius: 0 0 0 1rem;
    padding-left: 2rem;
    position: absolute;
    top: 0;
    right: -72px;
    transition: right 0.3s ease;

    &.active {
      right: 0;
    }
    i {
      cursor: pointer;
      padding: 0.6rem 0.6rem 1rem;
      width: 42px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  @media (min-width: 768px) {
    .counter-area {
      right: -167px;
      padding-left: 3rem;
      i {
        padding: 0.6rem 0.6rem 2rem;
      }
    }
  }
  .counter-sections {
    width: 71px;
  }
  @media (min-width: 768px) {
    .counter-sections {
      width: 155px;
      max-height: 216px;
      overflow-y: scroll;
    }
  }
  .align-content {
    cursor: pointer;
    font-size: 124px;
    line-height: 1.0;
  }
  @media (min-width: 768px) {
    .align-content {
      font-size: 158px;
    }
  }
  .life-section {
    transition: transform 0.3s;
    position: relative;
    overflow: hidden;
  }
  .double-col-row > section > span {
    padding-right: 1.5rem;
  }
  button.up {
    border: 1px solid green;
  }
  button.down {
    border: 1px solid red;
  }
  button.up-big {
    border: 3px solid green;
  }
  button.down-big {
    border: 3px solid red;
  }
  button {
    font-size: 16px;
    background-color: #fff;
    margin: 0.15em;
    padding: 0.5em;
    border-radius: 0.25em;
  }
  @media (min-width: 768px) {
    button {
      font-size: 26px;
      background-color: #fff;
      padding: 0.75em;
      border-radius: 0.25em;
    }
  }
</style>
