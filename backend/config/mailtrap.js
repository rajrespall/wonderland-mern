require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.MAILTRAP_PORT || 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: '"Wonderland App" <noreply@wonderland.com>',
      to: email,
      subject: 'Verify Your Email - Wonderland',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #0457a4; border-radius: 10px;">
          <div style="background-color: #0457a4; padding: 15px; text-align: center; border-radius: 8px;">
            <h1 style="color: #fcf230; margin: 0;">Wonderland</h1>
          </div>
          <div style="padding: 20px; text-align: center;">
            <h2 style="color: #5da802;">Verify Your Email Address</h2>
            <p>Thank you for registering with Wonderland! Please use the following verification code to complete your registration:</p>
            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-radius: 8px;">
            <p style="margin: 0; color: #666;">If you did not request this verification, please ignore this email.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendOTPEmail };