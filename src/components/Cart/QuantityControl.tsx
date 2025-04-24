import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
  theme?: 'light' | 'dark';
}

export function QuantityControl({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  size = 'md',
  theme = 'light'
}: QuantityControlProps) {
  const [isPressed, setIsPressed] = useState<'increase' | 'decrease' | null>(null);

  const sizeClasses = {
    sm: {
      container: 'h-8',
      button: 'w-8',
      quantity: 'w-10',
      icon: 12
    },
    md: {
      container: 'h-10',
      button: 'w-10',
      quantity: 'w-12',
      icon: 14
    }
  };

  const themeClasses = {
    light: {
      border: 'border-black/10',
      text: 'text-black',
      textSecondary: 'text-black/60',
      bg: 'bg-white',
      hover: 'hover:bg-black/5'
    },
    dark: {
      border: 'border-white/10',
      text: 'text-white',
      textSecondary: 'text-white/60',
      bg: 'bg-black',
      hover: 'hover:bg-white/10'
    }
  };

  const handleClick = (action: 'increase' | 'decrease') => {
    setIsPressed(action);
    if (action === 'increase') onIncrease();
    else onDecrease();
    setTimeout(() => setIsPressed(null), 150);
  };

  return (
    <div className="inline-flex items-stretch select-none">
      <motion.button
        onClick={() => handleClick('decrease')}
        className={`relative ${sizeClasses[size].button} flex items-center justify-center border ${themeClasses[theme].border} border-r-0 
          ${themeClasses[theme].textSecondary} hover:${themeClasses[theme].text} ${themeClasses[theme].hover} transition-colors 
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
          ${isPressed === 'decrease' ? themeClasses[theme].hover : ''}`}
        disabled={quantity <= 1}
        whileTap={{ scale: 0.97 }}
      >
        <Minus size={sizeClasses[size].icon} strokeWidth={2.5} />
      </motion.button>

      <div
        className={`${sizeClasses[size].container} ${sizeClasses[size].quantity} border-y ${themeClasses[theme].border}
          flex items-center justify-center font-medium ${themeClasses[theme].text} ${themeClasses[theme].bg}`}
      >
        {quantity}
      </div>

      <motion.button
        onClick={() => handleClick('increase')}
        className={`relative ${sizeClasses[size].button} flex items-center justify-center border ${themeClasses[theme].border} border-l-0 
          ${themeClasses[theme].textSecondary} hover:${themeClasses[theme].text} ${themeClasses[theme].hover} transition-colors
          ${isPressed === 'increase' ? themeClasses[theme].hover : ''}`}
        whileTap={{ scale: 0.97 }}
      >
        <Plus size={sizeClasses[size].icon} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
} 