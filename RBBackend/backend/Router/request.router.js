import express from 'express';
import Request from '../models/request.model.js';
import Donor from '../models/donor.model.js'; 
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Get user's sent requests
router.get('/user/sent', authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.id })
      .populate('donorId', 'name bloodGroup phone address')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Get donor's received requests - FIXED VERSION
router.get('/donor/received', authMiddleware, async (req, res) => {
  try {
    
    const donor = await Donor.findOne({ user: req.user.id });
    
    if (!donor) {
      return res.status(404).json({ error: 'Donor profile not found' });
    }
    
    
    const requests = await Request.find({ donorId: donor._id })
      .populate('userId', 'userName email phonenumber')
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    console.error('Error fetching donor requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});


router.put('/:requestId/status', authMiddleware, async (req, res) => {
  try {
    const { status, response } = req.body;
    
    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    
    const donor = await Donor.findOne({ user: req.user.id });
    
    if (!donor) {
      return res.status(404).json({ error: 'Donor profile not found' });
    }
    
    const request = await Request.findOneAndUpdate(
      { 
        _id: req.params.requestId, 
        donorId: donor._id  
      },
      { 
        status, 
        donorResponse: response || '',
        respondedAt: new Date()
      },
      { new: true }
    ).populate('userId', 'userName email phonenumber');
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found or unauthorized' });
    }
    
    res.json({
      message: `Request ${status} successfully`,
      request
    });
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ error: 'Failed to update request' });
  }
});

export default router;