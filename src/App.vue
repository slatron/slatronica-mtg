<template>
  <div id="app">
    <!--
    How To Router
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <h1>Slatronica Alters</h1>
    <router-view/>
    <footer>
      <p>alters by mike slater</p>
    </footer>
  </div>
</template>

<style lang="scss">
body {
  background: #000;
  text-align: center;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #487cb1;
}

h1 {
  font-size: 48px;
}

img {
  width: 100%;
}

#nav {}

footer p {
  font-size: 10px;
  margin-right: 2em;
  text-align: right;
}
</style>
