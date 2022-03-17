import { Request, Response } from 'express';

import { IOrder, IOrderDocument } from './order.model';
import OrderMapper from './order.mapper';
import { orderService } from './order.service';

import { TResponse } from 'types';

import asyncHandler from 'middleware/async-handler.middleware';

class OrderController {
  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentInfo,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus,
    } = req.body;

    const { id } = req.authUser;

    const payload: IOrder = {
      userId: id,
      orderItems,
      shippingAddress,
      paymentInfo,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus,
    };

    const order = await orderService.createOrder(payload);
    const mappedOrder = new OrderMapper(order);

    const response: TResponse = {
      success: true,
      data: mappedOrder,
    };

    res.status(200).json(response);
  });

  getOrders = asyncHandler(async (req: Request, res: Response) => {
    const response: TResponse = {
      success: true,
      ...res.paginatedResult,
    };

    res.status(200).json(response);
  });

  getAuthUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.authUser;
    const Orders = await orderService.getAuthUserOrders(id);

    const mappedOrders = await Promise.all(Orders.map(async (order: IOrderDocument) => new OrderMapper(order)));

    const response: TResponse = {
      success: true,
      data: mappedOrders,
    };

    res.status(200).json(response);
  });

  getOrderById = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    const Order = await orderService.getOrderById(id);

    const mappedOrder = new OrderMapper(Order);

    const response: TResponse = {
      success: true,
      data: mappedOrder,
    };

    res.status(200).json(response);
  });

  getAuthUserOrderById = asyncHandler(async (req, res) => {
    const { id: orderId } = req?.params;
    const { id: userId } = req?.authUser;

    const order = await orderService.getAuthUserOrderById(orderId, userId);
    const mappedOrder = new OrderMapper(order);

    const response: TResponse = {
      success: true,
      data: mappedOrder,
    };

    res.status(200).json(response);
  });

  updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const { orderStatus } = req?.body;
    const { id } = req?.params;

    const order = await orderService.updateOrderStatus(id, orderStatus);
    const mappedOrder = new OrderMapper(order);

    const response: TResponse = {
      success: true,
      data: mappedOrder,
    };

    res.status(200).json(response);
  });
}

export const orderController = new OrderController();
