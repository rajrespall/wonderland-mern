const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createUserWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../config/firebase');
const User = require('../models/user.model');
const Assess = require('../models/assessment.model');
const GeneralInfo = require('../models/geninfo.model');
const { analyzeAssessment } = require('../services/assessmentAnalysis.service');

dotenv.config();

const testUsers = [
  {
    username: "testparent1",
    email: "testparent1@wonderland.com",
    password: "Test@123", // Real password that can be used to login
    hasCompletedAssessment: true,
    isTestData: true
  },
  {
    username: "testparent2",
    email: "testparent2@wonderland.com",
    password: "Test@123",
    hasCompletedAssessment: true,
    isTestData: true
  },
  {
    username: "testparent3",
    email: "testparent3@wonderland.com",
    password: "Test@123",
    hasCompletedAssessment: true,
    isTestData: true
  },
  {
    username: "testparent4",
    email: "testparent4@wonderland.com",
    password: "Test@123",
    hasCompletedAssessment: true,
    isTestData: true
  },
  {
    username: "testparent5",
    email: "testparent5@wonderland.com",
    password: "Test@123",
    hasCompletedAssessment: true,
    isTestData: true
  }
];

const generalInfos = [
  {
    childName: "Alex Smith",
    dateOfBirth: "2018-03-15",
    gender: "male",
    diagnosisYear: 2021
  },
  {
    childName: "Emma Johnson",
    dateOfBirth: "2017-06-22",
    gender: "female",
    diagnosisYear: 2020
  },
  {
    childName: "Noah Williams",
    dateOfBirth: "2019-01-10",
    gender: "male",
    diagnosisYear: 2022
  },
  {
    childName: "Sophia Brown",
    dateOfBirth: "2018-09-05",
    gender: "female",
    diagnosisYear: 2021
  },
  {
    childName: "Lucas Davis",
    dateOfBirth: "2017-11-30",
    gender: "male",
    diagnosisYear: 2020
  }
];

// Updated assessments with varying severity (1=least severe, 5=most severe)
// Creating more diverse assessment patterns to see different analysis results
const assessments = [
  {
    // First user - Mild to moderate difficulties
    communication: [2, 3, 1, 2], // Lower scores indicate less severity
    emotional: [2, 1, 2],
    routine: [3, 2, 1],
    sensory: [1, 2, 1],
    social: [2, 1, 2, 1],
    others: ["Slight difficulty making friends", "Occasional sleep disturbances"]
  },
  {
    // Second user - Moderate difficulties with sensory issues
    communication: [3, 2, 3, 3],
    emotional: [2, 3, 3],
    routine: [2, 2, 3],
    sensory: [4, 5, 4], // Higher sensory sensitivity
    social: [3, 3, 2, 3],
    others: ["Significant sensory sensitivities", "Difficulty with loud environments"]
  },
  {
    // Third user - Communication challenges
    communication: [4, 5, 4, 5], // More severe communication issues
    emotional: [3, 2, 3],
    routine: [2, 3, 2],
    sensory: [2, 3, 2],
    social: [3, 4, 3, 3],
    others: ["Speech delays", "Language processing difficulties"]
  },
  {
    // Fourth user - Social and emotional challenges
    communication: [2, 3, 2, 3],
    emotional: [4, 5, 4], // More emotional regulation issues
    routine: [2, 3, 2],
    sensory: [3, 2, 2],
    social: [4, 5, 4, 5], // More social challenges
    others: ["Anxiety in social situations", "Difficulty regulating emotions"]
  },
  {
    // Fifth user - Routine and behavioral challenges
    communication: [2, 2, 3, 2],
    emotional: [3, 3, 2],
    routine: [5, 4, 5], // More significant routine challenges
    sensory: [2, 3, 2],
    social: [3, 2, 3, 2],
    others: ["Rigidity in routines", "Difficulty with transitions", "Repetitive behaviors"]
  }
];

const seedUsersAndData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test data
    console.log('⚡ Clearing existing test data...');
    
    const existingUsers = await User.find({ isTestData: true });
    const userIds = existingUsers.map(u => u._id);
    
    await User.deleteMany({ isTestData: true });
    await Assess.deleteMany({ userId: { $in: userIds } });
    await GeneralInfo.deleteMany({ userId: { $in: userIds } });
    
    console.log('✅ Cleared existing test data');

    // Create users
    console.log('⚡ Creating test users...');
    for (let i = 0; i < testUsers.length; i++) {
      try {
        // Create Firebase user
        let firebaseUid = `seed-firebase-uid-${i}`; // Default fallback
        
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth, 
            testUsers[i].email, 
            testUsers[i].password
          );
          firebaseUid = userCredential.user.uid;
          console.log(`✅ Firebase user created for: ${testUsers[i].email} with UID: ${firebaseUid}`);
        } catch (firebaseError) {
          if (firebaseError.code === 'auth/email-already-in-use') {
            console.log(`Firebase user already exists: ${testUsers[i].email}, using placeholder UID`);
            // Keep the fallback UID that was already set
          } else {
            console.error(`❌ Firebase error for ${testUsers[i].email}:`, firebaseError);
            throw firebaseError;
          }
        }

        // Create MongoDB user with correct field name (firebaseUid)
        const user = await User.create({
          username: testUsers[i].username,
          email: testUsers[i].email,
          password: "firebase_managed",
          firebaseUid: firebaseUid,
          hasCompletedAssessment: true,
          isVerified: true,  // Mark as verified
          isTestData: true
        });
        console.log(`✅ MongoDB user created: ${user.username}`);

        // Create general info
        const birthYear = new Date(generalInfos[i].dateOfBirth).getFullYear();
        const diagnosisAge = generalInfos[i].diagnosisYear - birthYear;

        const generalInfo = await GeneralInfo.create({
          userId: user._id,
          ...generalInfos[i],
          diagnosisAge,
          isTestData: true
        });
        console.log(`✅ Created general info for: ${generalInfo.childName}`);

        // Create assessment with analysis
        console.log(`⚡ Analyzing assessment for: ${user.username}`);
        const analysisResults = await analyzeAssessment(assessments[i]);
        console.log(`✅ Analysis complete with category: ${analysisResults.isaaCategory}`);
        
        const assessment = await Assess.create({
          userId: user._id,
          ...assessments[i],
          analysis: analysisResults,
          isTestData: true
        });
        console.log(`✅ Created assessment for: ${user.username}`);
      } catch (error) {
        console.error(`❌ Error creating user ${testUsers[i].email}:`, error);
        continue; // Continue with next user if one fails
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