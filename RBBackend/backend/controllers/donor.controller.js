const Donor = require('../models/donor.model.js');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

// @desc    Create a new donor
// @route   POST /api/donors
// @access  Public
const createDonor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

  const donor = new Donor({
    name,
    bloodType,
    location,
    contactNumber,
    email,
    lastDonationDate,
    age,
    medicalHistory
  });

  const createdDonor = await donor.save();
  res.status(201).json(createdDonor);
});

// @desc    Get all donors
// @route   GET /api/donors
// @access  Public
const getAllDonors = asyncHandler(async (req, res) => {
  const donors = await Donor.find({});
  res.json(donors);
});

// @desc    Get donor by ID
// @route   GET /api/donors/:id
// @access  Public
const getDonorById = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.params.id);

  if (donor) {
    res.json(donor);
  } else {
    res.status(404);
    throw new Error('Donor not found');
  }
});

// @desc    Update donor
// @route   PUT /api/donors/:id
// @access  Private
const updateDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.params.id);

  if (donor) {
    donor.name = req.body.name || donor.name;
    donor.bloodType = req.body.bloodType || donor.bloodType;
    donor.location = req.body.location || donor.location;
    donor.contactNumber = req.body.contactNumber || donor.contactNumber;
    donor.email = req.body.email || donor.email;
    donor.lastDonationDate = req.body.lastDonationDate || donor.lastDonationDate;
    donor.age = req.body.age || donor.age;
    donor.medicalHistory = req.body.medicalHistory || donor.medicalHistory;

    const updatedDonor = await donor.save();
    res.json(updatedDonor);
  } else {
    res.status(404);
    throw new Error('Donor not found');
  }
});

// @desc    Delete donor
// @route   DELETE /api/donors/:id
// @access  Private
const deleteDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.params.id);

  if (donor) {
    await donor.remove();
    res.json({ message: 'Donor removed' });
  } else {
    res.status(404);
    throw new Error('Donor not found');
  }
});

// @desc    Search donors by blood type and location
// @route   GET /api/donors/search
// @access  Public
const searchDonors = asyncHandler(async (req, res) => {
  const { bloodType, location } = req.query;
  
  const query = {};
  if (bloodType) query.bloodType = bloodType;
  if (location) query.location = { $regex: location, $options: 'i' };

  // Check if donor can donate (at least 56 days since last donation)
  const eligibleDate = new Date();
  eligibleDate.setDate(eligibleDate.getDate() - 56);

  query.lastDonationDate = { $lte: eligibleDate };

  const donors = await Donor.find(query);
  res.json(donors);
});

module.exports = {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  searchDonors
};