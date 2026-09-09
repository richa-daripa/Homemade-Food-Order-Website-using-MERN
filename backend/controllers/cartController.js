import userModel from "../models/UserSchema.js";
import foodModel from '../models/FoodSchema.js';

//add items to user cart
const addToCart = async (req, res) => {
    try {

        const { foodId } = req.body;

        const user = await userModel.findOne({
            firebaseUid: req.user.uid
        });

        //find the food
        const food = await foodModel.findById(foodId);

        const cartItem = user.cartDetails.find(
            item => item.foodId.toString() === foodId
        );

        if (cartItem) {
            // Item already exists → increase quantity
            cartItem.quantity += 1;
        } else {
            // Item doesn't exist → add new item
            user.cartDetails.push({
                foodId: food._id,
                name: food.name,
                unitPrice: food.price,
                quantity: 1
            });
        }
        await user.save();

        res.status(200).json({
            succes: true, message: "Item Added to plate", data: user.cartDetails
        });

    } catch (error) {
        res.status(500).json({
            succes: false, message: "Error adding item to plate", details: error.message
        })
    }
}

//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { foodId } = req.params;//its a string 

        const user = await userModel.findOne({
            firebaseUid: req.user.uid
        });

        const cartItem = user.cartDetails.find(
            item => item.foodId.toString() === foodId
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false, message: "Item not found in cart"
            });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        }
        await user.save();

        res.status(200).json({ succes: true, message: "Item Removed from plate" });

    } catch (error) {
        res.status(500).json({
            succes: false, message: "Error removing item from plate", details: error.message
        })
    }
}

//fetch user cart details
const getCart = async (req, res) => {
    try {

        const user = await userModel.findOne({
            firebaseUid: req.user.uid
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = user.cartDetails;

        res.status(200).json({ success: true, data: cartData });

    } catch (error) {
        res.status(500).json({
            succes: false, message: "Error fetching cart details", details: error.message
        })
    }
}

//delete entire item from user cart irrespective of the quantity
const deleteFromCart = async (req, res) => {
    try {
        const { foodId } = req.params;

        await userModel.findOneAndUpdate(
            { firebaseUid: req.user.uid },
            {
                $pull: {
                    cartDetails: {
                        foodId: foodId
                    }
                }
            }
        );

        res.status(200).json({ succes: true, message: "Item deleted from plate" });

    } catch (error) {
        res.status(500).json({
            succes: false, message: "Error deleting item", details: error.message
        })
    }
}

export { addToCart, removeFromCart, getCart, deleteFromCart }