import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PaymentButtonProps {
  isSubmitted: boolean;
}

export function PaymentButton({ isSubmitted }: PaymentButtonProps) {
  return (
    <Link
      to="/payment"
      className={`mt-6 block w-full text-center py-3 rounded-md transition-colors ${
        isSubmitted
          ? 'bg-black text-white hover:bg-gray-800'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      Proceed to Payment <ChevronRight className="inline" size={18} />
    </Link>
  );
}