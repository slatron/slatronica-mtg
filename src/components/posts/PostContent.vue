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
      <dd>{{report.decks.length}}</dd>
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
    <div class="pagination flex m-5">
      <div class="text-left flex-grow">
        <span
          v-on:click="goNext" class="cursor-pointer"
          v-show="!last_post"
        >
          previous report
        </span>
      </div>
      <div class="text-right flex-grow">
        <span
          v-on:click="goPrev" class="cursor-pointer"
          v-show="!first_post"
        >
          next report
        </span>
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
      'report': {
        'decks': []
      },
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
  computed: {
    first_post: function() {
      return this.reports.indexOf(this.report) === 0
    },
    last_post: function() {
      return this.reports.indexOf(this.report) === this.reports.length - 1
    }
  },
  methods: {
    goPrev: function() {
      const currentPosition = this.reports.indexOf(this.report)
      if (currentPosition > 0) {
        const targetPostId = this.reports[currentPosition - 1].id
        this.$router.push(`/post/${targetPostId}`)
      }
    },
    goNext: function() {
      const currentPosition = this.reports.indexOf(this.report)
      if (currentPosition < this.reports.length - 1) {
        const targetPostId = this.reports[currentPosition + 1].id
        this.$router.push(`/post/${targetPostId}`)
      }
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
