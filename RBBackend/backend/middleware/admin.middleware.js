
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js'; 
const adminMiddleware = async (req, res, next) => {
  try {
    console.log('=== ADMIN MIDDLEWARE DEBUG ===');
    
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

   
    const admin = await Admin.findById(decoded.userId);
    
    if (!admin) {
      console.log(' Admin not found in Admin collection');
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    console.log('Admin verified:', admin.email);
    req.user = admin; 
    req.admin = admin; 
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export default adminMiddleware;