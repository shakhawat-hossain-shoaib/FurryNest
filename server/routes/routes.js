import express from "express";
import { createUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

// Routes
router.get("/users", registerUser);
router.post("/users", createUser);

export default router;
