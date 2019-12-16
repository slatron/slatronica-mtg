<template>
  <div class="windowshade-container">
    <div
      class="window-shade"
      v-on:click="closeForm()"
    ></div>
    <div class="deck-form-container z-20">
      <section class="tabs">
        <h2
          v-bind:class="{'active': active_form === 'card'}"
          v-on:click="active_form = 'card'"
        >
          Add New Card
        </h2>
        <h2
          v-bind:class="{'active': active_form === 'deck'}"
          v-on:click="active_form = 'deck'"
        >
          Add New Deck
        </h2>
        <h2
          v-bind:class="{'active': active_form === 'edit'}"
          v-on:click="active_form = 'edit'"
        >
          Edit Deck
        </h2>
      </section>
      <AddCard v-if="active_form === 'card'"/>
      <AddDeck v-if="active_form === 'deck'"/>
      <EditDeck v-if="active_form === 'edit'" />
    </div>
  </div>
</template>

<script>
import AddCard from '@/components/deck/AddCard'
import AddDeck from '@/components/deck/AddDeck'
import EditDeck from '@/components/deck/EditDeck'

export default {
  name: 'deckFormContainer',
  components: {
    AddCard,
    AddDeck,
    EditDeck
  },
  data: function() {
    return {
      active_form: this.$store.state.form_tab
    }
  },
  methods: {
    closeForm: function () {
      this.$store.commit('toggleForm')
    },
    removeMsg: function () {
      this.msg = ''
    },
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 14px;
    margin-bottom: 0;
    cursor: pointer;
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
