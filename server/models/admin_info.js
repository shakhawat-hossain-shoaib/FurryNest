import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const adminInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter admin name"],
    },
    email: {
      type: String,
      required: [true, "Please enter admin email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },
    phone: {
      type: String,
      required: [true, "Please enter admin phone number"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

adminInfoSchema.statics.signup = async function (name, email, phone, password) {
  if (!name || !email || !phone || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return this.create({ name, email, phone, password: hash, role: "admin" });
};

adminInfoSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error("Invalid login credentials");
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error("Invalid login credentials");
  }

  return admin;
};

const AdminInfo = mongoose.model("AdminInfo", adminInfoSchema, "admin_info");

export default AdminInfo;
