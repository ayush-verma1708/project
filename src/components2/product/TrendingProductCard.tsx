interface TrendingProductProps {
    product: any;
    onAddToCart: () => void;
    onViewDetails: () => void;
  }
  
  export default function TrendingProductCard({ product, onAddToCart, onViewDetails }: TrendingProductProps) {
    // Determine if product is on sale or new
    const isOnSale = product.originalPrice && product.originalPrice > product.price;
    const isNew = new Date(product.createdAt) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000); // 14 days
  
    // Random placeholder for ratings until we have real data
    const rating = {
      value: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      count: Math.floor(Math.random() * 100) + 5
    };
  
    return (
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md flex flex-col md:flex-row">
        <div className="md:w-2/5 p-6 flex items-center justify-center bg-gray-50 relative">
          {/* Badge */}
          <div className="absolute top-3 left-3 z-10">
            {isOnSale ? (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            ) : isNew ? (
              <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            ) : null}
          </div>
          
          <img
            src={product.images?.[0] || "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=768&q=80"}
            alt={product.name}
            className="max-h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="md:w-3/5 p-6 flex flex-col justify-between bg-white">
          <div>
            {/* Product Category */}
            <div className="text-xs text-gray-500 mb-1">{product.productType?.name || "Product"}</div>
            
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
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
            
            <p className="text-gray-600 text-sm mb-6 line-clamp-2">
              {product.description || "Experience premium quality with our meticulously designed and crafted product, perfect for elevating your lifestyle."}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isOnSale && (
                <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
              )}
              <span className="text-orange-500 font-bold text-lg ml-2">₹{product.price || "1,999"}</span>
            </div>
            <button 
              onClick={onAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  