<template>
  <div class="edit-blog-modal">
    <div
      class="modal fade"
      id="edit-blog"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Blog</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="EditBlog">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Enter blog Title"
                  aria-describedby="helpId"
                  v-model="state.blog.title"
                />
                <input
                  type="text"
                  name="body"
                  id="body"
                  class="form-control my-2"
                  placeholder="Enter blog Body"
                  aria-describedby="helpId"
                  v-model="state.blog.body"
                />
                <input
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  class="form-control"
                  placeholder="Enter img url"
                  aria-describedby="helpId"
                  v-model="state.blog.imgUrl"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" @click="editBlog">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
export default {
  name: 'EditBlogModal',
  setup() {
    const state = reactive({
      blog: computed(() => AppState.activeBlog)
    })
    return {
      state,
      async editBlog() {
        try {
          await blogsService.editBlog(state.blog)
          $('#edit-blog').modal('hide')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
