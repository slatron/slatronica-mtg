<template lang="html">
  <div class="filter-controls">
    <fieldset>
      <label>View</label>
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
      <label>Sort By</label>
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
  @apply mr-2 font-medium;
}
button {
  @apply outline-none bg-gray-800 text-gray-200 cursor-pointer px-2 py-1;
}
select {
  @apply text-black;
}

fieldset {
  @apply my-2;
}
</style>
