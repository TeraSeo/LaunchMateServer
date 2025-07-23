import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

export const sendOtpEmail = async (email: string, otp: string) => {
  try {

    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
    
    const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,     
        pass: GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"LaunchMate" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family:sans-serif; text-align:center;">
          <h2>🔐 Your LaunchMate OTP Code</h2>
          <p>Use the following OTP to complete your login:</p>
          <h1 style="letter-spacing: 6px;">${otp}</h1>
          <p style="color:gray;">This code will expire in 5 minutes.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Sent OTP ${otp} to ${email}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
