<template>
  <div class="blog col-4 my-2">
    <div class="card" v-if="blog.creator">
      <div
        class="text-right absolute top right p-2 z-2"
        v-if="blog.creator.email == state.user.email"
      >
        <i class="fas fa-times text-danger action" @click="deleteBlog"></i>
      </div>
      <router-link :to="{ name: 'BlogDetailsPage', params: { id: blog.id } }">
        <div class="card bg-primary rounded">
          <div class="card-body text-secondary w-100">
            <h6>
              {{ blog.title }} <br />-
              <small>{{ blog.creator.name }}</small>
            </h6>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
export default {
  name: 'Blog',
  props: {
    blog: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteBlog() {
        blogsService.deleteBlog(props.blog.id)
      }
    }
  }
}
</script>

<style scoped>
img {
  height: 100px;
  width: 100px;
}
.blog:hover {
  transform: translateY(-5px);
  box-shadow: 1px 3px 5px rgb(94, 94, 94);
  cursor: pointer;
}
.blog {
  transition: all 0.2s;
}
</style>
