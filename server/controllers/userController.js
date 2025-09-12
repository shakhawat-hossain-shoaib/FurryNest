import UserInfo from "../models/user_info.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const user_info = await UserInfo.find()
        res.json(user_info);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

};
export const createUser = async (req, res) => {
    try {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserInfo({ name, email, phone, password: hashedPassword });
    await res.status(201).json({ message: "User created successfully" });
    await user.save();
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

