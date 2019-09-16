<template>
  <div class="drawer-menu">
    <ul>
      <li>
        <router-link to="/">Gallery</router-link>
      </li>
      <li>
        <router-link to="/decks">Decks</router-link>
      </li>
      <li>
        <a v-on:click="toggleDrawer()">Close Menu</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DrawerContents',
  methods: {
    toggleDrawer: function() {
      this.$store.commit('toggleDrawer')
    }
  }
}
</script>

<style scoped>
.drawer-menu {
  border: 3px solid #3182ce;
}

li > a {
  display: block;
  padding: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
}
</style>
