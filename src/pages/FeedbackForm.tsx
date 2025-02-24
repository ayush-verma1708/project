// src/components/FeedbackForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { feedbackService } from '../api/services/feedback';

interface FeedbackFormProps {
  onSuccess?: () => void; // Optional callback after successful submission
}

export function FeedbackForm({ onSuccess }: FeedbackFormProps) { // Fixed props destructuring
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !message || !emailOrPhone) {
      setError('Please fill in all the fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const feedback = {
      name,
      message,
      emailOrPhone,
      feedbackType: 'siteFeedback', // Fixed syntax; always 'siteFeedback' since no orderId
      comment: message,
      // Explicitly not including orderId as per your requirement
    };

    try {
      await feedbackService.submit(feedback);
      setSuccess(true);
      setName('');
      setMessage('');
      setEmailOrPhone('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-[#333333] mb-6">
        Submit Your Feedback
      </h2>

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

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="px-8 py-3 bg-[#FF8C00] text-white rounded-full font-medium hover:bg-orange-600 transition-all disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
// // src/components/FeedbackForm.tsx
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { feedbackService } from '../api/services/feedback';

// interface FeedbackFormProps {
//   // orderId?: string; // Optional for order-specific feedback
//   onSuccess?: () => void; // Optional callback after successful submission
// }

// export function FeedbackForm({ , onSuccess }: FeedbackFormProps) {
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!name || !message || !emailOrPhone) {
//       setError('Please fill in all the fields.');
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     const feedback = {
//       name,
//       message,
//       emailOrPhone,
//       feedbackType:   'orderFeedback' : 'siteFeedback', // Differentiate feedback type
//       comment: message,
//       // orderId, // Include orderId if provided
//     };

//     try {
//       await feedbackService.submit(feedback);
//       setSuccess(true);
//       setName('');
//       setMessage('');
//       setEmailOrPhone('');
//       if (onSuccess) onSuccess(); // Call optional success callback
//     } catch (err) {
//       setError('Something went wrong. Please try again later.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <motion.div
//       className="bg-white p-6 rounded-lg shadow-lg"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <h2 className="text-2xl font-bold text-[#333333] mb-6">
//         { 'Submit Your Feedback'}
//       </h2>

//       {error && (
//         <motion.p
//           className="text-red-500 text-center mb-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           {error}
//         </motion.p>
//       )}

//       {success && (
//         <motion.p
//           className="text-green-500 text-center mb-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           Thank you for your feedback! We'll get back to you soon.
//         </motion.p>
//       )}

//       {!success && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-lg font-medium text-gray-700">
//               Your Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="message" className="block text-lg font-medium text-gray-700">
//               Your Message
//             </label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               rows={4}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="emailOrPhone" className="block text-lg font-medium text-gray-700">
//               Your Phone Number or Email
//             </label>
//             <input
//               type="text"
//               id="emailOrPhone"
//               value={emailOrPhone}
//               onChange={(e) => setEmailOrPhone(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="px-8 py-3 bg-[#FF8C00] text-white rounded-full font-medium hover:bg-orange-600 transition-all disabled:opacity-50"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
//             </button>
//           </div>
//         </form>
//       )}
//     </motion.div>
//   );
// }