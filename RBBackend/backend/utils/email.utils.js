import nodemailer from "nodemailer";
import User from '../models/user.model.js';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"RedBridge Blood Bank" <${process.env.EMAIL_USER}>`,
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
            from: `"RedBridge Blood Bank" <${process.env.EMAIL_USER}>`,
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

// Send OTP for password reset
export const sendPasswordResetOTP = async (options) => {
    try {
        const mailOptions = {
            from: `"RedBridge Blood Bank" <${process.env.EMAIL_USER}>`,
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
            from: `"RedBridge Blood Bank" <${process.env.EMAIL_USER}>`,
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

export const sendContactEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"RedBridge Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            replyTo: options.email,
            subject: `Contact Form: ${options.subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                        New Contact Form Submission - RedBridge
                    </h2>
                    
                    <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Contact Details:</h3>
                        <p><strong>Name:</strong> ${options.firstName} ${options.lastName}</p>
                        <p><strong>Email:</strong> <a href="mailto:${options.email}">${options.email}</a></p>
                        <p><strong>Subject:</strong> ${options.subject}</p>
                    </div>
                    
                    <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h3 style="margin-top: 0; color: #374151;">Message:</h3>
                        <p style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">${options.message}</p>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
                        <p style="margin: 0; font-size: 14px; color: #92400e;">
                            <strong>Note:</strong> You can reply directly to this email to respond to ${options.firstName}.
                        </p>
                    </div>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                    <p style="font-size: 12px; color: #6b7280; text-align: center;">
                        This email was sent from the RedBridge contact form.
                    </p>
                </div>
            `,
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log(`Contact form email sent to admin. MessageId: %s`, info.messageId);
    } catch (error) {
        console.error('Error sending contact form email:', error);
        throw error;
    }
};