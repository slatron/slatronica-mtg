<template>
  <div>
    <PostContent
      v-bind:id="id"
    />
  </div>
</template>

<script>
import PostContent from '@/components/posts/PostContent'

export default {
  name: 'PostView',
  props: {id: {type: String}},
  components: {
    PostContent
  }
}
</script>
