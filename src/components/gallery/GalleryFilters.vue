<template lang="html">
  <div class="filter-controls text-xs">
    <fieldset>
      <div class="block">
        <label>View</label>
      </div>
      <div>
        <select
          v-model="filter_selected"
          @change="applyFilter()"
        >
          <option
            v-for="option in tag_options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <label class="block">Sort By</label>
      <button
        type="button"
        class="w-12"
        @click="toggleSortField()"
      >
        {{ sort_field }}
      </button>
      <button
        type="button"
        class="w-20"
        @click="toggleSortDirection()"
      >
        {{ sort_direction }}
      </button>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'GalleryFilters',
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
    toggleSortField: function () {
      this.sort_field = this.sort_field === 'Date'
        ? 'Name' : 'Date'
      this.sortBy(this.sort_field, this.sort_direction)
    },
    toggleSortDirection: function () {
      this.sort_direction = this.sort_direction === 'Descending'
        ? 'Ascending' : 'Descending'
      this.sortBy(this.sort_field, this.sort_direction)
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
  @apply mr-2 font-medium text-gray-300;
}
button {
  @apply outline-none bg-gray-800 text-gray-200 cursor-pointer py-1 border-blue-700 border text-xs;
}
select {
  color: #000;
}

fieldset {
  margin: 1em 0 1em 1em;
  display: block;
}
</style>
