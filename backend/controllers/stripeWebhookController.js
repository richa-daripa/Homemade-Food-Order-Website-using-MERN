import orderModel from '../models/OrderSchema.js';
import userModel from "../models/UserSchema.js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook signature error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`); //beacuse Stripe expects a raw response body (plain text)
    }


    try {
        const session = event.data.object;
        console.log("Stripe event received:", event.type);

        switch (event.type) {
            case "checkout.session.completed": {

                if (session.payment_status !== "paid") {
                    return res.sendStatus(200);
                }

                const existingOrder = await orderModel.findOne({
                    stripeSessionId: session.id
                });

                if (existingOrder) {
                    return res.sendStatus(200);
                }

                const { userId, paymentMethod, deliveryAddress, specialInstructions } = session.metadata;

                const user = await userModel.findOne({
                    firebaseUid: userId
                });

                if (!user) {
                    throw new Error(`User not found: ${userId}`); //webhook handler treat this as a processing failure rather than telling Stripe "this request was bad."
                }

                const totalAmount = session.amount_total / 100;

                const newOrder = await orderModel.create({
                    userId,
                    items: user.cartDetails,
                    amount: totalAmount,
                    paymentMethod,
                    paymentStatus: "Paid",
                    deliveryAddress: JSON.parse(deliveryAddress),
                    specialInstructions: JSON.parse(specialInstructions || "[]"),
                    stripeSessionId: session.id
                });

                await userModel.findOneAndUpdate(
                    { firebaseUid: userId },
                    {
                        $set: { cartDetails: [] }
                    }
                );
                return res.sendStatus(200);
            }

            case "checkout.session.expired": {
                return res.sendStatus(200);
            }

            default: {
                console.log(`Unhandled event type: ${event.type}`);
                return res.sendStatus(200); // or return res.status(200).json({ received: true });
            }
        }
    } catch (error) {
        return res.status(500).send(`Webhook processing failed: ${error.message}`);
    }
};