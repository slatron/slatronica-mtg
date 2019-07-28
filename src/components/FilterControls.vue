<template lang="html">
  <div class="filter-controls">
    <fieldset>
      <label><b>View</b> :</label>
      <span
        v-for="option in tag_options"
        v-bind:key="option"
      >
        <input
          type="checkbox"
          :id="option"
          :value="option"
          v-model="tagsSelected"
          v-on:click="applyFilters()" />
        <label :for="option">{{option}}</label>
      </span>
    </fieldset>
    <fieldset>
      <label><b>Sort By</b>: </label>
      <button
        v-on:click="sortBy('Aname')"
        type="button"
        v-bind:class="{'active': activeSort === 'Aname'}"
      >Title - Asc</button>
      <button
        v-on:click="sortBy('Dname')"
        type="button"
        v-bind:class="{'active': activeSort === 'Dname'}"
      >Title - Desc</button>
      <button
        v-on:click="sortBy('Adate')"
        type="button"
        v-bind:class="{'active': activeSort === 'Adate'}"
      >Date - Asc</button>
      <button
        v-on:click="sortBy('Ddate')"
        type="button"
        v-bind:class="{'active': activeSort === 'Ddate'}"
      >Date - Desc</button>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'FilterControls',
  data: () => {
    return {
      activeSort: '',
      tagsSelected: []
    };
  },
  created: function() {
    this.tagsSelected = this.$store.state.app_settings.tag_options.map(option => {
      return option;
    });
  },
  computed: {
    tag_options() {
      return this.$store.state.app_settings.tag_options;
    },
  },
  methods: {
    applyFilters: function() {
      this.$store.commit('applyFilters', {'filters': this.tagsSelected});
    },
    sortBy: function(type) {
      this.activeSort = type;
      let options = {
        field: type.slice(1),
        direction: type[0] === 'A'
      }
      this.$store.commit('sortGallery', options);
    }
  }
}
</script>

<style scoped>
button.active {
  background: #222;
  color: #ddd;
}
</style>
