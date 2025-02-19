import React, { useState } from "react";
import { subscriptionService } from "../../api/services/subscription";

const JoinCommunitySection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");
  const [message, setMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation using regex
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
        // If email is already subscribed
        setStatus("exists");
        setMessage("You're already subscribed! 🎉");
        setCouponCode(response.couponCode || "WELCOME25"); // Use API coupon or fallback
      } else if (response.status === 201) {
        // Successful subscription
        setStatus("success");
        setMessage("Thank you for subscribing! 🎉");
        setCouponCode(response.couponCode || "WELCOME25"); // Use API coupon or fallback
      } else {
        // Handle unexpected responses
        setStatus("success");
        setMessage("Thank you for subscribing! 🎉");
        setCouponCode(response.couponCode || "WELCOME25"); // Use API coupon or fallbac
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      setStatus("error");

      // More specific error handling for different scenarios
      if (error.response) {
        // If the error has a response, check its status
        if (error.response.status === 409) {
          setMessage("This email is already subscribed. 🎉");
          setStatus("exists");
        } else {
          setMessage("Subscription failed. Please try again later.");
        }
      } else if (error.request) {
        // If no response was received (network issue)
        setMessage("Network error. Please check your internet connection and try again.");
      } else {
        // If error is not related to the response or request
        setMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="py-24 bg-[#E8E6E3] text-[#333333]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Heading */}
          <h2 className="text-4xl font-serif font-semibold mb-4 text-[#333333] tracking-wide">
            Join Our Community
          </h2>
          <p className="text-[#333333]/80 mb-8 text-lg leading-relaxed">
            Get 25% off your orders and stay updated with our latest collections.
          </p>

          {/* Subscription Input and Button */}
          {status !== "success" ? (
            <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-[#D1D1D1] text-[#333333] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#F2994A] transition-all duration-300 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
              />
              <button
                type="submit"
                className="relative px-8 py-4 rounded-full bg-[#F2994A] text-white font-medium shadow-lg transition-all duration-300 ease-in-out hover:bg-[#D87C46] hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F2994A] focus:ring-offset-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          ) : (
            // Thank You Message and Coupon Code
            status === "success" && (
            <div className="bg-white py-8 px-6 rounded-xl shadow-lg mt-8">
              <h3 className="text-2xl font-semibold text-[#333333] mb-4">{message}</h3>
              <div className="text-xl font-bold text-[#F2994A] mb-4">Your Coupon Code:</div>
              <div className="text-3xl font-extrabold text-[#F2994A] border-2 border-dashed border-[#F2994A] p-4 rounded-lg">
                {couponCode}
              </div>
              <p className="mt-6 text-lg text-gray-700">
                Apply this code at checkout for{" "}
                <span className="text-orange-500 font-bold">10% off</span> your first purchase!
              </p>
            </div>
            )
          )}
          {status === "exists" && (
            <div className="mt-4 p-4 bg-blue-100 text-blue-600 rounded-lg text-center">
              {message}
            </div>
          )}
          {/* Error Message */}
          {status === "error" && (
            <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg text-center">
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinCommunitySection;
