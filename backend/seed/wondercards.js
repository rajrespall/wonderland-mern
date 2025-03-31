const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Card = require('../models/card.model');

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
  
      // allow same day up to 2 times
      const sameDayCount = dates.filter(d => d.toDateString() === date.toDateString()).length;
      if (sameDayCount < 2) {
        dates.push(date);
      }
    }
  
    return dates.sort((a, b) => a - b);
  };
  

  const normalProgressPattern = Array(50).fill(1);
const hardPattern = [1, 1, 1, 1, 0];

const generateCards = async (userId) => {
  const difficulties = ['Easy', 'Normal', 'Hard'];
  const totalPerMonth = 50;

  const allCards = [];

  for (let month = 0; month < 3; month++) {
    const dates = getDatesForMonth(2025, month, totalPerMonth);
    let normalIndex = 0;
    let hardIndex = 0;

    for (let i = 0; i < totalPerMonth; i++) {
      const difficulty = difficulties[i % 3];
      let completed = 1;
      let timeTaken = 2;

      if (difficulty === 'Normal') {
        completed = normalProgressPattern[normalIndex] ?? 1;
        timeTaken = Math.floor(Math.random() * 6) + 1;
        normalIndex++;
      } else if (difficulty === 'Hard') {
        completed = hardPattern[hardIndex % hardPattern.length];
        timeTaken = Math.floor(Math.random() * 20) + 1;
        hardIndex++;
      }

      allCards.push({
        userId,
        gameDate: dates[i],
        difficulty,
        failed: Math.floor(Math.random() * 3) + 1,
        completed,
        timeTaken,
      });
    }
  }

  await Card.insertMany(allCards);
  console.log('✅ Seeded 150 wondercards for user:', userId);
  process.exit(0);
};

connectDB().then(() => {
  generateCards(TARGET_USER_ID).catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
});
