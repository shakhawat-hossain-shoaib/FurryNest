import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  phone: String,
  gender: String,
  age: String,
  breed: String,
  diet: String,
  type: { type: String, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
