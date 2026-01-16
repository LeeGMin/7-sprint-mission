import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  getMyProduct,
  getMyLikedProducts,
  getMyLikedArticles,
} from '../controller/user.controller.js';
import { myProfileUpload } from '../middlewares/upload.js';
import {
  validateUpdateProfile,
  validateChangePassword,
} from '../middlewares/user.validationError.js';

const userRouter = express.Router();

userRouter.get('/me', authenticateUser, getMyProfile);
userRouter.patch(
  '/me',
  authenticateUser,
  myProfileUpload.single('image'),
  validateUpdateProfile,
  updateMyProfile,
);
userRouter.patch('/me/password', authenticateUser, validateChangePassword, changeMyPassword);
userRouter.get('/me/product', authenticateUser, getMyProduct);
userRouter.get('/me/likes/products', authenticateUser, getMyLikedProducts);
userRouter.get('/me/likes/articles', authenticateUser, getMyLikedArticles);

export default userRouter;
