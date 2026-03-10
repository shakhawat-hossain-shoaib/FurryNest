import jwt from "jsonwebtoken";
import AdminInfo from "../models/admin_info.js";

const createToken = (_id) => {
  return jwt.sign({ _id, principalType: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminInfo.login(email, password);
    const token = createToken(admin._id);

    res.status(200).json({
      email: admin.email,
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message || "Invalid login credentials" });
  }
};

export const verifyAdminToken = async (req, res) => {
  try {
    if (req.user?.principalType !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const admin = await AdminInfo.findById(req.user._id).select("-password");
    if (!admin) {
      return res.status(401).json({ error: "Token verification failed" });
    }

    return res.status(200).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
    });
  } catch {
    return res.status(401).json({ error: "Token verification failed" });
  }
};
