<template>
  <form @submit.prevent>
    <fieldset>
      <label for="deck_name_field">Deck Name</label>
      <input
        v-model="deck_name"
        type="text"
        name="deck_name_field"
      >
    </fieldset>
    <fieldset>
      <label for="format_type_field">Deck Format</label>
      <select
        id="format_type_field"
        v-model="deck_format"
      >
        <option
          v-for="(format_type, idx) in ['EDH', 'Modern', 'Cube', 'Cube Draft', 'None']"
          :key="idx"
          :value="format_type"
        >
          {{ format_type }}
        </option>
      </select>
    </fieldset>
    <fieldset class="text-right">
      <button
        type="button"
        name="button"
        @click="updateDeck()"
      >
        Save
      </button>
    </fieldset>
    <fieldset>
      <button
        v-show="can_delete"
        @click="deleteDeck"
      >
        <icon-base icon-name="trash-icon">
          <TrashIcon />
        </icon-base>
      </button>
    </fieldset>
  </form>
</template>

<script>
import IconBase from '@/components/common/IconBase'
import TrashIcon from '@/components/icons/trash'

export default {
  name: 'EditDeck',
  components: {
    IconBase,
    TrashIcon
  },
  data () {
    return {
      msg: '',
      deck_name: this.$store.state.deck.deck_current.name || 'enter name',
      deck_format: this.$store.state.deck.deck_current.format || 'EDH'
    }
  },
  computed: {
    can_delete: function () {
      return this.$store.state.deck.deck_lists.length > 1
    }
  },
  methods: {
    closeForm: function () {
      this.$store.commit('toggleForm')
    },
    updateDeck: function () {
      const updateData = {
        name: this.deck_name,
        format: this.deck_format
      }
      this.$store.dispatch('updateDeck', updateData)
      this.closeForm()
      this.name = ''
    },
    deleteDeck: function () {
      if (!this.can_delete) return false
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
