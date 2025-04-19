import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, Grid3X3, List,  AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../../components/ProductCard';
import { productService } from '../../api';
import debounce from 'lodash/debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { productCategories } from '../../constants/productCategories';
import FilterPanel from '../../components/FilterPanel';
import { Product } from '../../types/types';
import { useSearchParams } from 'react-router-dom';

const NO_PRODUCTS_IMAGE = "https://illustrations.popsy.co/amber/work-in-progress.svg";
// https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_400/v1744193202/Mobiiwrap%20pictures/Transparent%20skin/cmrixhrt1ve4yqu7oelv.jpg";

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get category from path parameter instead of query parameter
  const categoryParam = location.pathname.split('/').pop() || 'mobile-skins';
  
  // Parse URL parameters with defaults
  const pageParam = parseInt(searchParams.get('page') || '1');
  const searchQueryParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'Newest';
  const minPriceParam = parseInt(searchParams.get('minPrice') || '0');
  const maxPriceParam = parseInt(searchParams.get('maxPrice') || '2000');
  const ratingParam = searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : null;
  const popularityParam = searchParams.get('popularity') || 'all';
  const viewModeParam = searchParams.get('view') || 'grid';

  // Initialize state from URL params
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [selectedRating, setSelectedRating] = useState<number | null>(ratingParam);
  const [priceRange, setPriceRange] = useState({ min: minPriceParam, max: maxPriceParam });
  const [currentPriceRange, setCurrentPriceRange] = useState({
    min: minPriceParam,
    max: maxPriceParam
  });
  const [popularityFilter, setPopularityFilter] = useState<'all' | 'popular' | 'trending'>(popularityParam as 'all' | 'popular' | 'trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(viewModeParam as 'grid' | 'list');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [hasProducts, setHasProducts] = useState<boolean | null>(null);
  const [comingSoonState, setComingSoonState] = useState({
    message: '',
    isComingSoon: false,
    isLoaded: false
  });
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState<Record<string, boolean>>({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  const productsPerPage = 12;
  
  // Reset state when category changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
    setSortBy('Newest');
    setSelectedRating(null);
    setPriceRange({ min: 0, max: 2000 });
    setCurrentPriceRange({ min: 0, max: 2000 });
    setPopularityFilter('all');
    setViewMode('grid');
    setSelectedCategories(['All']);
    setSelectedTags(['All']);
    setHasProducts(null);
    setComingSoonState({
      message: '',
      isComingSoon: false,
      isLoaded: false
    });
  }, [categoryParam]);
  
  // Get category config
  const categoryConfig = productCategories[categoryParam] || productCategories.electronics;
  const { title, description, filters } = categoryConfig;
  const { categories, tags, sortOptions } = filters;
  
  // Available ratings for filter
  const ratings = [4, 3, 2, 1];

  const handleLike = (product: Product) => {
    setLiked(prev => {
      const newState = { ...prev, [product._id]: !prev[product._id] };
      return newState;
    });
    
    if (!liked[product._id]) {
      // Show popup for this specific product
      setShowPopup(prev => ({ ...prev, [product._id]: true }));
      
      // Also send request to update product popularity on server
      productService.incrementPopularity(product._id).catch(error => {
        console.error("Failed to update product popularity", error);
      });
      
      // Hide popup after delay
      setTimeout(() => {
        setShowPopup(prev => ({ ...prev, [product._id]: false }));
      }, 1500);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'products',
      categoryParam,
      currentPage,
      searchQuery,
      selectedCategories,
      selectedTags,
      sortBy,
      selectedRating,
      currentPriceRange.min,
      currentPriceRange.max,
      popularityFilter
    ],
    queryFn: async () => {
      try {
        // Handle special categories
        if (categoryParam === 'new-arrivals') {
          return await productService.getNewArrivals();
        }
        if (categoryParam === 'trending') {
          return await productService.getTrendingProducts();
        }

        // Check if we have any filters applied
        const hasActiveFilters = 
          searchQuery !== '' || 
          !selectedCategories.includes('All') ||
          !selectedTags.includes('All') ||
          selectedRating !== null ||
          popularityFilter !== 'all' ||
          currentPriceRange.min !== priceRange.min ||
          currentPriceRange.max !== priceRange.max;
        
        const result = await productService.getProductsByType(categoryParam, {
          page: currentPage,
          search: searchQuery,
          categories: selectedCategories.includes('All') ? [] : selectedCategories,
          tags: selectedTags.includes('All') ? [] : selectedTags,
          sort: sortBy,
          limit: productsPerPage,
        });
        
        // If we got zero results and we're not sure if the category has products yet
        if (result.total === 0 && hasProducts === null) {
          // If no filters and still zero results, this is a truly empty category
          if (!hasActiveFilters) {
            setHasProducts(false);
            setComingSoonState({
              isComingSoon: true,
              message: `Products for ${title} will be available soon! Stay tuned.`,
              isLoaded: true
            });
          } else {
            // We have filters, so we need to check if category has any products without filters
            try {
              const unfilteredCheck = await productService.getProductsByType(categoryParam, {
                page: 1,
                limit: 1
              });
              
              const categoryHasProducts = unfilteredCheck.total > 0;
              setHasProducts(categoryHasProducts);
              
              if (!categoryHasProducts) {
                setComingSoonState({
                  isComingSoon: true,
                  message: `Products for ${title} will be available soon! Stay tuned.`,
                  isLoaded: true
                });
              } else {
                setComingSoonState({
                  isComingSoon: false,
                  message: '',
                  isLoaded: true
                });
              }
            } catch (err) {
              console.error("Error checking category products:", err);
            }
          }
        } else if (result.total > 0 && hasProducts === null) {
          // If we have products, mark the category as having products
          setHasProducts(true);
          setComingSoonState({
            isComingSoon: false,
            message: '',
            isLoaded: true
          });
        }
        
        return result;
      } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
      }
    },
    enabled: !!categoryParam,
    staleTime: 60000, // 1 minute before refetch
  });

  // Track if the user has manually adjusted the price range
  const hasUserAdjustedPrice = useRef(false);
  
  // Track previous data min/max values to prevent unnecessary updates
  const prevDataPriceRef = useRef({ min: 0, max: 2000 });
  
  // Update price range based on available products (min and max)
  useEffect(() => {
    // Skip if data isn't loaded yet
    if (!data || data.minPrice === undefined || data.maxPrice === undefined) {
      return;
    }
    
    // Skip if min and max are the same (invalid range)
    if (data.minPrice === data.maxPrice) {
      return;
    }
    
    // Only update if the data price range has actually changed
    const minPriceChanged = data.minPrice !== prevDataPriceRef.current.min;
    const maxPriceChanged = data.maxPrice !== prevDataPriceRef.current.max;
    
    if (minPriceChanged || maxPriceChanged) {
      // Update the available price range boundaries
      setPriceRange({
        min: data.minPrice,
        max: data.maxPrice
      });
      
      // Store the new data values
      prevDataPriceRef.current = {
        min: data.minPrice,
        max: data.maxPrice
      };
      
      // Only update the current price range if:
      // 1. User hasn't manually adjusted it yet, OR
      // 2. User is using the default values (0-2000)
      const isUsingDefaultRange = 
        currentPriceRange.min === 0 && currentPriceRange.max === 2000;
        
      if (!hasUserAdjustedPrice.current || isUsingDefaultRange) {
        setCurrentPriceRange({
          min: data.minPrice,
          max: data.maxPrice
        });
      }
    }
  }, [data]);

  // Debounce search so that we don't fire requests on every keystroke
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
    }, 300),
    []
  );

  const toggleSelection = (value: string, currentSelection: string[]) => {
    if (value === 'All') return ['All'];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection.filter(item => item !== 'All'), value];
    return newSelection.length ? newSelection : ['All'];
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = toggleSelection(category, selectedCategories);
    setSelectedCategories(newCategories);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string) => {
    const newTags = toggleSelection(tag, selectedTags);
    setSelectedTags(newTags);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(prevRating => prevRating === rating ? null : rating);
    setCurrentPage(1);
  };

  const handlePriceChange = (min: number, max: number) => {
    // Mark that the user has manually adjusted the price
    hasUserAdjustedPrice.current = true;
    
    setCurrentPriceRange({ min, max });
    setCurrentPage(1);
  };

  const handlePopularityChange = (option: 'all' | 'popular' | 'trending') => {
    setPopularityFilter(option);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  // Apply frontend filters to ensure filters work properly
  const applyFrontendFilters = (products: Product[]) => {
    if (!products) return [];
    
    return products.filter(product => {
      // Price filter
      const passesPrice = 
        product.price >= currentPriceRange.min && 
        product.price <= currentPriceRange.max;
      
      // Rating filter
      const passesRating = 
        selectedRating === null || 
        (product.rating >= selectedRating);
      
      // Popularity filter
      let passesPopularity = true;
      if (popularityFilter === 'popular') {
        passesPopularity = product.popularity >= 50; // Assuming popularity is 0-100
      } else if (popularityFilter === 'trending') {
        passesPopularity = product.trending === true || product.popularity >= 75;
      }
      
      return passesPrice && passesRating && passesPopularity;
    });
  };

  const resetFilters = () => {
    setSelectedCategories(['All']);
    setSelectedTags(['All']);
    setSelectedRating(null);
    setSearchQuery('');
    setCurrentPage(1);
    setPopularityFilter('all');
    
    // Reset user adjustment flag when filters are reset
    hasUserAdjustedPrice.current = false;
    
    // Reset price range to the data's min/max or defaults if not available
    if (data?.minPrice !== undefined && data?.maxPrice !== undefined) {
      setCurrentPriceRange({ min: data.minPrice, max: data.maxPrice });
    } else {
      setCurrentPriceRange({ min: 0, max: 2000 });
    }
  };

  // Placeholder functions for product interactions
  const handleQuickView = (product: Product) => {
    console.log("Quick view", product);
    // In a real app, this would open a modal or navigate to product detail
  };

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart", product);
    // In a real app, this would add the product to cart
  };

  // Count active filters
  const activeFiltersCount = 
    (selectedCategories.filter(c => c !== 'All').length) +
    (selectedTags.filter(t => t !== 'All').length) +
    (selectedRating !== null ? 1 : 0) +
    (popularityFilter !== 'all' ? 1 : 0) +
    ((currentPriceRange.min !== priceRange.min || currentPriceRange.max !== priceRange.max) ? 1 : 0);

  const handlePageChange = (newPage: number) => {
    // First scroll to the product grid
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Then update the page
    setCurrentPage(newPage);
  };

  // Add this useEffect to handle the back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add this function to handle scrolling to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const productGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading && productGridRef.current) {
      productGridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [isLoading]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('category', categoryParam);
    params.set('page', currentPage.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy !== 'Newest') params.set('sort', sortBy);
    if (currentPriceRange.min > 0) params.set('minPrice', currentPriceRange.min.toString());
    if (currentPriceRange.max < 2000) params.set('maxPrice', currentPriceRange.max.toString());
    if (selectedRating) params.set('rating', selectedRating.toString());
    if (popularityFilter !== 'all') params.set('popularity', popularityFilter);
    if (viewMode !== 'grid') params.set('view', viewMode);
    
    setSearchParams(params);
  }, [
    categoryParam,
    currentPage,
    searchQuery,
    sortBy,
    currentPriceRange,
    selectedRating,
    popularityFilter,
    viewMode,
    setSearchParams
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header Banner */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          <p className="text-blue-100 max-w-2xl">{description}</p>
        </div>
      </div>  */}

      <div className="max-w-7xl mx-auto px-4">
        {/* Search and filter bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    debouncedSearch('');
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md bg-white"
              >
                <span className="text-gray-700">{sortBy}</span>
                <ChevronDown size={18} className={`text-gray-500 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <ul className="py-1">
                    {sortOptions.map((option) => (
                      <li key={option}>
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                            sortBy === option ? 'font-medium text-blue-600 bg-blue-50' : 'text-gray-700'
                          }`}
                          onClick={() => handleSortChange(option)}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* View mode toggle (grid/list) */}
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center px-3 py-2 ${
                  viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center px-3 py-2 ${
                  viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
          
          {/* Active filters display */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500">Active filters:</span>
              
              {/* Category filters */}
              {selectedCategories.filter(c => c !== 'All').map((category) => (
                <button
                  key={`cat-${category}`}
                  onClick={() => handleCategoryChange(category)}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                >
                  {category}
                  <X size={14} />
                </button>
              ))}
              
              {/* Tag filters */}
              {selectedTags.filter(t => t !== 'All').map((tag) => (
                <button
                  key={`tag-${tag}`}
                  onClick={() => handleTagChange(tag)}
                  className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                >
                  {tag}
                  <X size={14} />
                </button>
              ))}
              
              {/* Price filter */}
              {(currentPriceRange.min !== priceRange.min || currentPriceRange.max !== priceRange.max) && (
                <button
                  onClick={() => {
                    // Reset the user adjustment flag when clicking the tag to remove the filter
                    hasUserAdjustedPrice.current = false;
                    setCurrentPriceRange(priceRange);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-sm rounded-full"
                >
                  Price: ₹{currentPriceRange.min} - ₹{currentPriceRange.max}
                  <X size={14} />
                </button>
              )}
              
              {/* Rating filter */}
              {selectedRating && (
                <button
                  onClick={() => handleRatingChange(null)}
                  className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-sm rounded-full"
                >
                  Rating: {selectedRating}+ stars
                  <X size={14} />
                </button>
              )}
              
              {/* Popularity filter */}
              {popularityFilter !== 'all' && (
                <button
                  onClick={() => handlePopularityChange('all')}
                  className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-sm rounded-full"
                >
                  {popularityFilter === 'popular' ? 'Popular' : 'Trending'}
                  <X size={14} />
                </button>
              )}
              
              {/* Clear all button */}
              <button
                onClick={resetFilters}
                className="ml-auto text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main content container */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                categories={categories}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                tags={tags}
                selectedTags={selectedTags}
                handleTagChange={handleTagChange}
                ratings={ratings}
                selectedRating={selectedRating}
                handleRatingChange={handleRatingChange}
                priceRange={priceRange}
                currentPriceRange={currentPriceRange}
                handlePriceChange={handlePriceChange}
                popularityOptions={[
                  { value: 'all', label: 'All Products' },
                  { value: 'popular', label: 'Popular Items' },
                  { value: 'trending', label: 'Trending Now' }
                ]}
                popularityFilter={popularityFilter}
                handlePopularityChange={handlePopularityChange}
                resetFilters={resetFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {isLoading ? (
              // Loading skeleton
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-4`}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="bg-gray-300 aspect-square rounded mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              // Error state
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-red-800 mb-2">There was an error</h3>
                <p className="text-red-600 mb-4">
                  {error instanceof Error ? error.message : 'Failed to load products. Please try again.'}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Refresh Page
                </button>
              </div>
            ) : comingSoonState.isComingSoon ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-10 text-center">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <img 
                    src={NO_PRODUCTS_IMAGE}
                    alt="Coming Soon" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to a simple SVG if the image fails to load
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233B82F6'%3E%3Cpath d='M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L20 9l-8 4-8-4 8-4.2zM4 9.8l8 4v8.4l-8-4V9.8zm10 12.4v-8.4l8-4v8.4l-8 4z'/%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-blue-100 rounded-full w-32 h-32"></div>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-blue-800 mb-3">Coming Soon!</h3>
                <p className="text-blue-600 max-w-md mx-auto">
                  {comingSoonState.message}
                </p>
              </div>
            ) : data?.products && data.products.length > 0 ? (
              // Products grid or list
              <>
                <div 
                  ref={productGridRef}
                  className={`
                    ${viewMode === 'grid' 
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4'
                      : 'space-y-4'
                  }
                `}>
                  {applyFrontendFilters(data.products).map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onQuickView={() => handleQuickView(product)}
                      onAddToCart={() => handleAddToCart(product)}
                      onLike={() => handleLike(product)}
                      isLiked={liked[product._id]}
                      showPopup={showPopup[product._id]}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded border ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {/* Page numbers */}
                      {[...Array(data.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        // Show current page, first, last, and pages around current
                        const isImportantPage = 
                          pageNum === 1 || 
                          pageNum === data.totalPages ||
                          Math.abs(pageNum - currentPage) <= 1;
                          
                        if (!isImportantPage) {
                          // Show ellipsis for skipped pages
                          if (pageNum === 2 || pageNum === data.totalPages - 1) {
                            return <span key={`ellipsis-${pageNum}`} className="px-2">...</span>;
                          }
                          return null;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, data.totalPages))}
                        disabled={currentPage === data.totalPages}
                        className={`px-3 py-1 rounded border ${
                          currentPage === data.totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // No results state
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <img 
                  src="https://illustrations.popsy.co/amber/taking-notes.svg" 
                  alt="No Results" 
                  className="w-48 h-48 mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
