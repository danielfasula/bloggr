<template>
  <div class="home container text-center">
    <h1>BLOGGR</h1>
    <!-- NOTE figure out how to hide create button when not logged in -->
    <div v-if="state.account" class="row">
      <div class="col text-center">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#create-blog"
        >
          Create A Blog
        </button>
        <CreateBlogModal />
      </div>
    </div>
    <div class="row">
      <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
      <Blog v-else v-for="blog in state.blogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      loading: true,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      blogs: computed(() => AppState.blogs),
      showForm: false
    })
    onMounted(async () => {
      await blogsService.getAll()
      state.loading = false
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  user-select: none;
  > img {
    height: 200px;
    width: 200px;
  }
}
</style>
