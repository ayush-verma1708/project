import React, { useState, useEffect } from "react";
import { subscriptionService } from "../../api/services/subscription";
import promotionImage from "../../assets/promotionImage2.png";
import { motion } from "framer-motion";

const EmailSubscriptionBanner: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");
  const [message, setMessage] = useState("");
  const [couponCode, setCouponCode] = useState("WELCOME25");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("emailBannerLastShown");
    const now = Date.now();
    if (!lastShown || now - parseInt(lastShown, 10) > 3600000) {
      setShowBanner(true);
      localStorage.setItem("emailBannerLastShown", now.toString());
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("Processing your subscription...");

    try {
      const response = await subscriptionService.subscribe(email);
      if (response.message === "Email is already subscribed.") {
        setStatus("exists");
        setMessage("You're already subscribed! 🎉 Stay tuned for future offers.");
      } else {
        setStatus("success");
        setMessage("Thank you for subscribing! Enjoy your discount.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (!showBanner) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden bg-white text-gray-900"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-110"
          aria-label="Close banner"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
        <div
  className="hidden md:block flex-1 bg-cover bg-center"
  style={{ 
    backgroundImage: `url(https://res.cloudinary.com/dskopgpgi/image/upload/v1744241247/promotionImage2_qczrft.png)`, 
    opacity: 0.95 
  }}
/>

          <div className="flex-1 p-8 space-y-6 text-center md:text-left">
            {status === "success" || status === "exists" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-3xl font-bold text-orange-600 mb-4">{message}</h3>
                {status === "success" && (
                  <div className="animate-pulse bg-orange-100 p-6 rounded-xl">
                    <p className="text-xl font-mono font-bold text-orange-500">Your Coupon Code:</p>
                    <div className="mt-4 text-4xl font-bold tracking-wider border-2 border-dashed border-orange-500 p-3 rounded-lg text-orange-600">
                      {couponCode}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <>
                <h2 className="text-4xl font-extrabold text-orange-600 mb-2">
                  25% OFF Your First Order
                </h2>
                <p className="text-gray-700 text-lg mb-4">
                  Subscribe to our newsletter and get instant access to your exclusive discount.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-4 focus:ring-orange-400 transition-all text-gray-900"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-orange-500 text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105"
                  >
                    {status === "loading" ? (
                      <span className="animate-pulse">Generating Your Coupon...</span>
                    ) : (
                      "Claim My 25% Discount"
                    )}
                  </button>
                </form>
              </>
            )}
            {status === "error" && (
              <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg text-center">
                {message}
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm underline hover:text-red-500"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmailSubscriptionBanner;
// import React, { useState } from "react";
// import { subscriptionService } from "../../api/services/subscription";
// import promotionImage from "../../assets/promotionImage2.png";
// import { motion } from "framer-motion";

// const EmailSubscriptionBanner: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");
//   const [message, setMessage] = useState("");
//   const [couponCode, setCouponCode] = useState("WELCOME25");
//   const [showBanner, setShowBanner] = useState(true);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("loading");
//     setMessage("Processing your subscription...");

//     try {
//       const response = await subscriptionService.subscribe(email);
//       if (response.message === "Email is already subscribed.") {
//         setStatus("exists");
//         setMessage("You're already subscribed! 🎉 Stay tuned for future offers.");
//       } else {
//         setStatus("success");
//         setMessage("Thank you for subscribing! Enjoy your discount.");
//       }
//     } catch (error) {
//       setStatus("error");
//       setMessage("Something went wrong. Please try again.");
//     }
//   };

//   if (!showBanner) return null;

//   return (
//     <motion.div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden bg-white text-gray-900"
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//       >
//         <button
//           onClick={() => setShowBanner(false)}
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-110"
//           aria-label="Close banner"
//         >
//           ✕
//         </button>

//         <div className="flex flex-col md:flex-row">
//           <div
//             className="hidden md:block flex-1 bg-cover bg-center"
//             style={{ backgroundImage: `url(${promotionImage})`, opacity: 0.95 }}
//           />

//           <div className="flex-1 p-8 space-y-6 text-center md:text-left">
//             {status === "success" || status === "exists" ? (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <h3 className="text-3xl font-bold text-orange-600 mb-4">{message}</h3>
//                 {status === "success" && (
//                   <div className="animate-pulse bg-orange-100 p-6 rounded-xl">
//                     <p className="text-xl font-mono font-bold text-orange-500">Your Coupon Code:</p>
//                     <div className="mt-4 text-4xl font-bold tracking-wider border-2 border-dashed border-orange-500 p-3 rounded-lg text-orange-600">
//                       {couponCode}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             ) : (
//               <>
//                 <h2 className="text-4xl font-extrabold text-orange-600 mb-2">
//                   25% OFF Your First Order
//                 </h2>
//                 <p className="text-gray-700 text-lg mb-4">
//                   Subscribe to our newsletter and get instant access to your exclusive discount.
//                 </p>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     required
//                     className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-4 focus:ring-orange-400 transition-all text-gray-900"
//                     disabled={status === "loading"}
//                   />
//                   <button
//                     type="submit"
//                     disabled={status === "loading"}
//                     className="w-full py-4 bg-orange-500 text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105"
//                   >
//                     {status === "loading" ? (
//                       <span className="animate-pulse">Generating Your Coupon...</span>
//                     ) : (
//                       "Claim My 25% Discount"
//                     )}
//                   </button>
//                 </form>
//               </>
//             )}
//             {status === "error" && (
//               <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg text-center">
//                 {message}
//                 <button
//                   onClick={() => setStatus("idle")}
//                   className="mt-2 text-sm underline hover:text-red-500"
//                 >
//                   Try again
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default EmailSubscriptionBanner;



// // import React, { useState } from "react";
// // import { subscriptionService } from "../../api/services/subscription";
// // import promotionImage from "../../assets/promotionImage2.png";

// // const EmailSubscriptionBanner: React.FC = () => {
// //   const [email, setEmail] = useState("");
// //   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");
// //   const [message, setMessage] = useState("");
// //   const [couponCode, setCouponCode] = useState("");
// //   const [showBanner, setShowBanner] = useState(true);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setStatus("loading");
// //     setMessage("Processing your subscription...");

// //     try {
// //       const response = await subscriptionService.subscribe(email);

// //       if (response.message === "Email is already subscribed.") {
// //         // If email already exists, check if it's already subscribed
// //         if (response.isSubscribed) {
// //           setStatus("exists");
// //           setMessage("You're already subscribed! 🎉");
// //         } else {
// //           // If not subscribed, update the subscription
// //           setStatus("loading");
// //           setMessage("Reactivating your subscription...");
// //           await subscriptionService.toggleSubscription(email, true);  // Reactivating the subscription
// //           setStatus("exists");
// //           setMessage("You're now re-subscribed! 🎉");
// //         }
// //       } else {
// //         // New subscription
// //         setStatus("success");
// //         setMessage("Thank you for subscribing! 🎉");
// //         setCouponCode("WELCOME25");
// //       }
// //     } catch (error) {
// //       setStatus("success");
// //       setMessage("Thank you for subscribing! 🎉");
// //       setCouponCode("WELCOME25");}
// //   };

// //   if (!showBanner) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
// //       <div className="relative rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden bg-white text-gray-900">
// //         {/* Close Button */}
// //         <button
// //           onClick={() => setShowBanner(false)}
// //           className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-110"
// //           aria-label="Close banner"
// //         >
// //           ✕
// //         </button>

// //         <div className="flex flex-col md:flex-row">
// //           {/* Left Image Section */}
// //           <div
// //             className="hidden md:block flex-1 bg-cover bg-center"
// //             style={{
// //               backgroundImage: `url(${promotionImage})`,
// //               opacity: 0.95,
// //             }}
// //           />

// //           {/* Right Content Section */}
// //           <div className="flex-1 p-8 space-y-6 text-center md:text-left">
// //             {status === "success" ? (
// //               <div>
// //                 <h3 className="text-3xl font-bold text-orange-600 mb-4">{message}</h3>
// //                 <div className="animate-pulse bg-orange-100 p-6 rounded-xl">
// //                   <p className="text-xl font-mono font-bold text-orange-500">Your Coupon Code:</p>
// //                   <div className="mt-4 text-4xl font-bold tracking-wider border-2 border-dashed border-orange-500 p-3 rounded-lg text-orange-600">
// //                     {couponCode}
// //                   </div>
// //                 </div>
// //                 <p className="mt-6 text-lg text-gray-700">
// //                   Apply this code at checkout for{" "}
// //                   <span className="text-orange-500 font-bold">25% off</span> your first purchase!
// //                 </p>
// //               </div>
// //             ) : status === "exists" ? (
// //               <div className="text-center">
// //                 <h3 className="text-3xl font-bold text-blue-600">{message}</h3>
// //                 <p className="mt-4 text-lg text-gray-700">
// //                   You're already part of our exclusive deals! 🎉 Stay tuned for future discounts.
// //                 </p>
// //               </div>
// //             ) : (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-2">
// //                   25% OFF Your First Order
// //                 </h2>
// //                 <p className="text-center text-gray-700 text-lg mb-4">
// //                   Subscribe to our newsletter and get instant access to your exclusive discount.
// //                 </p>

// //                 {/* Email Input Form */}
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                   <input
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="Enter your email"
// //                     required
// //                     className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-4 focus:ring-orange-400 transition-all text-gray-900"
// //                     disabled={status === "loading"}
// //                   />

// //                   {/* CTA Button */}
// //                   <button
// //                     type="submit"
// //                     disabled={status === "loading"}
// //                     className="w-full py-4 bg-orange-500 text-white text-lg font-bold rounded-lg hover:bg-orange-600 
// //                              transition-all transform hover:scale-105 flex items-center justify-center"
// //                   >
// //                     {status === "loading" ? (
// //                       <span className="animate-pulse">Generating Your Coupon...</span>
// //                     ) : (
// //                       "Claim My 25% Discount"
// //                     )}
// //                   </button>
// //                 </form>
// //               </>
// //             )}

// //             {/* Error Message */}
// //             {status === "error" && (
// //               <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg text-center">
// //                 {message}
// //                 <button
// //                   onClick={() => setStatus("idle")}
// //                   className="mt-2 text-sm underline hover:text-red-500"
// //                 >
// //                   Try again
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EmailSubscriptionBanner;
