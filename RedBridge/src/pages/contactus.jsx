import React, { useState } from 'react'
import MainLayout from '../shared/sidebar/mainlayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      alert("Message sent successfully!");
      setFormData({
        name: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (err) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="flex flex-col-reverse md:flex-row justify-center items-center gap-8 px-4 py-12 bg-gray-200 mt-15 ">
        
        
        <div className="bg-white shadow-md rounded-lg px-6 py-8 w-full max-w-md">
          {errors.submit && (
            <div className="text-red-600 mb-4 text-sm">{errors.submit}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-xl font-semibold mb-6 text-center text-red-900">Contact Us</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Full Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Full Name"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
                value={formData.name}
                onChange={handlechange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter the Subject"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
                value={formData.subject}
                onChange={handlechange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message:</label>
              <textarea
                name="message"
                placeholder="Enter your Message"
                className="w-full border border-gray-300 h-24 rounded px-4 py-2 text-sm focus:outline-none resize-none"
                value={formData.message}
                onChange={handlechange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#660000] hover:bg-[#800000] text-white font-medium py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="shadow-lg bg-gray-100 rounded-xl px-6 py-8 w-full max-w-md">
          <h1 className="text-2xl text-red-900 font-bold mb-2">Get in Touch with Us</h1>
          <p className="text-sm text-gray-600 mb-6">Fill in the form to start the conversation</p>

          <div className="mb-4">
            <FontAwesomeIcon icon={faLocationDot} className="text-red-700 mr-3" />
            Butwal, Rupandehi, Lumbini Province
          </div>

          <div className="mb-4">
            <FontAwesomeIcon icon={faPhone} className="text-red-700 mr-3" />
            +977 980000000
          </div>

          <div>
            <FontAwesomeIcon icon={faEnvelope} className="text-red-700 mr-3" />
            redbridgemail03@gmail.com
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactUs;
