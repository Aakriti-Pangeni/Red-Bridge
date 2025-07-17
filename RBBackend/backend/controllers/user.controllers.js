import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generatedToken from '../utils/token.js';
import { use } from 'react';


const user = {}

user.register = async (req, res) => {
  try {
    const { userName, email, password, dateOfBirth } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword, dateOfBirth });
    await newUser.save();

    const token = generatedToken(newUser._id);
    res.status(201).json({ user: { userName: newUser.userName, email: newUser.email, dateOfBirth: newUser.dateOfBirth }, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}


user.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generatedToken(user._id);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


user.getUserProfile = async (req, res) => {
  try { 
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  } 
}


user.updateUserProfile = async (req, res) => {
  try { 
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    const { userName, email, dateOfBirth } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { userName, email, dateOfBirth }, { new: true }).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  } 
}

user.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
} 

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const user = {};

user.otpgeneration = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate random 6-digit OTP
    const otp = generateOTP();
    
    // Set OTP expiry to 1 hour from now
    const otpExpiry = new Date(Date.now() + 60 * 60 * 1000);
    
    // Save OTP and expiry to user
    await User.findOneAndUpdate(
      { email },
      { 
        otp: otp,
        otpExpiry: otpExpiry
      }
    );
    
    // Send OTP to user's email (implement your email service here)
    // await sendOTPEmail(email, otp);
    
    res.json({ message: 'OTP sent successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default user;