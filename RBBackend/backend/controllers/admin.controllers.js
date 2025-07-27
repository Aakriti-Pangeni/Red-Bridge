


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import User from '../models/user.model.js';

const adminController = {};

// Register Admin
adminController.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login Admin
// adminController.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };




adminController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Admin login attempt:', email);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log(' Admin not found');
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log(' Invalid password');
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    const token = jwt.sign(
      { userId: admin._id, isAdmin: true }, 
      process.env.JWT_SECRET, 
      { expiresIn: "24h" }
    );

    console.log('Admin login successful:', admin.email);

    res.json({ 
      message: "Login successful", 
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


adminController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Delete a User
adminController.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export default adminController;
