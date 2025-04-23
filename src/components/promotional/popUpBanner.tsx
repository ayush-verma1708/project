import React, { useState, useEffect } from "react";
import { subscriptionService } from "../../api/services/subscription";
import { motion } from "framer-motion";

const EmailSubscriptionBanner: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");
  const [message, setMessage] = useState("");
  const [couponCode, setCouponCode] = useState("PREMIUM25");
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
        setMessage("You're already subscribed. Stay tuned for future offers.");
      } else {
        setStatus("success");
        setMessage("Thank you for subscribing.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (!showBanner) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative shadow-xl max-w-3xl w-full mx-4 overflow-hidden bg-white text-black border border-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-6 right-6 text-black hover:text-gray-600 transition-all"
          aria-label="Close banner"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div
            className="hidden md:block w-1/2 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744241247/promotionImage2_qczrft.png)`, 
              filter: 'grayscale(100%)',
              opacity: 0.9
            }}
          />

          <div className="w-full md:w-1/2 p-12 space-y-8">
            {status === "success" || status === "exists" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
                <p className="text-sm uppercase tracking-wider mb-2 text-gray-500">Status</p>
                <h3 className="text-2xl font-light mb-6 tracking-tight">{message}</h3>
                {status === "success" && (
                  <div className="mt-8 border border-black p-6">
                    <p className="text-xs uppercase tracking-wider mb-4">Your Discount Code</p>
                    <div className="font-mono text-3xl tracking-wider mb-6">
                      {couponCode}
                    </div>
                    <p className="text-sm text-gray-600">Use this code for 25% off your first order</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <>
                <div>
                  <p className="text-sm uppercase tracking-wider mb-2 text-gray-500">Limited Time Offer</p>
                  <h2 className="text-3xl font-light tracking-tight mb-6">
                    25% Off Your First Order
                  </h2>
                  <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                    Subscribe to receive exclusive offers and updates. No spam, just value.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border-b border-black focus:border-gray-600 outline-none text-black bg-transparent"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    {status === "loading" ? "Processing..." : "Subscribe for 25% Off"}
                  </button>
                </form>
              </>
            )}
            {status === "error" && (
              <div className="mt-6 border border-black p-4 text-center">
                {message}
                <button
                  onClick={() => setStatus("idle")}
                  className="block w-full mt-3 text-sm underline hover:text-gray-600"
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
