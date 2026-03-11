import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    petName: { type: String, required: true, trim: true, maxlength: 80 },
    author: { type: String, required: true, trim: true, maxlength: 120 },
    story: { type: String, required: true, trim: true, maxlength: 3000 },
    image: { type: String, trim: true, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SuccessStory = mongoose.model("SuccessStory", successStorySchema);

export default SuccessStory;
