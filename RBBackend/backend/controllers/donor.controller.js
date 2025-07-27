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

    // Create new donor with pending status
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
      status: 'pending', 
      donationCount: 0
    });

    const createdDonor = await newDonor.save();
    res.status(201).json({ user: savedUser, donor: createdDonor });
  } catch (err) {
    console.error("Create Donor Error:", err.message);
    res.status(500).json({ error: "Failed to create donor." });
  }
};


export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({ status: 'approved' }).populate("user");
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donors" });
  }
};


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
          $maxDistance: 10000,
        },
      },
    }).populate("user");

    res.json(donors);
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};


export const getDonorById = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findById(id).populate("user");
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json(donor);
  } catch (err) {
    console.error("Get donor by ID error:", err);
    res.status(500).json({ error: "Error fetching donor" });
  }
};



export const updateDonor = async (req, res) => {
  const { id } = req.params;
  const { phone, address, lastDonation, donationCount } = req.body; 

  try {
    const donor = await Donor.findById(id);
    if (!donor) return res.status(404).json({ error: "Donor not found" });

    
    if (phone) donor.phone = phone;
    if (address) donor.address = address;
    if (lastDonation !== undefined) donor.lastDonation = lastDonation;
    if (donationCount !== undefined) donor.donationCount = donationCount;

    await donor.save();
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating donor" });
  }
};



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








export const requestDonor = async (req, res) => {
  const { donorId } = req.body;

  try {
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    const requesterName = req.user?.userName || "Someone";
    const requesterPhone = req.user?.phonenumber || "Unknown";

    // SMS message
    const smsMessage = `Hello! ${donor.name}, ${requesterName} is requesting for blood of bloodgroup ${donor.bloodGroup}. Please contact them at ${requesterPhone} if you’re available to donate.`;
    await sendSMS(donor.phone, smsMessage);

    // Email message
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
      emailHtml, 
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


// Add this new controller function
// export const getDonorByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
    
//     // Find donor by user reference
//     const donor = await Donor.findOne({ user: userId });
    
//     if (!donor) {
//       return res.status(404).json({ message: "Donor profile not found" });
//     }
    
//     res.json(donor);
//   } catch (error) {
//     console.error("Get donor by user ID error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getDonorByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log("Looking for donor with userId:", userId); 
    
    if (!userId || userId === 'undefined') {
      return res.status(400).json({ message: "Invalid user ID provided" });
    }
    
   
    const donor = await Donor.findOne({ user: userId });

    console.log("Found donor:", donor);

    if (!donor) {
      return res.status(404).json({ message: "Donor profile not found for this user" });
    }
    
    res.json(donor);
  } catch (error) {
    console.error("Get donor by user ID error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getPendingDonors = async (req, res) => {
  try {
    const pendingDonors = await Donor.find({ status: 'pending' })
      .populate('user', 'userName email')
      .sort({ createdAt: -1 });
    
    res.json(pendingDonors);
  } catch (error) {
    console.error("Get pending donors error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const adminId = req.user._id;
    
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    
    if (donor.status !== 'pending') {
      return res.status(400).json({ message: "Donor is already processed" });
    }
    
    donor.status = 'approved';
    donor.approvedBy = adminId;
    donor.approvedAt = new Date();
    donor.rejectionReason = null;
    
    await donor.save();
    
    res.json({ message: "Donor approved successfully", donor });
  } catch (error) {
    console.error("Approve donor error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const { reason } = req.body;
    const adminId = req.user._id;
    
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    
    if (donor.status !== 'pending') {
      return res.status(400).json({ message: "Donor is already processed" });
    }
    
    donor.status = 'rejected';
    donor.approvedBy = adminId;
    donor.approvedAt = new Date();
    donor.rejectionReason = reason || 'No reason provided';
    
    await donor.save();
    
    res.json({ message: "Donor rejected successfully", donor });
  } catch (error) {
    console.error("Reject donor error:", error);
    res.status(500).json({ message: "Server error" });
  }
};