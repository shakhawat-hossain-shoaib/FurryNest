import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  availability: { type: String },
  message: { type: String },
}, { timestamps: true });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export default Volunteer;
