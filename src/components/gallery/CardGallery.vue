<template>
  <div class="grid-container">
    <AddAlter/>
    <div
      class="window-shade"
      v-show="page_loading"
    ></div>
    <div
      class="image-container text-blue-500 tracking-wide"
      v-for="card in gallery_list"
      v-show="card.visible"
    >
      <FlipCard
        v-bind:key="card.scryfall_id"
        v-bind:card-data="card"
        v-bind:gallery-card="true"
      ></FlipCard>
    </div>
  </div>
</template>

<script>
import FlipCard from '@/components/common/FlipCard'
import AddAlter from '@/components/gallery/AddAlter'

export default {
  name: 'CardGallery',
  data () {
    return {
      'params': this.$route.params
    }
  },
  components: {
    FlipCard,
    AddAlter
  },
  computed: {
    gallery_list () {
      return this.$store.state.gallery_list
    },
    page_loading () {
      return this.$store.state.page_loading
    }
  },
  created: function () {
    if (!this.gallery_list.length) {
      debugger;
      this.$store.dispatch('initGallery');
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
