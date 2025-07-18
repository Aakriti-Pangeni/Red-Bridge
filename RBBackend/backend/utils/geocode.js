import axios from 'axios';

const getCoordinates = async (address) => {
  try {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`);
    const { results } = res.data;
    if (results.length > 0) {
      const { lat, lng } = results[0].geometry;
      return [lng, lat];
    }
    return null;
  } catch (err) {
    console.error("Geocode error:", err.message);
    return null;
  }
};

export default getCoordinates;