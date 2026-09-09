import { model, Schema } from 'mongoose'

const reviewModel = new Schema({
    userId: {
        type: String, // "firebaseUid"
        unique: true
    },
    foodId: {
        type: String,
        unique: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})

export default reviewModel;