import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userinfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const UserInfo = mongoose.model("UserInfo", userinfoSchema);

export default UserInfo;  