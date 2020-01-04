<template>
  <div class="life-section">
    {{ sectionData.name }}<br>
    {{ sectionData.life }}
    <button @click="changeLife(1, true)">
      -1
    </button>
    <button @click="changeLife(5, true)">
      -5
    </button> |
    <button @click="changeLife(5, false)">
      +5
    </button>
    <button @click="changeLife(1, false)">
      +1
    </button>
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

<style scoped>
</style>
