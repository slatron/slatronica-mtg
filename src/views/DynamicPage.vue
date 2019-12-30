<template>
  <div>
    <PageContent
      :page-key="pageKey"
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
  props: { pageKey: { type: String, default: 'about-page' } }
}
</script>
