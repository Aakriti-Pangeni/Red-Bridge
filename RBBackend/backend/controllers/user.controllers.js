// import bcrypt from 'bcryptjs';
// import User from '../models/user.model.js';
// import generatedToken from '../utils/token.js';

// const user = {};

// // Registration
// user.register = async (req, res) => {
//   try {
//     const { userName, email, password, dateOfBirth } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ userName, email, password: hashedPassword, dateOfBirth });
//     await newUser.save();

//     const token = generatedToken(newUser._id);
//     res.status(201).json({
//       user: {
//         userName: newUser.userName,
//         email: newUser.email,
//         dateOfBirth: newUser.dateOfBirth
//       },
//       token
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// // Login
// user.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, existingUser.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = generatedToken(existingUser._id);
//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// // Get Profile
// user.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ user });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// // Update Profile
// user.updateUserProfile = async (req, res) => {
//   try {
//     const { userName, email, dateOfBirth } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       { userName, email, dateOfBirth },
//       { new: true }
//     ).select('-password');

//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });

//     res.json({ user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// // Delete User
// user.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user._id);
//     if (!deletedUser) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// // OTP Generation
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// user.otpgeneration = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const otp = generateOTP();
//     const otpExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

//     // Implement your email function here to send OTP
//     // await sendOTPEmail(user.email, otp);

//     res.json({ message: 'OTP sent successfully', otp }); // Don't send OTP in production!
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// export default user;



import getCoordinates from '../utils/geocode.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import generatedToken from '../utils/token.js';

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
 
// LOGIN CONTROLLER
user.login = async (req, res) => {
  try {
    const { email,  password } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: userData._id,
        userName: userData.userName,
        email: userData.email,
        phonenumber: userData.phonenumber   // ✅ Added here
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
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

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
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2') // Mask email for security
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

export default user;
