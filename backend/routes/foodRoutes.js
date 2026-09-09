import express from "express";
import multer from "multer";
import { addFood, getAllFood, editFood, removeFood, getFoodById } from "../controllers/foodController.js";

const foodRouter = express.Router();

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

//POST: /api/foods/
foodRouter.post("/",
    upload.single("image"),  // "image" should match the frontend field name
    addFood);

//GET: /api/foods/
foodRouter.get("/", getAllFood);

//DELETE: /api/foods/id
foodRouter.delete("/:id", removeFood);

//PUT: /api/foods/id
foodRouter.put("/:id",
    upload.single("image"),
    editFood);

//GET: /api/foods/id
foodRouter.get("/:id", getFoodById);

export default foodRouter;
