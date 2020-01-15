<template>
  <div class="page-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <h2 class="text-blue-lt mb-2 text-lg sm:text-2xl tracking-wider">
      {{ page_data.title }}
    </h2>
    <section v-html="page_data.content" />
  </div>
</template>

<script>
import api from '@/api/api'

const getPage = function (pageContent) {
  api.get_pages()
    .then(response => {
      const pages = response.data.pages
      pageContent.page_data = pages.find(page => {
        return pageContent.pageKey === page.page_key
      })
    })
}

export default {
  name: 'PageContent',
  props: { 'pageKey': { type: String, default: 'about-page' } },
  data () {
    return {
      'page_data': {}
    }
  },
  watch: {
    '$route' (to, from) {
      getPage(this)
    }
  },
  created: function () {
    getPage(this)
  }
}
</script>

<style lang="scss" media="screen">
p {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>
