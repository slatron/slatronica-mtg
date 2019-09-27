<template>
  <div class="text-blue-700 drawer-menu">
    <ul>
      <li>
        <router-link to="/">Gallery</router-link>
      </li>
      <!-- <li>
        <router-link to="/decks">Decks</router-link>
      </li> -->
      <li>
        <span v-on:click="toggle('reports')">EDH Game Reports</span>
        <ul v-bind:class="{'active': true}">
          <li
           v-for="report in reports"
           class="text-sm"
          >
            <router-link :to="`/post/${report.id}`">- {{report.date}}</router-link>
          </li>
        </ul>
      </li>
      <li>
        <li><router-link to="/about">About</router-link></li>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'DrawerContents',
  created: function () {
    api.get_posts()
      .then(response => {
        this.reports = response.data.game_reports
      })
  },
  data () {
    return {
      reports: [],
      active_nav: {
        'pages': true,
        'reports': true
      }
    }
  },
  methods: {
    toggle: section => {
      // this.active_nav[section] = !(this.active_nav[section])
    }
  }
}
</script>

<style scoped lang="scss">
.drawer-menu > ul > li {
  border-bottom: 1px solid #e2e8f0;
  padding: 0 0 1rem;
}

.drawer-menu > ul > li > a,
.drawer-menu > ul > li > span {
  display: block;
  padding: 1rem 0.5rem 0 1rem;
  cursor: pointer;
}

.drawer-menu > ul > li > ul {
  max-height: 0;
  transition: max-height 1.5s ease;
  overflow: hidden;
  &.active {
    max-height: 80rem;
  }
}

.drawer-menu > ul > li li > a {
  padding: 0.5rem 0 0 2rem;
  cursor: pointer;
}
</style>
