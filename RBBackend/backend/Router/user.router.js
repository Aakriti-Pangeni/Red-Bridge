import express from 'express';
import userController from '../controllers/user.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';
// import { getAllUsers } from "../controllers/user.controller.js";



const router = express.Router();

// router.get("/", getAllUsers);

router.get('/', userController.getAllUsers);

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/verify-otp', userController.verifyOTP);
router.post('/reset-password', userController.resetPassword);
router.post('/generate-otp', userController.otpgeneration);


router.get('/:id', userController.getUser);

router.delete('/:id', userController.deleteUser);

export default router;
