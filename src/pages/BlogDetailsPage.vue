<template>
  <div class="blog-details-page container-fluid text-center">
    <div class="row">
      <div class="col-12">
        <h1>welcome to blog details page</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="card bg-primary" v-if="state.blog.creator">
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
          <i class="fas fa-times text-danger action" @click="deleteBlog"></i>
        </div>
        <EditBlogModal />
        <div class="rounded">
          <img class="card-img-top" :src="state.blog.imgUrl" alt="" />
        </div>
        <div class="card-body text-secondary text-center">
          <h3>{{ state.blog.title }}</h3>
          <p>{{ state.blog.body }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <ul>
        <Comment
          v-for="comment in state.comments"
          :key="comment._id"
          :comment="comment"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
export default {
  name: 'BlogDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments)
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
      route
    }
  }
}
</script>

<style scoped>
</style>
