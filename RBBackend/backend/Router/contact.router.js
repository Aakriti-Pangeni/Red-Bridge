import express from 'express';
import { sendContactEmail } from '../utils/email.utils.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, subject, message } = req.body;
    
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Name:', name);
    console.log('Subject:', subject);
    console.log('Message:', message);
    
    
    if (!name || !subject || !message) {
      return res.status(400).json({ error: 'Name, subject, and message are required' });
    }

    
    try {
      await sendContactEmail({
        name,
        subject,
        message
      });
      
      console.log(' Contact email sent successfully');
      res.json({ message: 'Message sent successfully! We will get back to you soon.' });
    } catch (emailError) {
      console.error(' Failed to send contact email:', emailError);
      res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;