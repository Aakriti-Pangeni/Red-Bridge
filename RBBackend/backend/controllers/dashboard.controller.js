import Donor from '../models/donor.model.js';
import User from '../models/user.model.js';

// GET total donors & total users
export const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({ totalDonors, totalUsers });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err });
  }
};

// GET blood group distribution
export const getBloodDistribution = async (req, res) => {
  try {
    const donors = await Donor.find({}, 'bloodGroup');
    const distribution = {};

    donors.forEach((donor) => {
      const bg = donor.bloodGroup;
      distribution[bg] = (distribution[bg] || 0) + 1;
    });

    res.status(200).json(distribution);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blood distribution', error: err });
  }
};
