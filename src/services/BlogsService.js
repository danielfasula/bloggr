import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'

class BlogsService {
  async getAll() {
    const res = await sandboxApi.get('api/blogs')
    AppState.blogs = res.data
  }

  async createBlog(blogData) {
    try {
      const res = await sandboxApi.post('api/blogs', blogData)
      AppState.blogs.push(res.data)
      return res.data.id
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteBlog(id) {
    await sandboxApi.delete('api/blogs/' + id)
    this.getAll()
  }

  async getBlog(id) {
    try {
      const res = await sandboxApi.get('api/blogs/' + id)
      AppState.activeBlog = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getBlogComments(id) {
    try {
      const res = await sandboxApi.get('api/blogs/' + id + '/comments')
      AppState.comments = res.data
      logger.log(AppState.comments)
    } catch (error) {
      logger.log(error)
    }
  }

  async editBlog(blog) {
    try {
      const res = await sandboxApi.put('api/blogs/' + blog.id, blog)
      AppState.activeBlog = res.data
      logger.log(res)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const blogsService = new BlogsService()
