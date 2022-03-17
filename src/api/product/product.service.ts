import { IProduct, IProductReview, IProductDocument, ProductModel } from './product.model';
import { productRepository } from './product.repository';
import { S3Folders } from 'enums';
import strings from './product.strings';
import Storage from 'library/storage.library';

import ErrorResponse from 'library/error-response';

class ProductService implements IProductService {
  async createProduct(productData: IProduct): Promise<IProductDocument> {
    const productToSave = new ProductModel(productData);

    const createdProduct = await productRepository.saveProduct(productToSave);
    return createdProduct;
  }

  async updateProduct(product: IProduct): Promise<IProductDocument> {
    const productToUpdate = new ProductModel(product);

    const updatedProduct = await productRepository.saveProduct(productToUpdate);
    return updatedProduct;
  }

  async getProductById(id: string): Promise<IProductDocument> {
    const product = await productRepository.getProductById(id);
    if (!product) throw new ErrorResponse(strings.PRODUCT_NOT_FOUND, 404);

    return product;
  }

  async getTopProducts(): Promise<IProductDocument[]> {
    const products = await productRepository.getTopProducts();
    if (products.length === 0) throw new ErrorResponse(strings.NO_PRODUCTS_FOUND, 404);

    return products;
  }

  async deleteProduct(productId: string): Promise<IProductDocument> {
    const product = await productRepository.getProductById(productId);
    if (!product) throw new ErrorResponse(strings.PRODUCT_NOT_FOUND, 404);

    const deletedProduct = await productRepository.deleteProduct(productId);
    if (!deletedProduct) throw new ErrorResponse(strings.PRODUCT_NOT_FOUND, 404);

    return deletedProduct;
  }

  async createProductReview(productId: string, userId: string, productReviewData: IProductReview): Promise<string> {
    const product = await productRepository.getProductById(productId);
    if (!product) throw new ErrorResponse(strings.PRODUCT_NOT_FOUND, 404);

    const review = await productRepository.getUserReviewForProduct(product, userId);

    if (review) {
      review.rating = productReviewData?.rating;
      review.comment = productReviewData?.comment;
    } else {
      product.reviews?.push(productReviewData);
      product.reviewCount = product.reviews.length;
    }

    product.rating = product.reviews?.reduce((acc, item) => item?.rating + acc, 0) / product.reviews?.length;

    await productRepository.saveProduct(product);
    return strings.PRODUCT_REVIEW_SAVED;
  }

  async uploadProductPhoto(id: string, photo: string): Promise<IProductDocument> {
    const product = await productRepository.getProductById(id);

    if (!product) throw new ErrorResponse(strings.PRODUCT_NOT_FOUND, 400);

    const { success, data } = await Storage.uploadImage(S3Folders.Products, photo);

    if (!success) throw new ErrorResponse(strings.PHOTO_UPLOAD_FAILED, 400);

    product.photo = data;

    const updatedProduct = await productRepository.saveProduct(product);
    return updatedProduct;
  }
}

interface IProductService {
  createProduct(productData: IProduct): Promise<IProductDocument>;
  updateProduct(product: IProduct): Promise<IProductDocument>;
  getProductById(id: string): Promise<IProductDocument>;
  getTopProducts(): Promise<IProductDocument[]>;
  deleteProduct(id: string): Promise<IProductDocument>;
  createProductReview(productId: string, userId: string, productReviewData: IProductReview): Promise<string>;
  uploadProductPhoto(id: string, photo: string): Promise<IProductDocument>;
}

export const productService = new ProductService();
