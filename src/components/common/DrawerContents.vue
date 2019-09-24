<template>
  <div class="text-blue-600 drawer-menu">
    <ul>
      <li>
        <router-link to="/">Gallery</router-link>
      </li>
      <li>
        <router-link to="/decks">Decks</router-link>
      </li>
      <li>
        <router-link to="/post/1">Post</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DrawerContents'
}
</script>

<style scoped>

li > a {
  display: block;
  padding: 10px;
  cursor: pointer;
}
</style>
