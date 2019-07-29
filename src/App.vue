<template>
  <div id="app">
    <header>
      <button class="toggle-button">☰</button>
    </header>
    <Slideout
      menu="#menu"
      panel="#panel"
      :toggleSelectors="['.toggle-button']"
      @on-open="open">
      <MenuContent></MenuContent>
      <main id="panel">
        <section id="router-page">
          <router-view/>
        </section>
      </main>
    </Slideout>
    <footer>
      <p>alters by mike slater</p>
    </footer>
  </div>
</template>

<script>
  import Slideout from 'vue-slideout';
  import MenuContent from '@/components/MenuContent';

  export default {
    name: 'MainApp',
    components: {
      Slideout,
      MenuContent
    },
    methods: {
      open: function() {
        console.log('slideoutOpen');
      }
    },
    created: function() {
      this.$store.dispatch('initSettings');
    }
}
</script>

<style lang="scss">
body {
  background: #000;
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #487cb1;
}

header {
  position: fixed;
  top: 0;
  height: 36px;
  text-align: right;
  width: 100%;
  z-index: 1000;
}

#panel {
  text-align: center;
}

footer {
  font-size: 10px;
  text-align: right;
  position: fixed;
  bottom: 0;
  right: 0;
  height: 15px;
  z-index: 1000;

  p {
    margin: 0 2em 0 0;
    padding: 0;
  }
}

@media (min-width: 520px) {
  // Put Large Screen Styles here
}

// Slideout Styles

.slideout-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 256px;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
  display: none;
  background-color: #1D1F20;
  color: white;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  position: relative;
  z-index: 1;
  will-change: transform;
  min-height: 100vh;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}

</style>
