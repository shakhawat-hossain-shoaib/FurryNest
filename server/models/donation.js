import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String },
  message: { type: String },
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
