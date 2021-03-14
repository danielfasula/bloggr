import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'
import { blogsService } from './BlogsService'
class CommentsService {
  async createComment(commentData) {
    try {
      await sandboxApi.post('api/comments', commentData)
      blogsService.getBlogComments(commentData.blog.id)
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteComment(commentId) {
    try {
      await sandboxApi.delete('api/comments/' + commentId)
    } catch (error) {
      logger.log(error)
    }
  }

  async getUsersComments() {
    const res = await sandboxApi.get('account/comments')
    AppState.usersComments = res.data
    logger.log(res.data)
    logger.log(AppState.usersComments)
  }
}

export const commentsService = new CommentsService()
