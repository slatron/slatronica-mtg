<template>
  <div
    :class="{'flip': sectionData.flip}"
    class="full-height-layout life-section"
  >
    <div class="double-col-row header-row align-row align-header">
      <section class="centered">
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
        class="counter-area centered"
        :class="{'active': view_cmdr}"
      >
        <section>
          <i
            class="ms ms-planeswalker ms-shadow"
            @click="toggleCmdrDmg()"
          />
          <button
            class="down"
            @click="changeCounter(false)"
          >
            -1
          </button>
          {{ counters }}
          <button
            class="up"
            @click="changeCounter(true)"
          >
            +1
          </button>
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
export default {
  name: 'LifeSection',
  props: {
    sectionData: { 'type': Object, 'default': {} }
  },
  data: function() {
    return {
      editNameMode: false,
      editCounterNameMode: false,
      name: `Player ${this.sectionData.id + 1}`,
      counters: 0,
      view_cmdr: false
    }
  },
  methods: {
    changeLife: function(increment, down) {
      this.sectionData.life = down
        ? this.sectionData.life - increment
        : this.sectionData.life + increment
    },
    changeCounter: function(up) {
      this.counters = up
        ? this.counters + 1
        : this.counters - 1
    },
    editNameToggle: function() {
      this.editNameMode = !this.editNameMode
      if (!this.name) this.name = `Player ${this.sectionData.id + 1}`
      if (this.editNameMode) this.name = ''
    },
    toggleCmdrDmg: function() {
      this.view_cmdr = !this.view_cmdr
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
    span {
      color: #fdfdfd;
    }
  }
  .header-row {
    font-size: 12px;
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
    padding: 0 5px 5px;
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 0;
    right: -76px;
    transition: right 0.5s ease;
    &.active {
      right: 0;
    }
    i {
      cursor: pointer;
      padding-right: 5px;
    }
  }
  @media (min-width: 768px) {
    .counter-area {
      right: -155px;
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
