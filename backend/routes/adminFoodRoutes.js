import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { addFood, editFood, removeFood, getFoodById } from "../controllers/foodController.js";

const adminFoodRouter = express.Router();

//Image Storage Config
//const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//        cb(null, "uploads/");
//    },
//    filename: (req, file, cb) => {
//        const uniqueName = `${Date.now()}-${file.originalname}`;
//        cb(null, uniqueName);
//    }
//})
//
//const upload = multer({ storage });

let upload;

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
    // Configure Cloudinary for Production
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "eatzio-uploads",
            allowed_formats: ["jpg", "png", "jpeg", "webp"]
        }
    });

    upload = multer({ storage });
} else {
    // Fallback to local disk storage for local development (if Cloudinary isn't set up locally yet)
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        }
    });
    upload = multer({ storage });
}

adminFoodRouter.post("/",
    upload.single("image"),  // "image" should match the frontend field name
    addFood);

adminFoodRouter.delete("/:id", removeFood);

adminFoodRouter.put("/:id",
    upload.single("image"),
    editFood);

adminFoodRouter.get("/:id", getFoodById);

export default adminFoodRouter;
