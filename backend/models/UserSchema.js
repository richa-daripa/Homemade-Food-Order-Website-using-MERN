import { Schema, model } from 'mongoose';

const userSchema = new Schema({

    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },

    lastLogin: {
        type: Date,
        default: Date.now
    },

    cartDetails: [
        {
            _id: false,
            
            foodId: {
                type: Schema.Types.ObjectId,
                ref: "foodModel",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            unitPrice: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

export default model("userModel", userSchema); 