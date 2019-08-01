<template lang="html">
  <div class="filter-controls">
    <fieldset>
      <label><b>View</b></label>
      <select
        v-model="filter_selected"
        v-on:change="applyFilter()">
        <option
          v-for="option in tag_options"
          v-bind:value="option.value">
          {{option.name}}
        </option>
      </select>
    </fieldset>
    <fieldset>
      <label><b>Sort By</b></label>
      <button
        v-on:click="toggleSortField()"
        type="button"
      >{{sort_field}}</button>
      <button
        v-on:click="toggleSortDirection()"
        type="button"
      >{{sort_direction}}</button>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'FilterControls',
  data () {
    return {
      tag_options: this.$store.state.app_settings.tag_options,
      filter_selected: 'All',
      sort_direction: 'Descending',
      sort_field: 'Date'
    }
  },
  methods: {
    applyFilter: function () {
      this.$store.commit('applyFilter', {
        'filter': this.filter_selected,
        'field': this.sort_field.toLowerCase(),
        'direction': this.sort_direction === 'Ascending'
      })
    },
    toggleSortField: function() {
      this.sort_field = this.sort_field === 'Date' ?
        'Name' : 'Date';
      this.sortBy(this.sort_field, this.sort_direction);
    },
    toggleSortDirection: function() {
      this.sort_direction = this.sort_direction === 'Descending' ?
        'Ascending' : 'Descending';
      this.sortBy(this.sort_field, this.sort_direction);
    },
    sortBy: function (field, direction) {
      let options = {
        'field': field.toLowerCase(),
        'direction': direction === 'Ascending'
      }
      this.$store.commit('sortGallery', options)
    }
  }
}
</script>

<style scoped>
label {
  margin-right: 1em;
}
button {
  background: #222;
  color: #ddd;
  cursor: pointer;
}
</style>
