import express from 'express';
import {
  articleGet,
  articleFindGet,
  articleCreate,
  articleUpdate,
  articleDelete,
  createArticleComment,
  getArticleComments,
  uploadArticleImage,
} from '../controller/article.controller.js';
import { likeArticle, unLikeArticle } from '../controller/articleLike.controller.js';
import {
  validationArticleCreate,
  validationArticleUpdate,
} from '../middlewares/article.validationError.js';
import { validateComment } from '../middlewares/comment.validationError.js';
import { validateArticleId } from '../middlewares/id.validationError.js';
import { createUploader } from '../middlewares/upload.js';
import { authenticateUser, authenticateUserOptional } from '../middlewares/auth.middleware.js';

const articleRouter = express.Router();
const articleUpload = createUploader('article');

articleRouter.post(
  '/:articleId/image',
  authenticateUser,
  validateArticleId,
  articleUpload.single('image'),
  uploadArticleImage,
);

articleRouter.get('/', authenticateUserOptional, articleGet);
articleRouter.get('/:articleId', authenticateUserOptional, validateArticleId, articleFindGet);
articleRouter.post('/', authenticateUser, validationArticleCreate, articleCreate);
articleRouter.patch(
  '/:articleId',
  authenticateUser,
  validateArticleId,
  validationArticleUpdate,
  articleUpdate,
);
articleRouter.delete('/:articleId', authenticateUser, validateArticleId, articleDelete);

articleRouter.post(
  '/:articleId/comments',
  authenticateUser,
  validateArticleId,
  validateComment,
  createArticleComment,
);
articleRouter.get('/:articleId/comments', validateArticleId, getArticleComments);

articleRouter.post('/:articleId/like', authenticateUser, validateArticleId, likeArticle);
articleRouter.delete('/:articleId/like', authenticateUser, validateArticleId, unLikeArticle);

export default articleRouter;
