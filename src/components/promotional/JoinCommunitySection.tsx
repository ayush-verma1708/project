import React, { useState } from "react";
import { subscriptionService } from "../../api/services/subscription";
import { motion } from "framer-motion";
import { Mail, Check, X, Loader2 } from "lucide-react";

const JoinCommunitySection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");
  const [message, setMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("Processing your subscription...");

    try {
      const response = await subscriptionService.subscribe(email);

      if (response.status === 409) {
        setStatus("exists");
        setMessage("You're already subscribed! 🎉");
        setCouponCode(response.couponCode || "WELCOME25");
      } else if (response.status === 201) {
        setStatus("success");
        setMessage("Thank you for subscribing! 🎉");
        setCouponCode(response.couponCode || "WELCOME25");
      } else {
        setStatus("success");
        setMessage("Thank you for subscribing! 🎉");
        setCouponCode(response.couponCode || "WELCOME25");
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      setStatus("error");

      if (error.response) {
        if (error.response.status === 409) {
          setMessage("This email is already subscribed. 🎉");
          setStatus("exists");
        } else {
          setMessage("Subscription failed. Please try again later.");
        }
      } else if (error.request) {
        setMessage("Network error. Please check your internet connection and try again.");
      } else {
        setMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {status !== "success" ? (
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-black text-white text-sm sm:text-base rounded-lg font-medium shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin mr-1 sm:mr-2" />
                Subscribing...
              </span>
            ) : (
              "Subscribe"
            )}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 py-3 sm:py-4 px-3 sm:px-4 rounded-lg shadow-sm mt-3 sm:mt-4"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{message}</h3>
          <div className="text-sm sm:text-base font-bold text-black mb-1 sm:mb-2">Your Coupon Code:</div>
          <div className="text-lg sm:text-xl font-extrabold text-black border border-dashed border-gray-300 p-2 rounded-lg text-center">
            {couponCode}
          </div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
            Apply this code at checkout for{" "}
            <span className="text-black font-bold">10% off</span> your first purchase!
          </p>
        </motion.div>
      )}

      {status === "exists" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 sm:mt-3 p-2 sm:p-3 bg-blue-50 text-blue-600 rounded-lg text-xs sm:text-sm flex items-center"
        >
          <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {message}
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 sm:mt-3 p-2 sm:p-3 bg-red-50 text-red-600 rounded-lg text-xs sm:text-sm flex items-center"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {message}
        </motion.div>
      )}
    </div>
  );
};

export default JoinCommunitySection;
