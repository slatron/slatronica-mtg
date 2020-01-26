<template lang="html">
  <!-- Select Filter Based On Router -->
  <div>
    <!-- DefaultDeckPage -->
    <!-- ['GalleryPage', 'DeckPage', 'LifeTracker'].indexOf(this.$route.name) !== -1 -->
    <GalleryFilters v-if="page_name === 'GalleryPage'" />
    <DeckFilters v-if="['DeckPage', 'DefaultDeckPage'].indexOf(page_name) !== -1" />
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
