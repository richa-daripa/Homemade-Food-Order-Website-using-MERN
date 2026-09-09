import express from "express";
import { getAllUsers, syncUser } from "../controllers/userController.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/sync-user", verifyFirebaseToken, syncUser);

userRouter.get("/", getAllUsers);

export default userRouter;