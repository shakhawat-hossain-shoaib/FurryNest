import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { createUser, registerUser } from "../controllers/userController.js";   
const router = express.Router();
router.get("/users", registerUser);
router.post("/users", createUser);
dotenv.config();

export default router;
