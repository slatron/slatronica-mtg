<template>
  <div class="deck-container">
    <!-- <FilterControls /> -->
    <ListCard
      v-for="card in deck_list"
      v-bind:key="card.id"
      v-bind:card-data="card"
    ></ListCard>
  </div>
</template>

<script>
import api from '@/api/api'
import ListCard from '@/components/deck/ListCard'

export default {
  name: 'DeckView',
  components: {
    ListCard
  },
  computed: {
    deck_list () {
      return this.$store.state.deck_list
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Move this to layout for multiple pages when slider is built
.deck-container {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
