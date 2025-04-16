import { Link } from 'react-router-dom';

export function EmptyCart({ onClose, variant = 'page' }: { onClose?: () => void; variant?: 'page' | 'mini' }) {
  return (
    <div className={`text-center ${variant === 'page' ? 'bg-white p-8 rounded-lg shadow-md' : ''}`}>
      {variant === 'page' && <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>}
      <Link
        to="/category/mobile-skins"
        onClick={onClose}
        className="text-blue-600 hover:text-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}