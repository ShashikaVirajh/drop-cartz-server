import { Model } from 'mongoose';

import { IProductReview, IProductDocument, ProductModel } from './product.model';

import { ProductStatuses } from 'enums';

class ProductRepository implements IProductRepository {
  private productModel: Model<IProductDocument>;

  constructor(model: Model<IProductDocument>) {
    this.productModel = model;
  }

  async saveProduct(product: IProductDocument): Promise<IProductDocument> {
    try {
      const savedProduct = await product.save();
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: string): Promise<IProductDocument | null> {
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getTopProducts(): Promise<IProductDocument[]> {
    try {
      const product = await this.productModel.find({}).sort({ rating: -1 }).limit(3);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<IProductDocument | null> {
    try {
      const dataToUpdate = { status: ProductStatuses.Deleted };
      const options = { new: true };

      const updatedProduct = await this.productModel.findByIdAndUpdate(productId, dataToUpdate, options);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async getUserReviewForProduct(product: IProductDocument, userId: string): Promise<IProductReview | undefined> {
    try {
      const review = product.reviews?.find((review: IProductReview) => review?.user?.toString() === userId);
      return review;
    } catch (error) {
      throw error;
    }
  }
}

export const productRepository = new ProductRepository(ProductModel);

interface IProductRepository {
  saveProduct(product: IProductDocument): Promise<IProductDocument>;
  getProductById(id: string): Promise<IProductDocument | null>;
  getTopProducts(): Promise<IProductDocument[]>;
  deleteProduct(id: string): Promise<IProductDocument | null>;
  getUserReviewForProduct(product: IProductDocument, userId: string): Promise<IProductReview | undefined>;
}
