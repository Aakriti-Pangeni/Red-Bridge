// import Donor from '../models/donor.model.js';
// // import asyncHandler from 'express-async-handler';
// import { validationResult } from 'express-validator';

// // @desc    Create a new donor
// // @route   POST /api/donors
// // @access  Public

// const donor = {}


// donor.createDonor = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const {
//     name,
//     bloodType,
//     location,
//     contactNumber,
//     email,
//     lastDonationDate,
//     age,
//     medicalHistory
//   } = req.body;

//   // Validate required fields
//   if (!name || !bloodType || !location || !contactNumber || !email || !age) {
//     return res.status(400).json({ error: 'Missing required donor fields.' });
//   }

//   try {
//     const newDonor = new Donor({
//       name,
//       bloodType,
//       location,
//       contactNumber,
//       email,
//       lastDonationDate,
//       age,
//       medicalHistory
//     });

//     const createdDonor = await newDonor.save();
//     res.status(201).json(createdDonor);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create donor.' });
//   }
// };

// // @desc    Get all donors
// // @route   GET /api/donors
// // @access  Public
// donor.getAllDonors = async (req, res) => {
//   const donors = await Donor.find({});
//   res.json(donors);
// };

// // @desc    Get donor by ID
// // @route   GET /api/donors/:id
// // @access  Public
// donor.getDonorById = async (req, res) => {
//   const donor = await Donor.findById(req.params.id);

//   if (donor) {
//     res.json(donor);
//   } else {
//     res.status(404);
//     throw new Error('Donor not found');
//   }
// };

// // @desc    Update donor
// // @route   PUT /api/donors/:id
// // @access  Private
// donor.updateDonor = async (req, res) => {
//   const donor = await Donor.findById(req.params.id);

//   if (donor) {
//     donor.name = req.body.name || donor.name;
//     donor.bloodType = req.body.bloodType || donor.bloodType;
//     donor.location = req.body.location || donor.location;
//     donor.contactNumber = req.body.contactNumber || donor.contactNumber;
//     donor.email = req.body.email || donor.email;
//     donor.lastDonationDate = req.body.lastDonationDate || donor.lastDonationDate;
//     donor.age = req.body.age || donor.age;
//     donor.medicalHistory = req.body.medicalHistory || donor.medicalHistory;

//     const updatedDonor = await donor.save();
//     res.json(updatedDonor);
//   } else {
//     res.status(404);
//     throw new Error('Donor not found');
//   }
// };

// // @desc    Delete donor
// // @route   DELETE /api/donors/:id
// // @access  Private
// donor.deleteDonor = async (req, res) => {
//   const donor = await Donor.findById(req.params.id);

//   if (donor) {
//     await donor.remove();
//     res.json({ message: 'Donor removed' });
//   } else {
//     res.status(404);
//     throw new Error('Donor not found');
//   }
// };

// // @desc    Search donors by blood type and location
// // @route   GET /api/donors/search
// // @access  Public
// donor.searchDonors = async (req, res) => {
//   const { bloodType, location } = req.query;

//   const query = {};
//   if (bloodType) query.bloodType = bloodType;
//   if (location) query.location = { $regex: location, $options: 'i' };

//   // Check if donor can donate (at least 56 days since last donation)
//   const eligibleDate = new Date();
//   eligibleDate.setDate(eligibleDate.getDate() - 56);

//   query.lastDonationDate = { $lte: eligibleDate };

//   const donors = await Donor.find(query);
//   res.json(donors);
// };

// export default donor;


import Donor from '../models/donor.model.js';
import axios from 'axios';
import { validationResult } from 'express-validator';

const donor = {};

// Helper to get lat/lon using OpenStreetMap API
const getCoordinatesFromLocation = async (location) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: location,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'RedBridge-BloodApp/1.0'
      }
    });

    const data = response.data[0];
    if (data) {
      return {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon)
      };
    } else {
      return { latitude: null, longitude: null };
    }
  } catch (err) {
    console.error('Geocoding failed:', err.message);
    return { latitude: null, longitude: null };
  }
};

// Create new donor
donor.createDonor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const {
    name,
    bloodType,
    location,
    contactNumber,
    email,
    lastDonationDate,
    age,
    medicalHistory
  } = req.body;

  if (!name || !bloodType || !location || !contactNumber || !email || !age) {
    return res.status(400).json({ error: 'Missing required donor fields.' });
  }

  try {
    const { latitude, longitude } = await getCoordinatesFromLocation(location);

    const newDonor = new Donor({
      name,
      bloodType,
      location,
      latitude,
      longitude,
      contactNumber,
      email,
      lastDonationDate,
      age,
      medicalHistory
    });

    const createdDonor = await newDonor.save();
    res.status(201).json(createdDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create donor.' });
  }
};

// Get all donors
donor.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({});
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donors.' });
  }
};

// Get donor by ID
donor.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ error: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donor.' });
  }
};

// Update donor
donor.updateDonor = async (req, res) => {
  try {
    const donorToUpdate = await Donor.findById(req.params.id);
    if (!donorToUpdate) return res.status(404).json({ error: 'Donor not found' });

    const {
      name,
      bloodType,
      location,
      contactNumber,
      email,
      lastDonationDate,
      age,
      medicalHistory
    } = req.body;

    if (location && location !== donorToUpdate.location) {
      const { latitude, longitude } = await getCoordinatesFromLocation(location);
      donorToUpdate.latitude = latitude;
      donorToUpdate.longitude = longitude;
    }

    donorToUpdate.name = name || donorToUpdate.name;
    donorToUpdate.bloodType = bloodType || donorToUpdate.bloodType;
    donorToUpdate.location = location || donorToUpdate.location;
    donorToUpdate.contactNumber = contactNumber || donorToUpdate.contactNumber;
    donorToUpdate.email = email || donorToUpdate.email;
    donorToUpdate.lastDonationDate = lastDonationDate || donorToUpdate.lastDonationDate;
    donorToUpdate.age = age || donorToUpdate.age;
    donorToUpdate.medicalHistory = medicalHistory || donorToUpdate.medicalHistory;

    const updatedDonor = await donorToUpdate.save();
    res.json(updatedDonor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update donor.' });
  }
};

// Delete donor
donor.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ error: 'Donor not found' });

    await donor.remove();
    res.json({ message: 'Donor removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete donor.' });
  }
};

// Search donors (basic linear search with filters, KNN in searchController)
donor.searchDonors = async (req, res) => {
  const { bloodType, location } = req.query;

  const query = {};
  if (bloodType) query.bloodType = bloodType;
  if (location) query.location = { $regex: location, $options: 'i' };

  const eligibleDate = new Date();
  eligibleDate.setDate(eligibleDate.getDate() - 56);
  query.lastDonationDate = { $lte: eligibleDate };

  try {
    const donors = await Donor.find(query);
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search donors.' });
  }
};

export default donor;
