import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['dog', 'cat'], required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  description: { type: String, default: '' },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  diet: { type: String, required: true },
  owner: { type: String, default: 'FurryNest Shelter' },
  address: { type: String, default: '' },
  imageUrl: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'adopted', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
