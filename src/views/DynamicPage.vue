<template>
  <div>
    <PageContent
      v-bind:page_key="page_key"
    />
  </div>
</template>

<script>
import PageContent from '@/components/pages/PageContent'

export default {
  name: 'DynamicPage',
  components: {
    PageContent
  },
  props: { page_key: { type: String } }
}
</script>
