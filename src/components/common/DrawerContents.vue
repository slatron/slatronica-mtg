<template>
  <div class="text-blue-700 drawer-menu">
    <ul>
      <li>
        <router-link to="/">Gallery</router-link>
      </li>
      <li>
        <router-link to="/decks">Decks</router-link>
      </li>
      <li>
        EDH Game Reports
        <ul>
          <li
           v-for="report in reports"
           class="text-sm"
          >
            <router-link :to="`/post/${report.id}`">{{report.date}}</router-link>
          </li>
        </ul>
      </li>
      <li>
        Pages
        <ul>
          <li><router-link to="/about">About</router-link></li>
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
        this.reports = response.data.game_reports
      })
  },
  data () {
    return {
      reports: []
    }
  }
}
</script>

<style scoped>

ul > li > a {
  display: block;
  padding: 10px;
  cursor: pointer;
}
</style>
