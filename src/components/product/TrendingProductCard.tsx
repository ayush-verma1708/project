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
      <div 
        className="group bg-white border border-black/5 hover:border-black/10 transition-colors duration-300 h-full"
        onClick={onViewDetails}
      >
        <div className="relative">
          {/* Badge */}
          <div className="absolute top-3 left-3 z-10">
            {isOnSale ? (
              <span className="bg-black text-white text-[10px] tracking-[0.1em] px-2 py-1">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            ) : isNew ? (
              <span className="bg-black text-white text-[10px] tracking-[0.1em] px-2 py-1">
                NEW
              </span>
            ) : null}
          </div>
          
          {/* Product Image */}
          <div className="aspect-square bg-black/5 group-hover:bg-black/10 transition-colors duration-300">
            <img
              src={product.images?.[0] || "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=768&q=80"}
              alt={product.name}
              className="w-full h-full object-contain p-4 md:p-6 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
  
        <div className="p-4 md:p-6">
          {/* Product Info */}
          <div className="mb-4 md:mb-6">
            <div className="text-[10px] md:text-xs tracking-[0.1em] text-black/60 mb-1 md:mb-2">
              {product.productType?.name || "Product"}
            </div>
            
            <h3 className="text-sm md:text-lg font-light tracking-tight text-black mb-2 md:mb-3">
              {product.name}
            </h3>
            
            <p className="text-xs md:text-sm text-black/60 line-clamp-2">
              {product.description || "Experience premium quality with our meticulously designed and crafted product."}
            </p>
          </div>
  
          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between border-t border-black/5 pt-3 md:pt-4">
            <div className="flex items-center gap-2">
              {isOnSale && (
                <span className="text-xs md:text-sm text-black/40 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-sm md:text-lg font-light text-black">
                ₹{product.price || "1,999"}
              </span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="text-[10px] md:text-xs tracking-[0.1em] text-black/60 hover:text-black transition-colors duration-300"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }
  