<<<<<<< HEAD
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
=======
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
>>>>>>> 2f5902e51a5554839b7167716ff1a2ca15518634
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

<<<<<<< HEAD
const Pet = mongoose.model('Pet', petSchema);
=======
const Pet = mongoose.model("Pet", petSchema);

>>>>>>> 2f5902e51a5554839b7167716ff1a2ca15518634
export default Pet;
