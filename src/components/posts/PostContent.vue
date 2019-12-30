<template>
  <div class="post-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <h2 class="text-blue-600 text-lg sm:text-2xl tracking-wider">
      {{ report.title }}
    </h2>
    <h3 class="text-xs pb-4">
      <span>{{ report.date | format-datestring }}</span> |
      <span
        v-for="(tag, idx) in report.tags"
        :key="idx"
      >
        "{{ tag }}"
        <span v-if="idx + 1 < report.tags.length">, </span>
      </span>
    </h3>
    <dl>
      <dt>Players</dt>
      <dd>{{ report.players }}</dd>
      <dt>Games Played</dt>
      <dd>{{ report.decks.length }}</dd>
      <dt>Decks</dt>
      <dd>
        <ul>
          <li
            v-for="(game, idx) in report.decks"
            :key="idx"
          >
            Game {{ idx + 1 }}: {{ game.join(' vs. ') }}
          </li>
        </ul>
      </dd>
    </dl>
    <section v-html="report.content" />
    <div class="pagination flex m-5">
      <div class="text-left flex-grow">
        <span
          v-show="!last_post"
          class="cursor-pointer"
          flex
          flex-col
          @click="goPrev"
        >
          <icon-base icon-name="arrow-thick-left"><ArrowLeft /></icon-base>
          <span>prev</span>
        </span>
      </div>
      <div class="text-right">
        <span
          v-show="!first_post"
          class="cursor-pointer"
          flex
          flex-col
          @click="goNext"
        >
          <icon-base icon-name="arrow-thick-right"><ArrowRight /></icon-base>
          <span>next</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import { tools } from '@/utils/MStools'
import IconBase from '@/components/common/IconBase'
import ArrowLeft from '@/components/icons/arrow-thick-left'
import ArrowRight from '@/components/icons/arrow-thick-right'

const setReport = vm => {
  const report = vm.reports.find(report => {
    return vm.id === report.id
  })
  if (!report) {
    vm.$router.push({ 'path': '/404' })
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
      .catch(error => vm.$router.push({ 'path': '/404' }))
  }
}

export default {
  name: 'PostContent',
  components: { ArrowLeft, ArrowRight, IconBase },
  props: ['id'],
  data () {
    return {
      'report': {
        'decks': []
      },
      'reports': []
    }
  },
  computed: {
    first_post: function () {
      return this.reports.indexOf(this.report) === 0
    },
    last_post: function () {
      return this.reports.indexOf(this.report) === this.reports.length - 1
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'BlogPost') {
        fetchReports(this)
      }
    }
  },
  created: function () {
    fetchReports(this)
  },
  methods: {
    goNext: function () {
      const currentPosition = this.reports.indexOf(this.report)
      if (currentPosition > 0) {
        const targetPostId = this.reports[currentPosition - 1].id
        this.$router.push(`/post/${targetPostId}`)
      }
    },
    goPrev: function () {
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
