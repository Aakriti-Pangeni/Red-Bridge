import express from 'express';
import adminController from '../controllers/admin.controllers.js';

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/users', adminController.getAllUsers);
router.delete('/users/:userId', adminController.deleteUser);

export default router;
