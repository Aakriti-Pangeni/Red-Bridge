// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// const adminMiddleware = (req, res, next) => {
//   try {
//     // Check if user exists (from auth middleware)
//     if (!req.user) {
//       return res.status(401).json({ message: 'Authentication required' });
//     }
    
//     console.log('User role in admin middleware:', req.user.role); // Debug log
    
//     // Check if user has admin role
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ 
//         message: 'Access denied. Admin privileges required.' 
//       });
//     }
    
//     console.log(`Admin access granted to: ${req.user.email}`);
//     next();
//   } catch (error) {
//     console.error('Admin middleware error:', error);
//     res.status(500).json({ message: 'Server error in admin middleware' });
//   }
// };

// export default adminMiddleware;


import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js'; // ✅ Use Admin model

const adminMiddleware = async (req, res, next) => {
  try {
    console.log('=== ADMIN MIDDLEWARE DEBUG ===');
    
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    // ✅ FIX: Look for admin in Admin collection
    const admin = await Admin.findById(decoded.userId);
    
    if (!admin) {
      console.log('❌ Admin not found in Admin collection');
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    console.log('✅ Admin verified:', admin.email);
    req.user = admin; // Set admin as user for compatibility
    req.admin = admin; // Also set as admin
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export default adminMiddleware;