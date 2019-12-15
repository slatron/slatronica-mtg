<template>
  <form v-on:submit.prevent>
    <fieldset>
      <label for="deck_name_field">Deck Name</label>
      <input type="text" name="deck_name_field" v-model="deck_name">
    </fieldset>
    <fieldset>
      <label for="format_type_field">Deck Format</label>
      <select v-model="deck_format" id="format_type_field">
        <option
          v-for="format_type in ['EDH', 'Modern', 'Cube', 'Cube Draft', 'None']"
          v-bind:value="format_type">
           {{format_type}}
        </option>
      </select>
    </fieldset>
    <fieldset class="text-right">
      <button type="button" name="button" v-on:click="updateDeck()">
        Save
      </button>
    </fieldset>
    <fieldset>
      <button v-on:click="deleteDeck">
        <icon-base icon-name="trash-icon"><TrashIcon /></icon-base>
      </button>
    </fieldset>
  </form>
</template>

<script>
import IconBase from '@/components/common/IconBase'
import TrashIcon from '@/components/icons/trash'

export default {
  name: 'editDeck',
  components: {
    IconBase,
    TrashIcon
  },
  data () {
    return {
      msg: '',
      deck_name: this.$store.state.deck_current.name || 'enter name',
      deck_format: this.$store.state.deck_current.format || 'EDH'
    }
  },
  methods: {
    closeForm: function () {
      this.$store.commit('triggerAdd')
    },
    updateDeck: function() {
      debugger
      const updateData = {
        name: this.deck_name,
        format: this.deck_format
      }
      this.$store.dispatch('updateDeck', updateData)
      this.closeForm()
      this.name = ''
    },
    deleteDeck: function() {
      if (window.confirm('This will permanently delete the current deck. Proceed?')) {
        this.$store.dispatch('deleteDeck')
      }
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
