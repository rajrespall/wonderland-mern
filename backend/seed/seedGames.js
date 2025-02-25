const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Match = require('../models/match.model');
const Puz = require('../models/puz.model');
const Card = require('../models/card.model');
const User = require('../models/user.model');

dotenv.config();

// Helper function to generate random number within range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Helper function to get random element from array
const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

const difficulties = {
  match: ['easy', 'medium', 'hard'],
  puz: ['easy', 'medium', 'hard'],
  card: ['Easy', 'Normal', 'Hard']
};

const generateGameData = async (users) => {
  const gameData = {
    matches: [],
    puzzles: [],
    cards: []
  };

  for (const user of users) {
    // Generate 5-10 matches per user
    const numMatches = randomInt(5, 10);
    for (let i = 0; i < numMatches; i++) {
      gameData.matches.push({
        userId: user._id,
        score: randomInt(0, 10),
        difficulty: randomElement(difficulties.match),
        timeSpent: randomInt(30, 300),
        playedAt: new Date(Date.now() - randomInt(0, 30) * 24 * 60 * 60 * 1000)
      });
    }

    // Generate 5-10 puzzle games per user
    const numPuzzles = randomInt(5, 10);
    for (let i = 0; i < numPuzzles; i++) {
      gameData.puzzles.push({
        userId: user._id,
        timeSpent: randomInt(60, 600),
        difficulty: randomElement(difficulties.puz),
        isCompleted: Math.random() > 0.2,
        playedAt: new Date(Date.now() - randomInt(0, 30) * 24 * 60 * 60 * 1000)
      });
    }

    // Generate 5-10 card games per user
    const numCards = randomInt(5, 10);
    for (let i = 0; i < numCards; i++) {
      gameData.cards.push({
        userID: user._id,
        gameDate: new Date(Date.now() - randomInt(0, 30) * 24 * 60 * 60 * 1000),
        failed: randomInt(0, 5),
        difficulty: randomElement(difficulties.card),
        completed: 1,
        timeTaken: randomInt(30, 300)
      });
    }
  }

  return gameData;
};

const seedGames = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get test users
    const testUsers = await User.find({ isTestData: true });
    if (!testUsers.length) {
      throw new Error('No test users found. Please run the user seeder first.');
    }

    // Clear existing game data for test users
    await Match.deleteMany({ userId: { $in: testUsers.map(u => u._id) } });
    await Puz.deleteMany({ userId: { $in: testUsers.map(u => u._id) } });
    await Card.deleteMany({ userID: { $in: testUsers.map(u => u._id) } });
    console.log('Cleared existing game data for test users');

    // Generate and save new game data
    const gameData = await generateGameData(testUsers);

    // Save all game data
    await Match.insertMany(gameData.matches);
    await Puz.insertMany(gameData.puzzles);
    await Card.insertMany(gameData.cards);

    console.log('Game data seeding completed successfully');
    console.log(`Created ${gameData.matches.length} matches`);
    console.log(`Created ${gameData.puzzles.length} puzzles`);
    console.log(`Created ${gameData.cards.length} card games`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding game data:', error);
    process.exit(1);
  }
};

seedGames();