import React, { useState } from 'react';
import { subscriptionService } from '../../api/services/subscription';

const EmailSubscriptionBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  // Using an online image for the background (you can replace this with any meme URL)
  const backgroundImage = 'https://i.pinimg.com/originals/3f/66/d7/3f66d73f63c1bbba5b7fdbb0b7ed035b.jpg'; // Replace this URL with your meme image URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('Processing your subscription...');

    try {
      const response = await subscriptionService.subscribe(email);
      if (response.message === 'Email is already subscribed.') {
        setStatus('error');
        setMessage('This email is already subscribed. ❌');
      } else {
        setStatus('success');
        setMessage('Thank you for subscribing! 🎉');
        setCouponCode('WELCOME25');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Subscription failed. Please try again later.');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block flex-1 bg-cover bg-center" style={{
            backgroundImage: backgroundImage,
            opacity: 0.9
          }} />

          <div className="flex-1 p-8 space-y-6">
            {status === 'success' ? (
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-4">{message}</h3>
                <div className="animate-bounce bg-white/20 p-6 rounded-xl">
                  <p className="text-xl font-mono font-bold text-yellow-300">
                    Your Coupon Code:
                  </p>
                  <div className="mt-4 text-4xl font-bold tracking-wider border-2 border-dashed border-yellow-300 p-3 rounded-lg">
                    {couponCode}
                  </div>
                </div>
                <p className="mt-6 text-lg">
                  Apply this code at checkout for 25% off your first purchase!
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-center text-white mb-4">
                  25% OFF Your First Order
                </h2>
                <p className="text-center text-white/90 text-lg mb-6">
                  Subscribe to our newsletter and get instant access to your exclusive discount
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-6 py-4 rounded-lg border-0 focus:ring-4 focus:ring-purple-300 transition-all text-gray-900"
                    disabled={status === 'loading'}
                  />

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-white text-purple-600 text-lg font-bold rounded-lg hover:bg-gray-100 
                             transition-colors flex items-center justify-center"
                  >
                    {status === 'loading' ? (
                      <span className="animate-pulse">Generating Your Coupon...</span>
                    ) : (
                      'Claim My 25% Discount'
                    )}
                  </button>
                </form>
              </>
            )}

            {status === 'error' && (
              <div className="mt-4 p-4 bg-red-100/20 rounded-lg text-red-100 text-center">
                {message}
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm underline hover:text-red-200"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscriptionBanner;
// import React, { useState, useRef, useEffect } from 'react';
// import { subscriptionService } from '../../api/services/subscription'; // Make sure to import your subscription service

// const EmailSubscriptionBanner: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');
//   const [isLoading, setIsLoading] = useState(false);
//   const [couponCode, setCouponCode] = useState('');
//   const bannerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (bannerRef.current && !bannerRef.current.contains(event.target as Node)) {
//         setIsSubmitted(true); // Close the banner when clicking outside
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessageType('info');
//     setMessage('Processing your subscription...');
    
//     try {
//       const response = await subscriptionService.subscribe(email);
//       if (response.message === 'Email is already subscribed.') {
//         setMessageType('error');
//         setMessage('You are already subscribed.');
//       } else {
//         setMessageType('success');
//         setMessage('Thank you for subscribing! Your 25% off coupon: WELCOME25');
//         setCouponCode('WELCOME25');
//       }
//     } catch (error) {
//       setMessageType('error');
//       setMessage('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//       // Do not close the banner automatically after submission.
//     }
//   };

//   return (
//     <>
//       {!isSubmitted && (
//         <div className="fixed inset-0 flex justify-center items-center z-50">
//           <div
//             ref={bannerRef}
//             className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
//             style={{
//               background: "url('https://your-image-link.com/your-image.jpg') no-repeat center center", 
//               backgroundSize: 'cover',
//             }}
//           >
//             <div className="flex flex-col items-center p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
//               <p className="font-semibold text-lg text-center text-CharcoalGray" style={{ color: '#333333' }}>
//                 🎉 Get 20% OFF on your first purchase! 🎉
//               </p>
//               <p className="text-sm mt-2 text-center text-MatteGray" style={{ color: '#B0AFAF' }}>Sign up with your email to claim the offer.</p>

//               <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4 space-y-4 w-full">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                   className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black-500"
//                   style={{ borderColor: '#E8E6E3', backgroundColor: '#E8E6E3' }}
//                 />
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-MatteGray text-white font-semibold rounded-md hover:bg-black-700 w-full focus:outline-none"
//                   disabled={isLoading}
//                   style={{ backgroundColor: '#B0AFAF' }}
//                 >
//                   {isLoading ? 'Submitting...' : 'Subscribe'}
//                 </button>
//               </form>

//               {/* Display the success/error message */}
//               {message && (
//                 <div
//                   className={`mt-4 p-4 rounded-lg ${
//                     messageType === 'success' ? 'bg-green-500' : messageType === 'error' ? 'bg-red-500' : 'bg-blue-500'
//                   } text-white`}
//                 >
//                   <p>{message}</p>
//                   {couponCode && (
//                     <p className="mt-2">
//                       Use the coupon code <strong>{couponCode}</strong> during checkout to get 25% off your mobile skin purchase!
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EmailSubscriptionBanner;
