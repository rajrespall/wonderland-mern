const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createUserWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../config/firebase');
const admin = require('firebase-admin');
const User = require('../models/user.model');
const Assess = require('../models/assessment.model');
const GeneralInfo = require('../models/geninfo.model');
const { analyzeAssessment } = require('../services/assessmentAnalysis.service');

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('../config/ServiceAccountKey.json')),
  });
}

// Filipino names data (100 entries)
const filipinoNames = [
  { firstName: "Juan", lastName: "Dela Cruz" },
  { firstName: "Maria", lastName: "Reyes" },
  { firstName: "Jose", lastName: "Santos" },
  { firstName: "Antonio", lastName: "Garcia" },
  { firstName: "Luis", lastName: "Mendoza" },
  { firstName: "Carlos", lastName: "Villanueva" },
  { firstName: "Miguel", lastName: "Torres" },
  { firstName: "Rafael", lastName: "Santiago" },
  { firstName: "Fernando", lastName: "Lopez" },
  { firstName: "Ricardo", lastName: "Castro" },
  { firstName: "Eduardo", lastName: "Ramos" },
  { firstName: "Alfredo", lastName: "Navarro" },
  { firstName: "Manuel", lastName: "Bautista" },
  { firstName: "Ramon", lastName: "Aquino" },
  { firstName: "Francisco", lastName: "Lim" },
  { firstName: "Angel", lastName: "Cruz" },
  { firstName: "Pedro", lastName: "Gonzales" },
  { firstName: "Gabriel", lastName: "Moreno" },
  { firstName: "Andres", lastName: "Del Rosario" },
  { firstName: "Felipe", lastName: "Marquez" },
  { firstName: "Roberto", lastName: "Silva" },
  { firstName: "Daniel", lastName: "Hernandez" },
  { firstName: "Enrique", lastName: "Ocampo" },
  { firstName: "Victor", lastName: "Ortega" },
  { firstName: "Alberto", lastName: "Rivera" },
  { firstName: "Mariano", lastName: "Gutierrez" },
  { firstName: "Gregorio", lastName: "Valdez" },
  { firstName: "Santiago", lastName: "Alfonso" },
  { firstName: "Emilio", lastName: "Cordero" },
  { firstName: "Julio", lastName: "Mercado" },
  { firstName: "Rodrigo", lastName: "Salazar" },
  { firstName: "Benjamin", lastName: "Agustin" },
  { firstName: "Raul", lastName: "Delgado" },
  { firstName: "Arturo", lastName: "Pineda" },
  { firstName: "Hector", lastName: "Rizal" },
  { firstName: "Domingo", lastName: "Soriano" },
  { firstName: "Felix", lastName: "Mariano" },
  { firstName: "Gerardo", lastName: "Espiritu" },
  { firstName: "Ismael", lastName: "Galang" },
  { firstName: "Rolando", lastName: "Adriano" },
  { firstName: "Nestor", lastName: "Cabrera" },
  { firstName: "Armando", lastName: "Solis" },
  { firstName: "Virgilio", lastName: "Malabanan" },
  { firstName: "Leandro", lastName: "Manalo" },
  { firstName: "Cesar", lastName: "Ilagan" },
  { firstName: "Romeo", lastName: "Dizon" },
  { firstName: "Renato", lastName: "Magbanua" },
  { firstName: "Elpidio", lastName: "Quinto" },
  { firstName: "Marcelino", lastName: "Arellano" },
  { firstName: "Teodoro", lastName: "Lagman" },
  { firstName: "Adrian", lastName: "Tan" },
  { firstName: "Bryan", lastName: "Chua" },
  { firstName: "Christian", lastName: "Ong" },
  { firstName: "David", lastName: "Sy" },
  { firstName: "Ethan", lastName: "Uy" },
  { firstName: "Francis", lastName: "Tan" },
  { firstName: "Gabriel", lastName: "Co" },
  { firstName: "Harvey", lastName: "Lim" },
  { firstName: "Ivan", lastName: "Dy" },
  { firstName: "Jason", lastName: "Go" },
  { firstName: "Kevin", lastName: "Lee" },
  { firstName: "Lance", lastName: "Yu" },
  { firstName: "Marcus", lastName: "Teo" },
  { firstName: "Nathan", lastName: "Chan" },
  { firstName: "Oliver", lastName: "Que" },
  { firstName: "Patrick", lastName: "Ang" },
  { firstName: "Quincy", lastName: "Tiu" },
  { firstName: "Ralph", lastName: "Sia" },
  { firstName: "Sean", lastName: "Ty" },
  { firstName: "Timothy", lastName: "See" },
  { firstName: "Vincent", lastName: "Wong" },
  { firstName: "Xavier", lastName: "Yap" },
  { firstName: "Zachary", lastName: "Goh" },
  { firstName: "Alyssa", lastName: "Lim" },
  { firstName: "Bianca", lastName: "Chua" },
  { firstName: "Camille", lastName: "Sy" },
  { firstName: "Danielle", lastName: "Uy" },
  { firstName: "Erica", lastName: "Tan" },
  { firstName: "Fiona", lastName: "Co" },
  { firstName: "Giselle", lastName: "Dy" },
  { firstName: "Hannah", lastName: "Go" },
  { firstName: "Isabel", lastName: "Lee" },
  { firstName: "Jasmine", lastName: "Yu" },
  { firstName: "Katherine", lastName: "Teo" },
  { firstName: "Lorraine", lastName: "Que" },
  { firstName: "Megan", lastName: "Ang" },
  { firstName: "Nicole", lastName: "Tiu" },
  { firstName: "Olivia", lastName: "Sia" },
  { firstName: "Patricia", lastName: "Ty" },
  { firstName: "Queenie", lastName: "See" },
  { firstName: "Rachel", lastName: "Wong" },
  { firstName: "Stephanie", lastName: "Yap" },
  { firstName: "Tiffany", lastName: "Goh" },
  { firstName: "Vanessa", lastName: "Lim" },
  { firstName: "Wendy", lastName: "Chua" },
  { firstName: "Xandra", lastName: "Sy" },
  { firstName: "Yvette", lastName: "Uy" },
  { firstName: "Zara", lastName: "Tan" },
  { firstName: "Arianna", lastName: "Co" },
  { firstName: "Beatrice", lastName: "Dy" }
];

// Generate test users from the names list
const testUsers = filipinoNames.map((name, index) => ({
  username: `${name.firstName.toLowerCase()}${name.lastName.toLowerCase()}`,
  email: `${name.lastName.toLowerCase()}.${name.firstName.toLowerCase()}@gmail.com`,
  password: "Test@123",
  hasCompletedAssessment: true,
  isTestData: true
}));

// Generate general info with realistic Filipino child names
const generalInfos = filipinoNames.map((name, index) => {
  // Generate random birth date between 2015-2020
  const birthYear = 2015 + Math.floor(Math.random() * 6);
  const birthMonth = 1 + Math.floor(Math.random() * 12);
  const birthDay = 1 + Math.floor(Math.random() * 28);
  const dateOfBirth = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
  
  // Diagnosis 1-3 years after birth
  const diagnosisYear = birthYear + 1 + Math.floor(Math.random() * 3);
  
  return {
    childName: `${name.firstName} ${name.lastName} Jr.`,
    dateOfBirth,
    gender: Math.random() > 0.5 ? "male" : "female",
    diagnosisYear
  };
});

// Generate diverse assessments
const generateAssessment = () => {
  const severity = () => 1 + Math.floor(Math.random() * 5); // 1-5
  const randomNotes = [
    "Slight difficulty making friends",
    "Occasional sleep disturbances",
    "Significant sensory sensitivities",
    "Difficulty with loud environments",
    "Speech delays",
    "Language processing difficulties",
    "Anxiety in social situations",
    "Difficulty regulating emotions",
    "Rigidity in routines",
    "Difficulty with transitions",
    "Repetitive behaviors"
  ];
  
  return {
    communication: Array(4).fill(0).map(severity),
    emotional: Array(3).fill(0).map(severity),
    routine: Array(3).fill(0).map(severity),
    sensory: Array(3).fill(0).map(severity),
    social: Array(4).fill(0).map(severity),
    others: [randomNotes[Math.floor(Math.random() * randomNotes.length)]]
  };
};

const assessments = Array(100).fill(0).map(generateAssessment);

// Function to generate a random date within the past 6 months
const getRandomPastDate = () => {
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  // Get a random time between sixMonthsAgo and now
  const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  
  return new Date(randomTime);
};

const seedUsersAndData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test data
    console.log('⚡ Clearing existing test data...');
    
    const existingUsers = await User.find({ isTestData: true });
    const userIds = existingUsers.map(u => u._id);
    
    // Delete Firebase users using Admin SDK (more reliable)
    for (const user of existingUsers) {
      try {
        if (user.firebaseUid) {
          await admin.auth().deleteUser(user.firebaseUid);
          console.log(`✅ Deleted Firebase user: ${user.email}`);
        }
      } catch (error) {
        console.error(`❌ Failed to delete Firebase user for ${user.email}:`, error.message);
      }
    }

    await User.deleteMany({ isTestData: true });
    await Assess.deleteMany({ userId: { $in: userIds } });
    await GeneralInfo.deleteMany({ userId: { $in: userIds } });
    
    console.log('✅ Cleared existing test data');

    // Smaller batch size and longer delays
    const batchSize = 5; // Reduced from 10 to 5
    const delayBetweenBatches = 3000; // Increased from 1000 to 3000ms
    
    for (let i = 0; i < testUsers.length; i += batchSize) {
      const batch = testUsers.slice(i, i + batchSize);
      console.log(`⚡ Processing batch ${i/batchSize + 1} of ${Math.ceil(testUsers.length/batchSize)}`);
      
      const batchPromises = batch.map(async (userData, j) => {
        const userIndex = i + j;
        try {
          // Generate random creation date for this user
          const createdAt = getRandomPastDate();
          
          // Try to create user with retry logic
          let firebaseUid;
          let retries = 3;
          let lastError;
          
          while (retries > 0) {
            try {
              // Try using Admin SDK first (more reliable)
              const firebaseUser = await admin.auth().createUser({
                email: userData.email,
                password: userData.password,
                emailVerified: true,
                disabled: false
              });
              firebaseUid = firebaseUser.uid;
              console.log(`✅ Firebase user created for: ${userData.email}`);
              break;
            } catch (adminError) {
              if (adminError.code === 'auth/email-already-exists') {
                console.log(`Firebase user already exists (Admin SDK): ${userData.email}`);
                // Try to get the existing user
                try {
                  const existingUser = await admin.auth().getUserByEmail(userData.email);
                  firebaseUid = existingUser.uid;
                  break;
                } catch (getError) {
                  lastError = getError;
                  retries--;
                  await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries))); // Exponential backoff
                }
              } else {
                lastError = adminError;
                retries--;
                await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries))); // Exponential backoff
              }
            }
          }
          
          if (!firebaseUid) {
            console.error(`❌ Failed to create/get Firebase user after 3 attempts for ${userData.email}:`, lastError);
            return; // Skip this user
          }

          // Create MongoDB user with creation date
          const user = await User.create({
            username: userData.username,
            email: userData.email,
            password: "firebase_managed",
            firebaseUid: firebaseUid,
            hasCompletedAssessment: true,
            isVerified: true,
            isTestData: true,
            createdAt: createdAt,
            updatedAt: createdAt
          });

          // Create general info with the same creation date
          const birthYear = new Date(generalInfos[userIndex].dateOfBirth).getFullYear();
          const diagnosisAge = generalInfos[userIndex].diagnosisYear - birthYear;

          const generalInfo = await GeneralInfo.create({
            userId: user._id,
            ...generalInfos[userIndex],
            diagnosisAge,
            isTestData: true,
            createdAt: createdAt,
            updatedAt: createdAt
          });

          // Create assessment with analysis and same creation date
          const analysisResults = await analyzeAssessment(assessments[userIndex]);
          
          await Assess.create({
            userId: user._id,
            ...assessments[userIndex],
            analysis: analysisResults,
            version: 1,
            isTestData: true,
            createdAt: createdAt,
            updatedAt: createdAt
          });

          console.log(`✅ Created user ${userIndex + 1}/${testUsers.length}: ${userData.email} (created at ${createdAt.toISOString()})`);
        } catch (error) {
          console.error(`❌ Error creating user ${userData.email}:`, error);
          return null;
        }
      });

      // Wait for all users in batch to complete
      await Promise.all(batchPromises);
      
      // Longer delay between batches
      if (i + batchSize < testUsers.length) {
        console.log(`⏳ Waiting ${delayBetweenBatches}ms before next batch...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }

    console.log('✅ Test data seeding completed successfully');
    console.log('🎉 Test users can login with their email and password: Test@123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding test data:', error);
    process.exit(1);
  }
};

seedUsersAndData();