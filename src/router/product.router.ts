import express from 'express';
import {
  productGet,
  productFindGet,
  productCreate,
  productUpdate,
  productDelete,
  createProductComment,
  getProductComment,
  uploadProductImage,
} from '../controller/product.controller.js';
import { likeProduct } from '../controller/productLike.controller.js';
import {
  validateProductCreate,
  validationProductUpdate,
} from '../middlewares/product.validationError.js';
import { createUploader } from '../middlewares/upload.js';
import { validateProductId } from '../middlewares/id.validationError.js';
import { authenticateUser, authenticateUserOptional } from '../middlewares/auth.middleware.js';

const productRouter = express.Router();
const productUpload = createUploader('product');

productRouter.post(
  '/:productId/image',
  authenticateUser,
  productUpload.single('image'),
  uploadProductImage,
);

productRouter.get('/', authenticateUserOptional, productGet);
productRouter.get('/:productId', authenticateUserOptional, validateProductId, productFindGet);
productRouter.post('/', authenticateUser, validateProductCreate, productCreate);
productRouter.patch(
  '/:productId',
  authenticateUser,
  validateProductId,
  validationProductUpdate,
  productUpdate,
);
productRouter.delete('/:productId', authenticateUser, validateProductId, productDelete);

productRouter.post(
  '/:productId/comments',
  authenticateUser,
  validateProductId,
  createProductComment,
);
productRouter.get('/:productId/comments', validateProductId, getProductComment);

productRouter.post('/:productId/like', authenticateUser, validateProductId, likeProduct);
export default productRouter;
