<template>
  <div class="windowshade-container">
    <div
      class="window-shade"
      @click="closeForm()"
    />
    <div class="deck-form-container z-20">
      <section class="tabs">
        <h2
          :class="{'active': active_form === 'card'}"
          @click="active_form = 'card'"
        >
          Add Card
        </h2>
        <h2
          :class="{'active': active_form === 'tokens'}"
          @click="active_form = 'tokens'"
        >
          Tokens
        </h2>
        <h2
          :class="{'active': active_form === 'deck'}"
          @click="active_form = 'deck'"
        >
          Add Deck
        </h2>
        <h2
          :class="{'active': active_form === 'edit'}"
          @click="active_form = 'edit'"
        >
          Edit Deck
        </h2>
        <h2
          :class="{'active': active_form === 'compare'}"
          @click="active_form = 'compare'"
        >
          Compare
        </h2>
      </section>
      <AddCard v-if="active_form === 'card'" />
      <TokenFinder v-if="active_form === 'tokens'" />
      <AddDeck v-if="active_form === 'deck'" />
      <EditDeck v-if="active_form === 'edit'" />
      <CompareDeck v-if="active_form === 'compare'" />
    </div>
  </div>
</template>

<script>
import AddCard from '@/components/deck/AddCard'
import AddDeck from '@/components/deck/AddDeck'
import EditDeck from '@/components/deck/EditDeck'
import CompareDeck from '@/components/deck/CompareDeck'
import TokenFinder from '@/components/deck/TokenFinder'

export default {
  name: 'DeckFormContainer',
  components: {
    AddCard,
    AddDeck,
    EditDeck,
    CompareDeck,
    TokenFinder
  },
  data: function () {
    return {
      active_form: this.$store.state.layout.form_tab
    }
  },
  methods: {
    closeForm: function () {
      this.$store.commit('toggleForm')
    },
    removeMsg: function () {
      this.msg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 12px;
    padding: 3px;
    margin-bottom: 0;
    cursor: pointer;
    &:hover {
      background-color: #dfdfdf;
    }
    &.active {
      background-color: navy;
      color: #fff;
    }
  }
  .tabs {
    display: flex;
    > h2 {
      flex-grow: 1;
      text-align: center;
    }
  }
  .windowshade-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .deck-form-container {
    padding: 0.5em;
    background: #efefef;
    border-radius: 0 1rem 1rem 0;
    position: fixed;
    top: 80px;
    left: 10%;
    right: 10%;
  }
  @media (min-width: 768px) {
    .deck-form-container {
      top: 140px;
      left: 30%;
      right: 30%;
    }
  }
</style>
