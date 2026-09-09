import foodModel from "../models/FoodSchema.js";
import fs from 'fs';

// add a food item
export const addFood = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        const image = req.file ? req.file.filename : "";

        const savedFood = await foodModel.create({
            name, image, description, price, category
        });

        res.status(200).json({
            success: true, message: "Food added successfully", data: savedFood
        })

    } catch (err) {
        res.status(500).json({
            success: false, message: "Failed to add food item", details: err.message
        })
    }
}


//list down all food items
export const getAllFood = async (req, res) => {
    try {
        const allFoodItems = await foodModel.find();
        res.status(200).json({
            success: true, data: allFoodItems
        })
    } catch (err) {
        res.status(500).json({
            success: false, message: "Could not fetch all food items", details: err.message
        })
    }
}

//remove a food item
export const removeFood = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFood = await foodModel.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({
                success: false, message: "Food Item not found"
            });
        }

        fs.unlink(`uploads/${deletedFood.image}`, () => { })

        res.status(200).json({
            success: true, message: "Food deleted successfully", data: deletedFood
        });
    } catch (err) {
        res.status(500).json({
            success: false, message: "Error deleting food", details: err.message
        });
    }
}

//edit a food item
export const editFood = async (req, res) => {
    try {
        const { id } = req.params;

        const existingFood = await foodModel.findById(req.params.id);
        if (!existingFood) {
            return res.status(404).json({
                succes: false, message: "Food item not found"
            })
        }

        const { name, price, description, category } = req.body;
        const updatedData = { name, price, description, category };

        if (req.file && existingFood.image) {

            //Delete old image from upload folder
            fs.unlink(`uploads/${existingFood.image}`, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                }
            });
            //Save updated image
            updatedData.image = req.file.filename;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id, updatedData, { new: true, runValidators: true }
        );

        //if (!updatedFood) {
        //    return res.status(404).json({
        //        success: false,
        //        message: "Food item not found"
        //    });
        //}
        res.status(200).json({
            success: true, message: "Food updated successfully", data: updatedFood
        });
    } catch (err) {
        res.status(500).json({
            success: false, message: "Error updating food", details: err.message
        });
    }
}

// get a food item
export const getFoodById = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({
                succes: false, message: "Food item not found"
            })
        }
        res.status(200).json(foodItem);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching food details", details: err.message
        })
    }
}
