<template>
  <div class="post-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <div
      class="repeat-reports"
      v-for="(report, idx) in reports"
    >
      <h2 class="text-blue-600 text-lg sm:text-2xl tracking-wider">{{ report.title }}</h2>
      <h3 class="text-xs pb-4">
        <span>{{report.date | format-datestring}}</span> |
        <span v-for="(tag, idx) in report.tags">
          "{{tag}}"
          <span v-if="idx + 1 < report.tags.length">, </span>
        </span>
      </h3>
      <hr ng-if="idx !== (reports.length - 1)">
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import { tools } from '@/utils/MStools'

const fetchReports = vm => {
  if (!vm.reports.length) {
    api.get_posts()
      .then(response => {
        vm.reports = response.data.game_reports.sort(tools().sortBy('date', false))
      })
      .catch(error => console.warn('Error fetching reports'))
  }
}

export default {
  name: 'AllPosts',
  data () {
    return {
      'reports': []
    }
  },
  created: function () {
    fetchReports(this);
  }
}
</script>
