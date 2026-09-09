import userModel from '../models/UserSchema.js'
import orderModel from '../models/OrderSchema.js'
import Stripe from 'stripe'
import { deliveryFee, GST, packagingFee } from '../../frontend/src/utils/constants.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.uid;    // middleware provides firebaseUid
        const { deliveryAddress, specialInstructions, paymentMethod } = req.body;

        const user = await userModel.findOne({
            firebaseUid: userId
        });

        if (!user) {
            return res.status(400).json({
                success: false, message: "User not found"
            });
        }

        if (!user.cartDetails || user.cartDetails.length === 0) {
            return res.status(400).json({
                success: false, message: "Cart is empty"
            });
        }

        const amount = user.cartDetails.reduce(
            (total, item) => total + item.unitPrice * item.quantity, 0);

        const totalAmount = amount + deliveryFee + GST + packagingFee;

        //======================= COD =========================================
        if (paymentMethod === "Cash on Delivery") {

            const newOrder = await orderModel.create({
                userId,
                items: user.cartDetails,
                amount: totalAmount,
                deliveryAddress,
                specialInstructions,
                paymentMethod,
                paymentStatus: "Pending"
            });

            await userModel.findOneAndUpdate(
                { firebaseUid: userId },
                {
                    $set: { cartDetails: [] }
                }
            );

            return res.status(200).json({
                success: true, message: "Order placed successfully", data: newOrder
            });
        }

        //=========================== CARD ======================================
        const line_items = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Item Total"
                    },
                    unit_amount: amount * 100
                },
                quantity: 1
            }, {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Fee"
                    },
                    unit_amount: deliveryFee * 100
                },
                quantity: 1
            }, {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "GST"
                    },
                    unit_amount: GST * 100
                },
                quantity: 1
            }, {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Packaging Fee"
                    },
                    unit_amount: packagingFee * 100
                },
                quantity: 1
            }
        ];

        // The order will be created by the Stripe webhook after successful payment

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,

            // The ?session_id=... query string is automatically appended by Stripe
            success_url: "http://localhost:5173/paymentSuccess?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5173/cart",

            metadata: {
                userId,
                paymentMethod,
                deliveryAddress: JSON.stringify(deliveryAddress),
                specialInstructions: JSON.stringify(specialInstructions || [])
            }
        })

        res.status(200).json({
            success: true, message: "Redirecting to payment", checkout_url: session.url, sessionId: session.id
        });

    } catch (error) {
        res.status(500).json({
            success: false, message: "Failed to place the order", details: error.message
        })
    }
}

const verifyPayment = async (req, res) => {

    try {
        const { sessionId } = req.params; // req.params contains route parameters from the URL path /payment-status/:sessionId
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        console.log(session);

        //Is payment paid?
        if (session.payment_status !== "paid") {
            return res.status(200).json({
                success: false, paymentStatus: "unpaid"
            });
        }

        const order = await orderModel.findOne({
            stripeSessionId: sessionId
        });

        // If payment is paid then is order created?
        if (!order) {
            return res.status(200).json({
                success: false, paymentStatus: "paid", orderStatus: "processing"
            });
        }

        return res.status(200).json({
            success: true, paymentStatus: "paid", orderStatus: "created", orderId: order._id
        });

    } catch (error) {
        return res.status(500).json({
            success: false, message: "Unable to verify payment", details: error.message
        });
    }
};

const orderConfirmation = async (req, res) => {
    try {
        const userId = req.user.uid;

        const order = await orderModel.findOne({
            _id: req.params.orderId,
            userId
        })

        if (!order) {
            return res.status(404).json({
                success: false, message: "Order not found"
            });
        }

        res.status(200).json({
            success: true, data: order
        });

    } catch (error) {
        res.status(500).json({
            succes: false, message: "Error fetching order details", details: error.message
        })
    }
}

//user's history of orders
const userOrders = async (req, res) => {
    try {
        const userId = req.user.uid;

        const orders = await orderModel.find({
            userId
        })

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "No order is created"
            });
        }

        res.status(200).json({
            success: true, data: orders
        });

    } catch (error) {
        res.status(500).json({
            succes: false, message: "Error fetching orders list", details: error.message
        })
    }
}

//view a single order 
const viewOrderDetails = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({
                success: false, message: "Order not found"
            });
        }
        res.status(200).json({
            success: true, data: order
        });

    } catch (error) {
        res.status(500).json({
            succes: false, message: "Error fetching order's details", details: error.message
        })
    }
}

export { placeOrder, verifyPayment, orderConfirmation, userOrders, viewOrderDetails }