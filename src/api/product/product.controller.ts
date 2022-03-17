import { Request, Response } from 'express';

import { IProduct, IProductDocument, IProductReview } from './product.model';
import ProductMapper from './product.mapper';
import { productService } from './product.service';
import strings from './product.strings';

import asyncHandler from 'middleware/async-handler.middleware';
import { TResponse } from 'types';

class ProductController {
  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productName, photo, brand, category, description, price, countInStock, status } = req.body;

    const payload: IProduct = {
      productName,
      brand,
      category,
      description,
      price,
      photo,
      countInStock,
      status,
      reviews: [],
    };

    const product = await productService.createProduct(payload);
    const mappedProduct = new ProductMapper(product);

    const response: TResponse = {
      success: true,
      data: mappedProduct,
    };

    res.status(200).json(response);
  });

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productName, photo, brand, category, description, price, countInStock } = req.body;
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (product) {
      product.productName = productName;
      product.photo = photo;
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;
    }

    const updatedProduct = await productService.updateProduct(product);
    const mappedProduct = new ProductMapper(updatedProduct);

    const response: TResponse = {
      success: true,
      data: mappedProduct,
    };

    res.status(200).json(response);
  });

  getProducts = asyncHandler(async (req: Request, res: Response) => {
    const data = {
      products: res.paginatedResult?.data,
      paginate: res.paginatedResult?.paginate,
      count: res.paginatedResult?.count,
    };

    const response: TResponse = {
      success: true,
      data,
    };

    res.status(200).json(response);
  });

  getTopProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await productService.getTopProducts();
    const mappedProducts = products.map((product: IProductDocument) => new ProductMapper(product));

    const response: TResponse = {
      success: true,
      data: mappedProducts,
    };

    res.status(200).json(response);
  });

  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req?.params;
    const product = await productService.getProductById(id);

    const mappedProduct = new ProductMapper(product);

    const response: TResponse = {
      success: true,
      data: mappedProduct,
    };

    res.status(200).json(response);
  });

  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req?.params;
    const deletedProduct = await productService.deleteProduct(id);
    const mappedProduct = new ProductMapper(deletedProduct);

    const response: TResponse = {
      success: true,
      data: mappedProduct,
    };

    res.status(200).json(response);
  });

  createProductReview = asyncHandler(async (req: Request, res: Response) => {
    const { id: userId } = req?.authUser;
    const { id: productId } = req?.params;
    const { firstName, lastName, rating, comment } = req.body;

    const reviewPayload: IProductReview = {
      user: userId,
      firstName,
      lastName,
      rating,
      comment,
    };

    const message = await productService.createProductReview(productId, userId, reviewPayload);

    const response: TResponse = {
      success: true,
      message,
    };

    res.status(201).json(response);
  });

  uploadProductPhoto = asyncHandler(async (req: Request, res: Response) => {
    const { photo } = req?.body;
    const { id } = req?.params;

    const product = await productService.uploadProductPhoto(id, photo);
    const mappedProduct = new ProductMapper(product);

    const response: TResponse = {
      success: true,
      message: strings.PRODUCT_PHOTO_UPDATED,
      data: mappedProduct,
    };

    res.status(200).json(response);
  });
}

export const productController = new ProductController();
