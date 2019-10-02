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
  </div>
</template>

<script>
import api from '@/api/api'

const getPost = postContent => {
  const setReport = reports => {
    const report = reports.find(report => {
      return postContent.id === report.id
    })
    if (!report) {
      postContent.$router.push({'path': '/404'})
    } else {
      postContent.report = report
    }
  }

  if (postContent.reports.length) {
    setReport(postContent.reports)
  } else {
    api.get_posts()
      .then(response => {
        setReport(response.data.game_reports)
      })
      .catch(error => postContent.$router.push({'path': '/404'}))
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
    getPost(this);
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'BlogPost') {
        getPost(this);
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
