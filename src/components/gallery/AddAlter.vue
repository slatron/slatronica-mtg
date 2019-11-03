<template>
  <div class="add-alter-container" v-show="open_form">
    <div
      class="window-shade"
      v-on:click="closeAlterForm()"
    ></div>
    <div class="add-alterform z-20">
      <form v-on:submit.prevent="addCard">
        <h2>Add New Alter</h2>
        <fieldset>
          <label for="scryfall_id">Scryfall ID</label>
          <input type="text" name="scryfall_id" v-model="scryfall_id">
        </fieldset>
        <fieldset>
          <label for="scryfall_id">Name</label>
          <input type="text" name="name" v-model="name">
        </fieldset>
        <fieldset>
          <label for="scryfall_id">Date</label>
          <input type="text" name="date" v-model="date">
        </fieldset>
        <fieldset>
          <label for="scryfall_id">Tags</label>
          <input type="text" name="tags" v-model="tags">
        </fieldset>
        <fieldset class="text-right">
          <button type="button" name="button" v-on:click="addCard()">
            Save
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'addAlter',
  data: () => {
    return {
      scryfall_id: '',
      name: '',
      date: '',
      tags: []
    }
  },
  computed: {
    open_form () {
      return this.$store.state.add_click
    }
  },
  methods: {
    closeAlterForm: function () {
      this.$store.commit('triggerAdd')
    },
    addCard: function() {
      const newAlter = {
        scryfall_id: this.scryfall_id,
        name: this.name,
        date: this.date,
        tags: this.tags
      }
      let vm = this
      api.post_gallery(newAlter)
        .then(function(response) {
          console.log('post_gallery_response: ', response)
        })
        .catch(function(error) {
          console.warn(error)
        })
        .finally(function() {
          vm.$store.commit('triggerAdd')
        })
    }
  }
}
</script>

<style lang="css" scoped>
  h2 {
    font-size: 24px;
    margin-bottom: 0.5em;
  }
  .add-alter-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .add-alterform {
    padding: 0.5em;
    background: #efefef;
    border-radius: 0 1rem 1rem 0;
    position: fixed;
    top: 140px;
    left: 10%;
    right: 10%;
  }
  @media (min-width: 768px) {
    .add-alterform {
      margin: 0 auto;
      max-width: 400px;
      left: auto;
      right: auto;
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
</style>
