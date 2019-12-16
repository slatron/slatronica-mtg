<template>
  <div
    class="card-container py-1 text-lg"
    v-on:mouseover="show(true)"
    v-on:mouseout="show(false)"
  >
    <div
      class="card-title"
    >
      {{cardData.quantity || 1}} | {{title}}
      <span
        class="inline-block md:invisible text-gray-600 border-gray-500 hover:text-white hover:border-white">
        <icon-base icon-name="view-show"><ViewShow /></icon-base>
      </span>
    </div>
    <div class="card-hover"
      v-show="visible"
    >
      <DeckCardControls
        v-if="user_can_edit"
        v-bind:card="cardData"
      />
      <span
        v-on:click="show(false)"
        class="button-close"
      >
        <icon-base icon-name="close-outline"><CloseOutline /></icon-base>
      </span>
      <img
        :src="imgUrl"
        v-if="!(cardData.has_alter)"
      >
      <div
        class="flip-container"
        v-if="cardData.has_alter"
      >
        <FlipCard
          v-bind:key="cardData.custom_name"
          v-bind:card-data="cardData"
          v-bind:gallery-list="false"
        ></FlipCard>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/common/IconBase'
import ViewShow from '@/components/icons/view-show'
import CloseOutline from '@/components/icons/close-outline'
import FlipCard from '@/components/common/FlipCard'
import DeckCardControls from '@/components/deck/DeckCardControls'

export default {
  name: 'ListCard',
  props: {
    cardData: Object
  },
  components: {
    IconBase,
    ViewShow,
    CloseOutline,
    FlipCard,
    DeckCardControls
  },
  data: function() {
    let imgUrl = (this.cardData.layout === 'transform')
      ? this.cardData.card_faces[0].image_uris.normal
      : this.cardData.image_uris.border_crop
    return {
      title: this.cardData.custom_name || this.cardData.name,
      imgUrl: imgUrl,
      visible: false
    };
  },
  computed: {
    user_can_edit () {
      return this.$store.state.username !== ''
    }
  },
  methods: {
    show: function(visible) {
      this.visible = visible
    }
  }
}
</script>

<style scoped>
  .card-container {
    position: relative;
    cursor: pointer;
  }
  .card-hover {
    position: absolute;
    left: 10px;
    z-index: 100;
    width: 300px;
  }
  .button-close {
    position: absolute;
    top: -7px;
    right: -7px;
    color: #fff;
    background-color: #000;
    z-index: 1000;
  }
  @media (min-width: 768px) {
    .button-close {
      display: none;
    }
  }
  .flip-container {
    position: relative;
    top: -15px;
  }
</style>
