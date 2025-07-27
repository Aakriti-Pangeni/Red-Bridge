


import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Send SMS to a Nepali number stored as "984XXXXXXX"
 * @param {string} to - 10-digit phone number from donor.phone
 * @param {string} message - Message to send
 */

const sendSMS = async (to, message) => {
  try {
    console.log("📱 Donor phone received:", to);

    
    if (!/^\d{10}$/.test(to)) {
      throw new Error(`Invalid phone number: "${to}". It must be 10 digits like 984XXXXXXX.`);
    }

    const formattedTo = `+977${to}`;
    console.log(" Formatted number:", formattedTo);

    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE, 
      to: formattedTo,
    });

    console.log(' SMS sent successfully:', res.sid);
  } catch (error) {
    console.error(' Failed to send SMS:', {
      message: error.message,
      code: error.code || 'N/A',
      info: error.moreInfo || 'N/A',
    });
  }
};

export default sendSMS;
