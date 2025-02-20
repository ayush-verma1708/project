import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  name="firstName"
                  value={shippingForm.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="First Name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  name="lastName"
                  value={shippingForm.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Last Name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={shippingForm.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="+91"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={shippingForm.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="example@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                name="address"
                value={shippingForm.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Apartment, suite, etc. (optional)</label>
              <input
                name="apartment"
                value={shippingForm.apartment}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Optional*"
              />
              {errors.apartment && <p className="text-red-500 text-sm mt-1">{errors.apartment}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  name="city"
                  value={shippingForm.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="City"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PIN Code</label>
                <input
                  name="pin"
                  type="number"
                  value={shippingForm.pin}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="110001"
                />
                {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4"
            >
              Save Shipping Info
            </button>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                By clicking below and completing your order, you agree to purchase your item(s) from Mobiiwrap as merchant of record for this transaction, on Mobiiwrap's 
                <a href="/policies/terms" className="text-blue-600 hover:underline"> Terms of Service</a> and 
                <a href="/policies/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>.
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <p><span className="font-medium">First Name:</span> {shippingForm.firstName}</p>
              <p><span className="font-medium">Last Name:</span> {shippingForm.lastName}</p>
              <p><span className="font-medium">Address:</span> {shippingForm.address}</p>
              <p><span className="font-medium">Apartment:</span> {shippingForm.apartment}</p>
              <p><span className="font-medium">City:</span> {shippingForm.city}</p>
              <p><span className="font-medium">PIN:</span> {shippingForm.pin}</p>
              <p><span className="font-medium">Phone:</span> {shippingForm.phone}</p>
              <p><span className="font-medium">Email:</span> {shippingForm.email}</p>
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

      <footer className="mt-6 border-t pt-4">
        <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <li><Link to="/policies/privacy">Privacy Policy</Link></li>
          <li><Link to="/policies/returns">Return & Refund Policy</Link></li>
          <li><Link to="/policies/shipping">Shipping Policy</Link></li>
          <li><Link to="/policies/terms">Terms & Conditions</Link></li>
        </ul>
      </footer>
    </motion.div>
  );
};

export default ShippingForm;