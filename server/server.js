import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server listen to port ${PORT} in ${process.env.NODE_ENV}.`);
});
