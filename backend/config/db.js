import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB Atlas successfully!")
        console.log("Database:", mongoose.connection.name);
    } catch (err) {
        console.error("Database connection error: ", err);
        process.exit(1);
    }
}

export default connectDB;