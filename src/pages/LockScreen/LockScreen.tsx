import { useState } from "react";
import JoinCommunitySection from "../../components/promotional/JoinCommunitySection";
import { Lock, Unlock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LockScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = "mobiiwrap-unlock";

  const handleUnlock = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (password === correctPassword) {
        localStorage.setItem("siteUnlocked", "true");
        window.location.reload();
      } else {
        setError("Incorrect password. Please try again.");
        setIsLoading(false);
      }
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Mobiiwrap</h1>
            <p className="mt-2 text-base sm:text-lg text-gray-500">Premium mobile accessories</p>
          </motion.div>

          {/* Password Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-lg p-8 sm:p-10 shadow-sm"
          >
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="bg-gray-100 p-3 sm:p-4 rounded-full">
                <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-gray-900 mb-3">
              This store is password protected
            </h2>
            <p className="text-base sm:text-lg text-gray-500 text-center mb-6 sm:mb-8">
              Please enter the password to access the store
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  autoFocus
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-500 text-base sm:text-lg"
                >
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUnlock}
                disabled={isLoading || !password}
                className="w-full py-3 sm:py-4 px-4 bg-black text-white text-base sm:text-lg rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg 
                      className="animate-spin -ml-1 mr-2 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      width="20" 
                      height="20"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Unlocking...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Unlock className="h-5 w-5 mr-2" />
                    Unlock Store
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 sm:mt-12 text-center"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-3">
              Stay Updated
            </h3>
            <p className="text-base sm:text-lg text-gray-500 mb-6">
              Subscribe to get notified when we launch
            </p>
            <JoinCommunitySection />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-6 text-center"
      >
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Mobiiwrap. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}