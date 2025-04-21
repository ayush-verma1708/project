import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { feedbackService } from '../../api/services/feedback';

export default function ContactUs() {
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    emailOrPhone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  // Update form data
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, message, emailOrPhone } = formData;

    // Validate form inputs
    if (!name || !message || !emailOrPhone) {
      setError('Please fill in all the fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Construct the feedback object
    const feedback = {
      name,
      message,
      emailOrPhone,
      feedbackType: 'siteFeedback',
      comment: message,
    };

    try {
      await feedbackService.submit(feedback);
      setSuccess(true);
      setFormData({ name: '', message: '', emailOrPhone: '' });
      
      // Scroll to form to show success message
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
            }}
          />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              GET IN TOUCH
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto tracking-wide">
              We're here to help with any questions about our custom wraps and services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards + Form */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="md:grid md:grid-cols-5 gap-8">
          {/* Left column - Contact details */}
          <motion.div 
            className="md:col-span-2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-black text-white">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-light tracking-tight">CONTACT INFORMATION</h2>
                <p className="mt-2 text-white/60 tracking-wide">Reach out to us directly</p>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <motion.div 
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Phone */}
                  <motion.div variants={itemVariants} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-light tracking-tight text-white/80">Phone</h3>
                      <a href="tel:+917838880955" className="mt-1 text-white hover:text-white/80 transition-colors">
                        +91 7838880955
                      </a>
                    </div>
                  </motion.div>
                  
                  {/* Email */}
                  <motion.div variants={itemVariants} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-light tracking-tight text-white/80">Email</h3>
                      <a href="mailto:mobiiwrapshopify@gmail.com" className="mt-1 text-white hover:text-white/80 transition-colors">
                        mobiiwrapshopify@gmail.com
                      </a>
                    </div>
                  </motion.div>
                  
                  {/* Address */}
                  <motion.div variants={itemVariants} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-light tracking-tight text-white/80">Location</h3>
                      <p className="mt-1 text-white/60">
                        Gaffar Market, Karol Bagh<br />
                        New Delhi, India
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Business Hours */}
                  <motion.div variants={itemVariants} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-light tracking-tight text-white/80">Business Hours</h3>
                      <p className="mt-1 text-white/60">
                        Monday - Saturday: 10AM - 8PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Social Media Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-light tracking-tight text-white/80 mb-6">FOLLOW US</h3>
                  <div className="flex space-x-4">
                    {['Instagram', 'Facebook', 'Twitter'].map(platform => (
                      <a 
                        key={platform}
                        href={`#${platform.toLowerCase()}`}
                        className="w-10 h-10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                      >
                        {platform.charAt(0)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            ref={formRef}
          >
            <div className="bg-black text-white">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-light tracking-tight">SEND US A MESSAGE</h2>
                <p className="mt-2 text-white/60 tracking-wide">We'd love to hear from you</p>
              </div>
              
              {/* Form */}
              <div className="p-6">
                {success ? (
                  <motion.div 
                    className="bg-white/5 border border-white/10 p-6 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center">
                      <div className="py-1">
                        <svg className="w-6 h-6 mr-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-light tracking-tight">Thank you for reaching out!</p>
                        <p className="text-sm text-white/60">We've received your message and will get back to you shortly.</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-white/5 border border-white/10 p-4">
                        <span className="text-white/80">{error}</span>
                      </div>
                    )}
                    
                    {/* Name field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-light tracking-tight text-white/80 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/20 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    {/* Email/Phone field */}
                    <div>
                      <label htmlFor="emailOrPhone" className="block text-sm font-light tracking-tight text-white/80 mb-2">
                        Email or Phone Number
                      </label>
                      <input
                        type="text"
                        id="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/20 focus:outline-none transition-colors"
                        placeholder="email@example.com or +1234567890"
                      />
                    </div>
                    
                    {/* Message field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-light tracking-tight text-white/80 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full p-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/20 focus:outline-none transition-colors"
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>
                    
                    {/* Submit button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black py-3 px-6 font-light tracking-wider hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-300 focus:outline-none disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "SEND MESSAGE"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-light tracking-tight text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to apply a custom wrap?",
                answer: "The application process typically takes 15-30 minutes depending on the device and wrap complexity. Our skilled technicians ensure a perfect, bubble-free finish."
              },
              {
                question: "Can I remove the wrap without damaging my device?",
                answer: "Yes! Our wraps are designed to be removable without leaving any residue or damaging your device's surface."
              },
              {
                question: "Do you offer custom designs?",
                answer: "Absolutely! We can create custom designs based on your preferences. Just reach out to us with your ideas and we'll work together to bring them to life."
              },
              {
                question: "How durable are your wraps?",
                answer: "Our premium vinyl wraps are highly durable and designed to withstand daily use. They're resistant to scratches, water, and fading, ensuring long-lasting protection and style."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-black text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-light tracking-tight mb-2">{faq.question}</h3>
                  <p className="text-white/60">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-light tracking-tight mb-4">READY TO TRANSFORM YOUR DEVICES?</h2>
          <p className="text-lg mb-8 text-white/60 tracking-wide">
            Visit our shop or browse our online collection to find the perfect wrap for your style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/store-locations"
              className="px-8 py-3 bg-white text-black font-light tracking-wider hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-300"
            >
              FIND OUR STORE
            </a>
            <a
              href="/products"
              className="px-8 py-3 border border-white text-white font-light tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              SHOP ONLINE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}