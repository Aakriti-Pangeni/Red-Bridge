import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
// import User from '../controllers/user.controllers.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId).select('-password -otp -otpExpiry');
      

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

     
      req.user = user;
      req.user.id = user._id.toString(); 

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default authMiddleware;  
export { authMiddleware as verifyToken };
