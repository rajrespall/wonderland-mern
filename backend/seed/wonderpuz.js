const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Puz = require('../models/puz.model');

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

const mediumProgressPattern = Array(50).fill(true); // all completed
const hardPattern = [true, true, true, true, false];

const generatePuzzles = async (userId) => {
  const difficulties = ['easy', 'medium', 'hard'];
  const totalPerMonth = 50;

  const allPuzzles = [];

  for (let month = 0; month < 3; month++) {
    const dates = getDatesForMonth(2025, month, totalPerMonth);
    let mediumIndex = 0;
    let hardIndex = 0;

    for (let i = 0; i < totalPerMonth; i++) {
      const difficulty = difficulties[i % 3];
      let isCompleted = true;
      let timeSpent = 2;

      if (difficulty === 'medium') {
        isCompleted = mediumProgressPattern[mediumIndex] ?? true;
        timeSpent = Math.floor(Math.random() * 6) + 1;
        mediumIndex++;
      } else if (difficulty === 'hard') {
        isCompleted = hardPattern[hardIndex % hardPattern.length];
        timeSpent = Math.floor(Math.random() * 20) + 1;
        hardIndex++;
      }

      allPuzzles.push({
        userId,
        playedAt: dates[i],
        difficulty,
        isCompleted,
        timeSpent,
      });
    }
  }

  await Puz.insertMany(allPuzzles);
  console.log('✅ Seeded 150 wonderpuz documents for user:', userId);
  process.exit(0);
};

connectDB().then(() => {
  generatePuzzles(TARGET_USER_ID).catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
});
