

import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';
import {
  createDonor,
  getAllDonors,
  searchDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  getDonorProfile,
  requestDonor, 
  getDonorByUserId,
  getPendingDonors,
  approveDonor,
  rejectDonor
} from '../controllers/donor.controller.js';
import Request from '../models/request.model.js';
import Donor from '../models/donor.model.js';
import User from '../models/user.model.js';
import { sendDonorRequestEmail } from '../utils/email.utils.js';
import sendSMS from '../utils/sendSms.js'; 

const router = express.Router();

router.post('/register', createDonor);
router.get('/', getAllDonors);
router.get('/search', searchDonors);

// Admin routes for donor approval
router.get('/pending', adminMiddleware, getPendingDonors);
router.put('/approve/:donorId', adminMiddleware, approveDonor);
router.put('/reject/:donorId', adminMiddleware, rejectDonor);

router.get("/profile/:id", getDonorProfile);
router.get('/user/:userId', getDonorByUserId);


router.post('/request', authMiddleware, async (req, res) => {
  try {
    const { donorId, message } = req.body;
    
    console.log('=== REQUEST DEBUG ===');
    console.log('User ID:', req.user.id);
    console.log('Donor ID:', donorId);
    console.log('Message:', message);
    
    // Check if request already exists
    const existingRequest = await Request.findOne({
      userId: req.user.id,
      donorId,
      status: 'pending'
    });
    
    if (existingRequest) {
      return res.status(400).json({ error: 'You already have a pending request to this donor' });
    }
    
    // Get donor details
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    
    // Get user details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('Donor found:', donor.name, donor.email, donor.phone);
    console.log('User found:', user.userName, user.email, user.phonenumber);
    
    
    const newRequest = new Request({
      userId: req.user.id,
      donorId,
      message: message || 'Blood donation request'
    });
    
    await newRequest.save();
    console.log(' Request saved to database');
    
  
    try {
      console.log('📧 Attempting to send email...');
      await sendDonorRequestEmail({
        donorEmail: donor.email,
        donorName: donor.name,
        requesterName: user.userName,
        requesterPhone: user.phonenumber,
        bloodGroup: donor.bloodGroup,
        message: message || 'Emergency blood donation needed'
      });
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error(' Email sending failed:', emailError);
    }
    
    // SEND SMS
    try {
      console.log('📱 Attempting to send SMS...');
      const smsMessage = ` RedBridge Alert: ${user.userName} needs ${donor.bloodGroup} blood urgently! Contact: ${user.phonenumber}. Please help if available. Thank you!`;
      await sendSMS(donor.phone, smsMessage);
      console.log('SMS sent successfully');
    } catch (smsError) {
      console.error(' SMS sending failed:', smsError);
    }
    
    res.json({ 
      message: 'Request sent successfully! The donor has been notified via email and SMS.',
      request: newRequest
    });
    
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
});

// Add test routes for debugging
router.post('/test-email', async (req, res) => {
  try {
    console.log('Testing email...');
    await sendDonorRequestEmail({
      donorEmail: 'test@example.com',
      donorName: 'Test Donor',
      requesterName: 'Test User',
      requesterPhone: '9876543210',
      bloodGroup: 'O+',
      message: 'This is a test email'
    });
    res.json({ message: 'Test email sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/test-sms', async (req, res) => {
  try {
    const { phone } = req.body;
    console.log(' Testing SMS to:', phone);
    await sendSMS(phone || '9876543210', 'Test SMS from RedBridge');
    res.json({ message: 'Test SMS sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', getDonorById);
router.put('/:id', updateDonor);
router.delete('/:id', deleteDonor);

export default router;