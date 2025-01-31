// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export function CheckoutPage() {
//   const { state } = useCart();
//   const [shippingForm, setShippingForm] = useState({
//     name: '',
//     address: '',
//     city: '',
//     zip: '',
//     country: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission
//   const [isEditing, setIsEditing] = useState(false); // Track edit mode

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setShippingForm((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     console.log(shippingForm);
//     e.preventDefault();
//     setIsSubmitted(true); // Show details after submission
//   };

//   const handleEdit = () => {
//     setIsEditing(true); // Allow editing of details
//   };

//   // Check if all fields are filled
//   const isFormValid = Object.values(shippingForm).every((value) => value.trim() !== '');

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <motion.div
//         className="bg-white shadow-md py-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-semibold">Checkout</h2>
//             <Link
//               to="/cart"
//               className="text-black-600 hover:text-black-700 flex items-center gap-2"
//             >
//               <ChevronLeft size={20} /> Back to Cart
//             </Link>
//           </div>
//         </div>
//       </motion.div>

//       {/* Checkout Form */}
//       <motion.div
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Shipping Form */}
//           <motion.div
//             className="bg-white p-8 rounded-lg shadow-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <AnimatePresence mode="wait">
//               {!isSubmitted || isEditing ? (
//                 <motion.div
//                   key="form"
//                   initial={{ opacity: 0, rotateY: 0 }}
//                   animate={{ opacity: 1, rotateY: 0 }}
//                   exit={{ opacity: 0, rotateY: 90 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <h3 className="text-lg font-semibold mb-6">Shipping Information</h3>
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={shippingForm.name}
//                         onChange={handleChange}
//                         className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                         Address
//                       </label>
//                       <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         value={shippingForm.address}
//                         onChange={handleChange}
//                         className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
//                         required
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                           City
//                         </label>
//                         <input
//                           type="text"
//                           id="city"
//                           name="city"
//                           value={shippingForm.city}
//                           onChange={handleChange}
//                           className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
//                           ZIP Code
//                         </label>
//                         <input
//                           type="text"
//                           id="zip"
//                           name="zip"
//                           value={shippingForm.zip}
//                           onChange={handleChange}
//                           className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//                         Country
//                       </label>
//                       <input
//                         type="text"
//                         id="country"
//                         name="country"
//                         value={shippingForm.country}
//                         onChange={handleChange}
//                         className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       disabled={!isFormValid}
//                       className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                     >
//                       Submit Details
//                     </button>
//                   </form>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="details"
//                   initial={{ opacity: 0, rotateY: 90 }}
//                   animate={{ opacity: 1, rotateY: 0 }}
//                   exit={{ opacity: 0, rotateY: 90 }}
//                   transition={{ duration: 0.5 }}
//                   className="space-y-6"
//                 >
//                   <h3 className="text-lg font-semibold mb-6">Shipping Details</h3>
//                   <div className="space-y-4">
//                     <p>
//                       <span className="font-medium">Name:</span> {shippingForm.name}
//                     </p>
//                     <p>
//                       <span className="font-medium">Address:</span> {shippingForm.address}
//                     </p>
//                     <p>
//                       <span className="font-medium">City:</span> {shippingForm.city}
//                     </p>
//                     <p>
//                       <span className="font-medium">ZIP Code:</span> {shippingForm.zip}
//                     </p>
//                     <p>
//                       <span className="font-medium">Country:</span> {shippingForm.country}
//                     </p>
//                   </div>
//                   <button
//                     onClick={handleEdit}
//                     className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Edit size={16} /> Edit Details
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CheckoutPage() {
  const { state } = useCart();
  const [shippingForm, setShippingForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsEditing(false); // Reset editing state when submitting
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Don't reset isSubmitted here to maintain the form data
  };

  const isFormValid = Object.values(shippingForm).every((value) => value.trim() !== '');

  // Animation variants
  const formVariants = {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section remains the same */}
      <motion.div
        className="bg-white shadow-md py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Checkout</h2>
            <Link
              to="/cart"
              className="text-black-600 hover:text-black-700 flex items-center gap-2"
            >
              <ChevronLeft size={20} /> Back to Cart
            </Link>
          </div>
        </div>
      </motion.div>
 {/* Checkout Form */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {(!isSubmitted || isEditing) ? (
                <motion.div
                  key="form"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold mb-6">Shipping Information</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields remain the same */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={shippingForm.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingForm.address}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingForm.city}
                          onChange={handleChange}
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={shippingForm.zip}
                          onChange={handleChange}
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingForm.country}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Submit Details
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold mb-6">Shipping Details</h3>
                  {/* Details display remains the same */}
                  <div className="space-y-4">
                    <p>
                      <span className="font-medium">Name:</span> {shippingForm.name}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span> {shippingForm.address}
                    </p>
                    <p>
                      <span className="font-medium">City:</span> {shippingForm.city}
                    </p>
                    <p>
                      <span className="font-medium">ZIP Code:</span> {shippingForm.zip}
                    </p>
                    <p>
                      <span className="font-medium">Country:</span> {shippingForm.country}
                    </p>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={16} /> Edit Details
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Order Summary */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-6">Order Summary</h3>
            <div className="space-y-6">
              {state.items.length === 0 ? (
                <div className="text-center text-gray-500 py-8">Your cart is empty</div>
              ) : (
                state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-4 border-b border-gray-200"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-blue-500 font-semibold">Brand: {item.selectedBrand}</p>
                  <p className="text-sm text-green-500 font-semibold">Model: {item.selectedModel}</p>
                 
                      </div>
                    </div>
                    <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            <div className="border-t pt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>Rs.{state.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>Rs.{state.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs.{state.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Button */}
            <Link
              to="/payment"
              className={`w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 ${
                !isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={(e) => !isSubmitted && e.preventDefault()}
            >
              Proceed to Payment <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
