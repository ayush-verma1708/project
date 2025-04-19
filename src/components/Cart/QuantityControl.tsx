import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md',
  className = '',
}: QuantityControlProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={`flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${sizeClasses[size]}`}
      >
        <Minus size={iconSize[size]} className="text-gray-600" />
      </motion.button>
      <span className={`font-medium text-gray-900 min-w-[1.5rem] text-center ${sizeClasses[size]}`}>
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onIncrease}
        className={`flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${sizeClasses[size]}`}
      >
        <Plus size={iconSize[size]} className="text-gray-600" />
      </motion.button>
    </div>
  );
} 