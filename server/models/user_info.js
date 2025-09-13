import mongoose from "mongoose";

const userinfoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userinfoSchema);

export default UserInfo;
