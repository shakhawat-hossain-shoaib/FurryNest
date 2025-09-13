import UserInfo from "../models/user_info.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get all users
export const registerUser = async (req, res) => {
  try {
    const user_info = await UserInfo.find();
    res.json(user_info);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    const existing = await UserInfo.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new UserInfo({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already registered" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};
