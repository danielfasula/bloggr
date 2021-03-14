<template>
  <li class="list-group-item mt-2 user-blogs d-flex justify-content-between">
    <div>
      <router-link :to="{ name: 'BlogDetailsPage', params: { id: blog.id } }">
        <h5>{{ blog.title }}</h5>
      </router-link>
    </div>
    <div>
      <i class="fas fa-times text-danger action" @click="deleteBlog"></i>
    </div>
  </li>
</template>

<script>
import { blogsService } from '../services/BlogsService'
export default {
  name: 'UserBlogs',
  props: {
    blog: { type: Object, required: true }
  },
  setup(props) {
    return {
      async deleteBlog() {
        await blogsService.deleteBlog(props.blog.id)
        blogsService.getUsersBlogs()
      }
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
