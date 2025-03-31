const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const Review = require("../models/review.model");

dotenv.config();

const getRandomDateInLastSixMonths = () => {
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  const randomTime =
    sixMonthsAgo.getTime() +
    Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(randomTime);
};

const getRandomAddress = () => {
  const addresses = [
    "Makati City, Metro Manila",
    "Quezon City, Metro Manila",
    "Cebu City, Cebu",
    "Davao City, Davao del Sur",
    "Baguio City, Benguet",
    "Taguig City, Metro Manila",
    "Pasig City, Metro Manila",
    "Iloilo City, Iloilo",
    "Cagayan de Oro City, Misamis Oriental",
    "Bacolod City, Negros Occidental",
  ];
  return addresses[Math.floor(Math.random() * addresses.length)];
};

const generateRealisticReview = (username) => {
  const reviewTemplates = [
    `I had an amazing experience with Wonderland! Highly recommended!`,
    `Wonderland provided excellent service. Will definitely come back again!`,
    `Great work from Wonderland. Very professional and friendly!`,
    `I was very satisfied with the help I received from Wonderland.`,
    `Not bad! Wonderland could improve in some areas, but overall a good experience.`,
  ];
  return reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
};

const extractNameFromEmail = (email) => {
  const [namePart] = email.split("@");
  const nameParts = namePart.split(".");
  return {
    firstName: nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : "FirstName",
    lastName: nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : "LastName",
  };
};

const seedProfilesAndReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    await Profile.deleteMany({});
    await Review.deleteMany({});
    console.log("🗑️ Existing profiles and reviews deleted.");

    const testUsers = await User.find({ isTestData: true });
    if (!testUsers.length) {
      console.log("❌ No test users found. Run the user seeder first.");
      process.exit(1);
    }

    console.log("⚡ Generating profiles and reviews for test users...");

    for (const user of testUsers) {
      const { firstName, lastName } = extractNameFromEmail(user.email);

      const profile = await Profile.create({
        userId: user._id,
        firstName,
        lastName,
        phoneNumber: `09${Math.floor(100000000 + Math.random() * 900000000)}`,
        address: getRandomAddress(),
        profilePicture: "",
      });
      console.log(`✅ Profile created for user: ${user.username}`);

      const reviews = [];
      for (let i = 0; i < 5; i++) {
        reviews.push({
          userId: user._id,
          rating: Math.floor(Math.random() * 5) + 1,
          comment: generateRealisticReview(user.username),
          createdAt: getRandomDateInLastSixMonths(),
        });
      }

      await Review.insertMany(reviews);
      console.log(`✅ 5 reviews created for user: ${user.username}`);
    }

    console.log("🎉 Profiles and reviews seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding profiles and reviews:", error);
    process.exit(1);
  }
};

seedProfilesAndReviews();
