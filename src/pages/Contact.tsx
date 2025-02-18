import { useState } from 'react';
import { motion } from 'framer-motion';
import { feedbackService } from '../api/services/feedback';  // Import feedbackService

export default function ContactUs() {
  // Feedback form states
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Feedback form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!name || !message || !emailOrPhone) {
      setError('Please fill in all the fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Construct the feedback object according to the API format
    const feedback = {
      name,
      message,
      emailOrPhone,  // Include phone or email
      feedbackType: 'siteFeedback', // Assuming it's always 'siteFeedback' for contact page
      comment: message, // 'comment' is mapped from 'message'
    };

    try {
      // Submit feedback via the feedbackService
      await feedbackService.submit(feedback);
      setSuccess(true);
      setName('');
      setMessage('');
      setEmailOrPhone('');
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333]">
      {/* Hero Section */}
      <motion.section
        className="h-[60vh] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 flex items-center justify-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We’d love to hear from you! Feel free to reach out for any inquiries or assistance.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Contact Information Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-16 max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[#333333] mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p
            className="text-lg text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Whether you need support, have questions, or want to discuss collaboration, we’re here to help.
          </motion.p>

          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span className="font-bold text-lg text-gray-700 mr-3">
              Phone:
            </motion.span>
            <motion.a
              href="tel:+917838880955"
              className="text-[#FF8C00] font-medium hover:underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              7838880955
            </motion.a>
          </motion.div>

          <motion.div>
            <motion.span>
              <a href="mailto:mobiiwrapshopify@gmail.com">
                Email: mobiiwrapshopify@gmail.com
              </a>
            </motion.span>
          </motion.div>
        </motion.div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-16 max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[#333333] mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Submit Your Feedback
        </motion.h2>

        {error && (
          <motion.p
            className="text-red-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {error}
          </motion.p>
        )}

        {success && (
          <motion.p
            className="text-green-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Thank you for your feedback! We'll get back to you soon.
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="emailOrPhone" className="block text-lg font-medium text-gray-700">
              Your Phone Number or Email
            </label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#FF8C00] text-white rounded-full font-medium hover:bg-orange-600 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
