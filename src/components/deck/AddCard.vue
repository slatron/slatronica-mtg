<template>
  <div class="add-card-container" v-show="open_form">
    <div
      class="window-shade"
      v-on:click="closeForm()"
    ></div>
    <div class="add-cardform z-20">
      <form v-on:submit.prevent="addDeckCard">
        <h2>Add New Card</h2>
        <fieldset>
          <label for="scryfall_id">Scryfall ID</label>
          <input type="text" name="scryfall_id" v-model="scryfall_id">
        </fieldset>
        <fieldset>
          <label for="scryfall_id">Name</label>
          <input type="text" name="name" v-model="name">
        </fieldset>
        <fieldset>
          <label for="has_alter">Has Alter</label>
          <input type="checkbox" name="has_alter" v-model="has_alter">
        </fieldset>
        <fieldset class="text-right">
          <button type="button" name="button" v-on:click="addDeckCard()">
            Save
          </button>
        </fieldset>
        <fieldset class="error-msg" v-if="msg.length">
          <span v-on:click="removeMsg()">{{msg}}</span>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'addCard',
  data: () => {
    return {
      scryfall_id: '',
      name: '',
      has_alter: false,
      msg: ''
    }
  },
  computed: {
    open_form () {
      return this.$store.state.add_click
    }
  },
  methods: {
    closeForm: function () {
      this.$store.commit('triggerAdd')
    },
    removeMsg: function () {
      this.msg = ''
    },
    addDeckCard: function() {
      const newCard = {
        scryfall_id: this.scryfall_id,
        name: this.name,
        has_alter: this.has_alter
      }
      this.$store.dispatch('addDeckCard', {
        'card': newCard
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 24px;
    margin-bottom: 0.5em;
  }
  .add-card-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .add-cardform {
    padding: 0.5em;
    background: #efefef;
    border-radius: 0 1rem 1rem 0;
    position: fixed;
    top: 80px;
    left: 10%;
    right: 10%;
    input {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .add-cardform {
      top: 140px;
      left: 30%;
      right: 30%;
    }
  }
  input {
    float: right;
  }
  fieldset {
    margin-bottom: 0.5em;
  }
  button {
    outline: 0;
    background-color: #2d3748;
    color: #edf2f7;
    cursor: pointer;
    padding: 0.25rem;
    border-color: #2b6cb0;
    border-width: 1px;
    font-size: 0.75rem;
  }
  .error-msg {
    color: red;
    cursor: pointer;
  }
</style>
