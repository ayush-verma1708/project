import { useEffect, useState, useRef } from "react";

const PriceRangeSelector = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onChange
}: {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
}) => {
  // Local state for price range
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);
  
  // Temporary state for custom range inputs before applying
  const [tempMin, setTempMin] = useState(currentMin);
  const [tempMax, setTempMax] = useState(currentMax);
  
  // Track whether changes are coming from outside
  const isUpdatingRef = useRef(false);
  
  // Predefined price ranges
  const priceSteps = calculatePriceSteps(minPrice, maxPrice);
  
  // Update local state when props change
  useEffect(() => {
    if (currentMin !== localMin || currentMax !== localMax) {
      isUpdatingRef.current = true;
      
      setLocalMin(currentMin);
      setLocalMax(currentMax);
      setTempMin(currentMin);
      setTempMax(currentMax);
      
      // Reset updating flag after state updates
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  }, [currentMin, currentMax]);
  
  // Handle temporary input changes
  const handleTempMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    
    setTempMin(Math.max(minPrice, Math.min(value, tempMax - 1)));
  };
  
  const handleTempMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    
    setTempMax(Math.min(maxPrice, Math.max(value, tempMin + 1)));
  };
  
  // Apply custom range
  const handleApplyRange = () => {
    setLocalMin(tempMin);
    setLocalMax(tempMax);
    
    if (!isUpdatingRef.current) {
      onChange(tempMin, tempMax);
    }
  };
  
  // Handle preset range selection
  const handlePresetRange = (min: number, max: number) => {
    setLocalMin(min);
    setLocalMax(max);
    setTempMin(min);
    setTempMax(max);
    
    if (!isUpdatingRef.current) {
      onChange(min, max);
    }
  };
  
  // Calculate if a preset button should be active
  const isActive = (min: number, max: number) => {
    return localMin === min && localMax === max;
  };
  
  return (
    <div className="mt-4">
      {/* Preset price range buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {priceSteps.map((step, index) => (
          <button
            key={index}
            onClick={() => handlePresetRange(step.min, step.max)}
            className={`px-3 py-1 text-sm border rounded-lg transition ${
              isActive(step.min, step.max)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
            }`}
          >
            {formatPriceRange(step.min, step.max, maxPrice)}
          </button>
        ))}
      </div>
      
      {/* Custom price range inputs */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-sm font-medium mb-3 text-gray-700">Custom Range</div>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <input
              type="number"
              value={tempMin}
              onChange={handleTempMinChange}
              min={minPrice}
              max={tempMax - 1}
              className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">₹</span>
          </div>
          <span className="text-gray-400">to</span>
          <div className="relative flex-1">
            <input
              type="number"
              value={tempMax}
              onChange={handleTempMaxChange}
              min={tempMin + 1}
              max={maxPrice}
              className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">₹</span>
          </div>
        </div>
        
        {/* Apply button */}
        <button
          onClick={handleApplyRange}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={tempMin === localMin && tempMax === localMax}
        >
          Apply
        </button>
      </div>
      
      {/* Current selection display */}
      <div className="mt-4 text-sm font-medium text-gray-700">
        Selected Range: ₹{localMin} - ₹{localMax}
      </div>
    </div>
  );
};

// Helper function to calculate reasonable price ranges
function calculatePriceSteps(min: number, max: number) {
  const range = max - min;
  const steps = [];
  
  // Add "Under X" option
  const lowerThreshold = min + Math.round(range * 0.2);
  steps.push({ min, max: lowerThreshold });
  
  // Add middle ranges
  const step = Math.round(range / 4);
  for (let i = 1; i < 4; i++) {
    const stepMin = min + step * i;
    const stepMax = min + step * (i + 1);
    steps.push({ min: stepMin, max: stepMax });
  }
  
  // Add "Above Y" option
  const upperThreshold = max - Math.round(range * 0.2);
  steps.push({ min: upperThreshold, max });
  
  return steps;
}

// Format price range for display in buttons
function formatPriceRange(min: number, max: number, absoluteMax: number) {
  if (min === 0) {
    return `Under ₹${max}`;
  } else if (max === absoluteMax) {
    return `Above ₹${min}`;
  } else {
    return `₹${min} - ₹${max}`;
  }
}

export default PriceRangeSelector;