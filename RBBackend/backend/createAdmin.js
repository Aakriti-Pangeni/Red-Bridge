import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/admin.model.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const createAdmin = async () => {
  try {
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'adminrb123@gmail.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create admin - use a simple password for testing
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new Admin({
      name: 'Admin',
      email: 'adminrb123@gmail.com',
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: adminrb123@gmail.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:5173/login');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();