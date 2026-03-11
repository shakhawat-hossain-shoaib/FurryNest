import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import AdminInfo from "../models/admin_info.js";

dotenv.config();

const isBcryptHash = (value) => typeof value === "string" && /^\$2[aby]\$\d{2}\$/.test(value);

const syncAdminAccount = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PHONE, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PHONE || !ADMIN_PASSWORD) {
    console.warn("Admin bootstrap skipped because required environment variables are missing");
    return;
  }

  const existingAdminByEmail = await AdminInfo.findOne({ email: ADMIN_EMAIL });
  const fallbackAdmin = existingAdminByEmail ?? await AdminInfo.findOne({ role: "admin" }).sort({ createdAt: 1 });
  const admin = fallbackAdmin ?? new AdminInfo();

  admin.name = ADMIN_NAME;
  admin.email = ADMIN_EMAIL;
  admin.phone = ADMIN_PHONE;
  admin.role = "admin";

  const currentPassword = admin.password;
  const passwordMatches = isBcryptHash(currentPassword)
    ? await bcrypt.compare(ADMIN_PASSWORD, currentPassword)
    : currentPassword === ADMIN_PASSWORD;

  if (!passwordMatches) {
    admin.password = await bcrypt.hash(ADMIN_PASSWORD, 10);
  } else if (!isBcryptHash(currentPassword)) {
    admin.password = await bcrypt.hash(ADMIN_PASSWORD, 10);
  }

  await admin.save();
  console.log("Admin account synchronized");
};

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("MongoDB connected successfully");
    await syncAdminAccount();
    
    // Add connection error handler
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Add disconnection handler
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

export default connectDB;
