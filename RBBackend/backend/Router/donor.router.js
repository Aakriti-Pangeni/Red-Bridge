import express from 'express';
import donorController from '../controllers/donor.controller.js';

const router = express.Router();

// Create donor
router.post('/', donorController.createDonor);

// Get all donors
router.get('/', donorController.getAllDonors);

// Search donors by blood type and location
router.get('/search', donorController.searchDonors);

// Get a specific donor by ID
router.get('/:id', donorController.getDonorById);

// Update donor by ID
router.put('/:id', donorController.updateDonor);

// Delete donor by ID
router.delete('/:id', donorController.deleteDonor);

export default router;
