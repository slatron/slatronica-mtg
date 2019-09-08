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
        display checkboxes
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
    }
  },
  methods: {
    selectDeck: function () {
      this.$store.dispatch('selectDeck', {
        'deck': this.current_deck
      })
    }
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
