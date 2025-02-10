// ShippingSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShippingForm } from './ShippingForm.tsx';
import { ShippingSummary } from './ShippingSummary.tsx';

interface ShippingSectionProps {
  isSubmitted: boolean;
  isEditing: boolean;
  setIsSubmitted: (value: boolean) => void;
  setIsEditing: (value: boolean) => void;
}

export function ShippingSection({
  isSubmitted,
  isEditing,
  setIsSubmitted,
  setIsEditing
}: ShippingSectionProps) {
  const [shippingForm, setShippingForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    zip: "",
    country: "IN",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setIsEditing(false);
    }
  };

  const validateForm = () => {
        let isValid = true;
        const newErrors = { name: '', address: '', city: '', zip: '', country: '' };
    
        // Address validation
        if (!shippingForm.address.trim()) {
          newErrors.address = 'Address is required';
          isValid = false;
        }
    
        // City validation
        if (!shippingForm.city.trim()) {
          newErrors.city = 'City is required';
          isValid = false;
        }
    
        // ZIP validation
        if (!shippingForm.zip.trim()) {
          newErrors.zip = 'ZIP code is required';
          isValid = false;
        } else if (!/^\d{6}$/.test(shippingForm.zip)) {
          newErrors.zip = 'Invalid ZIP (5 digits required)';
          isValid = false;
        }
    
        // Country validation
        if (!shippingForm.country.trim()) {
          newErrors.country = 'Country is required';
          isValid = false;
        }
    
        return isValid;
      };
    
  return (
    <section>
      <motion.div
        className="bg-white p-6 "
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
        
        <AnimatePresence mode="wait">
          {!isSubmitted || isEditing ? (
            <ShippingForm
              formData={shippingForm}
              errors={errors}
              handleSubmit={handleSubmit}
              handleChange={(e) => {
                const { name, value } = e.target;
                setShippingForm(prev => ({ ...prev, [name]: value }));
                setErrors(prev => ({ ...prev, [name]: '' }));
              }}
            />
          ) : (
            <ShippingSummary 
              formData={shippingForm}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}