<template lang="html">
  <div class="filter-controls text-xs">
    <fieldset>
      <div class="block">
        <label>Deck</label>
      </div>
      <div>
        <select v-model="deck_current">
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
        <input type="radio" id="has_color" value="includes" v-model="includes" v-on:change="filterDeckByColor(color_options)">
        <label for="has_color">Includes</label>
        <input type="radio" id="not_color" value="excludes" v-model="includes" v-on:change="filterDeckByColor(color_options)">
        <label for="not_color">Excludes</label>
      </div>
      <div>
        <span v-for="color in color_options">
          <input v-on:change="filterDeckByColor(color_options)" :id="`c_${color.short}`" type="checkbox" v-model="color.selected" />
          <label :for="`c_${color.short}`">{{ color.short }}</label>
        </span>
      </div>
    </fieldset>
    <fieldset>
      <div class="css-grid">
        <div class="grid-left">
          <input id="custom_categories" type="checkbox" v-model="use_custom_categories">
          <label for="custom_categories">
            Custom Categories
          </label>
        </div>
        <div class="grid-right">
          <label>Sort:</label>
          <select v-model="deck_sort_by">
            <option
              v-for="option in ['cmc', 'name']"
              v-bind:value="option">
              {{option}}
            </option>
          </select>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'DeckFilters',
  data () {
    return {
      deck_lists: this.$store.state.deck.deck_lists,
      includes: 'includes', // values: ['includes', 'excludes']
      color_options: this.$store.state.app_settings.color_options.map(option => {
        option.selected = true
        return option
      })
    }
  },
  computed: {
    deck_sort_by: {
      get: function() {
        return this.$store.state.deck.deck_sort_by
      },
      set: function(new_sort_by) {
        this.$store.commit('setSortBy', new_sort_by)
      }
    },
    deck_current: {
      get: function () {
        return this.$store.state.deck.deck_current
      },
      set: function (new_deck_current) {
        this.$store.dispatch('selectDeck', {
          'deck': new_deck_current
        })
      }
    },
    use_custom_categories: {
      get: function() {
        return this.$store.state.deck.use_custom_categories
      },
      set: function(use_custom_categories) {
        this.$store.commit('setUseCustomCategories', use_custom_categories)
      }
    }
  },
  methods: {
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
.css-grid {
  display: grid;
  grid-template: 1fr / 1fr;
}
.grid-left {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  padding-right: 10px;
  font-size: 9px;
}
.grid-right {
  padding-left: 10px;
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}
label {
  @apply mr-2 font-medium text-gray-300;
}
select {
  color: #000;
}
fieldset {
  margin: 1em 0 1em 1em;
  display: block;
}
</style>
