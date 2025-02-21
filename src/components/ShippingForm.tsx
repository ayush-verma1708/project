import React, { useState } from 'react';
import { Edit, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShippingFormProps {
  onSubmit: (data: any) => void;
  initialValues: {
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    pin: string;
    phone: string;
    email: string;
  };
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

interface Errors {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  pin: string;
  phone: string;
  email: string;
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
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    pin: '',
    phone: '',
    email: '',
  });
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors: Errors = { firstName: '', lastName: '', address: '', apartment: '', city: '', pin: '', phone: '', email: '' };
    if (!shippingForm.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!shippingForm.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
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
    if (!shippingForm.pin.trim()) {
      newErrors.pin = 'PIN code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(shippingForm.pin)) {
      newErrors.pin = 'Invalid PIN (6 digits required)';
      isValid = false;
    }
    if (!shippingForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(shippingForm.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
      isValid = false;
    }
    if (!shippingForm.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitted(true);
        setIsEditing(false);
        onSubmit(shippingForm);
        setSubmissionError(null);
      } catch (error) {
        setSubmissionError('Failed to submit shipping details. Please try again.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <motion.div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <span className="flex items-center text-sm text-gray-500">
          <Lock size={14} className="mr-1" /> Secure
        </span>
      </div>

      <AnimatePresence>
        {!isSubmitted || isEditing ? (
          <motion.form onSubmit={handleSubmit} className="space-y-4">
            {submissionError && (
              <p className="text-red-500 text-sm mb-2">{submissionError}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  name="firstName"
                  value={shippingForm.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="First Name"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  name="lastName"
                  value={shippingForm.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Last Name"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={shippingForm.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="+91"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={shippingForm.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                name="address"
                value={shippingForm.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apartment, suite, etc. (optional)</label>
              <input
                name="apartment"
                value={shippingForm.apartment}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Optional"
              />
              {errors.apartment && <p className="text-red-500 text-xs mt-1">{errors.apartment}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  name="city"
                  value={shippingForm.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="City"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PIN Code</label>
                <input
                  name="pin"
                  type="number"
                  value={shippingForm.pin}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="110001"
                />
                {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continue to Payment
            </button>
          </motion.form>
        ) : (
          <motion.div className="space-y-2">
            <p><span className="font-medium">First Name:</span> {shippingForm.firstName}</p>
            <p><span className="font-medium">Last Name:</span> {shippingForm.lastName}</p>
            <p><span className="font-medium">Address:</span> {shippingForm.address}</p>
            <p><span className="font-medium">Apartment:</span> {shippingForm.apartment}</p>
            <p><span className="font-medium">City:</span> {shippingForm.city}</p>
            <p><span className="font-medium">PIN:</span> {shippingForm.pin}</p>
            <p><span className="font-medium">Phone:</span> {shippingForm.phone}</p>
            <p><span className="font-medium">Email:</span> {shippingForm.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 hover:underline flex items-center gap-1"
            >
              <Edit size={14} /> Edit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShippingForm;
