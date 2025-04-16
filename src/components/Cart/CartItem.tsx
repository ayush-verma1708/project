import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../api/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CartItems({ item, layout = 'full' }: { item: CartItem; layout?: 'full' | 'mini' }) {
  const { removeItem, updateQuantity } = useCart();
  const [shake, setShake] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      toast.info("To remove this item, click the remove button.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    updateQuantity(item._id, newQuantity, item.selectedBrand, item.selectedModel);
  };

  const handleRemoveItem = () => {
    const confirmed = window.confirm(`Are you sure you want to remove "${item.name}" from the cart?`);
    if (confirmed) {
      removeItem(item._id, item.selectedBrand, item.selectedModel);
      toast.success(`${item.name} removed from cart`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className={`flex gap-4 ${layout === 'mini' ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg shadow-md'}`}>
      <img
        src={item.images[0]}
        alt={item.name}
        className={`${layout === 'mini' ? 'w-20 h-20 rounded-md' : 'w-32 h-32'} object-cover`}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{item.name}</h3>
          <button onClick={handleRemoveItem} className="text-gray-400 hover:text-red-500 flex items-center gap-1">
            <X size={20} />
            <span className="text-xs">Remove</span>
          </button>
        </div>
        {layout === 'full' ? (
          <p className="text-sm text-gray-500">{item.selectedBrand} - {item.selectedModel}</p>
        ) : (
          <>
            <p className="text-xs text-gray-500">{item.description}</p>
            <p className="text-sm text-blue-600">Brand: {item.selectedBrand}</p>
            <p className="text-sm text-green-600">Model: {item.selectedModel}</p>
          </>
        )}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <motion.button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="text-gray-600 hover:text-black disabled:text-gray-400"
              animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              -
            </motion.button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="text-gray-600 hover:text-black"
            >
              +
            </button>
          </div>
          <span className="text-lg font-bold">Rs.{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}