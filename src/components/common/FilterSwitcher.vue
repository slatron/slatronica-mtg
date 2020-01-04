<template lang="html">
  <!-- Select Filter Based On Router -->
  <div>
    <GalleryFilters v-if="page_name === 'GalleryPage'" />
    <DeckFilters v-if="page_name === 'DeckPage'" />
    <LifeTrackerMenu v-if="page_name === 'LifeTracker'" />
  </div>
</template>

<script>
import GalleryFilters from '@/components/gallery/GalleryFilters'
import DeckFilters from '@/components/deck/DeckFilters'
import LifeTrackerMenu from '@/components/life_tracker/LifeTrackerMenu'

export default {
  name: 'FilterSwitcher',
  components: {
    GalleryFilters,
    DeckFilters,
    LifeTrackerMenu
  },
  data () {
    return {
      page_name: this.$route.name
    }
  }
}
</script>
