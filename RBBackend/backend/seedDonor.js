import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Donor from './models/donor.model.js';
import { faker } from '@faker-js/faker';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  seedDonors();
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Nepali male/female first names and surnames
const nepaliFirstNames = [
  'Sita', 'Rita', 'Maya', 'Gita', 'Sunita', 'Bimala',
  'Ram', 'Hari', 'Shyam', 'Bikash', 'Suman', 'Manish'
];

const nepaliLastNames = [
  'Thapa', 'Rai', 'Gurung', 'Magar', 'Shrestha', 'Poudel',
  'Karki', 'Basnet', 'Adhikari', 'Bhandari', 'KC', 'Acharya'
];

// Nepali districts (addresses)
const nepaliPlaces = [
  'Kathmandu, Bagmati', 'Lalitpur, Bagmati', 'Bhaktapur, Bagmati',
  'Pokhara, Gandaki', 'Butwal, Lumbini', 'Biratnagar, Koshi',
  'Dharan, Koshi', 'Nepalgunj, Lumbini', 'Hetauda, Bagmati',
  'Dhangadhi, Sudurpashchim', 'Gorkha, Gandaki', 'Chitwan, Bagmati'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// Random coordinates within Nepal (approximate)
function getRandomCoordinates() {
  const lat = faker.location.latitude({ min: 26.4, max: 30.4 });
  const lon = faker.location.longitude({ min: 80.0, max: 88.2 });
  return [parseFloat(lon), parseFloat(lat)];
}

// Generate a full Nepali-style name
function getNepaliFullName() {
  const firstName = faker.helpers.arrayElement(nepaliFirstNames);
  const lastName = faker.helpers.arrayElement(nepaliLastNames);
  return `${firstName} ${lastName}`;
}

function getRandomLastDonation() {
  // 50% chance of null, 50% chance of a random past date
  return Math.random() > 0.5
    ? null
    : faker.date.past({ years: 1 }).toISOString().split('T')[0];
}

async function seedDonors() {
  try {
   

    const fakeUserId = new mongoose.Types.ObjectId(); // or use real user _id
    const donorArray = [];

    for (let i = 0; i < 100; i++) {
      const name = getNepaliFullName();
      const email = faker.internet.email({ firstName: name.split(" ")[0] }).toLowerCase();
      const phone = '98' + faker.string.numeric(8);

      const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0];
      const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
      const bloodGroup = faker.helpers.arrayElement(bloodGroups);
      const address = faker.helpers.arrayElement(nepaliPlaces);
    const lastDonation = getRandomLastDonation();
      const coords = getRandomCoordinates();

      donorArray.push({
        name,
        email,
        phone,
        dob,
        gender,
        bloodGroup,
        address,
        lastDonation,
        location: {
          type: 'Point',
          coordinates: coords
        },
        user: fakeUserId
      });
    }

    await Donor.insertMany(donorArray);
    console.log('✅ 100 Nepali donors inserted.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding donors:', error);
    process.exit(1);
  }
}
