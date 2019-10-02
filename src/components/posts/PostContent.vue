<template>
  <div class="post-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <h2 class="text-blue-600 text-lg sm:text-2xl tracking-wider">{{ report.title }}</h2>
    <h3 class="text-xs pb-4">
      <span>{{report.date | format-datestring}}</span> |
      <span v-for="(tag, idx) in report.tags">
        "{{tag}}"
        <span v-if="idx + 1 < report.tags.length">, </span>
      </span>
    </h3>
    <dl>
      <dt>Players</dt>
      <dd>{{report.players}}</dd>
      <dt>Games Played</dt>
      <dd>{{report.games_played}}</dd>
      <dt>Decks</dt>
      <dd>
        <ul>
          <li v-for="(game, idx) in report.decks">
            Game {{idx + 1}}: {{game.join(' vs. ')}}
          </li>
        </ul>
      </dd>
    </dl>
    <section v-html="report.content"></section>
    <div class="pagination flex">
      <div
        class="text-left flex-grow"
        v-on:click="goPrev"
      >
        prev
      </div>
      <div
        class="text-right flex-grow"
        v-on:click="goNext"
      >
        next
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import { tools } from '@/utils/MStools'

const setReport = vm => {
  const report = vm.reports.find(report => {
    return vm.id === report.id
  })
  if (!report) {
    vm.$router.push({'path': '/404'})
  } else {
    vm.report = report
  }
}

const fetchReports = vm => {
  if (vm.reports.length) {
    setReport(vm)
  } else {
    api.get_posts()
      .then(response => {
        vm.reports = response.data.game_reports.sort(tools().sortBy('date', false))
        setReport(vm)
      })
      .catch(error => vm.$router.push({'path': '/404'}))
  }
}

export default {
  name: 'postContent',
  props: ['id'],
  data () {
    return {
      'report': {},
      'reports': []
    }
  },
  created: function () {
    fetchReports(this);
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'BlogPost') {
        fetchReports(this);
      }
    }
  },
  methods: {
    goPrev: () => {
      console.log('prev')
    },
    goNext: () => {
      console.log('next')
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

ol {
  list-style-type: decimal;
  padding-inline-start: 20px;
}

li {
  padding: 0.5rem 0;
}

dt {
  font-weight: bold;
  color: #3182CE;
}

dd {
  display: block;
  padding: 0 1rem 1rem;
}

section p {
  padding-bottom: 2rem;
}
</style>
