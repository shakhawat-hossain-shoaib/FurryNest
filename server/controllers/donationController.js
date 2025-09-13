import Donation from '../models/donation.js';

export const listDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDonation = async (req, res) => {
  try {
    const { name, email, amount, method, message } = req.body;
    const donation = new Donation({ name, email, amount, method, message });
    await donation.save();
    res.status(201).json({ message: 'Donation received' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
