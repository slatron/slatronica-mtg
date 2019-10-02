<template>
  <div class="text-blue-700 drawer-menu">
    <ul>
      <li>
        <router-link to="/">Gallery</router-link>
      </li>
      <li>
        <span v-on:click="toggle('reports')">EDH Game Reports</span>
        <ul v-bind:class="{'active': active_nav === 'reports'}">
          <li
           v-for="report in reports"
           class="text-sm"
          >
            <router-link :to="`/post/${report.id}`">{{report.date | format-datestring}}</router-link>
          </li>
        </ul>
      </li>
      <li>
        <span v-on:click="toggle('pages')">Pages</span>
        <ul v-bind:class="{'active': active_nav === 'pages'}">
          <li class="text-sm"><router-link to="/about">About</router-link></li>
          <li class="text-sm"><router-link to="/house-rules">EDH House Rules</router-link></li>
          <li class="text-sm"><router-link to="/edh-mulligan">EDH House Mulligan</router-link></li>
        </ul>
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
        this.reports = response.data.game_reports.slice(0, 5)
      })
  },
  data () {
    return {
      reports: [],
      active_nav: ''
    }
  },
  methods: {
    toggle: function (section) {
      this.active_nav = section === this.active_nav
        ? ''
        : section
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
  transition: max-height 0.25s linear;
  overflow: hidden;
  &.active {
    max-height: 5rem;
  }
}

.drawer-menu > ul > li li > a {
  padding: 0.5rem 0 0 2rem;
  cursor: pointer;
}
</style>
