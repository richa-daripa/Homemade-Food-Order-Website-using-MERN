import express from "express";
import multer from "multer";
import { addFood, editFood, removeFood, getFoodById } from "../controllers/foodController.js";

const adminFoodRouter = express.Router();

//Image Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage });

adminFoodRouter.post("/",
    upload.single("image"),  // "image" should match the frontend field name
    addFood);

adminFoodRouter.delete("/:id", removeFood);

adminFoodRouter.put("/:id",
    upload.single("image"),
    editFood);

adminFoodRouter.get("/:id", getFoodById);

export default adminFoodRouter;
