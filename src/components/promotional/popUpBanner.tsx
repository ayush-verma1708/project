import React, { useState, useRef, useEffect } from 'react';

const EmailSubscriptionBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ref to track the popup element
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Function to handle click outside the banner
    const handleClickOutside = (event: MouseEvent) => {
      if (bannerRef.current && !bannerRef.current.contains(event.target as Node)) {
        setIsSubmitted(true); // Close the banner when clicking outside
      }
    };

    // Set up the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Save the email to a backend service or send it via API
      console.log('Email submitted:', email); // Replace with actual API call

      setIsSubmitted(true);
      setEmail(''); // Clear the email input after submission
    }
  };

  return (
    <>
      {!isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={bannerRef} // Attach the ref to the popup
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
          >
            <div className="flex flex-col items-center">
              <p className="font-semibold text-lg text-center">
                🎉 Get 20% OFF on your first purchase! 🎉
              </p>
              <p className="text-sm mt-2 text-center">Sign up with your email to claim the offer.</p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4 space-y-4 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 w-full focus:outline-none"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailSubscriptionBanner;
