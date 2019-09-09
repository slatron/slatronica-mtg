<template lang="html">
  <div class="filter-controls text-xs">
    <fieldset>
      <div class="block">
        <label>Deck</label>
      </div>
      <div>
        <select
          v-model="current_deck"
          v-on:change="selectDeck()">
          <option
            v-for="deck in original_decks"
            v-bind:value="deck">
            {{deck.name}}
          </option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <div class="block">
        <label>Colors</label>
      </div>
      <div>
        <span
          v-for="color in color_options"
        >
          <input v-on:click="filterDeck()" :id="`c_${color.short}`" type="checkbox" v-model="color.selected" />
          <label :for="`c_${color.short}`">{{ color.short }}</label>
        </span>
      </div>
      <div class="block">
        <label>Types</label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'DeckFilters',
  data () {
    return {
      original_decks: this.$store.state.original_decks,
      current_deck: this.$store.state.current_deck,
      color_options: this.$store.state.app_settings.color_options.map(option => {
        option.selected = true
        return option
      })
    }
  },
  methods: {
    selectDeck: function () {
      this.$store.dispatch('selectDeck', {
        'deck': this.current_deck
      })
    },
    filterDeck: function () {
      this.$store.commit('filterDeck', {
        'filter_type': 'color',
        'color_options': this.color_options
      })
    },
  }
}
</script>

<style scoped>
label {
  @apply mr-2 font-medium text-gray-300;
}
select {
  @apply text-black;
}
fieldset {
  @apply mb-2 mr-2 block;
}
</style>
