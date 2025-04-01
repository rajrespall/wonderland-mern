// seed/social_mid.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Match = require('../models/match.model');

dotenv.config();

const TARGET_USER_ID = '67ea4a58ed3d191822ee52a4';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

const getDatesForMonth = (year, month, count) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = [];

  while (dates.length < count) {
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const date = new Date(year, month, day);
    const sameDayCount = dates.filter(d => d.toDateString() === date.toDateString()).length;
    if (sameDayCount < 2) dates.push(date);
  }

  return dates.sort((a, b) => a - b);
};

const generateMatches = async (userId) => {
  const difficulties = ['easy', 'medium', 'hard'];
  const totalPerMonth = 50;
  const allMatches = [];

  let globalIndex = 0;
  let currentDeduction = 0;
  const maxDeduction = 65;

  for (let month = 0; month < 3; month++) {
    const dates = getDatesForMonth(2025, month, totalPerMonth);

    for (let i = 0; i < totalPerMonth; i++) {
      const difficulty = difficulties[i % 3];

      let score = 1;
      let timeSpent = 60; // base time, no deduction

      // Add deduction only while below target 65
      if (currentDeduction < maxDeduction) {
        if (difficulty === 'easy') {
          timeSpent = 140; // deduct 10 pts (floor((140 - 100) / 20) * 5)
          currentDeduction += 10;
        } else if (difficulty === 'medium') {
          timeSpent = 95; // deduct 3 pts (floor((95 - 70)/25) * 3)
          currentDeduction += 3;
        } else if (difficulty === 'hard') {
          timeSpent = 90; // deduct 1 pt (floor((90 - 60)/30) * 1)
          currentDeduction += 1;
        }
      }

      allMatches.push({
        userId,
        score,
        difficulty,
        timeSpent,
        playedAt: dates[i],
      });

      globalIndex++;
    }
  }

  await Match.deleteMany({ userId });
  await Match.insertMany(allMatches);
  console.log(`✅ Seeded 150 wondermatch games for social score ≈ 85 (deduction=${currentDeduction})`);
  process.exit(0);
};

connectDB().then(() => {
  generateMatches(TARGET_USER_ID).catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
});
