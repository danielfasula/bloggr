import { sandboxApi } from './AxiosService'
import { blogsService } from './BlogsService'
class CommentsService {
  async createComment(commentData) {
    await sandboxApi.post('api/comments', commentData)
    blogsService.getBlogComments(commentData.blog.id)
  }

  async deleteComment(commentId) {
    await sandboxApi.delete('api/comments/' + commentId)
  }
}

export const commentsService = new CommentsService()
