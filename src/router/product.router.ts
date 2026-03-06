import express from 'express';
import { ProductController } from '../controller/product.controller';
import { likeProduct } from '../controller/productLike.controller';
import {
  validateProductCreate,
  validationProductUpdate,
} from '../middlewares/product.validationError';
import { createUploader } from '../middlewares/upload';
import { validateProductId } from '../middlewares/id.validationError';
import { authenticateUser, authenticateUserOptional } from '../middlewares/auth.middleware';

const productRouter = express.Router();
const productUpload = createUploader('product');
const productController = new ProductController();

productRouter.get('/', authenticateUserOptional, productController.getProductList);
productRouter.get(
  '/:productId',
  authenticateUserOptional,
  validateProductId,
  productController.getProductList,
);
productRouter.get('/:productId/comments', validateProductId, productController.getProductComment);

productRouter.use(authenticateUser);

productRouter.post(
  '/:productId/image',
  productUpload.single('image'),
  productController.uploadProductImage,
);
productRouter.post('/', validateProductCreate, productController.createProduct);
productRouter.patch(
  '/:productId',
  validateProductId,
  validationProductUpdate,
  productController.productUpdate,
);
productRouter.delete('/:productId', validateProductId, productController.productDelete);

productRouter.post(
  '/:productId/comments',
  validateProductId,
  productController.createProductComment,
);
productRouter.post('/:productId/like', authenticateUser, validateProductId, likeProduct);

export default productRouter;
