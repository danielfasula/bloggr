<template>
  <li class="comment">
    {{ comment.body }}
  </li>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    return {
    }
  }
}
</script>
