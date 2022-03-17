import { Document, ObjectId, model, Schema } from 'mongoose';

import { ModelNames, ProductStatuses } from 'enums';

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: ModelNames.USER },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewCount: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    photo: { key: String, url: String },
    countInStock: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ProductStatuses, default: ProductStatuses.InStock, required: true },
    reviews: [{ type: reviewSchema, default: [] }],
  },
  { timestamps: true },
);

export const ProductModel = model<IProductDocument>(ModelNames.PRODUCT, productSchema);

export interface IProductReview {
  user: ObjectId;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
}

export interface IProduct {
  productName: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  status: ProductStatuses;
  rating?: number;
  reviewCount?: number;
  photo?: any;
  reviews: IReview[];
}

export interface IReview {
  user: ObjectId;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
}

export interface IProductDocument extends IProduct, Document {}
