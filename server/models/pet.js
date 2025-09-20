import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['dog', 'cat'], required: true },
  breed: String,
  age: String,
  gender: String,
  location: String,
  phone: String,
  diet: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
