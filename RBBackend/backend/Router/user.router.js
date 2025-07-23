import express from 'express';
import userController from '../controllers/user.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/verify-otp', userController.verifyOTP);
router.post('/reset-password', userController.resetPassword);
router.post('/generate-otp', userController.otpgeneration);

// router.get('/profile', authMiddleware, userController.getUserProfile);
// router.put('/profile', authMiddleware, userController.updateUserProfile);
// router.delete('/profile', authMiddleware, userController.deleteUser);

export default router;
