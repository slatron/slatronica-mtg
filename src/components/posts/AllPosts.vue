<template>
  <div class="post-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <div
      v-for="(report, idx) in reports"
      :key="idx"
      class="repeat-reports"
    >
      <h2 class="inline-block text-blue-600 sm:text-2xl tracking-widest">
        <router-link :to="`/post/${report.id}`">
          {{ report.title }}
        </router-link>
      </h2>
      <h3
        class="text-xs pb-8 mb-8"
        :class="{'border-b': (idx !== (reports.length - 1))}"
      >
        <span>{{ report.date | format-datestring }}</span> |
        <span
          v-for="(tag, index) in report.tags"
          :key="index"
        >
          "{{ tag }}"
          <span v-if="idx + 1 < report.tags.length">, </span>
        </span>
      </h3>
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
      .catch(err => console.warn('Error fetching reports', err))
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
    fetchReports(this)
  }
}
</script>
