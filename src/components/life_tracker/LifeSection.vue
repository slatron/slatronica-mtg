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
          {{ sectionData.name }}
        </span>
        <form
          v-show="editNameMode"
          @submit.prevent
          @submit="editNameToggle()"
        >
          <input v-model="sectionData.name">
        </form>
      </section>
      <section class="counter-area centered">
        <section>
          <span
            v-show="!editCounterNameMode"
            class=""
            @click="editCounterNameToggle()"
          >
            {{ sectionData.counter_name }}
          </span>
          <form
            v-show="editCounterNameMode"
            @submit.prevent
            @submit="editCounterNameToggle()"
          >
            <input v-model="sectionData.counter_name">
          </form>
        </section>
        <section>
          <button
            class="down"
            @click="changeCounter(false)"
          >
            -1
          </button>
          {{ sectionData.counters }}
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
      editCounterNameMode: false
    }
  },
  methods: {
    changeLife: function(increment, down) {
      this.sectionData.life = down
        ? this.sectionData.life - increment
        : this.sectionData.life + increment
    },
    changeCounter: function(up) {
      this.sectionData.counters = up
        ? this.sectionData.counters + 1
        : this.sectionData.counters - 1
    },
    editNameToggle: function() {
      this.editNameMode = !this.editNameMode
      if (!this.sectionData.name) this.sectionData.name = `Player ${this.sectionData.id + 1}`
      if (this.editNameMode) this.sectionData.name = ''
    },
    editCounterNameToggle: function() {
      this.editCounterNameMode = !this.editCounterNameMode
      if (!this.sectionData.counter_name) this.sectionData.counter_name = `Cmd Dmg`
      if (this.editCounterNameMode) this.sectionData.counter_name = ''
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: inline-block;
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
  display: flex;
  flex-flow: column;
  height: 100%;
}
@media (min-width: 768px) {
  .counter-area {
    flex-flow: row;
    section:nth-child(2) {
      flex-grow: 0
    }
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
