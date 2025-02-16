import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { campaignService } from '../api/services/campaigns';  // Assuming the service is imported

// Tax rate constant (adjust as needed)
const TAX_RATE = 0.18;

export function CheckoutPage() {
  const { state } = useCart();
  const [shippingForm, setShippingForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: 0,
    country: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [validCoupon, setValidCoupon] = useState(''); // Add this state

  // Calculate prices
  const discountedSubtotal = state.subtotal * (1 - discount);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', address: '', city: '', zip: '', country: '' };

    // Name validation
    if (!shippingForm.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (shippingForm.name.trim().split(' ').length < 2) {
      newErrors.name = 'Please enter full name';
      isValid = false;
    }

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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError(''); // Reset error message before applying
  
    try {
      // Fetch coupon data from the API
      const response = await campaignService.search(code); // Assuming search returns an array
      const coupon = response[0];  // Get the first matching coupon (if any)
      if (!coupon) {
        setCouponError('Invalid coupon code');
        setDiscount(0);
        return;
      }
  
      // Validate coupon based on active status and dates
      const currentDate = new Date();
      const startDate = new Date(coupon.startDate);
      const endDate = new Date(coupon.endDate);
  
      if (!coupon.active) {
        setCouponError('This coupon is no longer active');
        setDiscount(0);
        return;
      }
  
      if (currentDate < startDate || currentDate > endDate) {
        setCouponError('Coupon code has expired');
        setDiscount(0);
        return;
      }
  
      // Apply the discount if validation is successful
      setDiscount(coupon.discount / 100);
      setCouponError(''); // Clear any previous error
      setValidCoupon(code); // Save the valid coupon code in state
      localStorage.setItem('validCoupon', code); // Save the valid coupon code
      alert(`Coupon applied! Discount: ${coupon.discount}%`);
    } catch (error) {
      setCouponError('Failed to validate coupon');
      setDiscount(0);
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    const savedCoupon = localStorage.getItem('validCoupon');
    if (savedCoupon && e.target.value.trim().toUpperCase() === savedCoupon) {
      setCouponError(''); // Clear any error if the saved coupon is re-entered
      setDiscount(validCoupon ? discount : 0); // Reapply the discount if the valid coupon is re-entered
    } else if (validCoupon) {
      setCouponError('Invalid coupon code, reapplying the last valid coupon');
      setCouponCode(validCoupon);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <Link
            to="/cart"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ChevronLeft size={20} /> Back to Cart
          </Link>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Shipping Section */}
          <section>
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
                    {/* Name Field */}
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

                    {/* Address Field */}
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

                    {/* City & ZIP */}
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

                    {/* Country Field */}
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
                        {/* Add more countries */}
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
          </section>

          {/* Order Summary */}
          <section>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {state.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
             {/* Coupon Input */}
<div>
  <label htmlFor="couponCode" className="block text-sm font-medium mb-1">Coupon Code</label>
  <input
    id="couponCode"
    type="text"
    value={couponCode}
    onChange={handleCouponChange}
    className="w-full p-2 border rounded-md"
    placeholder="Enter coupon code"
  />
  <AnimatePresence>
    {couponError && (
      <motion.p
        className="text-red-500 text-sm mt-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {couponError}
      </motion.p>
    )}
  </AnimatePresence>
</div>

{/* Apply Coupon Button */}
<motion.button
  onClick={handleApplyCoupon}
  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4"
  whileTap={{ scale: 0.95 }}
>
  Apply Coupon
</motion.button>


              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs.{state.subtotal.toFixed(2)}</span>
                </div>
                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div
                      className="flex justify-between text-green-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span>Discount:</span>
                      <span>-Rs.{(state.subtotal * discount).toFixed(2)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-between">
                  <span>GST Tax ({TAX_RATE * 100}%):</span>
                  <span>Rs.{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4">
                  <span>Total:</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Button */}
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
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}
