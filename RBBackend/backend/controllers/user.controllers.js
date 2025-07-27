
import getCoordinates from '../utils/geocode.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import generatedToken from '../utils/token.js';
import Admin from '../models/admin.model.js'  

const user = {};

// REGISTER CONTROLLER
user.register = async (req, res) => {
  try {
    const { userName, email, phonenumber, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, email, phonenumber, password: hashedPassword });

    await newUser.save();
    const token = generatedToken(newUser._id);

    res.status(201).json({
      user: {
        userName: newUser.userName,
        email: newUser.email,
        phonenumber: newUser.phonenumber   // ✅ Added here
      },
      token
    });
  } catch (error) {
      console.error('User Registration Error:', error); // ❗ Use full error, not just .message
  res.status(500).json({ message: 'Something went wrong', error: error.message });
    
  }
};
 
// // LOGIN CONTROLLER
// user.login = async (req, res) => {
//   try {
//     const { email,  password } = req.body;

//     const userData = await User.findOne({ email });
//     if (!userData) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, userData.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: userData._id,
//         userName: userData.userName,
//         email: userData.email,
//         phonenumber: userData.phonenumber   // ✅ Added here
//       }
//     });
//   } catch (err) {
//     console.error("User Login Error:", err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };





user.login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    let userData = await User.findOne({ email });
    let role = 'user';

    if (!userData) {
      userData = await Admin.findOne({ email });
      role = 'admin';
    }

    if (!userData) return res.status(404).json({ message: "User not found" });


    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });


    const token = jwt.sign({ userId: userData._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

   
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: userData._id,
        id: userData._id,
        userName: userData.userName || userData.name,
        name: userData.userName || userData.name,
        email: userData.email,
        phonenumber: userData.phonenumber || null,
        role
      }
    });

  } catch (err) {
    console.error("User Login Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// OTP GENERATION CONTROLLER
user.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
    // Update user with OTP
    userData.otp = otp;
    userData.otpExpiry = otpExpiry;
    await userData.save();

    // Send OTP email
    const { sendPasswordResetOTP } = await import('../utils/email.utils.js');
    await sendPasswordResetOTP({
      email: userData.email,
      userName: userData.userName,
      otp: otp
    });

    res.json({ 
      message: 'OTP sent successfully to your email',
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2') 
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// VERIFY OTP CONTROLLER
user.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP exists and is not expired
    if (!userData.otp || !userData.otpExpiry) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }

    if (userData.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (userData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, generate a temporary token for password reset
    const resetToken = jwt.sign(
      { userId: userData._id, purpose: 'password-reset' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );

    // Clear OTP after successful verification
    userData.otp = undefined;
    userData.otpExpiry = undefined;
    await userData.save();

    res.json({ 
      message: 'OTP verified successfully',
      resetToken: resetToken
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// RESET PASSWORD CONTROLLER
user.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;
    
    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Verify reset token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (decoded.purpose !== 'password-reset') {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    const userData = await User.findById(decoded.userId);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userData.password = hashedPassword;
    await userData.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

user.otpgeneration = async (req, res) => {
  res.send("OTP generation works");

};


//  GET USER CONTROLLER
user.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await User.findById(userId).select("-password -otp -otpExpiry");

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: foundUser });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// user.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password -otp -otpExpiry");
//     res.json(users);
//   } catch (error) {
//     console.error('Get All Users Error:', error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };


user.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpiry");
    console.log('Found users:', users.length); // Debug log
    res.json(users); // Return users directly, not { users }
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

user.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default user;
