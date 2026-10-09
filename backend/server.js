import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import { stripeWebhook } from './controllers/stripeWebhookController.js';
import adminOrderRouter from './routes/adminOrderRoutes.js';
import adminFoodRouter from './routes/adminFoodRoutes.js';


dotenv.config();

const app = express();

//app.use(cors());

// Enable CORS for frontend and admin client domains
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true
}));

app.post(
    "/api/stripe-webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

app.use(express.json());

connectDB();

app.use("/api/foods", foodRouter);
app.use("/images", express.static('uploads'));  //url for getting the uploaded images
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.use("/api/admin/foods", adminFoodRouter);
app.use("/api/admin/orders", adminOrderRouter);

// Local development listener
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

