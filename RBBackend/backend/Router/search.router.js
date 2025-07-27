
import express from 'express';
import { linearSearch } from '../controllers/search.controller.js';
import getRoadDistance from '../utils/roadDistance.js';

const router = express.Router();

// Existing route
router.get('/linear', linearSearch);

// Road distance route
router.post('/road-distance', async (req, res) => {
  try {
    const { userLat, userLon, donorLat, donorLon } = req.body;
    
    // Validate input
    if (!userLat || !userLon || !donorLat || !donorLon) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing coordinates' 
      });
    }
    
    // Get road distance
    const result = await getRoadDistance(userLat, userLon, donorLat, donorLon);
    
    res.json(result);
  } catch (error) {
    console.error('Road distance API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;