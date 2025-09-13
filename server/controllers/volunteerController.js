import Volunteer from '../models/volunteer.js';

export const registerVolunteer = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, availability, message } = req.body;
    const volunteer = new Volunteer({ name, email, phone, availability, message });
    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registered' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
