import { memo } from "react";

const SpinnerSVG = () => (
  <svg 
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient 
        id="gradient" 
        x1="0" 
        y1="0" 
        x2="1" 
        y2="1"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF6B00" /> {/* Vibrant orange */}
        <stop offset="0.5" stopColor="#FF1F71" /> {/* Energetic pink */}
        <stop offset="1" stopColor="#8A2BE2" /> {/* Premium purple */}
      </linearGradient>
    </defs>
    <circle 
      cx="40" 
      cy="40" 
      r="36" 
      stroke="rgba(0,0,0,0.05)" 
      strokeWidth="4" 
      fill="none"
    />
    <circle 
      cx="40" 
      cy="40" 
      r="36" 
      stroke="url(#gradient)" 
      strokeWidth="4" 
      strokeLinecap="round"
      strokeDasharray="80 100"
      fill="none"
      style={{
        transformOrigin: 'center',
        animation: 'spin 1s cubic-bezier(0.65, 0, 0.35, 1) infinite'
      }}
    />
  </svg>
);

export const LoadingSpinner = memo(() => {
  return (
    <div 
      role="status"
      className="fixed inset-0 grid place-items-center bg-white/95 z-[9999]"
      style={{
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.15s ease-out'
      }}
    >
      <div className="text-center space-y-3">
        <SpinnerSVG />
        <p className="text-gray-700 font-medium text-sm tracking-wide">
          Loading <span className="text-[#FF6B00] font-semibold">Mobiiwrap</span>...
        </p>
      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
});