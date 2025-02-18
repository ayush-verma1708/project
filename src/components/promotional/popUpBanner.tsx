import React, { useState } from 'react';
import { subscriptionService } from '../../api/services/subscription';
import promotionImage from '../../assets/promotionImage2.png'


const EmailSubscriptionBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [showBanner, setShowBanner] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('Processing your subscription...');

    try {
      const response = await subscriptionService.subscribe(email);
      if (response.message === 'Email is already subscribed.') {
        setStatus('error');
        setMessage('This email is already subscribed. ❌');
      } else {
        setStatus('success');
        setMessage('Thank you for subscribing! 🎉');
        setCouponCode('WELCOME25');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Subscription failed. Please try again later.');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative bg-orange-300 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden">

        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block flex-1 bg-cover bg-center" style={{
            backgroundImage: `url(${promotionImage})`, // Correct way to apply the image URL
            opacity: 0.9,
          }} />

          <div className="flex-1 p-8 space-y-6">
            {status === 'success' ? (
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-4">{message}</h3>
                <div className="animate-bounce bg-white/20 p-6 rounded-xl">
                  <p className="text-xl font-mono font-bold text-yellow-300">
                    Your Coupon Code:
                  </p>
                  <div className="mt-4 text-4xl font-bold tracking-wider border-2 border-dashed border-yellow-300 p-3 rounded-lg">
                    {couponCode}
                  </div>
                </div>
                <p className="mt-6 text-lg">
                  Apply this code at checkout for 25% off your first purchase!
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-center text-white mb-4">
                  25% OFF Your First Order
                </h2>
                <p className="text-center text-white/90 text-lg mb-6">
                  Subscribe to our newsletter and get instant access to your exclusive discount
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-6 py-4 rounded-lg border-0 focus:ring-4 focus:ring-purple-300 transition-all text-gray-900"
                    disabled={status === 'loading'}
                  />

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-white text-purple-600 text-lg font-bold rounded-lg hover:bg-gray-100 
                             transition-colors flex items-center justify-center"
                  >
                    {status === 'loading' ? (
                      <span className="animate-pulse">Generating Your Coupon...</span>
                    ) : (
                      'Claim My 25% Discount'
                    )}
                  </button>
                </form>
              </>
            )}

            {status === 'error' && (
              <div className="mt-4 p-4 bg-red-100/20 rounded-lg text-red-100 text-center">
                {message}
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm underline hover:text-red-200"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscriptionBanner;
