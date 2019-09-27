<template>
  <div class="page-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <h2 class="text-blue-500 mb-2 text-lg sm:text-2xl tracking-wider">{{ page_data.title }}</h2>
    <section v-html="page_data.content"></section>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'PageContent',
  props: ['page_key'],
  data () {
    return {
      'page_data': {}
    }
  },
  created: function () {
    api.get_pages()
      .then(response => {
        const pages = response.data.pages
        this.page_data = pages.find(page => {
          return this.page_key === page.page_key
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
</style>
