import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import AdminInfo from "./models/admin_info.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.ADMIN_NAME || "FurryNest Admin";
    const email = process.env.ADMIN_EMAIL;
    const phone = process.env.ADMIN_PHONE || "0000000000";
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env before running seed:admin"
      );
    }

    const exists = await AdminInfo.findOne({ email });
    if (exists) {
      console.log("Admin already exists in admin_info collection");
      process.exit(0);
    }

    await AdminInfo.signup(name, email, phone, password);
    console.log("Admin seeded successfully into admin_info collection");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
