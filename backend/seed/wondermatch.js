const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Match = require('../models/match.model');

dotenv.config();

const TARGET_USER_ID = '67ea4a59ed3d191822ee52aa';

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
    if (sameDayCount < 2) {
      dates.push(date);
    }
  }

  return dates.sort((a, b) => a - b);
};

const generateMatches = async (userId) => {
  const difficulties = ['easy', 'medium', 'hard'];
  const totalPerMonth = 50;
  const allMatches = [];

  let hardPattern = [30, 30, 30, 30, 30, 90];
  let hardIndex = 0;

  // Score progression: from 1 → 10 over 150 matches
  const generateScore = (index, total = 150) => {
    const minScore = 1;
    const maxScore = 10;
    return Math.round(minScore + ((maxScore - minScore) * (index / (total - 1))));
  };

  for (let month = 0; month < 3; month++) {
    const dates = getDatesForMonth(2025, month, totalPerMonth);

    for (let i = 0; i < totalPerMonth; i++) {
      const globalIndex = month * totalPerMonth + i;
      const difficulty = difficulties[i % 3];
      let timeSpent = 45;

      if (difficulty === 'easy' || difficulty === 'medium') {
        timeSpent = Math.floor(Math.random() * 11) + 40; // 40–50
      } else if (difficulty === 'hard') {
        timeSpent = hardPattern[hardIndex % hardPattern.length];
        hardIndex++;
      }

      allMatches.push({
        userId,
        score: generateScore(globalIndex),
        difficulty,
        timeSpent,
        playedAt: dates[i],
      });
    }
  }

  await Match.insertMany(allMatches);
  console.log('✅ Seeded 150 gradually improving wondermatch records for user:', userId);
  process.exit(0);
};

connectDB().then(() => {
  generateMatches(TARGET_USER_ID).catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
});
