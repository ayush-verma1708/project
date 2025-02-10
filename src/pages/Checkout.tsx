import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { campaignService } from '../api/services/campaigns';
import ShippingForm from '../components/ShippingForm';
import OrderSummary from '../components/OrderSummary';
import CouponSection from '../components/CouponSection';

const TAX_RATE = 0.18;

export function CheckoutPage() {
  const { state } = useCart();
  const [shippingForm, setShippingForm] = useState({
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const discountedSubtotal = state.subtotal * (1 - discount);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Link to="/cart" className="text-gray-600 hover:text-black flex items-center">
          <ChevronLeft size={20} /> Back to Cart
        </Link>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <ShippingForm 
            shippingForm={shippingForm} 
            setShippingForm={setShippingForm} 
            isSubmitted={isSubmitted} 
            setIsSubmitted={setIsSubmitted} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
          />
          
          <OrderSummary state={state} tax={tax} total={total} />
        </div>
        
        <CouponSection setDiscount={setDiscount} />
      </main>
    </div>
  );
}

// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
// import { useState , useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { campaignService } from '../api/services/campaigns';  // Assuming the service is imported

// // Tax rate constant (adjust as needed)
// const TAX_RATE = 0.18;

// export function CheckoutPage() {
//   const { state } = useCart();
//   const [shippingForm, setShippingForm] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     address: "",
//     apartment: "",
//     city: "",
//     zip: "",
//     country: "",
//     phone: "",
//   });
//   const [errors, setErrors] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     address: "",
//     apartment: "",
//     city: "",
//     zip: "",
//     country: "",
//     phone: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [couponCode, setCouponCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [couponError, setCouponError] = useState('');
//   const [validCoupon, setValidCoupon] = useState(''); // Add this state

//   const [attemptCount, setAttemptCount] = useState(0);
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [blockEndTime, setBlockEndTime] = useState<Date | null>(null);

//   // Calculate prices
//   const discountedSubtotal = state.subtotal * (1 - discount);
//   const tax = discountedSubtotal * TAX_RATE;
//   const total = discountedSubtotal + tax;

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { name: '', address: '', city: '', zip: '', country: '' };

//     // Address validation
//     if (!shippingForm.address.trim()) {
//       newErrors.address = 'Address is required';
//       isValid = false;
//     }

//     // City validation
//     if (!shippingForm.city.trim()) {
//       newErrors.city = 'City is required';
//       isValid = false;
//     }

//     // ZIP validation
//     if (!shippingForm.zip.trim()) {
//       newErrors.zip = 'ZIP code is required';
//       isValid = false;
//     } else if (!/^\d{6}$/.test(shippingForm.zip)) {
//       newErrors.zip = 'Invalid ZIP (5 digits required)';
//       isValid = false;
//     }

//     // Country validation
//     if (!shippingForm.country.trim()) {
//       newErrors.country = 'Country is required';
//       isValid = false;
//     }

//     return isValid;
//   };

//   // Check for existing block on component mount
//   useEffect(() => {
//     const storedBlockEndTime = localStorage.getItem('couponBlockEndTime');
//     const storedAttemptCount = localStorage.getItem('couponAttemptCount');
    
//     if (storedBlockEndTime) {
//       const endTime = new Date(storedBlockEndTime);
//       if (endTime > new Date()) {
//         setIsBlocked(true);
//         setBlockEndTime(endTime);
//       } else {
//         // Clear expired block
//         localStorage.removeItem('couponBlockEndTime');
//         localStorage.removeItem('couponAttemptCount');
//       }
//     }
    
//     if (storedAttemptCount) {
//       setAttemptCount(Number(storedAttemptCount));
//     }
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsSubmitted(true);
//       setIsEditing(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setShippingForm(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     setErrors(prev => ({ ...prev, [name]: '' }));
//   };


//   const handleApplyCoupon = async () => {
//     if (isBlocked) {
//       const timeRemaining = blockEndTime ? Math.ceil((blockEndTime.getTime() - new Date().getTime()) / 60000) : 0;
//       setCouponError(`Please wait ${timeRemaining} minutes before trying again.`);
//       return;
//     }

//     const code = couponCode.trim().toUpperCase();
//     setCouponError('');

//     try {
//       const newAttemptCount = attemptCount + 1;
//       setAttemptCount(newAttemptCount);
//       localStorage.setItem('couponAttemptCount', String(newAttemptCount));

//       // Check if we should warn the user
//       if (newAttemptCount === 4) {
//         alert('Warning: You have 1 attempt remaining before being temporarily blocked.');
//       }

//       const response = await campaignService.search(code);
//       const coupon = response[0];

//       if (!coupon) {
//         handleInvalidCoupon('Invalid coupon code');
//         return;
//       }

//       // ... rest of the validation logic remains the same
//       const currentDate = new Date();
//       const startDate = new Date(coupon.startDate);
//       const endDate = new Date(coupon.endDate);

//       if (!coupon.active) {
//         handleInvalidCoupon('This coupon is no longer active');
//         return;
//       }

//       if (currentDate < startDate || currentDate > endDate) {
//         handleInvalidCoupon('Coupon code has expired');
//         return;
//       }

//       // Success case
//       setDiscount(coupon.discount / 100);
//       setCouponError('');
//       setValidCoupon(code);
//       localStorage.setItem('validCoupon', code);
//       alert(`Coupon applied! Discount: ${coupon.discount}%`);
      
//       // Reset attempt count on successful application
//       setAttemptCount(0);
//       localStorage.removeItem('couponAttemptCount');

//     } catch (error) {
//       if (error.message === 'Too many requests, please try again later.') {
//         handleRateLimit();
//       } else {
//         handleInvalidCoupon('Failed to validate coupon');
//       }
//     }
//   };


//   const handleInvalidCoupon = (errorMessage: string) => {
//     if (attemptCount >= 5) {
//       handleRateLimit();
//     } else {
//       setCouponError(validCoupon 
//         ? `${errorMessage}. Previous valid coupon will remain applied.` 
//         : errorMessage);
      
//       if (validCoupon) {
//         setCouponCode(validCoupon);
//         setDiscount(validCoupon ? discount : 0);
//       } else {
//         setDiscount(0);
//       }
//     }
//   };

//   const handleRateLimit = () => {
//     const blockEndTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
//     setIsBlocked(true);
//     setBlockEndTime(blockEndTime);
//     localStorage.setItem('couponBlockEndTime', blockEndTime.toISOString());
//     setCouponError('Too many attempts. Please try again in 10 minutes.');
//   };

//   // Add this function to calculate and display remaining attempts
//   const getRemainingAttempts = () => {
//     return Math.max(5 - attemptCount, 0);
//   };


//   const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCouponCode(e.target.value);
//     // Clear any error messages when user starts typing a new code
//     setCouponError('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <motion.header className="bg-white shadow-sm p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Checkout</h1>
//         <Link to="/cart" className="text-gray-600 hover:text-black flex items-center">
//           <ChevronLeft size={20} /> Back to Cart
//         </Link>
//       </motion.header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Shipping Section */}
//           <section>
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-md"
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//             >
//               <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              
//               <AnimatePresence mode="wait">
//                 {!isSubmitted || isEditing ? (
//                   <motion.form
//                     key="form"
//                     onSubmit={handleSubmit}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     {/* Name Field */}
//                     <div className="flex gap-4">
//                       <label className="block text-sm font-medium mb-1">Full Name</label>
//                       <input
//               type="email"
//               name="email"
//               placeholder="Email or mobile number"
//               className="w-full p-2 border rounded-md"
//               value={shippingForm.email}
//               onChange={handleChange}
//             />
//                       {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    
                    
//                       <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 className="w-full p-2 border rounded-md"
//                 value={shippingForm.firstName}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 className="w-full p-2 border rounded-md"
//                 value={shippingForm.lastName}
//                 onChange={handleChange}
//               />    
//                     </div>

//                     <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               className="w-full p-2 border rounded-md"
//               value={shippingForm.address}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="apartment"
//               placeholder="Apartment, suite, etc. (optional)"
//               className="w-full p-2 border rounded-md"
//               value={shippingForm.apartment}
//               onChange={handleChange}
//             />
//             <div className="grid grid-cols-3 gap-4">
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 className="w-full p-2 border rounded-md"
//                 value={shippingForm.city}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="zip"
//                 placeholder="ZIP Code"
//                 className="w-full p-2 border rounded-md"
//                 value={shippingForm.zip}
//                 onChange={handleChange}
//               />
//               <select
//                 name="country"
//                 className="w-full p-2 border rounded-md"
//                 value={shippingForm.country}
//                 onChange={handleChange}
//               >
//                 <option value="IN">India</option>
//                 {/* <option value="CA">Canada</option> */}
//               </select>
//               </div>

//                     <button
//                       type="submit"
//                       className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4"
//                     >
//                       Save Shipping Info
//                     </button>
//                   </motion.form>
//                 ) : (
//                   <motion.div
//                     key="summary"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="space-y-4"
//                   >
//                     <div className="space-y-2">
//                       <p><span className="font-medium">Name:</span> {shippingForm.email}</p>
//                       <p><span className="font-medium">Name:</span> {shippingForm.firstName} {shippingForm.lastName}</p>
//                       <p><span className="font-medium">Address:</span> {shippingForm.address}</p>
//                       <p><span className="font-medium">Name:</span> {shippingForm.apartment}</p>
//                       <p><span className="font-medium">City:</span> {shippingForm.city}</p>
//                       <p><span className="font-medium">ZIP:</span> {shippingForm.zip}</p>
//                       <p><span className="font-medium">Country:</span> {shippingForm.country}</p>
//                       <p><span className="font-medium">Country:</span> {shippingForm.phone}</p>
//                     </div>
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
//                     >
//                       <Edit size={16} /> Edit Information
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </section>

//           {/* Order Summary */}
//           <section>
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-md"
//               initial={{ x: 20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//             >
//               <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

//               {/* Cart Items */}
//               <div className="space-y-4 mb-6">
//                 {state.items.map(item => (
//                   <div key={item.id} className="flex justify-between items-center border-b pb-4">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={item.images[0]}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <div>
//                         <h3 className="font-medium">{item.name}</h3>
//                         <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Coupon Section */}
//              {/* Coupon Input */}
// <div>
//     <label htmlFor="couponCode" className="block text-sm font-medium mb-1">
//         Coupon Code
//         {!isBlocked && (
//           <span className="text-gray-500 text-xs ml-2">
//             ({getRemainingAttempts()} attempts remaining)
//           </span>
//         )}
//       </label>
//       <input
//         id="couponCode"
//         type="text"
//         value={couponCode}
//         onChange={handleCouponChange}
//         className="w-full p-2 border rounded-md"
//         placeholder="Enter coupon code"
//         disabled={isBlocked}
//       />
//   <AnimatePresence>
//     {couponError && (
//       <motion.p
//         className="text-red-500 text-sm mt-1"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//       >
//         {couponError}
//       </motion.p>
//     )}
//   </AnimatePresence>
//   {/* Warning Message */}
//   {attemptCount >= 3 && !isBlocked && (
//         <motion.p
//           className="text-amber-600 text-sm mt-1"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           Warning: Multiple failed attempts may result in temporary blocking.
//         </motion.p>
//       )}
    

// </div>

//   {/* Apply Coupon Button */}
//   <motion.button
//       onClick={handleApplyCoupon}
//       className={`w-full py-2 rounded-md mt-4 ${
//         isBlocked 
//           ? 'bg-gray-300 cursor-not-allowed' 
//           : 'bg-black text-white hover:bg-gray-800'
//       }`}
//       whileTap={{ scale: isBlocked ? 1 : 0.95 }}
//       disabled={isBlocked}
//     >
//       Apply Coupon
//     </motion.button>


//               {/* Price Breakdown */}
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Subtotal:</span>
//                   <span>Rs.{state.subtotal.toFixed(2)}</span>
//                 </div>
//                 <AnimatePresence>
//                   {discount > 0 && (
//                     <motion.div
//                       className="flex justify-between text-green-600"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                     >
//                       <span>Discount:</span>
//                       <span>-Rs.{(state.subtotal * discount).toFixed(2)}</span>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//                 <div className="flex justify-between">
//                   <span>GST Tax ({TAX_RATE * 100}%):</span>
//                   <span>Rs.{tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg pt-4">
//                   <span>Total:</span>
//                   <span>Rs.{total.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Payment Button */}
//               <Link
//                 to="/payment"
//                 className={`mt-6 block w-full text-center py-3 rounded-md transition-colors ${
//                   isSubmitted 
//                     ? 'bg-black text-white hover:bg-gray-800'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 Proceed to Payment <ChevronRight className="inline" size={18} />
//               </Link>
//             </motion.div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }
