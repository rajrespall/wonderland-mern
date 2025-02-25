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

const assessments = [
  {
    communication: [2, 3, 1, 1],
    emotional: [2, 2, 1],
    routine: [3, 2, 1],
    sensory: [1, 2, 1],
    social: [2, 1, 2, 1],
    others: ["Difficulty making friends", "Sleep disturbances"]
  },
  {
    communication: [3, 2, 2, 1],
    emotional: [1, 1, 2],
    routine: [2, 1, 1],
    sensory: [3, 2, 2],
    social: [1, 2, 1, 2],
    others: ["Picky eating habits", "Difficulty with changes"]
  },
  {
    communication: [1, 1, 3, 2],
    emotional: [3, 2, 2],
    routine: [1, 3, 2],
    sensory: [2, 1, 3],
    social: [3, 2, 2, 1],
    others: ["Sensory sensitivities", "Repetitive behaviors"]
  },
  {
    communication: [2, 2, 2, 1],
    emotional: [2, 1, 3],
    routine: [2, 2, 2],
    sensory: [1, 3, 2],
    social: [2, 2, 1, 2],
    others: ["Anxiety in social situations", "Motor skill challenges"]
  },
  {
    communication: [3, 3, 1, 2],
    emotional: [1, 2, 1],
    routine: [1, 1, 3],
    sensory: [2, 2, 1],
    social: [1, 3, 2, 1],
    others: ["Language delays", "Difficulty with transitions"]
  }
];

const seedUsersAndData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing test data
    await User.deleteMany({ isTestData: true });
    await Assess.deleteMany({ userId: { $in: (await User.find({ isTestData: true })).map(u => u._id) } });
    await GeneralInfo.deleteMany({ userId: { $in: (await User.find({ isTestData: true })).map(u => u._id) } });
    console.log('Cleared existing test data');

    // Create users
    for (let i = 0; i < testUsers.length; i++) {
      try {
        // Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          testUsers[i].email, 
          testUsers[i].password
        );
        const firebaseUid = userCredential.user.uid;

        // Create MongoDB user
        const user = await User.create({
          ...testUsers[i],
          firebaseUid,
          password: "firebase_managed" // Store this in MongoDB instead of actual password
        });
        console.log(`Created user: ${user.username}`);

        // Create general info
        const birthYear = new Date(generalInfos[i].dateOfBirth).getFullYear();
        const diagnosisAge = generalInfos[i].diagnosisYear - birthYear;

        const generalInfo = await GeneralInfo.create({
          userId: user._id,
          ...generalInfos[i],
          diagnosisAge,
          isTestData: true
        });
        console.log(`Created general info for: ${generalInfo.childName}`);

        // Create assessment
        const analysisResults = analyzeAssessment(assessments[i]);
        const assessment = await Assess.create({
          userId: user._id,
          ...assessments[i],
          analysis: analysisResults,
          isTestData: true
        });
        console.log(`Created assessment for: ${user.username}`);
      } catch (error) {
        console.error(`Error creating user ${testUsers[i].email}:`, error);
        continue; // Continue with next user if one fails
      }
    }

    console.log('Test data seeding completed successfully');
    console.log('Test users can login with their email and password: Test@123');
    process.exit();
  } catch (error) {
    console.error('Error seeding test data:', error);
    process.exit(1);
  }
};

seedUsersAndData();