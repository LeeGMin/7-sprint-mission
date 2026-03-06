import express from 'express';
import { ArticleController } from '../controller/article.controller';
import { likeArticle, unLikeArticle } from '../controller/articleLike.controller';
import {
  validationArticleCreate,
  validationArticleUpdate,
} from '../middlewares/article.validationError';
import { validateComment } from '../middlewares/comment.validationError';
import { validateArticleId } from '../middlewares/id.validationError';
import { createUploader } from '../middlewares/upload';
import { authenticateUser, authenticateUserOptional } from '../middlewares/auth.middleware';

const articleRouter = express.Router();
const articleUpload = createUploader('article');
const articleController = new ArticleController();

// 로그인 여부와 상관없이 게시글 목록과 상세 조회는 가능하도록 미들웨어 적용
articleRouter.get('/', authenticateUserOptional, articleController.articleGet);
articleRouter.get(
  '/:articleId',
  authenticateUserOptional,
  validateArticleId,
  articleController.articleFindGet,
);

// 게시글 댓글 목록 조회는 로그인 여부와 상관없이 가능하도록 미들웨어 적용
articleRouter.get('/:articleId/comments', validateArticleId, articleController.getArticleComments);

// 로그인한 유저만 게시글 작성, 수정, 삭제 가능하도록 미들웨어 적용
articleRouter.use(authenticateUser);

articleRouter.post(
  '/:articleId/image',
  validateArticleId,
  articleUpload.single('image'),
  articleController.uploadArticleImage,
);

articleRouter.post('/', validationArticleCreate, articleController.articleCreate);
articleRouter.patch(
  '/:articleId',
  validateArticleId,
  validationArticleUpdate,
  articleController.articleUpdate,
);
articleRouter.delete('/:articleId', validateArticleId, articleController.articleDelete);

// 게시글 댓글 생성 라우터
articleRouter.post(
  '/:articleId/comments',
  validateArticleId,
  validateComment,
  articleController.createArticleComment,
);

// --------- 좋아요/좋아요 취소 라우터 ------------
articleRouter.post('/:articleId/like', validateArticleId, likeArticle);
articleRouter.delete('/:articleId/like', validateArticleId, unLikeArticle);

export default articleRouter;
