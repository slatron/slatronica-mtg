<template>
  <div class="deck-page">
    <DeckList />
  </div>
</template>

<script>
import DeckList from '@/components/deck/DeckList.vue'

export default {
  name: 'DeckPage',
  components: {
    DeckList
  }
}
</script>
