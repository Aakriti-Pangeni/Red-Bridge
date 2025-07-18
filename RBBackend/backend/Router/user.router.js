import express from 'express';
import userController from '../controllers/user.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/generate-otp', userController.otpgeneration);

// router.get('/profile', authMiddleware, userController.getUserProfile);
// router.put('/profile', authMiddleware, userController.updateUserProfile);
// router.delete('/profile', authMiddleware, userController.deleteUser);

export default router;



// import express from 'express';
// import userController from '../controllers/user.controllers.js';
// import authMiddleware from '../middleware/auth.middleware.js';

// const router = express.Router();

// // Public routes
// router.post('/register', userController.register);
// router.post('/login', userController.login);
// router.post('/generate-otp', userController.otpgeneration);

// // User profile routes (authenticated)
// router.get('/profile', authMiddleware, userController.getUserProfile);
// router.put('/profile', authMiddleware, userController.updateUserProfile);
// router.delete('/profile', authMiddleware, userController.deleteUser);

// // Admin-only route to view all users (optional, can be moved to admin.router)
// router.get('/all-users', authMiddleware, userController.getAllUsers); // Optional role check inside controller

// export default router;
