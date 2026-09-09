import express from 'express'
import { addToCart, removeFromCart, getCart, deleteFromCart } from '../controllers/cartController.js'
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.get("/", verifyFirebaseToken, getCart);
cartRouter.post("/add", verifyFirebaseToken, addToCart);
cartRouter.put("/remove/:foodId", verifyFirebaseToken, removeFromCart);
cartRouter.delete("/delete/:foodId", verifyFirebaseToken, deleteFromCart);

export default cartRouter;