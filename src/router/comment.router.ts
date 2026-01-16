import express from 'express';
import { updateComment, deleteComment } from '../controller/comment.controller.js';
import { validateComment } from '../middlewares/comment.validationError.js';
import { validateCommentId } from '../middlewares/id.validationError.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const commentRouter = express.Router();

// Comment 공통
commentRouter.patch(
  '/comments/:commentId',
  authenticateUser,
  validateCommentId,
  validateComment,
  updateComment,
);

commentRouter.delete('/comments/:commentId', authenticateUser, validateCommentId, deleteComment);

export default commentRouter;
