import express from 'express'
import { verifyFirebaseToken } from '../middleware/authMiddleware.js'
import { placeOrder, verifyPayment, orderConfirmation, userOrders, viewOrderDetails } from '../controllers/orderController.js'

const orderRouter =express.Router();

orderRouter.post('/',verifyFirebaseToken, placeOrder);
orderRouter.get("/payment-status/:sessionId", verifyFirebaseToken, verifyPayment);
orderRouter.get("/order-confirmation/:orderId",verifyFirebaseToken, orderConfirmation);
orderRouter.get('/',verifyFirebaseToken, userOrders);
orderRouter.get('/:orderId',verifyFirebaseToken, viewOrderDetails);

export default orderRouter;
