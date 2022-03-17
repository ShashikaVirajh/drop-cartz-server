import { Model } from 'mongoose';

import { IOrderDocument, OrderModel } from './order.model';

import { OrderStatuses } from 'enums';

class OrderRepository implements IOrderRepository {
  private orderModel: Model<IOrderDocument>;

  constructor(model: Model<IOrderDocument>) {
    this.orderModel = model;
  }

  async saveOrder(order: IOrderDocument): Promise<IOrderDocument> {
    try {
      const savedOrder = await order.save();
      return savedOrder;
    } catch (error) {
      throw error;
    }
  }

  async getAuthUserOrders(userId: string): Promise<IOrderDocument[]> {
    try {
      const orders = await this.orderModel.find({ userId });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(id: string): Promise<IOrderDocument | null> {
    try {
      const order = await this.orderModel.findById(id);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getAuthUserOrderById(orderId: string, userId: string): Promise<IOrderDocument | null> {
    try {
      const order = await this.orderModel.findOne({ _id: orderId, userId });

      return order;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, orderStatus: OrderStatuses): Promise<IOrderDocument | null> {
    try {
      const dataToUpdate = { orderStatus };
      const options = { new: true };

      const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, dataToUpdate, options);
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }
}

export const orderRepository = new OrderRepository(OrderModel);

interface IOrderRepository {
  saveOrder(order: IOrderDocument): Promise<IOrderDocument>;
  getAuthUserOrders(userId: string): Promise<IOrderDocument[]>;
  getOrderById(id: string): Promise<IOrderDocument | null>;
  getAuthUserOrderById(orderId: string, userId: string): Promise<IOrderDocument | null>;
  updateOrderStatus(orderId: string, orderStatus: OrderStatuses): Promise<IOrderDocument | null>;
}
