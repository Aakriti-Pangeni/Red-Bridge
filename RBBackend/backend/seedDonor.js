// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import Donor from './models/donor.model.js';
// // import { faker } from '@faker-js/faker';

// // // Load environment variables
// // dotenv.config();

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // }).then(() => {
// //   console.log('✅ MongoDB connected');
// //   seedDonors();
// // }).catch((err) => {
// //   console.error('❌ MongoDB connection error:', err);
// // });

// // // Nepali male/female first names and surnames
// // const nepaliFirstNames = [
// //   'Sita', 'Rita', 'Maya', 'Gita', 'Sunita', 'Bimala',
// //   'Ram', 'Hari', 'Shyam', 'Bikash', 'Suman', 'Manish', 'Amit', 'Anil', 'Rajesh', 'Prakash', 'Ramesh', 'Ravi', 'Ajay', 'Sanjay', 'Deepak', 'Niraj', 'Binod', 'Suraj', 'Kamal', 'Ashok', 'Dinesh', 'Santosh', 'Pawan', 'Raju'
// // ];

// // const nepaliLastNames = [
// //   'Thapa', 'Rai', 'Gurung', 'Magar', 'Shrestha', 'Poudel',
// //   'Karki', 'Basnet', 'Adhikari', 'Bhandari', 'KC', 'Acharya', 'Chaudhary', 'Joshi', 'Tamang', 'Lama', 'Subedi', 'Bhattarai', 'Nepal', 'Sapkota', 'Ghimire', 'Pandey', 'Chhetri', 'Maharjan', 'Luitel'
// // ];

// // // Nepali districts (addresses)
// // const nepaliPlaces = [
// //   'Kathmandu, Bagmati', 'Lalitpur, Bagmati', 'Bhaktapur, Bagmati',
// //   'Pokhara, Gandaki', 'Butwal, Lumbini', 'Biratnagar, Koshi',
// //   'Dharan, Koshi', 'Nepalgunj, Lumbini', 'Hetauda, Bagmati',
// //   'Dhangadhi, Sudurpashchim', 'Gorkha, Gandaki', 'Chitwan, Bagmati'
// // ];

// // const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// // // Random coordinates within Nepal (approximate)
// // function getRandomCoordinates() {
// //   const lat = faker.location.latitude({ min: 26.4, max: 30.4 });
// //   const lon = faker.location.longitude({ min: 80.0, max: 88.2 });
// //   return [parseFloat(lon), parseFloat(lat)];
// // }

// // // Generate a full Nepali-style name
// // function getNepaliFullName() {
// //   const firstName = faker.helpers.arrayElement(nepaliFirstNames);
// //   const lastName = faker.helpers.arrayElement(nepaliLastNames);
// //   return `${firstName} ${lastName}`;
// // }

// // function getRandomLastDonation() {
// //   // 50% chance of null, 50% chance of a random past date
// //   return Math.random() > 0.5
// //     ? null
// //     : faker.date.past({ years: 1 }).toISOString().split('T')[0];
// // }

// // async function seedDonors() {
// //   try {
   

// //     const fakeUserId = new mongoose.Types.ObjectId(); // or use real user _id
// //     const donorArray = [];

// //     for (let i = 0; i < 100; i++) {
// //       const name = getNepaliFullName();
// //       const email = faker.internet.email({ firstName: name.split(" ")[0] }).toLowerCase();
// //       const phone = '98' + faker.string.numeric(8);

// //       const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0];
// //       const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
// //       const bloodGroup = faker.helpers.arrayElement(bloodGroups);
// //       const address = faker.helpers.arrayElement(nepaliPlaces);
// //     const lastDonation = getRandomLastDonation();
// //       const coords = getRandomCoordinates();

// //       donorArray.push({
// //         name,
// //         email,
// //         phone,
// //         dob,
// //         gender,
// //         bloodGroup,
// //         address,
// //         lastDonation,
// //         location: {
// //           type: 'Point',
// //           coordinates: coords
// //         },
// //         user: fakeUserId
// //       });
// //     }

// //     await Donor.insertMany(donorArray);
// //     console.log('✅ 100 Nepali donors inserted.');
// //     process.exit(0);
// //   } catch (error) {
// //     console.error('❌ Error seeding donors:', error);
// //     process.exit(1);
// //   }
// // }


// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Donor from './models/donor.model.js';
// import { faker } from '@faker-js/faker';

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('✅ MongoDB connected');
//   seedDonors();
// }).catch((err) => {
//   console.error('❌ MongoDB connection error:', err);
// });

// // Nepali male/female first names and surnames
// const nepaliFirstNames = [
//   'Sita', 'Rita', 'Maya', 'Gita', 'Sunita', 'Bimala',
//   'Ram', 'Hari', 'Shyam', 'Bikash', 'Suman', 'Manish', 'Amit', 'Anil', 'Rajesh', 'Prakash', 'Ramesh', 'Ravi', 'Ajay', 'Sanjay', 'Deepak', 'Niraj', 'Binod', 'Suraj', 'Kamal', 'Ashok', 'Dinesh', 'Santosh', 'Pawan', 'Raju'
// ];

// const nepaliLastNames = [
//   'Thapa', 'Rai', 'Gurung', 'Magar', 'Shrestha', 'Poudel',
//   'Karki', 'Basnet', 'Adhikari', 'Bhandari', 'KC', 'Acharya', 'Chaudhary', 'Joshi', 'Tamang', 'Lama', 'Subedi', 'Bhattarai', 'Nepal', 'Sapkota', 'Ghimire', 'Pandey', 'Chhetri', 'Maharjan', 'Luitel'
// ];

// // ✅ Updated Nepali cities with their districts (City, District format)
// const nepaliPlaces = [
//   // Bagmati Province
//   'Kathmandu, Kathmandu',
//   'Lalitpur, Lalitpur', 
//   'Bhaktapur, Bhaktapur',
//   'Hetauda, Makwanpur',
//   'Dhulikhel, Kavrepalanchok',
//   'Bharatpur, Chitwan',
//   'Gorkha, Gorkha',
//   'Dhading, Dhading',
//   'Nuwakot, Nuwakot',
  
//   // Gandaki Province
//   'Pokhara, Kaski',
//   'Waling, Syangja',
//   'Putalibazar, Syangja',
//   'Baglung, Baglung',
//   'Beni, Myagdi',
//   'Jomsom, Mustang',
//   'Besisahar, Lamjung',
//   'Damauli, Tanahun',
  
//   // Lumbini Province
//   'Butwal, Rupandehi',
//   'Bhairahawa, Rupandehi',
//   'Taulihawa, Kapilvastu',
//   'Nepalgunj, Banke',
//   'Gulariya, Bardiya',
//   'Tulsipur, Dang',
//   'Pyuthan, Pyuthan',
//   'Rolpa, Rolpa',
//   'Palpa, Palpa',
  
//   // Koshi Province
//   'Biratnagar, Morang',
//   'Dharan, Sunsari',
//   'Itahari, Sunsari',
//   'Damak, Jhapa',
//   'Birtamod, Jhapa',
//   'Ilam, Ilam',
//   'Phidim, Panchthar',
//   'Chainpur, Sankhuwasabha',
  
//   // Madhesh Province
//   'Janakpur, Dhanusha',
//   'Birgunj, Parsa',
//   'Gaur, Rautahat',
//   'Malangwa, Sarlahi',
//   'Kalaiya, Bara',
//   'Rajbiraj, Saptari',
//   'Lahan, Siraha',
//   'Gaighat, Udayapur',
  
//   // Karnali Province
//   'Birendranagar, Surkhet',
//   'Jumla, Jumla',
//   'Dunai, Dolpa',
//   'Simikot, Humla',
//   'Manma, Kalikot',
//   'Khalanga, Jajarkot',
  
//   // Sudurpashchim Province
//   'Dhangadhi, Kailali',
//   'Mahendranagar, Kanchanpur',
//   'Dipayal, Doti',
//   'Silgadhi, Doti',
//   'Chainpur, Bajhang',
//   'Mangalsen, Achham',
//   'Sanfebagar, Achham',
//   'Martadi, Bajura'
// ];

// const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// // Random coordinates within Nepal (approximate)
// function getRandomCoordinates() {
//   const lat = faker.location.latitude({ min: 26.4, max: 30.4 });
//   const lon = faker.location.longitude({ min: 80.0, max: 88.2 });
//   return [parseFloat(lon), parseFloat(lat)];
// }

// // Generate a full Nepali-style name
// function getNepaliFullName() {
//   const firstName = faker.helpers.arrayElement(nepaliFirstNames);
//   const lastName = faker.helpers.arrayElement(nepaliLastNames);
//   return `${firstName} ${lastName}`;
// }

// function getRandomLastDonation() {
//   // 50% chance of null, 50% chance of a random past date
//   return Math.random() > 0.5
//     ? null
//     : faker.date.past({ years: 1 }).toISOString().split('T')[0];
// }

// // ✅ Function to determine donation count (controls verified status)
// function getDonationCount(index, totalDonors) {
//   const verifiedLimit = 18; // Less than 20 verified donors
  
//   if (index < verifiedLimit) {
//     // First 18 donors get 2+ donations (verified)
//     return faker.number.int({ min: 2, max: 15 });
//   } else {
//     // Remaining donors get 0-1 donations (not verified)
//     return faker.number.int({ min: 0, max: 1 });
//   }
// }

// async function seedDonors() {
//   try {
//     // Clear existing donors (optional)
//     await Donor.deleteMany({});
//     // console.log('🗑️ Existing donors cleared.');

//     const fakeUserId = new mongoose.Types.ObjectId(); // or use real user _id
//     const donorArray = [];
//     const totalDonors = 100;

//     for (let i = 0; i < totalDonors; i++) {
//       const name = getNepaliFullName();
//       const email = faker.internet.email({ firstName: name.split(" ")[0] }).toLowerCase();
//       const phone = '98' + faker.string.numeric(8);

//       const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0];
//       const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
//       const bloodGroup = faker.helpers.arrayElement(bloodGroups);
//       const address = faker.helpers.arrayElement(nepaliPlaces);
//       const lastDonation = getRandomLastDonation();
//       const coords = getRandomCoordinates();
      
//       // ✅ Control verified status based on index
//       const donationCount = getDonationCount(i, totalDonors);

//       donorArray.push({
//         name,
//         email,
//         phone,
//         dob,
//         gender,
//         bloodGroup,
//         address,
//         lastDonation,
//         donationCount, // ✅ Add donation count
//         location: {
//           type: 'Point',
//           coordinates: coords
//         },
//         user: fakeUserId,
//         status: 'approved' // ✅ All donors are approved
//       });
//     }

//     await Donor.insertMany(donorArray);
    
//     // ✅ Count verified donors for confirmation
//     const verifiedCount = donorArray.filter(donor => donor.donationCount >= 2).length;
//     const regularCount = donorArray.filter(donor => donor.donationCount < 2).length;
    
//     console.log('✅ 100 Nepali donors inserted with proper City, District addresses.');
//     console.log(`📊 ${verifiedCount} verified donors (donationCount >= 2)`);
//     console.log(`📊 ${regularCount} regular donors (donationCount < 2)`);
//     console.log('📍 Example addresses:', donorArray.slice(0, 5).map(d => d.address));
//     console.log('🏆 Sample verified donors:', donorArray.filter(d => d.donationCount >= 2).slice(0, 3).map(d => `${d.name} (${d.donationCount} donations)`));
    
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Error seeding donors:', error);
//     process.exit(1);
//   }
// }




import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Donor from './models/donor.model.js';
import { faker } from '@faker-js/faker';
import getCoordinates from './utils/geocode.js'; // ✅ Import your geocoding function

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

// Nepali names and locations (keep existing arrays)
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

// ✅ Remove the random coordinates function - we'll use real geocoding

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
    // Clear existing donors
    await Donor.deleteMany({});
    console.log('🗑️ Existing donors cleared.');

    const fakeUserId = new mongoose.Types.ObjectId();
    const donorArray = [];
    const totalDonors = 50; // Reduced for faster processing

    console.log('🌍 Starting geocoding process...');

    for (let i = 0; i < totalDonors; i++) {
      const name = getNepaliFullName();
      const email = faker.internet.email({ firstName: name.split(" ")[0] }).toLowerCase();
      const phone = '98' + faker.string.numeric(8);

      const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0];
      const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
      const bloodGroup = faker.helpers.arrayElement(bloodGroups);
      const address = faker.helpers.arrayElement(nepaliPlaces);
      const lastDonation = getRandomLastDonation();
      
      // ✅ Use real geocoding for coordinates
      console.log(`📍 Geocoding ${i + 1}/${totalDonors}: ${address}`);
      const coords = await getCoordinates(address);
      
      // ✅ Fallback to Kathmandu coordinates if geocoding fails
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
          coordinates: finalCoords // ✅ Real coordinates from geocoding
        },
        user: fakeUserId,
        status: 'approved'
      });

      // ✅ Add delay to avoid rate limiting
      if (i % 5 === 0) {
        console.log(`⏳ Pausing for rate limiting...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    await Donor.insertMany(donorArray);
    
    const verifiedCount = donorArray.filter(donor => donor.donationCount >= 2).length;
    const regularCount = donorArray.filter(donor => donor.donationCount < 2).length;
    
    console.log(`✅ ${totalDonors} Nepali donors inserted with REAL coordinates.`);
    console.log(`📊 ${verifiedCount} verified donors (donationCount >= 2)`);
    console.log(`📊 ${regularCount} regular donors (donationCount < 2)`);
    
    // ✅ Show sample coordinates for verification
    console.log('📍 Sample coordinates verification:');
    donorArray.slice(0, 5).forEach(d => {
      console.log(`   ${d.address}: [${d.location.coordinates[0]}, ${d.location.coordinates[1]}]`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding donors:', error);
    process.exit(1);
  }
}