<template>
  <div
    :class="{'flip': sectionData.flip}"
    class="full-height-layout life-section"
  >
    <div class="align-row align-header">
      {{ sectionData.name }}
    </div>
    <div
      class="align-row align-content centered"
      @click="changeLife(1, true)"
    >
      {{ sectionData.life }}
    </div>
    <div class="align-row double-col-row">
      <section>
        <button @click="changeLife(1, true)">
          -1
        </button>
        <button @click="changeLife(5, true)">
          -5
        </button>
      </section>
      <section>
        <button @click="changeLife(5, false)">
          +5
        </button>
        <button @click="changeLife(1, false)">
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
  methods: {
    changeLife: function(increment, down) {
      this.sectionData.life = down
        ? this.sectionData.life - increment
        : this.sectionData.life + increment
    }
  }
}
</script>

<style lang="scss" scoped>
.align-content {
  cursor: pointer;
  font-size: 72px;
}
@media (min-width: 768px) {
  .align-content {
    font-size: 128px;
  }
}
.life-section {
  transition: transform 0.3s;
}
button {
  font-size: 18px;
  background-color: #fff;
  margin: 0.25em;
  padding: 0.25em;
  border-radius: 0.25em;
  outline: none;
}
@media (min-width: 768px) {
  button {
    font-size: 36px;
    background-color: #fff;
    padding: 0.5em;
    border-radius: 0.25em;
    outline: none;
  }
}

</style>
