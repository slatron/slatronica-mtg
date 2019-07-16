<template>
  <div id="app">
    <!--
    How To Router
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <header>
      <h1>Slatronica Alters</h1>
    </header>
    <main>
      <router-view/>
    </main>
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

img {
  width: 100%;
}

#nav {}

header {
  background: #000;
  position: fixed;
  top: 0;
  height: 36px;
  width: 100%;
  z-index: 1000;

  h1 {
    font-size: 24px;
    margin: 0;
    padding: 0;
  }
}

@media (min-width: 520px) {
  header {
    height: 52px;
    h1 {
      font-size: 36px;
    }
  }
}

main {
  padding-top: 36px;
}

@media (min-width: 520px) {
  main {
    padding-top: 52px;
  }
}

footer {
  background: #000;
  font-size: 10px;
  text-align: right;
  position: fixed;
  bottom: 0;
  height: 15px;
  width: 100%;
  z-index: 1000;

  p {
    margin: 0 2em 0;
    padding: 0;
  }
}

</style>
