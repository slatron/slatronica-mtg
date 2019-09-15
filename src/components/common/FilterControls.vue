<template lang="html">
  <!-- Select Filter Based On Router -->
  <div>
    <GalleryFilters v-if="page_name === 'GalleryPage'"/>
    <DeckFilters v-if="page_name === 'DeckPage'"/>
  </div>
</template>

<script>
import GalleryFilters from '@/components/gallery/GalleryFilters'
import DeckFilters from '@/components/deck/DeckFilters'

export default {
  name: 'FilterControls',
  components: {
    GalleryFilters,
    DeckFilters
  },
  data() {
    return {
      page_name: this.$route.name
    }
  }
}
</script>
