<template>
  <div class="grid-container">
    <AddAlter />
    <div
      v-show="page_loading"
      class="window-shade"
    />
    <div
      v-for="card in gallery_list"
      v-show="card.visible"
      :key="card._id"
      class="image-container text-blue-500 tracking-wide"
    >
      <FlipCard
        :key="card.scryfall_id"
        :card-data="card"
        :gallery-card="true"
      />
    </div>
  </div>
</template>

<script>
import FlipCard from '@/components/common/FlipCard'
import AddAlter from '@/components/gallery/AddAlter'

export default {
  name: 'CardGallery',
  components: {
    FlipCard,
    AddAlter
  },
  data () {
    return {
      'params': this.$route.params
    }
  },
  computed: {
    gallery_list () {
      return this.$store.state.gallery.gallery_list
    },
    page_loading () {
      return this.$store.state.layout.page_loading
    }
  },
  created: function () {
    if (!this.gallery_list.length) {
      this.$store.dispatch('initGallery')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  max-width: 1336px;
  margin: 0 auto;
  text-align: center;
}

.image-container {
  margin: 1em;
  position: relative;
  display: inline-block;
  width: 300px;
  height: 440px;
}
.window-shade {
  background-image: url('../../assets/images/loading/big-black-bg.gif');
  background-repeat: no-repeat;
  background-position: center;
}

</style>
