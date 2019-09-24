<template>
  <div class="post-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <h2 class="text-blue-600 mb-2 text-lg sm:text-2xl tracking-wider">{{ post_data.title }}</h2>
    <section v-html="post_data.content"></section>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'postContent',
  props: ['id'],
  data () {
    return {
      'post_data': {}
    }
  },
  created: function () {
    api.get_posts()
      .then(response => {
        const posts = response.data.posts
        this.post_data = posts.find(post => {
          return this.id === post.id
        })
      })
  }
}
</script>

<style lang="scss" media="screen">
p {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

ul {
  clear: both;
}

ol {
  list-style-type: decimal;
}

li {
  padding: 5px 10px;
}

dt {
  font-weight: bold;
  float: left;
  padding: 5px;
  color: #3182CE;
}

dd {
  padding: 5px;
}
</style>
