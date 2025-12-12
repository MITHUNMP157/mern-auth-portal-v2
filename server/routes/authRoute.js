import express from "express";
import { login, profile, register } from "../controllers/authController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", tokenVerify, profile);

export default router;
