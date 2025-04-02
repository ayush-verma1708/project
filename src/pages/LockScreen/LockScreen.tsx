import { useState } from "react";
import JoinCommunitySection from "../../components/promotional/JoinCommunitySection";
import { Lock, Unlock, AlertCircle, X } from "lucide-react";

export default function LockScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const correctPassword = "mobiiwrap-unlock"; // Your actual password

  const handleUnlock = () => {
    setIsLoading(true);
    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (password === correctPassword) {
        localStorage.setItem("siteUnlocked", "true");
        window.location.reload(); // Refresh to unlock the site
      } else {
        setError("Incorrect password. Please try again.");
        setIsLoading(false);
      }
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      // Reset when opening
      setError("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
      {/* Lock in top right corner */}
      <div className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md"
       onClick={toggleModal}
       >
        <Lock size={16} className="h-6 w-6 text-gray-700" />
        
      </div>
      
      <div className="max-w-6xl mx-auto pt-16">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Mobiiwrap</h2>
          <p className="text-gray-500 mt-2">Premium mobile accessories</p>
        </div>

        <div className="grid md gap-8 items-center">
         
          {/* Join Community Section takes up the other half on larger screens */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Never Miss an Update</h3>
            <p className="text-gray-500 text-sm mb-4">Subscribe to get notified about new products and exclusive offers.</p>
            <JoinCommunitySection />
          </div>
        </div>
        
        {/* Full width community section for mobile */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Mobiiwrap. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Password Modal - Only appears when lock is clicked */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={toggleModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md relative z-30">
            {/* Close button */}
            <button 
              onClick={toggleModal} 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-lg font-medium text-gray-700 mb-4">Store Access</h3>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                autoFocus
              />
            </div>
            
            {error && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{error}</span>
              </div>
            )}
            
            <button
              onClick={handleUnlock}
              disabled={isLoading || !password}
              className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                 <svg 
  className="animate-spin -ml-1 mr-2 text-white" 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24"
  width="16" 
  height="16"  // Explicit size
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
                  <Unlock className="h-4 w-4 mr-2" />
                  Unlock Access
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}