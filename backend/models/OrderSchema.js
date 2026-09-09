import { model, Schema } from 'mongoose'

const orderSchema = new Schema({
    userId: {
        type: String,  //"firebaseUid"
        required: true
    },
    items: {
        type: Array,
        default: []
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["Online Payment", "Cash on Delivery"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    status: {
        type: String,
        enum: ["Food is Preparing", "Out for Delivery", "Order Delivered"],
        default: "Food is Preparing"
    },
    orderedAt: {
        type: Date,
        default: Date.now
    },
    deliveryAddress: {
        firstName: String,
        lastName: String,
        phone: String,
        address1: String,
        address2: String,
        city: String,
        pincode: String
    },
    specialInstructions: {
        type: [String],
        default: []
    },
    stripeSessionId: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    versionKey: false
})

export default model("orderModel", orderSchema);