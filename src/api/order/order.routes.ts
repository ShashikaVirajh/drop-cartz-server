import express, { Router } from 'express';

import { orderController } from './order.controller';
import { OrderModel } from './order.model';
import orderMapper from './order.mapper';

import { admin, auth, pagination } from 'middleware';

const router: Router = express.Router();

router.route('/').post(auth, orderController.createOrder);
router.route('/').get([admin, pagination(OrderModel, orderMapper)], orderController.getOrders);
// router.route('/:id/pay').patch(auth, orderController.updateOrderStatus);
router.route('/me').get(auth, orderController.getAuthUserOrders);
router.route('/me/:id').get(auth, orderController.getAuthUserOrderById);
router.route('/:id/status').patch(auth, orderController.updateOrderStatus);
router.route('/:id').get(admin, orderController.getOrderById);

export default router;
