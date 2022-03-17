import strings from './order.strings';
import { IOrder, IOrderDocument, OrderModel } from './order.model';
import { orderRepository } from './order.repository';

import { OrderStatuses } from 'enums';
import ErrorResponse from 'library/error-response';

class OrderService implements IOrderService {
  async createOrder(orderData: IOrder): Promise<IOrderDocument> {
    if (orderData?.orderItems?.length === 0) throw new ErrorResponse(strings.NO_ORDER_ITEMS, 404);

    const orderToCreate = new OrderModel(orderData);

    const createdOrder = await orderRepository.saveOrder(orderToCreate);
    return createdOrder;
  }

  async getAuthUserOrders(userId: string): Promise<IOrderDocument[]> {
    const orders = await orderRepository.getAuthUserOrders(userId);
    return orders;
  }

  async getOrderById(id: string): Promise<IOrderDocument> {
    const order = await orderRepository.getOrderById(id);
    if (!order) throw new ErrorResponse(strings.ORDER_NOT_FOUND, 404);

    return order;
  }

  async getAuthUserOrderById(orderId: string, userId: string): Promise<IOrderDocument> {
    const order = await orderRepository.getAuthUserOrderById(orderId, userId);
    if (!order) throw new ErrorResponse(strings.ORDER_NOT_FOUND, 404);

    return order;
  }

  async updateOrderStatus(orderId: string, orderStatus: OrderStatuses): Promise<IOrderDocument> {
    const order = await orderRepository.getOrderById(orderId);

    if (!order) throw new ErrorResponse(strings.ORDER_NOT_FOUND, 404);
    if (!Object.values(OrderStatuses).includes(orderStatus)) throw new ErrorResponse(strings.ORDER_STATUS_INVALID, 400);

    const updatedOrder = await orderRepository.updateOrderStatus(orderId, orderStatus);
    if (!updatedOrder) throw new ErrorResponse(strings.ORDER_NOT_FOUND, 404);

    return updatedOrder;
  }
}

interface IOrderService {
  createOrder(orderData: IOrder): Promise<IOrderDocument>;
  getAuthUserOrders(userId: string): Promise<IOrderDocument[]>;
  getOrderById(id: string): Promise<IOrderDocument>;
  getAuthUserOrderById(orderId: string, userId: string): Promise<IOrderDocument>;
  updateOrderStatus(orderId: string, orderStatus: OrderStatuses): Promise<IOrderDocument>;
}

export const orderService = new OrderService();
