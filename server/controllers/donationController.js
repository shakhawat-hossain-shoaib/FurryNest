import Donation from '../models/donation.js';

export const listDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDonation = async (req, res) => {
  try {
    const { name, email, amount, method, message } = req.body;
    const donation = new Donation({ name, email, amount, method, message });
    await donation.save();
    res.status(201).json({ message: 'Donation received' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDonationStats = async (req, res) => {
  try {
    const [summary, latestDonation, recentMessages] = await Promise.all([
      Donation.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
            donationCount: { $sum: 1 },
            averageDonation: { $avg: '$amount' },
          },
        },
      ]),
      Donation.findOne().sort({ createdAt: -1 }).select('amount createdAt'),
      Donation.find({ message: { $exists: true, $ne: '' } })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name amount method message createdAt'),
    ]);

    const stats = summary[0] || { totalAmount: 0, donationCount: 0, averageDonation: 0 };

    res.json({
      totalAmount: Number(stats.totalAmount || 0),
      donationCount: Number(stats.donationCount || 0),
      averageDonation: Number(stats.averageDonation || 0),
      latestDonationAmount: Number(latestDonation?.amount || 0),
      latestDonationDate: latestDonation?.createdAt || null,
      recentMessages: recentMessages.map((item) => ({
        id: item._id,
        name: item.name,
        amount: Number(item.amount || 0),
        method: item.method || 'N/A',
        message: item.message,
        createdAt: item.createdAt,
      })),
    });
  } catch {
    res.status(500).json({ message: 'Failed to fetch donation stats' });
  }
};
