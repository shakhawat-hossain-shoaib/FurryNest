import UserInfo from "../models/user_info.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id, principalType: "user" }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// verify user token
export const verifyToken = async (req, res) => {
  try {
    if (req.user?.principalType && req.user.principalType !== "user") {
      return res.status(403).json({ error: "User access required" });
    }

    const user = await UserInfo.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(401).json({ error: "Token verification failed" });
    }

    res.status(200).json(user);
  } catch {
    res.status(401).json({ error: "Token verification failed" });
  }
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserInfo.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ 
      email, 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ error: error.message || "Invalid login credentials" });
  }
};

// signup user
export const createUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = await UserInfo.signup(name, email, phone, password);
    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
