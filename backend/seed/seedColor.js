const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { cloudinary } = require("../config/cloudinary");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const User = require("../models/user.model");
const Color = require("../models/color.model");

dotenv.config();

const getRandomImage = async () => {
  try {
    const response = await axios.get("https://source.unsplash.com/random/300x300");
    return response.request.res.responseUrl;
  } catch (error) {
    console.error("Failed to fetch from Unsplash, using Picsum Photos");
    return `https://picsum.photos/300?random=${Math.floor(Math.random() * 1000)}`;
  }
};

const uploadImageToCloudinary = async (imageUrl, userId, index) => {
  try {
    console.log(`Downloading image: ${imageUrl}`);
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream",
    });

    const imagePath = path.join(__dirname, `temp_${userId}_${index}.jpg`);
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("Uploading image to Cloudinary...");
    const uploadedImage = await cloudinary.uploader.upload(imagePath, {
      folder: "wondercolor_test_data",
    });

    console.log("Uploaded successfully:", uploadedImage.secure_url);

    fs.unlinkSync(imagePath);
    return uploadedImage;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};

const seedColorData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const testUsers = await User.find({ isTestData: true });
    if (testUsers.length === 0) {
      console.log("No test users found. Seed users first.");
      return;
    }

    await Color.deleteMany({ userId: { $in: testUsers.map((user) => user._id) } });
    console.log("Cleared existing color test data");

    for (const user of testUsers) {
      for (let i = 0; i < 3; i++) {
        try {
          console.log(`Fetching random image for user: ${user.username}`);

          const imageUrl = await getRandomImage();

          const uploadedImage = await uploadImageToCloudinary(imageUrl, user._id, i);
          if (!uploadedImage) continue;

          await Color.create({
            userId: user._id,
            imageUrl: uploadedImage.secure_url,
            cloudinaryId: uploadedImage.public_id,
          });

          console.log(`Image saved for user: ${user.username}`);
        } catch (error) {
          console.error(`Failed to upload image for ${user.username}:`, error);
        }
      }
    }

    console.log("Test color data seeding completed successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding test color data:", error);
    process.exit(1);
  }
};

seedColorData();