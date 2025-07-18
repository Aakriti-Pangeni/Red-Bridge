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



import getCoordinates from '../utils/geocode.js';   // ✅ Correct function
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generatedToken from '../utils/token.js';

const user = {};

// REGISTER CONTROLLER
user.register = async (req, res) => {
  try {
    const { userName, email, password, address, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const loc = await getCoordinates(address); // ✅ Use the correct function
    if (!loc.length) {
      return res.status(400).json({ message: 'Invalid address for geolocation' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'admin') {
      return res.status(403).json({ message: 'Cannot register as admin' });
    }

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      address,
      role: role || 'user',
      location: {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude]
      }
    });

    await newUser.save();

    const token = generatedToken(newUser._id);

    res.status(201).json({
      user: {
        userName: newUser.userName,
        email: newUser.email,
        address: newUser.address,
        role: newUser.role
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


user.login = async (req, res) => {
  res.send("Login works");
};

user.otpgeneration = async (req, res) => {
  res.send("OTP generation works");
};

export default user;
