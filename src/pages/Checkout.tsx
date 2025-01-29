import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function CheckoutPage() {
  const { state } = useCart();
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and proceed to the payment step
    console.log('Shipping Address:', shippingAddress);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-white shadow-md py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Checkout</h2>
            <Link to="/cart" className="text-black-600 hover:text-black-700 flex items-center gap-2">
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
          {/* Shipping Form */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-6">Shipping Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleChange}
                    className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
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
                    value={shippingAddress.address}
                    onChange={handleChange}
                    className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
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
                      value={shippingAddress.zip}
                      onChange={handleChange}
                      className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
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
                    value={shippingAddress.country}
                    onChange={handleChange}
                    className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-black-600 text-white py-3 rounded-lg hover:bg-black-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
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
                  <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-200">
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        {item.colors && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            <div className="border-t pt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${state.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${state.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Button */}
            <Link
              to="/payment"
              className="w-full mt-6 bg-black-600 text-white py-3 rounded-lg hover:bg-black-700 transition-colors"
            >
              Proceed to Payment <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
