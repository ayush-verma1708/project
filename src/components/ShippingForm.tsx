import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShippingFormProps {
  onSubmit: (data: any) => void;
  initialValues: {
    name: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

interface Errors {
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  onSubmit,
  initialValues,
  isSubmitted,
  setIsSubmitted,
  isEditing,
  setIsEditing,
}) => {
  const [shippingForm, setShippingForm] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors: Errors = { name: '', address: '', city: '', zip: '', country: '' };

    if (!shippingForm.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (shippingForm.name.trim().split(' ').length < 2) {
      newErrors.name = 'Please enter full name';
      isValid = false;
    }

    if (!shippingForm.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!shippingForm.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!shippingForm.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(shippingForm.zip)) {
      newErrors.zip = 'Invalid ZIP (5 digits required)';
      isValid = false;
    }

    if (!shippingForm.country.trim()) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setIsEditing(false);
      onSubmit(shippingForm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

      <AnimatePresence mode="wait">
        {!isSubmitted || isEditing ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={shippingForm.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                name="address"
                value={shippingForm.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="123 Main St"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  name="city"
                  value={shippingForm.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  name="zip"
                  type="number"
                  value={shippingForm.zip}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country"
                value={shippingForm.country}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="CA">Canada</option>
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4"
            >
              Save Shipping Info
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {shippingForm.name}</p>
              <p><span className="font-medium">Address:</span> {shippingForm.address}</p>
              <p><span className="font-medium">City:</span> {shippingForm.city}</p>
              <p><span className="font-medium">ZIP:</span> {shippingForm.zip}</p>
              <p><span className="font-medium">Country:</span> {shippingForm.country}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
            >
              <Edit size={16} /> Edit Information
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShippingForm;