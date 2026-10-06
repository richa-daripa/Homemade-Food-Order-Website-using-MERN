import express from "express";
import { getAllFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.get("/", getAllFood);

export default foodRouter;
