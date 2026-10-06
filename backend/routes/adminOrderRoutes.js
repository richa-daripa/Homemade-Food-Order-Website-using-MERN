import express from 'express';
import { getAllOrders, updateOrderStatus, updatePaymentStatus, viewOrder } from '../controllers/adminOrderController.js';

const adminOrderRouter = express.Router();

adminOrderRouter.get('/', getAllOrders);
adminOrderRouter.put('/:orderId/order-status',updateOrderStatus);
adminOrderRouter.put('/:orderId/payment-status',updatePaymentStatus);
adminOrderRouter.get('/:orderId',viewOrder);

export default adminOrderRouter;