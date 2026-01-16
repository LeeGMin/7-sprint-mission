import { ProductList, ProductDetail } from '../model/product.model.js';
import Comment from '../model/comment.model.js';
import { NotFoundError } from '../errors/notFoundError.js';
import { ForbiddenError } from '../errors/forbiddenError.js';
import type { createProductDto, updateProductDto } from '../types/product.type.js';
import {
  createProductCommentRepo,
  createProductRepo,
  deleteProductRepo,
  findDetailProduct,
  getProductCommentRepo,
  getProductDetailRepo,
  getProductListRepo,
  updateProductRepo,
} from '../repository/product.repository.js';

// 상품 목록 조회 서비스
export const getProductService = async (
  limit: number,
  page: number,
  userId: bigint | null,
  keyword: string | undefined,
) => {
  const { entities, totalCount } = await getProductListRepo(limit, page, keyword, userId);

  const products = entities.map((entity) => ({
    ...ProductList.fromEntity(entity),
    isLiked: userId ? (entity.likes.length ?? 0) > 0 : false,
  }));

  return { products, totalCount };
};

// 상품 상세 조회 서비스
export const getProductDetailService = async (productId: bigint, userId: bigint | null) => {
  const entity = await getProductDetailRepo(productId, userId);

  if (!entity) {
    throw new NotFoundError('상품을 찾을 수 없습니다.');
  }

  const isLiked = userId ? (entity.likes.length ?? 0) > 0 : false;
  const product = ProductDetail.fromEntity(entity);

  return { ...product, isLiked };
};

// 상품 등록 서비스
export const createProductService = async (userId: bigint, dto: createProductDto) => {
  const createEntity = await createProductRepo(userId, dto);
  const product = ProductDetail.fromEntity(createEntity);

  return product;
};

//상품 수정 서비스
export const updateProductService = async (
  productId: bigint,
  userId: bigint,
  dto: updateProductDto,
) => {
  const product = await findDetailProduct(productId);
  if (!product) throw new NotFoundError('상품을 찾을 수 없습니다.');

  if (product.userId !== userId)
    throw new ForbiddenError('사용자님이 작성한 상품만 수정할 수 있습니다.');

  const updatedEntity = await updateProductRepo(productId, dto);

  return ProductDetail.fromEntity(updatedEntity);
};

// 상품 삭제 서비스
export const deleteProductService = async (productId: bigint, userId: bigint): Promise<void> => {
  const product = await findDetailProduct(productId);
  if (!product) throw new NotFoundError('상품을 찾을 수 없습니다.');

  if (product.userId !== userId) {
    throw new ForbiddenError('사용자님이 작성한 상품만 삭제할 수 있습니다.');
  }
  await deleteProductRepo(productId);
};

//상품 댓글 등록 서비스
export const createProductCommentService = async (
  productId: bigint,
  userId: bigint,
  content: string,
) => {
  const product = await findDetailProduct(productId);
  if (!product) throw new NotFoundError('해당 상품을 찾을 수 없습니다.');

  const comment = await createProductCommentRepo(userId, productId, content);

  return Comment.fromEntity(comment);
};

// 상품 댓글 조회 서비스
export const getProductCommentService = async (
  productId: bigint,
  limit: number,
  cursor?: bigint | undefined,
) => {
  const product = await findDetailProduct(productId);

  if (!product) throw new NotFoundError('해당 상품을 찾을 수 없습니다.');

  const entities = await getProductCommentRepo(productId, limit, cursor);

  const hasNextPage = entities.length > limit;

  const commentsToReturn = hasNextPage ? entities.slice(0, limit) : entities;

  const nextCursor = hasNextPage
    ? commentsToReturn[commentsToReturn.length - 1]?.id.toString()
    : null;

  const comments = commentsToReturn.map((c) => Comment.fromEntity(c));
  return { comments, nextCursor };
};
