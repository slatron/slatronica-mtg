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
      class="show-controls-button"
      @click="toggleControls()"
    >
      &nbsp;
    </button>

    <section
      class="extra-admin-controls"
      :class="{'active': show_admin}"
    >
      <!-- START EDITION CONTROLS -->
      <button
        v-show="!editions.length && !editions_loading"
        class="show-editions-button"
        @click="showEdition()"
      >
        Set version
      </button>
      <div
        v-show="editions_loading"
        class="edition-loading-msg"
      >
        loading...
      </div>
      <section
        class="edition-select-bg"
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
      <!-- END EDITION CONTROLS -->

      <!-- START CATEGORY CONTROLS -->
      <section class="category-select-bg">
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
      <!-- END CATEGORY CONTROLS -->
    </section>
  </div>
</template>

<script>
import AddSolid from '@/components/icons/add-solid'
import MinusSolid from '@/components/icons/minus-solid'
import IconBase from '@/components/common/IconBase'
import api from '@/api/api'
import { tools } from '@/utils/MStools'
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
      editions_loading: false,
      show_admin: true
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
    },
    base_alter_list_ids () {
      return tools().pluck(this.$store.state.deck.base_alter_list, 'scryfall_id')
    }
  },
  methods: {
    toggleControls: function() {
      this.show_admin = !this.show_admin
    },
    setEdition: function(new_edition) {
      const options = {
        'card_id': this.card._id,
        'category': this.card.category,
        'new_edition': new_edition,
        'update_data': {
          'scryfall_id': new_edition.id,
          'has_alter': this.base_alter_list_ids.some(id => this.card.id === id)
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
    showEdition: async function() {
      this.editions_loading = true
      let vm = this
      try {
        vm.editions = await api.get_card_editions(this.card.prints_search_uri)
      } catch (e) {
        console.warn(e)
      } finally {
        this.editions_loading = false
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

  // EXTRA ADMIN CONTROLS
  .show-controls-button {
    font-size: 16px;
    font-weight: bold;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    color: #000;
    background: #f5cece;
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0 0.4em;
    position: absolute;
    left: 230px;
    top: 260px;
  }
  .extra-admin-controls {
    text-align: left;
    position: absolute;
    width: 140px;
    left: 250px;
    top: 290px;
    transition: all 0.5s ease;

    &.active {
      left: 95px;
      text-align: right;
    }
  }

  .edition-select-bg {
    color: #000;
    font-size: 11px;
    min-width: 100px;
  }
  .edition-loading-msg {
    border: 1px solid black;
    background-color: pink;
    color: #000;
  }
  .show-editions-button {
    background-color: #fafafa;
    border: 1px solid black;
    border-radius: 0.2em;
    color: #000;
    font-size: 11px;
    min-width: 100px;
  }

  .category-select-bg {
    width: 140px;
    height: 35px;
    padding: 0.3em;
    margin-top: 0.5em;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    border-left: 2px solid #000;
    border-bottom: 5px solid #000;
    background: #fff;
    border-radius: 1rem;
    font-size: 13px;
    color: #000;
    font-weight: bold;
  }
</style>
