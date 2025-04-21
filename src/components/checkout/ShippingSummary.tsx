import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';

interface ShippingSummaryProps {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
  };
  onEdit: () => void;
}

export function ShippingSummary({ formData, onEdit }: ShippingSummaryProps) {
  return (
    <motion.div
      key="summary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <p>
          <span className="font-medium">Email:</span> {formData.email}
        </p>
        <p>
          <span className="font-medium">Name:</span> {formData.firstName}{' '}
          {formData.lastName}
        </p>
        <p>
          <span className="font-medium">Address:</span> {formData.address}
        </p>
        {formData.apartment && (
          <p>
            <span className="font-medium">Apartment:</span> {formData.apartment}
          </p>
        )}
        <p>
          <span className="font-medium">City:</span> {formData.city}
        </p>
        <p>
          <span className="font-medium">ZIP:</span> {formData.zip}
        </p>
        <p>
          <span className="font-medium">Country:</span> {formData.country}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {formData.phone}
        </p>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
      >
        <Edit size={16} /> Edit Information
      </button>
    </motion.div>
  );
}