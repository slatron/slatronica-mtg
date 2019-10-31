<template>
  <div class="text-blue-700 drawer-menu">
    <ul>
      <li v-show="!username">
        <router-link to="/login">login</router-link>
      </li>
      <li v-show="username">
        <span>Hello, {{username}}</span>
      </li>
      <li>
        <router-link to="/">Gallery</router-link>
      </li>
      <li v-bind:class="{'active': active_nav === 'reports'}">
        <span v-on:click="toggle('reports')">
          EDH Reports
          <icon-base v-show="active_nav === 'reports'" icon-name="minus-outline"><MinusOutline /></icon-base>
          <icon-base v-show="active_nav !== 'reports'" icon-name="add-outline"><AddOutline /></icon-base>
        </span>
        <ul>
          <li v-for="report in reports">
            <router-link :to="`/post/${report.id}`">{{report.date | format-datestring}}</router-link>
          </li>
          <li><router-link to="/all-reports">All</router-link></li>
        </ul>
      </li>
      <li v-bind:class="{'active': active_nav === 'pages'}">
        <span v-on:click="toggle('pages')">
          Pages
          <icon-base v-show="active_nav === 'pages'" icon-name="minus-outline"><MinusOutline /></icon-base>
          <icon-base v-show="active_nav !== 'pages'" icon-name="add-outline"><AddOutline /></icon-base>
        </span>
        <ul>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/house-rules">EDH House Rules</router-link></li>
          <li><router-link to="/edh-mulligan">EDH House Mulligan</router-link></li>
          <li><router-link to="/blueprint-process">Blueprint Process</router-link></li>
        </ul>
      </li>
      <li v-show="username">
        <a v-on:click="logout()">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/api'
import { tools } from '@/utils/MStools'
import IconBase from '@/components/common/IconBase'
import MinusOutline from '@/components/icons/minus-outline'
import AddOutline from '@/components/icons/add-outline'

export default {
  name: 'DrawerContents',
  components: {
    IconBase,
    MinusOutline,
    AddOutline
  },
  created () {
    api.get_posts()
      .then(response => {
        this.reports = response.data.game_reports.sort(tools().sortBy('date', false))
        this.reports = this.reports.slice(0, 5)
      })
      .catch(err => console.log(err => console.log(`Error in DrawerContents get posts: ${err}`)))
  },
  data () {
    return {
      reports: [],
      active_nav: ''
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  methods: {
    toggle: function (section) {
      this.active_nav = section === this.active_nav
        ? ''
        : section
    },
    logout: function() {
      window.localStorage.removeItem('token')
      this.$store.commit('setUsername', {username: ''})
    },
    testPost: function() {
      api.post_gallery()
        .then(response => {
          console.log('post response: ', response)
        })
        .catch(error => {
          console.log('post response error: ', error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.drawer-menu > ul > li {
  border-bottom: 1px solid #e2e8f0;
  padding: 0 0 1rem;
}

@media (min-width: 768px) {
  .drawer-menu > ul > li {
    padding: 0 0 0.5rem;
  }
}

.drawer-menu > ul > li > a,
.drawer-menu > ul > li > span {
  display: block;
  padding: 1rem 0.5rem 0 1rem;
  font-size: 1.25em;
}

@media (min-width: 768px) {
  .drawer-menu > ul > li > a,
  .drawer-menu > ul > li > span {
    padding: 0.5rem 0.25rem 0 0.5rem;
    font-size: 1em;
  }
}

.drawer-menu > ul > li > a {
  cursor: pointer;
}

.drawer-menu > ul > li > span > svg {
  display: inline-block;
}

.drawer-menu > ul > li > ul {
  max-height: 0;
  transition: max-height 0.25s linear;
  overflow: hidden;
}

.drawer-menu > ul > li.active > ul {
  max-height: 11.75rem;
}

.drawer-menu > ul > li li > a {
  display: block;
  padding: 0.5rem 0 0 2rem;
  cursor: pointer;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .drawer-menu > ul > li li > a {
    padding: 0 0 0 2rem;
    font-size: 0.8rem;
  }
}

</style>
