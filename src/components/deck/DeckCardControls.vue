<template>
  <div class="deck-card-controls">
    <section
      class="quantity-controls-bg"
      :class="{'hover-green': quantity_color_green, 'hover-red': quantity_color_red}"
    />
    <button
      class="add-icon"
      type="button"
      name="button"
      @click="addQuantity()"
    >
      <icon-base
        :width="28"
        :height="28"
        @mouseover.native="upHover(true)"
        @mouseleave.native="upHover(false)"
      >
        <AddSolid />
      </icon-base>
    </button>
    <button
      class="remove-icon"
      type="button"
      name="button"
      @click="subtractQuantity()"
    >
      <icon-base
        :width="28"
        :height="28"
        @mouseover.native="downHover(true)"
        @mouseleave.native="downHover(false)"
      >
        <MinusSolid />
      </icon-base>
    </button>

    <button
      v-show="!editions.length && !editions_loading"
      @click="showEdition()"
      class="show-editions-button"
    >
      Set version
    </button>

    <div
      class="loading-msg"
      v-show="editions_loading"
    >
      loading...
    </div>

    <section
      class="edition-select-bg"
      v-show="!card.has_alter"
    >
      <section
        v-show="editions.length"
        class="edition-select"
      >
        <select
          v-model="edition_selected"
          @change="setEdition(edition_selected)"
        >
          <option
            v-for="(edition, idx) in editions"
            :key="idx"
            :value="edition"
          >
            {{ edition.set_name }}
          </option>
        </select>
      </section>
    </section>

    <section class="category-select-bg" />
    <section class="category-select">
      <select v-model="custom_category_selected">
        <option
          v-for="(category, idx) in custom_categories"
          :key="idx"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </section>

  </div>
</template>

<script>
import AddSolid from '@/components/icons/add-solid'
import MinusSolid from '@/components/icons/minus-solid'
import IconBase from '@/components/common/IconBase'
import api from '@/api/api'
export default {
  name: 'DeckCardControls',
  components: {
    AddSolid,
    MinusSolid,
    IconBase
  },
  props: {
    card: { 'type': Object, default: {} }
  },
  data () {
    return {
      quantity_color_green: false,
      quantity_color_red: false,
      custom_categories: this.$store.state.app_settings.custom_categories,
      editions: [],
      edition_selected: {},
      editions_loading: false
    }
  },
  computed: {
    custom_category_selected: {
      get: function () {
        return this.card.custom_category
      },
      set: function (new_category) {
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
    setEdition: function(new_edition) {
      const options = {
        'card_id': this.card._id,
        'category': this.card.category,
        'new_edition': new_edition,
        'update_data': {
          'scryfall_id': new_edition.id
        }
      }
      this.$store.dispatch('updateDeckCard', options)
    },
    upHover: function (on) {
      this.quantity_color_green = on
    },
    downHover: function (on) {
      this.quantity_color_red = on
    },
    addQuantity: function () {
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
    subtractQuantity: function () {
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
    },
    showEdition: function() {
      this.editions_loading = true
      let vm = this
      api.get_card_editions(this.card.prints_search_uri)
        .then(editions => {
          vm.editions = editions.data.data
          vm.edition_selected = vm.editions.find(card => card.id === vm.card.id)
        })
        .catch(err => console.warn(err))
        .finally(() => this.editions_loading = false)
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
    top: 320px;
    left: 95px;
    width: 140px;
    height: 35px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    border-left: 2px solid #000;
    border-bottom: 5px solid #000;
    background: #fff;
    border-radius: 1rem;
  }
  .category-select {
    position: absolute;
    background: #fff;
    top: 327px;
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

  .edition-select-bg {
    position: absolute;
    color: #000;
    top: 295px;
    left: 0;
    font-size: 11px;
    min-width: 100px;
  }

  .loading-msg {
    border: 1px solid black;
    background-color: pink;
    position: absolute;
    color: #000;
    top: 295px;
    left: 0;
  }

  .show-editions-button {
    background-color: #fafafa;
    border: 1px solid black;
    border-radius: 0.2em;
    position: absolute;
    color: #000;
    top: 295px;
    left: 0;
    font-size: 11px;
    min-width: 100px;
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
