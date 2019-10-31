<template>
  <div
    v-show="false"
    class="absolute top-0 right-0 bottom-0 left-0 background-color-black text-white">
  </div>
</template>

<script>
export default {
  name: 'addAlter',
  computed: {
    open_form () {
      return this.$store.state.add_click
    }
  }
}
</script>
