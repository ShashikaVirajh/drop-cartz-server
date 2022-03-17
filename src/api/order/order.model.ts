import { Document, model, ObjectId, Schema, Types } from 'mongoose';

import { ModelNames, OrderStatuses } from 'enums';

const { ObjectId } = Types;

const orderItemSchema = new Schema({
  productId: { type: ObjectId, required: true, ref: 'Product' },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

const shippingAddressSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const paymentInfoSchema = new Schema({
  id: { type: String },
  status: { type: String },
  updateTime: { type: String },
  emailAddress: { type: String },
});

const orderSchema = new Schema(
  {
    id: { type: String },
    userId: { type: ObjectId, required: true, ref: 'User' },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentInfo: paymentInfoSchema,
    paymentMethod: { type: String, required: true },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    orderStatus: { type: OrderStatuses, required: true, default: OrderStatuses.Processing },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
);

export const OrderModel = model<IOrderDocument>(ModelNames.ORDER, orderSchema);

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentInfo {
  id: string;
  status: string;
  updateTime: string;
  emailAddress: string;
}

export interface IOrder {
  id?: any;
  userId: string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: OrderStatuses;
  paidAt?: Date;
  deliveredAt?: Date;
}

export interface IOrderDocument extends IOrder, Document {}
