<template>
  <div class="account container">
    <div class="row justify-content-center mt-4">
      <div class="col-10 text-center">
        <h1>Welcome {{ state.account.name }}</h1>
        <img class="rounded my-2" :src="state.account.picture" alt="" />
      </div>
    </div>
    <div id="userblogs" class="row mt-2">
      <div class="col-6 text-center">
        <h3>
          My Blogs
          <button
            type="button"
            class="btn btn-flat btn-lg"
            data-toggle="modal"
            data-target="#create-blog"
          >
            <span>&plus;</span>
          </button>
        </h3>
        <CreateBlogModal />
        <ul class="list-group list-group-flush scroll">
          <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
          <UserBlogs
            v-else
            v-for="blog in state.blogs"
            :key="blog.id"
            :blog="blog"
          />
        </ul>
      </div>
      <div class="col-6 text-center">
        <h3>My Comments</h3>
        <ul class="list-group list-group-flush scroll">
          <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
          <UserComments
            v-else
            v-for="comment in state.comments"
            :key="comment.body"
            :comment="comment"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      blogs: computed(() => AppState.usersBlogs),
      comments: computed(() => AppState.usersComments)
    })
    onMounted(async () => {
      await blogsService.getUsersBlogs()
      await commentsService.getUsersComments()
      state.loading = false
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.scroll {
  max-height: 300px;
  overflow-y: auto;
}
</style>
