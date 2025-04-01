const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const { v4: uuid } = require('uuid');
const cloudinary = require('cloudinary').v2;
const Color = require('../models/color.model');

dotenv.config();

const TARGET_USER_ID = '67ea4a59ed3d191822ee52aa';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

const fetchAndUploadRandomImage = async () => {
  const randomUrl = `https://picsum.photos/300?random=${uuid().slice(0, 8)}`;
  const response = await axios.get(randomUrl, { responseType: 'arraybuffer' });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    uploadStream.end(response.data);
  });
};

const generateColorEntries = async (userId) => {
  const today = new Date();
  const allEntries = [];

  for (let i = 0; i < 10; i++) {
    const createdAt = new Date();
    createdAt.setDate(today.getDate() - (9 - i)); // Last 10 days

    const uploaded = await fetchAndUploadRandomImage();

    allEntries.push({
      userId,
      imageUrl: uploaded.secure_url,
      cloudinaryId: uploaded.public_id,
      createdAt,
    });

    console.log(`📸 Uploaded color ${i + 1}/10 | Date: ${createdAt.toDateString()}`);
  }

  await Color.insertMany(allEntries);
  console.log('✅ Seeded 10 wondercolor entries');
  process.exit(0);
};

connectDB().then(() => {
  generateColorEntries(TARGET_USER_ID).catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
});
