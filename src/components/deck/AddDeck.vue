<template>
  <form v-on:submit.prevent="addNewDeck">
    <fieldset>
      <label for="scryfall_id">Name</label>
      <input type="text" name="name" v-model="name">
    </fieldset>
    <fieldset class="text-right">
      <button type="button" name="button" v-on:click="addNewDeck()">
        Save
      </button>
    </fieldset>
    <fieldset class="error-msg" v-if="msg.length">
      <span v-on:click="removeMsg()">{{msg}}</span>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'addNewDeck',
  data: () => {
    return {
      name: '',
      msg: ''
    }
  },
  methods: {
    closeForm: function () {
      this.$store.commit('triggerAdd')
    },
    addNewDeck: function() {
      const newDeck = {
        name: this.name,
      }
      this.$store.dispatch('addNewDeck', {
        'new_deck': newDeck
      })
      this.closeForm()
      this.name = ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
  input {
    width: 100%;
  }
</style>
