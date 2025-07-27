import fetch from 'node-fetch';

const getRoadDistance = async (lat1, lon1, lat2, lon2) => {
  try {
   
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      throw new Error('Invalid coordinates provided');
    }

    const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
    
    console.log(' Making OSRM request:', osrmUrl);
    
    const response = await fetch(osrmUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'BloodDonorApp/1.0'
      }
    });
    
    console.log(' OSRM Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`OSRM HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(' OSRM Response received');
    
    if (data.routes && data.routes[0]) {
      const distanceInKm = data.routes[0].distance / 1000;
      const durationInMinutes = data.routes[0].duration / 60;
      
      return {
        distance: parseFloat(distanceInKm.toFixed(2)),
        duration: Math.round(durationInMinutes),
        success: true,
        source: 'OSRM'
      };
    }
    
    return { success: false, error: 'No route found' };
  } catch (error) {
    console.error(' Road distance error:', error.message);
    return { success: false, error: error.message };
  }
};

export default getRoadDistance;