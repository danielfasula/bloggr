<template>
  <div class="blog col-xs-9 col-sm-5 col-lg-4 my-2">
    <div class="card" v-if="blog.creator">
      <div
        class="text-right absolute top right p-2 z-2"
        v-if="blog.creator.email == state.user.email"
      >
        <i class="fas fa-times text-danger action" @click="deleteBlog"></i>
      </div>
      <router-link :to="{ name: 'BlogDetailsPage', params: { id: blog.id } }">
        <div class="box text-secondary w-100">
          <h3>
            <bold>{{ blog.title }}</bold> <br />-
            <small>{{ blog.creator.name }}</small>
          </h3>
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
.card {
  position: relative;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 30px;
  min-width: 320px;
  height: 440px;
}
.box {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 2px solid;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.box:hover {
  transform: translateY(-50px);
  box-shadow: 0 40px 70px rgba(0, 0, 0, 0.5);
}

img {
  height: 100px;
  width: 100px;
}

/* }
.blog:hover {
  transform: translateY(-5px);
  box-shadow: 1px 3px 5px rgb(94, 94, 94);
  cursor: pointer;
}
.blog {
  transition: all 0.2s;
} */
</style>
