const crypto = require('crypto');

// Generate a 6-digit OTP code
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create expiration time (10 minutes from now)
const createOTPExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};

module.exports = {
  generateOTP,
  createOTPExpiry
};