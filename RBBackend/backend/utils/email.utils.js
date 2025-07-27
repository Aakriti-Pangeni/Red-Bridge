import nodemailer from "nodemailer";
import User from '../models/user.model.js';
import { requestDonor } from "../controllers/donor.controller.js";
import middleware from "../middleware/auth.middleware.js";


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"RedBridge " <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: 'Welcome to RedBridge Blood Bank!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #dc2626; margin: 0;">RedBridge</h1>
                            <p style="color: #666; margin: 5px 0;">Blood Bank System</p>
                        </div>
                        
                        <h2 style="color: #333;">Welcome, ${options.userName || 'User'}!</h2>
                        <p style="color: #666; line-height: 1.6;">
                            Thank you for joining RedBridge Blood Bank. Together, we can save lives by connecting blood donors with those in need.
                        </p>
                        <p style="color: #666; line-height: 1.6;">
                            Start exploring our platform to find blood donors or register as a donor yourself.
                        </p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                            <p style="color: #999; font-size: 14px;">
                                Best regards,<br/>
                                The RedBridge Team
                            </p>
                        </div>
                    </div>
                </div>
            `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${options.email}. MessageId: %s`, info.messageId);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};


export const sendDonationConfirmationEmail = async (donationDetails) => {
    try {
        const user = await User.findById(donationDetails.user);
        if (!user) {
            console.error('User not found for donation confirmation email:', donationDetails.user);
            return;
        }

        const donationDate = new Date(donationDetails.donationDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        const mailOptions = {
            from: `"RedBridge "<${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: `Blood Donation Confirmation - Thank You!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #dc2626; margin: 0;">RedBridge</h1>
                            <p style="color: #666; margin: 5px 0;">Blood Bank System</p>
                        </div>
                        
                        <h2 style="color: #333;">Thank you for your donation!</h2>
                        <p style="color: #666; line-height: 1.6;">Dear ${user.userName || 'Donor'},</p>
                        <p style="color: #666; line-height: 1.6;">
                            Your blood donation has been confirmed and recorded. Thank you for your generous contribution to saving lives!
                        </p>
                        
                        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                            <h3 style="margin-top: 0; color: #dc2626;">Donation Details:</h3>
                            <p><strong>Blood Type:</strong> ${donationDetails.bloodType}</p>
                            <p><strong>Donation Date:</strong> ${donationDate}</p>
                            <p><strong>Location:</strong> ${donationDetails.location}</p>
                            <p><strong>Reference ID:</strong> ${donationDetails.referenceId}</p>
                        </div>
                        
                        <p style="color: #666; line-height: 1.6;">
                            Your donation can save up to 3 lives. Thank you for being a hero!
                        </p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                            <p style="color: #999; font-size: 14px;">
                                Thank you for using RedBridge Blood Bank!<br/>
                                The RedBridge Team
                            </p>
                        </div>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Donation confirmation email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending donation confirmation email:', error);
    }
};


export const sendPasswordResetOTP = async (options) => {
    try {
        const mailOptions = {
            from: `"RedBridge " <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: 'RedBridge Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #dc2626; margin: 0;">RedBridge</h1>
                            <p style="color: #666; margin: 5px 0;">Blood Bank System</p>
                        </div>
                        
                        <h2 style="color: #333;">Password Reset Request</h2>
                        <p style="color: #333; font-size: 16px;">Hi ${options.userName},</p>
                        
                        <p style="color: #666; line-height: 1.6;">
                            You requested a password reset for your RedBridge account. 
                            Please use the following 6-digit verification code:
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <div style="background-color: #dc2626; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 10px; letter-spacing: 8px; display: inline-block;">
                                ${options.otp}
                            </div>
                        </div>
                        
                        <p style="color: #666; line-height: 1.6;">
                            This code is valid for <strong>10 minutes</strong>. 
                            If you did not request this password reset, please ignore this email.
                        </p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                            <p style="color: #999; font-size: 14px;">
                                Thanks,<br/>
                                The RedBridge Team
                            </p>
                        </div>
                    </div>
                </div>
            `,
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log(`Password reset OTP sent to ${options.email}: ${options.otp}`);
        return info;
    } catch (error) {
        console.error('Error sending password reset OTP:', error);
        throw error;
    }
};

export const sendBloodRequestNotification = async (options) => {
    try {
        const mailOptions = {
            from: `"RedBridge " <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: `Urgent: Blood Request Match Found - ${options.bloodType}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #dc2626; margin: 0;">RedBridge</h1>
                            <p style="color: #666; margin: 5px 0;">Blood Bank System</p>
                        </div>
                        
                        <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                            <h2 style="color: #dc2626; margin-top: 0;">Urgent Blood Request!</h2>
                            <p style="color: #333;">Hi ${options.donorName},</p>
                            <p style="color: #666; line-height: 1.6;">
                                There's an urgent request for <strong>${options.bloodType}</strong> blood type in your area. 
                                Your donation could save a life!
                            </p>
                        </div>
                        
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #374151;">Request Details:</h3>
                            <p><strong>Blood Type Needed:</strong> ${options.bloodType}</p>
                            <p><strong>Location:</strong> ${options.location}</p>
                            <p><strong>Contact:</strong> ${options.contact}</p>
                            <p><strong>Urgency:</strong> ${options.urgency || 'High'}</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${options.responseLink}" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                Respond to Request
                            </a>
                        </div>
                        
                        <p style="color: #666; line-height: 1.6; text-align: center;">
                            Thank you for being a life-saver!
                        </p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                            <p style="color: #999; font-size: 14px;">
                                The RedBridge Team
                            </p>
                        </div>
                    </div>
                </div>
            `,
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log(`Blood request notification sent to ${options.email}. MessageId: %s`, info.messageId);
    } catch (error) {
        console.error('Error sending blood request notification:', error);
    }
};


export const sendDonorRequestEmail = async ({ 
  donorEmail, 
  donorName, 
  requesterName, 
  requesterPhone, 
  bloodGroup = '',
  message = 'Emergency blood donation needed'
}) => {
  try {
    console.log('=== EMAIL SENDING DEBUG ===');
    console.log('Donor Email:', donorEmail);
    console.log('Donor Name:', donorName);
    console.log('Requester Name:', requesterName);
    console.log('Requester Phone:', requesterPhone);
    console.log('Blood Group:', bloodGroup);
    
    const mailOptions = {
      from: `"RedBridge " <${process.env.EMAIL_USER}>`,
      to: donorEmail,
      subject: `Urgent Blood Donation Request from ${requesterName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dc2626; margin: 0;" RedBridge</h1>
              <p style="color: #666; margin: 5px 0;">Blood Donor Finding System</p>
            </div>

            <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h2 style="color: #dc2626; margin-top: 0;"> Urgent Blood Request!</h2>
              <p style="color: #333;">Hi <strong>${donorName}</strong>,</p>
              <p style="color: #666; line-height: 1.6;">
                <strong>${requesterName}</strong> is urgently requesting a blood donation${bloodGroup ? ` of blood group <strong>${bloodGroup}</strong>` : ''}.
              </p>
            </div>

            <div style="margin: 20px 0; padding: 15px; background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #dc2626;">Contact Information:</h3>
              <p><strong>Requester Name:</strong> ${requesterName}</p>
              <p><strong>Contact Number:</strong> <a href="tel:${requesterPhone}" style="color: #dc2626;">${requesterPhone}</a></p>
              ${bloodGroup ? `<p><strong>Blood Group Needed:</strong> ${bloodGroup}</p>` : ''}
            </div>

            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">Message:</h4>
              <p style="color: #4b5563; font-style: italic;">"${message}"</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:${requesterPhone}" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                 Call ${requesterName}
              </a>
            </div>

            <p style="color: #666; line-height: 1.6; text-align: center;">
              Thank you for being a life-saver! 
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #999; font-size: 14px;">
                The RedBridge Team<br/>
                
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(` Email sent successfully to ${donorEmail}. MessageId: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(' Error sending donor request email:', error);
    throw error;
  }
};



// Add this function to your existing email.utils.js file
export const sendContactEmail = async ({ name, subject, message }) => {
  try {
    console.log('=== CONTACT EMAIL SENDING ===');
    console.log('Sending to: redbridge321@gmail.com');
    
    const mailOptions = {
      from: `"RedBridge Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'redbridge321@gmail.com', 
      subject: ` RedBridge Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #dc2626; padding-bottom: 20px;">
              <h1 style="color: #dc2626; margin: 0;"> RedBridge Contact Form</h1>
              <p style="color: #666; margin: 5px 0;">New message from website</p>
            </div>

            <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h2 style="color: #dc2626; margin-top: 0;"> Contact Details</h2>
              
              <div style="margin: 15px 0;">
                <strong style="color: #333;">Name:</strong> 
                <span style="color: #666; margin-left: 10px;">${name}</span>
              </div>
              
              <div style="margin: 15px 0;">
                <strong style="color: #333;">Subject:</strong> 
                <span style="color: #666; margin-left: 10px;">${subject}</span>
              </div>
            </div>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;"> Message:</h3>
              <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 3px solid #dc2626;">
                <p style="color: #4b5563; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #999; font-size: 14px;">
                Received: ${new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}<br/>
                <em>RedBridge Blood Donor Finding System</em>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(` Contact email sent successfully to redbridge321@gmail.com. MessageId: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(' Error sending contact email:', error);
    throw error;
  }
};