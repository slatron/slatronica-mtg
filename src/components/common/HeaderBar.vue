<template>
  <nav class="flex items-center fixed w-full p-1 justify-between flex-wrap bg-black border-b border-gray-500">
    <div>
      <button
        class="px-2 py-1 text-gray-500 hover:text-white hamburger hamburger--collapse" type="button"
        v-bind:class="{'is-active': testing}"
        v-on:click="toggleDrawer"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
    <div class="flex-shrink-0">
      <h1 class="text-blue-600 tracking-wider text-xl md:text-3xl text-center">Slatronica Alters</h1>
    </div>
    <div class="block">
      <button
        v-if="has_filter"
        v-on:click="toggleFilterMenu"
        v-bind:class="{'active': filters_open}"
        class="flex items-center px-3 py-2 border md:border-none rounded text-gray-500 border-gray-500 hover:text-white">
        <icon-base icon-name="menu-filter"><MenuFilter /></icon-base>
      </button>
    </div>
    <transition name="slide">
      <div
        class="filter-menu w-1/2 sm:w-1/4 lg:w-1/5 xl:w-1/6 block absolute right-0 bg-black z-20 text-right rounded-bl-lg border-b border-gray-500  border-l"
        v-if="filters_open"
      >
        <FilterSwitcher />
      </div>
    </transition>
  </nav>
</template>

<script>
import FilterSwitcher from '@/components/common/FilterSwitcher'
import api from '@/api/api'
import IconBase from '@/components/common/IconBase'
import MenuFilter from '@/components/icons/menu-filter'
// import IconMenu from '@/components/icons/menu'

export default {
  name: 'HeaderBar',
  data () {
    return {
      'testing': false,
      'filters_open': false,
      'has_filter': ['GalleryPage', 'DeckPage'].indexOf(this.$route.name) !== -1
    }
  },
  components: {
    FilterSwitcher,
    IconBase,
    MenuFilter
  },
  methods: {
    toggleFilterMenu: function() {
      this.filters_open = !this.filters_open
    },
    toggleDrawer: function() {
      this.$store.commit('toggleDrawer')
      this.testing = !this.testing
    }
  },
  watch: {
    '$route' (to, from) {
      this.filters_open = false;
      this.has_filter = ['GalleryPage', 'DeckPage'].indexOf(this.$route.name) !== -1
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  height: 45px;
  transition: height .5s;
}

button.active {
  @apply text-white;
}

@media (min-width: 768px) {
  nav {
    height: 55px;
  }
}


.filter-menu {
  top: 44px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .filter-menu {
    top: 54px;
  }
}


.slide-enter-active,
.slide-leave-active {
  transition: max-height .35s;
}

.slide-leave-active,
.slide-enter-to {
  max-height: 100px;
}

.slide-enter,
.slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  max-height: 0;
}

// TODO: Move to external hamburger.css file
.hamburger{font:inherit;display:inline-block;overflow:visible;margin:0;padding:15px;cursor:pointer;transition-timing-function:linear;transition-duration:.15s;transition-property:opacity,filter;text-transform:none;color:inherit;border:0;background-color:transparent}.hamburger.is-active:hover,.hamburger:hover{opacity:.7}.hamburger.is-active .hamburger-inner,.hamburger.is-active .hamburger-inner:after,.hamburger.is-active .hamburger-inner:before{background-color:#fff}.hamburger-box{position:relative;display:inline-block;width:40px;height:24px}.hamburger-inner{top:50%;display:block;margin-top:-2px}.hamburger-inner,.hamburger-inner:after,.hamburger-inner:before{position:absolute;width:40px;height:4px;transition-timing-function:ease;transition-duration:.15s;transition-property:transform;border-radius:4px;background-color:#fff}.hamburger-inner:after,.hamburger-inner:before{display:block;content:""}.hamburger-inner:before{top:-10px}.hamburger-inner:after{bottom:-10px}
.hamburger--collapse .hamburger-inner{top:auto;bottom:0;transition-delay:.13s;transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.13s}.hamburger--collapse .hamburger-inner:after{top:-20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity .1s linear}.hamburger--collapse .hamburger-inner:before{transition:top .12s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}.hamburger--collapse.is-active .hamburger-inner{transition-delay:.22s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--collapse.is-active .hamburger-inner:after{top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),opacity .1s linear .22s;opacity:0}.hamburger--collapse.is-active .hamburger-inner:before{top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .16s,transform .13s cubic-bezier(.215,.61,.355,1) .25s;transform:rotate(-90deg)}.hamburger--collapse-r .hamburger-inner{top:auto;bottom:0;transition-delay:.13s;transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.13s}.hamburger--collapse-r .hamburger-inner:after{top:-20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity .1s linear}.hamburger--collapse-r .hamburger-inner:before{transition:top .12s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}.hamburger--collapse-r.is-active .hamburger-inner{transition-delay:.22s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:translate3d(0,-10px,0) rotate(45deg)}.hamburger--collapse-r.is-active .hamburger-inner:after{top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),opacity .1s linear .22s;opacity:0}.hamburger--collapse-r.is-active .hamburger-inner:before{top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .16s,transform .13s cubic-bezier(.215,.61,.355,1) .25s;transform:rotate(90deg)}.hamburger--elastic .hamburger-inner{top:2px;transition-timing-function:cubic-bezier(.68,-.55,.265,1.55);transition-duration:.275s}.hamburger--header{margin-right:-5px;padding-right:0;padding-left:5px;cursor:default;vertical-align:middle}.hamburger--header .hamburger-inner,.hamburger--header .hamburger-inner:after,.hamburger--header .hamburger-inner:before,.hamburger--header.is-active .hamburger-inner,.hamburger--header.is-active .hamburger-inner:after,.hamburger--header.is-active .hamburger-inner:before{background-color:#222}.hamburger--header.hamburger--elastic .hamburger-inner,.hamburger--header.hamburger--slider .hamburger-inner{top:2px}.hamburger--header:hover{opacity:1}.hamburger-wrap{text-align:center}.hamburger--accessible{display:inline-block}.hamburger--accessible .hamburger-box{display:inline-block;vertical-align:middle}.hamburger--accessible .hamburger-inner,.hamburger--accessible .hamburger-inner:after,.hamburger--accessible .hamburger-inner:before,.hamburger--accessible.is-active .hamburger-inner,.hamburger--accessible.is-active .hamburger-inner:after,.hamburger--accessible.is-active .hamburger-inner:before{background-color:#222}.hamburger-label{font-weight:600;display:inline-block;margin-left:5px;vertical-align:middle;text-transform:uppercase}.hamburger-label-hidden{display:none}.name{font-size:.8em;font-weight:600;position:absolute;top:0;left:0;width:100%;padding-top:1.25em;padding-top:2em;color:#fff}.information-directions{font-size:14px;width:100%}.browsers,.types{padding-left:0;list-style:none}.browsers li,.types li{margin-bottom:.25em}.browsers{padding-left:1em;column-count:2}.hint{display:none;margin-bottom:1em}.hint.is-visible{display:block}@media only screen and (min-width:320px){.browsers{column-count:2}}@media only screen and (min-width:480px){.types{column-count:2}.browsers{column-count:3}}@media only screen and (min-width:640px){.information-directions{font-size:15px}}#carbonads{padding-top:20px;padding-bottom:40px}#carbonads a{text-decoration:none}#carbonads>span{position:relative;display:block;width:100%;max-width:300px;margin-right:auto;margin-left:auto}.carbon-wrap{position:relative;display:table;width:100%}.carbon-img,.carbon-text{display:table-cell;text-align:left;vertical-align:middle}.carbon-img{background-color:#fff}.carbon-img img{display:block}.carbon-text{font-size:12px;line-height:1.2;padding-left:15px}.carbon-poweredby{font-size:11px;position:absolute;bottom:-20px;left:0;width:130px;text-align:center;color:#999}@media only screen and (min-width:1280px){#carbonads{position:absolute;top:45px;right:30px;padding-top:0;padding-bottom:0}}

</style>
