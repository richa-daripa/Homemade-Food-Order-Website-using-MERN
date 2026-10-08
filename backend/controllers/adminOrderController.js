import orderModel from '../models/OrderSchema.js';

//get orders for all customers
export const getAllOrders = async (req, res) => {
    try {
        const orderList = await orderModel.find()
            .sort({ orderedAt: -1 }); //Newest → Oldest orders

        res.status(200).json({
            success: true, data: orderList
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: "Error fetching all cutomer's orders", details: error.message
        })
    }
}

//update order status for an order
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({
                success: false, message: "Order not found",
            });
        }

        if (order.status === "Order Delivered") {
            return res.status(400).json({
                success: false, message: "Delivered orders cannot be updated"
            });
        }
        // Update order status
        order.status = status;

        await order.save();

        res.status(200).json({
            success: true, message: "Order status updated successfully", data: order
        })

    } catch (error) {
        res.status(500).json({
            success: false, message: "Failed to update order status", details: error.message
        })
    }
}

//update payment status for an order
export const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({
                success: false, message: "Order not found",
            });
        }

        if (order.paymentMethod !== "Cash on Delivery") {
            return res.status(400).json({
                success: false, message: "Payment status can only be updated for COD orders"
            });
        }

        // Payment is already marked as Paid
        if (order.paymentStatus === "Paid") {
            return res.status(400).json({
                success: false,
                message: "Payment status is already Paid and cannot be changed",
            });
        }

        // Update payment status
        order.paymentStatus = paymentStatus;

        await order.save();

        res.status(200).json({
            success: true, message: "Payment status updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: "Failed to update payment status", details: error.message
        })
    }
}

//view an order of a customer
export const viewOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({
                success: false, message: "Order not found",
            });
        }
        res.status(200).json({
            success: true, data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: `Failed to fetch order details for order no.: ${orderId}`, details: error.message
        })
    }
}