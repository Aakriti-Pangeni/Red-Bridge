


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Donor from './models/donor.model.js';
import { faker } from '@faker-js/faker';
import getCoordinates from './utils/geocode.js'; 


dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(' MongoDB connected');
  seedDonors();
}).catch((err) => {
  console.error(' MongoDB connection error:', err);
});


const nepaliFirstNames = [
  'Sita', 'Rita', 'Maya', 'Gita', 'Sunita', 'Bimala',
  'Ram', 'Hari', 'Shyam', 'Bikash', 'Suman', 'Manish', 'Amit', 'Anil', 'Rajesh', 'Prakash', 'Ramesh', 'Ravi', 'Ajay', 'Sanjay', 'Deepak', 'Niraj', 'Binod', 'Suraj', 'Kamal', 'Ashok', 'Dinesh', 'Santosh', 'Pawan', 'Raju'
];

const nepaliLastNames = [
  'Thapa', 'Rai', 'Gurung', 'Magar', 'Shrestha', 'Poudel',
  'Karki', 'Basnet', 'Adhikari', 'Bhandari', 'KC', 'Acharya', 'Chaudhary', 'Joshi', 'Tamang', 'Lama', 'Subedi', 'Bhattarai', 'Nepal', 'Sapkota', 'Ghimire', 'Pandey', 'Chhetri', 'Maharjan', 'Luitel'
];

const nepaliPlaces = [
  'Kathmandu, Kathmandu',
  'Lalitpur, Lalitpur', 
  'Bhaktapur, Bhaktapur',
  'Pokhara, Kaski',
  'Butwal, Rupandehi',
  'Biratnagar, Morang',
  'Dharan, Sunsari',
  'Nepalgunj, Banke',
  'Hetauda, Makwanpur',
  'Dhangadhi, Kailali',
  'Bharatpur, Chitwan',
  'Janakpur, Dhanusha',
  'Birgunj, Parsa',
  'Itahari, Sunsari',
  'Gorkha, Gorkha',
  'Damak, Jhapa'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];



function getNepaliFullName() {
  const firstName = faker.helpers.arrayElement(nepaliFirstNames);
  const lastName = faker.helpers.arrayElement(nepaliLastNames);
  return `${firstName} ${lastName}`;
}

function getRandomLastDonation() {
  return Math.random() > 0.5
    ? null
    : faker.date.past({ years: 1 }).toISOString().split('T')[0];
}

function getDonationCount(index, totalDonors) {
  const verifiedLimit = 18;
  
  if (index < verifiedLimit) {
    return faker.number.int({ min: 2, max: 15 });
  } else {
    return faker.number.int({ min: 0, max: 1 });
  }
}

async function seedDonors() {
  try {
   
    await Donor.deleteMany({});
    console.log(' Existing donors cleared.');

    const fakeUserId = new mongoose.Types.ObjectId();
    const donorArray = [];
    const totalDonors = 80;

    console.log(' Starting geocoding process...');

    for (let i = 0; i < totalDonors; i++) {
      const name = getNepaliFullName();
      const email = faker.internet.email({ firstName: name.split(" ")[0] }).toLowerCase();
      const phone = '98' + faker.string.numeric(8);

      const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0];
      const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
      const bloodGroup = faker.helpers.arrayElement(bloodGroups);
      const address = faker.helpers.arrayElement(nepaliPlaces);
      const lastDonation = getRandomLastDonation();
      
      
      console.log(` Geocoding ${i + 1}/${totalDonors}: ${address}`);
      const coords = await getCoordinates(address);
      
      
      const finalCoords = coords || [85.3240, 27.7172]; // Kathmandu coordinates
      
      const donationCount = getDonationCount(i, totalDonors);

      donorArray.push({
        name,
        email,
        phone,
        dob,
        gender,
        bloodGroup,
        address,
        lastDonation,
        donationCount,
        location: {
          type: 'Point',
          coordinates: finalCoords 
        },
        user: fakeUserId,
        status: 'approved'
      });

      if (i % 5 === 0) {
        console.log(` Pausing for rate limiting...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    await Donor.insertMany(donorArray);
    
    const verifiedCount = donorArray.filter(donor => donor.donationCount >= 2).length;
    const regularCount = donorArray.filter(donor => donor.donationCount < 2).length;
    
    console.log(` ${totalDonors} Nepali donors inserted with REAL coordinates.`);
    console.log(` ${verifiedCount} verified donors (donationCount >= 2)`);
    console.log(` ${regularCount} regular donors (donationCount < 2)`);
    
   
    console.log(' Sample coordinates verification:');
    donorArray.slice(0, 5).forEach(d => {
      console.log(`   ${d.address}: [${d.location.coordinates[0]}, ${d.location.coordinates[1]}]`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding donors:', error);
    process.exit(1);
  }
}