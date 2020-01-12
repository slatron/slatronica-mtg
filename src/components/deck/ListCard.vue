<template>
  <div
    class="card-container py-1"
    @mouseover="show(true)"
    @mouseout="show(false)"
  >
    <div class="card-heading">
      <span class="card-quantity">{{ cardData.quantity || 1 }}</span>
      <span class="card-title">{{ title }}</span>
      <span
        class="mana-cost"
        v-html="$options.filters.cmcDisplay(cardData.mana_cost)"
      />
    </div>
    <div
      v-show="visible"
      class="card-hover"
    >
      <DeckCardControls
        v-if="user_can_edit"
        :card="cardData"
      />
      <span
        class="button-close"
        @click="show(false)"
      >
        <icon-base icon-name="close-outline"><CloseOutline /></icon-base>
      </span>
      <span
        v-show="cardData.prices.usd"
        class="price-tag"
      >
        {{ cardData.prices.usd | formatCurrency }}
      </span>
      <img
        v-if="!(cardData.has_alter)"
        :src="imgUrl"
      >
      <div
        v-if="cardData.has_alter"
        class="flip-container"
      >
        <FlipCard
          :key="cardData.custom_name"
          :card-data="cardData"
          :gallery-list="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/common/IconBase'
import CloseOutline from '@/components/icons/close-outline'
import FlipCard from '@/components/common/FlipCard'
import DeckCardControls from '@/components/deck/DeckCardControls'
import { tools } from '@/utils/MStools'

export default {
  name: 'ListCard',
  components: {
    IconBase,
    CloseOutline,
    FlipCard,
    DeckCardControls
  },
  filters: {
    cmcDisplay: function (text) {
      const symbolList = text.split('{').join('').split('/').join('').split('}')
      symbolList.pop()
      const htmlIcons = symbolList.map(symbol => `<i class="ms ms-${symbol.toLowerCase()} ms-cost ms-shadow"></i>`)
      return htmlIcons.join('')
    },
    formatCurrency: (text) => {
      return tools().formatCurrency(text)
    }
  },
  props: {
    cardData: { 'type': Object, 'default': {} }
  },
  data: function () {
    let imgUrl = (this.cardData.layout === 'transform')
      ? this.cardData.card_faces[0].image_uris.normal
      : this.cardData.image_uris.border_crop
    return {
      title: this.cardData.custom_name || this.cardData.name,
      imgUrl: imgUrl,
      visible: false
    }
  },
  computed: {
    user_can_edit () {
      return this.$store.state.auth.username !== ''
    }
  },
  methods: {
    show: function (visible) {
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
    left: 15px;
    z-index: 100;
    width: 250px;
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
  .price-tag {
    position: absolute;
    top: 330px;
    left: 0;
    color: green;
    background-color: #fff;
    border-bottom: solid 5px green;
    border-left: solid 5px green;
    padding-right: 0.5em;
    z-index: 1000;
    border-radius: 0 0.25em 0 0.25em;
  }
  .flip-container {
    position: relative;
    top: -15px;
  }
  .card-heading {
    display: flex;
    align-items: center;
  }
  .card-quantity {
    min-width: 22px;
  }
  .card-title {
    flex-grow: 2;
    padding-right: 5px;
  }
  .mana-cost {
    font-size: 10px;
  }
</style>
