<template lang="html">
  <div class="filter-controls text-xs">
    <fieldset>
      <div class="block">
        <label>Deck</label>
      </div>
      <div>
        <select
          v-model="deck_current"
          v-on:change="selectDeck()">
          <option
            v-for="deck in deck_lists"
            v-bind:value="deck">
            {{deck.name}}
          </option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <div class="has_color">
        <span class="text-blue-400">Color Filter: </span>
        <input type="radio" id="has_color" value="includes" v-model="includes" v-on:change="filterDeckByColor(color_options)" >
        <label for="has_color">Includes</label>
        <input type="radio" id="not_color" value="excludes" v-model="includes" v-on:change="filterDeckByColor(color_options)" >
        <label for="not_color">Excludes</label>
      </div>
      <div>
        <span
          v-for="color in color_options"
        >
          <input v-on:change="filterDeckByColor(color_options)" :id="`c_${color.short}`" type="checkbox" v-model="color.selected" />
          <label :for="`c_${color.short}`">{{ color.short }}</label>
        </span>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'DeckFilters',
  data () {
    return {
      deck_lists: this.$store.state.deck_lists,
      deck_current: this.$store.state.deck_current,

      includes: 'includes', // values: ['includes', 'excludes']
      color_options: this.$store.state.app_settings.color_options.map(option => {
        option.selected = true
        return option
      })
    }
  },
  methods: {
    selectDeck: function () {
      this.$store.dispatch('selectDeck', {
        'deck': this.deck_current
      })
    },
    filterDeckByColor: function (color_options) {
      this.$store.commit('filterDeckByColor', {
        'filter_type': 'color',
        'color_options': color_options.filter(color => color.selected),
        'includes': this.includes
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
