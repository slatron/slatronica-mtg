<template>
  <div>
    <PostContent
      :id="id"
    />
  </div>
</template>

<script>
import PostContent from '@/components/posts/PostContent'

export default {
  name: 'PostView',
  components: {
    PostContent
  },
  props: {
    id: {
      type: String,
      default: '9999'
    }
  }
}
</script>
