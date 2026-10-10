import foodModel from "../models/FoodSchema.js";
import { v2 as cloudinary } from "cloudinary";

// add a food item
export const addFood = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        const image = req.file ? req.file.path : "";

        const savedFood = await foodModel.create({
            name, image, description, price, category
        });

        console.log(image);

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

        // Delete image from Cloudinary if the image URL exists and belongs to Cloudinary
        if (deletedFood.image && deletedFood.image.includes("cloudinary.com")) {
            try {
                // Extract public ID from Cloudinary URL
                const urlParts = deletedFood.image.split("/");
                const uploadIndex = urlParts.indexOf("upload");
                
                if (uploadIndex !== -1) {
                    // Get everything after 'upload/vXXXXXXX/' up to the file extension
                    const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join("/");
                    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf("."));

                    await cloudinary.uploader.destroy(publicId);
                }
            } catch (cloudErr) {
                console.error("Error deleting image from Cloudinary:", cloudErr.message);
            }
        }

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

        // If a new image is uploaded, handle Cloudinary replacement
        if (req.file) {
            // 1. Delete the old image from Cloudinary if it exists
            if (existingFood.image && existingFood.image.includes("cloudinary.com")) {
                try {
                    const urlParts = existingFood.image.split("/");
                    const uploadIndex = urlParts.indexOf("upload");
                    
                    if (uploadIndex !== -1) {
                        const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join("/");
                        const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf("."));
                        await cloudinary.uploader.destroy(publicId);
                    }
                } catch (cloudErr) {
                    console.error("Error deleting old image from Cloudinary:", cloudErr.message);
                }
            }

            // 2. Assign the new Cloudinary secure URL from req.file.path
            updatedData.image = req.file.path;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id, updatedData, { new: true, runValidators: true }
        );

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
