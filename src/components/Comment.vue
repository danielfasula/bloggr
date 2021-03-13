<template>
  <li class="list-group-item comment mt-2">
    <h5>
      <big>{{ comment.body }}</big> - <small>{{ comment.creator.name }}</small>
    </h5>
    <div v-if="comment.creator">
      <div
        class="text-right absolute top right p-2 z-2"
        v-if="comment.creator.email == state.user.email"
      >
        <i class="fas fa-times text-danger action" @click="deleteComment"></i>
      </div>
    </div>
  </li>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      blogs: computed(() => AppState.blogs),
      thisBlog: computed(() => AppState.activeBlog)
    })
    return {
      state,
      async deleteComment() {
        await commentsService.deleteComment(props.comment._id)
        blogsService.getBlogComments(state.thisBlog.id)
      }
    }
  }
}
</script>
