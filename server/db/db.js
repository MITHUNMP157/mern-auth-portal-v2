import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb is connected success..");
  } catch (error) {
    console.log("Connection failed due to mongodb error:", error);
  }
};
