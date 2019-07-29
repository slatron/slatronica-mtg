<template lang="html">
  <div class="filter-controls">
    <fieldset>
      <label><b>Filter Cards</b> :</label><br>
      <span
        v-for="option in tag_options"
        v-bind:key="option"
      >
        <input
          type="checkbox"
          :id="option"
          :value="option"
          v-model="tagsSelected"
          v-on:change="applyFilters()" />
        <label :for="option">{{option}}</label><br>
      </span>
    </fieldset>
    <fieldset>
      <label><b>Sort By</b>: </label><br>
      <span
        v-for="option in sorting_options"
        v-bind:key="option.action"
      >
        <button
          v-on:click="sortBy(option.action)"
          type="button"
          v-bind:class="{'active': activeSort === option.action}"
        >{{option.name}}</button><br>
      </span>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'FilterControls',
  data() {
    return {
      activeSort: '',
      tagsSelected: this.$store.state.app_settings.tag_options.map(option => {
        return option;
      }),
      tag_options: this.$store.state.app_settings.tag_options,
      sorting_options: this.$store.state.app_settings.sorting_options
    };
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
