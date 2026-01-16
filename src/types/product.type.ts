import type { ParamsDictionary } from 'express-serve-static-core';

export interface ProductParams extends ParamsDictionary {
  productId: string;
}

export interface createProductDto {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export interface updateProductDto {
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
  images?: string[];
}
