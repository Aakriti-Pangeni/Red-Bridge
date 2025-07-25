

import Donor from "../models/donor.model.js";
import User from "../models/user.model.js";
import getCoordinates from "../utils/geocode.js";
import bcrypt from "bcryptjs";
import sendSMS from '../utils/sendSms.js';
// import sendEmail from '../utils/email.utils.js';
import { sendDonorRequestEmail } from '../utils/email.utils.js';
// import user from './user.controllers.js';

// CREATE DONOR
export const createDonor = async (req, res) => {
  const {
    name,
    phone,
    email,
    dob,
    gender,
    bloodGroup,
    address,
    password,
    confirmPassword
  } = req.body;

  if (
    !name ||
    !phone ||
    !email ||
    !dob ||
    !gender ||
    !bloodGroup ||
    !address ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const coordinates = await getCoordinates(address);
    if (!coordinates) {
      return res.status(400).json({ error: "Invalid address for geolocation" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: name,
      email,
      password: hashedPassword,
      phonenumber: phone,
    });

    const savedUser = await newUser.save();

    const newDonor = new Donor({
      name,
      email,
      phone,
      dob,
      gender,
      bloodGroup,
      address,
      user: savedUser._id,
      location: {
        type: "Point",
        coordinates,
      },
        lastDonation: req.body.lastDonation || null,
    });

    const createdDonor = await newDonor.save();
    res.status(201).json({ user: savedUser, donor: createdDonor });
  } catch (err) {
    console.error("Create Donor Error:", err.message);
    res.status(500).json({ error: "Failed to create donor." });
  }
};

// GET ALL DONORS
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate("user");
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donors" });
  }
};

// SEARCH DONORS
export const searchDonors = async (req, res) => {
  const { bloodGroup, lat, lng } = req.query;

  if (!bloodGroup || !lat || !lng) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const donors = await Donor.find({
      bloodGroup,
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 10000, // within 10 km
        },
      },
    }).populate("user");

    res.json(donors);
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};

// GET SINGLE DONOR
export const getDonorById = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findById(id).populate("user");
    if (!donor) return res.status(404).json({ error: "Donor not found" });
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching donor" });
  }
};



export const updateDonor = async (req, res) => {
  const { id } = req.params;
  const { phone, address, lastDonation } = req.body; // ✅ extract explicitly

  try {
    const donor = await Donor.findById(id);
    if (!donor) return res.status(404).json({ error: "Donor not found" });

    // ✅ Update only the allowed fields
    if (phone) donor.phone = phone;
    if (address) donor.address = address;
    if (lastDonation !== undefined) donor.lastDonation = lastDonation;

    await donor.save();
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating donor" });
  }
};



// DELETE DONOR
export const deleteDonor = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findByIdAndDelete(id);
    if (!donor) return res.status(404).json({ error: "Donor not found" });
    res.json({ message: "Donor deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting donor" });
  }
};



//////

// export const requestDonor = async (req, res) => {
//   // const { id } = req.body;

//   const { donorId } = req.body;

//   try {
//     // Fetch donor info by ID


//     // const donor = await Donor.findById( id );
// const donor = await Donor.findById(donorId);

//     if (!donor) {
//       return res.status(404).json({ error: "Donor not found" });
//     }

//     // Get requester name from logged-in user (assumes authentication middleware adds req.user)
//     const requesterName = req.user?.userName || "Someone";
     
//     const number = req.user?.phone;
// console.log("Logged in as:", requesterName);
//     // Message to send
//     const message = `Hello! ${requesterName} is requesting blood. Please contact  them in this number ${number} if you’re available to donate.`;

//     // Send SMS to donor's phone
//     await sendSMS(donor.phone, message);
  

//     res.status(200).json({ message: "SMS sent to donor!" });
//   } catch (err) {
//     console.error("Request Donor Error:", err.message);
//     res.status(500).json({ error: "Failed to send request." });
//   }
// };





//  export const requestDonor = async (req, res) => {
//   try {
//     const { donorId } = req.params;
//     console.log("Requesting donor with ID:", donorId);

//     // Get donor info from DB
//     const donor = await Donor.findById(donorId);
//     if (!donor) return res.status(404).json({ message: "Donor not found" });

//     const message = `Hello ${donor.name}, someone is in need of your blood group (${donor.bloodGroup}). Please contact if available.`;
    
//     await sendSMS(donor.phone, message); // Pass raw number like "9843738801"

//     res.status(200).json({ message: "SMS request sent successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to send SMS" });
//   }
// };



//////




export const requestDonor = async (req, res) => {
  const { donorId } = req.body;

  try {
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    const requesterName = req.user?.userName || "Someone";
    const requesterPhone = req.user?.phone || "Unknown";

    // SMS message
    const smsMessage = `Hello! ${requesterName} is requesting blood. Please contact them at ${requesterPhone} if you’re available to donate.`;
    await sendSMS(donor.phone, smsMessage);

    // Email message
    // const emailSubject = "Urgent Blood Donation Request";
    const emailHtml = `
      <p>Dear ${donor.name},</p>
      <p>${requesterName} is requesting <strong>${donor.bloodGroup}</strong> blood.</p>
      <p>Contact Number: ${requesterPhone}</p>
      <p>Please respond if you’re available. Thank you!</p>
      <p>- RedBridge Team</p>
    `;
       await sendDonorRequestEmail({
      donorEmail: donor.email,
      donorName: donor.name,
      requesterName,
      requesterPhone,
      emailHtml, // if your function accepts it directly
    });

    res.status(200).json({ message: "SMS and Email sent to donor!" });
  } catch (err) {
    console.error("Request Donor Error:", err.message);
    res.status(500).json({ error: "Failed to send request." });
  }
};



export const getDonorProfile = async (req, res) => {
  const { id } = req.params;
  console.log("Fetching donor profile for user ID:", id);

  try {
    const donor = await Donor.findOne({ user: id }).populate("user");

    if (!donor) {
      console.log("No donor found for user ID:", id);
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json(donor);
  } catch (err) {
    console.error("Error in getDonorProfile:", err.message);
    res.status(500).json({ message: "Error fetching donor" });
  }
};