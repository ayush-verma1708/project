import { useState } from 'react';

interface ProductProps {
  product: any;
  onQuickView: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onQuickView, onAddToCart }: ProductProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine stock status
  const getStockStatus = () => {
    if (!product.stock) return { text: "Sold Out", color: "bg-red-500" };
    if (product.stock < 5) return { text: "Few Left", color: "bg-orange-500" };
    return { text: "In Stock", color: "bg-green-500" };
  };
  
  const stockStatus = getStockStatus();
  const isSoldOut = stockStatus.text === "Sold Out";
  
  // Random placeholder for ratings until we have real data
  const rating = {
    value: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    count: Math.floor(Math.random() * 100) + 5
  };

  return (
    <div 
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button 
        className={`absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
        aria-label="Add to wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      {/* Stock Indicator */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`${stockStatus.color} text-white text-xs font-bold px-2 py-1 rounded`}>
          {stockStatus.text}
        </span>
      </div>
      
      {/* Product Image */}
      <div className="relative pt-[100%] bg-gray-50">
        <img
          src={product.images?.[0] || "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80"}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105 ${isSoldOut ? 'opacity-60' : ''}`}
        />
        
        {/* Quick Action Buttons (Shown on Hover) */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 flex opacity-0 transform translate-y-4 ${isHovered ? 'opacity-100 translate-y-0' : ''} transition-all duration-300`}>
          {isSoldOut ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Notification logic would go here
              }}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white text-xs font-medium py-2 rounded-lg transition-colors"
            >
              Notify Me
            </button>
          ) : (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView();
                }}
                className="flex-1 bg-white hover:bg-gray-100 text-gray-800 text-xs font-medium py-2 rounded-l-lg border-r border-gray-200 transition-colors"
              >
                Quick View
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-r-lg transition-colors"
                disabled={isSoldOut}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Product Category */}
        <div className="text-xs text-gray-500 mb-1">{product.productType?.name || "Product"}</div>
        
        {/* Product Name */}
        <h3 className="font-medium text-sm md:text-base line-clamp-1 mb-1">
          {product.name}
        </h3>
        
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5" 
                viewBox="0 0 20 20" 
                fill={i < Math.floor(parseFloat(rating.value)) ? "currentColor" : (i < Math.ceil(parseFloat(rating.value)) ? "currentColor" : "none")}
                stroke="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating.count})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-xs mr-2">₹{product.originalPrice}</span>
          )}
          <span className="font-bold text-sm md:text-base">{product.price ? `₹${product.price}` : "₹1,999"}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="ml-2 text-xs text-green-600 font-medium">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
