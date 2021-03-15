<template>
  <div class="blog-details-page container-fluid text-center">
    <div class="row">
      <div class="col-12">
        <h1>welcome to blog details page</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="card" v-if="state.blog.creator">
          <div class="box">
            <div
              class="text-right absolute top right p-2 z-2"
              v-if="state.blog.creator.email == state.user.email"
            >
              <i
                class="fas fa-edit action mr-2"
                type="button"
                data-toggle="modal"
                data-target="#edit-blog"
              ></i>
              <i
                class="fas fa-times text-danger action"
                @click="deleteBlog"
              ></i>
            </div>
            <EditBlogModal />
            <div class="rounded">
              <img
                v-if="state.blog.imgUrl"
                class="card-img-top"
                :src="state.blog.imgUrl"
                alt=""
              />
              <img
                v-else
                src="https://via.placeholder.com/400?text=The+creator++of+this+blog+has+not+provided+an+image"
                alt=""
              />
            </div>
            <div class="card-body text-secondary text-center">
              <h3>{{ state.blog.title }}</h3>
              <p>{{ state.blog.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 justify-content-center">
      <div class="col-6 text-center">
        <form @submit.prevent="createComment">
          <div class="form-group d-flex justify-content-center">
            <input
              class="ml-2 mr-1 mt-1"
              type="text"
              required
              name="description"
              placeholder="Add Comment"
              v-model="state.newComment.body"
            />

            <button class="close" type="submit">
              <span>&plus;</span>
            </button>
          </div>
        </form>
        <div class="card">
          <ul class="list-group list-group-flush scroll">
            <Comment
              v-for="comment in state.comments"
              :key="comment._id"
              :comment="comment"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'BlogDetailsPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments),
      newComment: {}
    })
    onMounted(async () => {
      await blogsService.getBlog(route.params.id)
      await blogsService.getBlogComments(route.params.id)
    })
    onBeforeRouteLeave((to, from, next) => {
      AppState.activeBlog = {}
      next()
    })
    return {
      state,
      route,
      async deleteBlog() {
        await blogsService.deleteBlog(state.blog.id)
        router.push({ name: 'Home' })
      },
      async createComment() {
        state.newComment.blog = state.blog
        state.newComment.user = state.user
        await commentsService.createComment(state.newComment)
        state.newComment = {}
      }
    }
  }
}
</script>

<style scoped>
.scroll {
  max-height: 220px;
  overflow-y: auto;
}
</style>
