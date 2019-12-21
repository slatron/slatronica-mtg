<template>
  <div class="deck-card-controls">
    <section
      class="quantity-controls-bg"
      v-bind:class="{'hover-green': quantity_color_green, 'hover-red': quantity_color_red}"
    ></section>
    <button
      v-on:click="addQuantity()"
      class="add-icon" type="button" name="button">
      <icon-base
        v-bind:width="28"
        v-bind:height="28"
        @mouseover.native="upHover(true)"
        @mouseleave.native="upHover(false)"
      >
        <AddSolid />
      </icon-base>
    </button>
    <button
      v-on:click="subtractQuantity()"
      class="remove-icon" type="button" name="button">
      <icon-base
        v-bind:width="28"
        v-bind:height="28"
        @mouseover.native="downHover(true)"
        @mouseleave.native="downHover(false)"
      >
        <MinusSolid />
      </icon-base>
    </button>
    <section class="category-select-bg"></section>
    <section class="category-select">
      <select v-model="custom_category_selected">
        <option
          v-for="category in custom_categories"
          v-bind:value="category">
           {{category}}
        </option>
      </select>
    </section>
  </div>
</template>

<script>
import api from '@/api/api'
import AddSolid from '@/components/icons/add-solid'
import MinusSolid from '@/components/icons/minus-solid'
import IconBase from '@/components/common/IconBase'
export default {
  name: 'deckCardControls',
  components: {
    AddSolid,
    MinusSolid,
    IconBase
  },
  data() {
    return {
      quantity_color_green: false,
      quantity_color_red: false,
      custom_categories: this.$store.state.app_settings.custom_categories
    }
  },
  props: {
    card: Object
  },
  computed: {
    custom_category_selected: {
      get: function() {
        return this.card.custom_category
      },
      set: function(new_category) {
        const options = {
          'card_id': this.card._id,
          'category': this.card.category,
          'category_move': true,
          'type': this.card.type_line,
          'update_data': {
            'custom_category': new_category
          }
        }
        this.$store.dispatch('updateDeckCard', options)
      }
    }
  },
  methods: {
    upHover: function(on) {
      this.quantity_color_green = on
    },
    downHover: function(on) {
      this.quantity_color_red = on
    },
    addQuantity: function() {
      const options = {
        'card_id': this.card._id,
        'category': this.card.category,
        'count_change': 1,
        'update_data': {
          'quantity': this.card.quantity + 1
        }
      }
      this.$store.dispatch('updateDeckCard', options)
    },
    subtractQuantity: function() {
      if (this.card.quantity > 1) {
        const options = {
          'card_id': this.card._id,
          'category': this.card.category,
          'count_change': -1,
          'update_data': {
            'quantity': this.card.quantity - 1
          }
        }
        this.$store.dispatch('updateDeckCard', options)
      }
      if (this.card.quantity === 1) {
        const options = {
          'card_id': this.card._id,
          'category': this.card.category
        }
        this.$store.dispatch('removeDeckCard', options)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .deck-card-controls {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
  }
  .quantity-controls-bg {
    position: absolute;
    top: 50px;
    left: 0;
    width: 44px;
    height: 104px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    border-left: 5px solid #000;
    background: #fff;
    opacity: 0.45;
    border-radius: 0 1rem 1rem 0;
    transition: all 1s ease;
  }
  .category-select-bg {
    position: absolute;
    top: 35px;
    left: 95px;
    width: 140px;
    height: 35px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    border-left: 2px solid #000;
    border-bottom: 5px solid #000;
    background: #fff;
    opacity: 0.75;
    border-radius: 1rem;
  }
  .category-select {
    position: absolute;
    top: 41px;
    left: 105px;
    font-size: 13px;
    color: #000;
    font-weight: bold;
  }
  [class*="-icon"] {
    outline: none;
    background-color: #cdcdcd;
    position: absolute;
    color: #000;
    left: 8px;
    transition: all 1s ease;
    border-radius: 1rem;
  }
  .add-icon {
    top: 64px;
  }
  .remove-icon {
    top: 105px;
  }
  .hover-green {
    background-color: green;
  }
  .hover-red {
    background-color: red;
  }
</style>
