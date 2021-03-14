<template>
  <li class="list-group-item mt-2 user-comments d-flex justify-content-between">
    <div>
      <router-link
        :to="{ name: 'BlogDetailsPage', params: { id: comment.blog } }"
      >
        <h5>{{ comment.body }}</h5>
      </router-link>
    </div>
    <div>
      <i class="fas fa-times text-danger action" @click="deleteComment"></i>
    </div>
  </li>
</template>

<script>
import { commentsService } from '../services/CommentsService'
export default {
  name: 'UserComments',
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    return {
      async deleteComment() {
        await commentsService.deleteComment(props.comment.id)
        commentsService.getUsersComments()
      }
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
