import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { QuantityControl } from './QuantityControl';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
    selectedBrand: string;
    selectedModel: string;
  };
  layout?: 'page' | 'mini';
  theme?: 'light' | 'dark';
}

export function CartItems({ item, layout = 'page', theme = 'light' }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  const borderColor = theme === 'dark' ? 'border-white/10' : 'border-black/10';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const secondaryColor = theme === 'dark' ? 'text-white/60' : 'text-black/60';

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item._id, newQuantity, item.selectedBrand, item.selectedModel);
  };

  const handleRemoveItem = () => {
    removeItem(item._id, item.selectedBrand, item.selectedModel);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className={`group relative flex items-start gap-8 ${layout === 'mini' ? 'py-5' : 'py-8'} border-b ${borderColor} last:border-b-0`}
    >
      {/* Product Image */}
      <div className={`${layout === 'mini' ? 'w-20 h-20' : 'w-28 h-28'} flex-shrink-0 overflow-hidden bg-white`}>
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-medium tracking-wide truncate ${textColor}`}>{item.name}</h3>
            <p className={`text-xs mt-1.5 ${secondaryColor}`}>
              {item.selectedBrand} {item.selectedModel}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${textColor}`}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={handleRemoveItem}
              className={`${secondaryColor} hover:${textColor} mt-3 transition-colors`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Quantity Control */}
        <div className="mt-6">
          <QuantityControl
            quantity={item.quantity}
            onIncrease={() => handleQuantityChange(item.quantity + 1)}
            onDecrease={() => handleQuantityChange(item.quantity - 1)}
            size={layout === 'mini' ? 'sm' : 'md'}
            theme={theme}
          />
        </div>
      </div>
    </motion.div>
  );
}