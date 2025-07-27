import Donor from '../models/donor.model.js';

// Linear Search
export const linearSearch = async (req, res) => {
  const { bloodGroup } = req.query;
  try {
    const donors = await Donor.find({});
    const result = donors.filter(d => d.bloodGroup === bloodGroup);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// KNN 
export const knnSearch = async (req, res) => {
  const { longitude, latitude, bloodGroup } = req.query;
  try {
    const result = await Donor.find({
      bloodGroup,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 10000
        }
      }
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};