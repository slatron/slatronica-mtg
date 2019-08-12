<template>
  <div class="gallery-page">
    <SingleGalleryCard />
  </div>
</template>

<script>
import SingleGalleryCard from '@/components/gallery/SingleGalleryCard.vue'

export default {
  name: 'SingleGalleryCardPage',
  components: {
    SingleGalleryCard
  }
}
</script>
