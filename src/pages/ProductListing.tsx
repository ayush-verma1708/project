import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, ChevronDown, Heart, Grid3X3, List, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../api';
import { debounce } from 'lodash';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { productCategories } from '../constants/productCategories';

// Price range slider component
const PriceRangeSlider = ({ 
  minPrice, 
  maxPrice, 
  currentMin, 
  currentMax, 
  onChange 
}: { 
  minPrice: number; 
  maxPrice: number; 
  currentMin: number; 
  currentMax: number; 
  onChange: (min: number, max: number) => void;
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange(Math.min(value, currentMax - 100), currentMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange(currentMin, Math.max(value, currentMin + 100));
  };

  return (
    <div className="mt-4 px-2">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Rs.{currentMin}</span>
        <span className="text-sm font-medium text-gray-700">Rs.{currentMax}</span>
      </div>
      <div className="relative h-2 mb-6">
        <div className="absolute w-full h-1 bg-gray-200 rounded top-1/2 transform -translate-y-1/2"></div>
        <div 
          className="absolute h-1 bg-blue-500 rounded top-1/2 transform -translate-y-1/2"
          style={{ 
            left: `${((currentMin - minPrice) / (maxPrice - minPrice || 1)) * 100}%`, 
            right: `${100 - ((currentMax - minPrice) / (maxPrice - minPrice || 1)) * 100}%` 
          }}
        ></div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={currentMin}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={currentMax}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="number"
            value={currentMin}
            onChange={handleMinChange}
            className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded text-sm"
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">Rs.</span>
        </div>
        <span className="text-gray-400">to</span>
        <div className="relative flex-1">
          <input
            type="number"
            value={currentMax}
            onChange={handleMaxChange}
            className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded text-sm"
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">Rs.</span>
        </div>
      </div>
    </div>
  );
};

interface FilterPanelProps {
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
  tags: string[];
  selectedTags: string[];
  handleTagChange: (tag: string) => void;
  ratings: number[];
  selectedRating: number | null;
  handleRatingChange: (rating: number | null) => void;
  priceRange: { min: number; max: number };
  currentPriceRange: { min: number; max: number };
  handlePriceChange: (min: number, max: number) => void;
  resetFilters: () => void;
  popularityFilter: 'all' | 'popular' | 'trending';
  handlePopularityChange: (option: 'all' | 'popular' | 'trending') => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategories,
  handleCategoryChange,
  tags,
  selectedTags,
  handleTagChange,
  ratings,
  selectedRating,
  handleRatingChange,
  priceRange,
  currentPriceRange,
  handlePriceChange,
  resetFilters,
  popularityFilter,
  handlePopularityChange,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    popularity: true,
    ratings: true,
    tags: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter section component with toggle
  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left font-medium"
      >
        <span>{title}</span>
        <ChevronDown 
          size={18} 
          className={`transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div
      className="bg-white rounded-lg shadow p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <X size={14} />
          Clear all
        </button>
      </div>

      <FilterSection title="Categories" section="categories">
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price" section="price">
        <PriceRangeSlider
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
          currentMin={currentPriceRange.min}
          currentMax={currentPriceRange.max}
          onChange={handlePriceChange}
        />
      </FilterSection>

      {/* <FilterSection title="Popularity" section="popularity">
        <div className="space-y-2">
          <label
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="radio"
              checked={popularityFilter === 'all'}
              onChange={() => handlePopularityChange('all')}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">All Products</span>
          </label>
          <label
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="radio"
              checked={popularityFilter === 'popular'}
              onChange={() => handlePopularityChange('popular')}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">Popular</span>
          </label>
          <label
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="radio"
              checked={popularityFilter === 'trending'}
              onChange={() => handlePopularityChange('trending')}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">Trending</span>
          </label>
        </div>
      </FilterSection> */}

      {/* <FilterSection title="Customer Rating" section="ratings">
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="radio"
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-${i < rating ? 'yellow-400' : 'gray-300'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-700 ml-1">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection> */}

      <FilterSection title="Tags" section="tags">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition ${
                selectedTags.includes(tag) 
                  ? 'bg-blue-50 border-blue-300 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default function ProductListing() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hasProducts, setHasProducts] = useState<boolean | null>(null);

  // Initialize state from URL params
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialSearch = searchParams.get('search') || '';
  const initialCategories = searchParams.get('categories')?.split(',') || ['All'];
  const initialTags = searchParams.get('tags')?.split(',') || ['All'];
  const initialSort = searchParams.get('sort') || 'Newest';
  const initialRating = searchParams.get('rating') ? parseInt(searchParams.get('rating') || '0') : null;
  const initialPriceMin = parseInt(searchParams.get('minPrice') || '0');
  const initialPriceMax = parseInt(searchParams.get('maxPrice') || '2000');
  const initialPopularity = (searchParams.get('popularity') as 'all' | 'popular' | 'trending') || 'all';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [sortBy, setSortBy] = useState(initialSort);
  const [selectedRating, setSelectedRating] = useState<number | null>(initialRating);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [currentPriceRange, setCurrentPriceRange] = useState({
    min: initialPriceMin,
    max: initialPriceMax
  });
  const [popularityFilter, setPopularityFilter] = useState<'all' | 'popular' | 'trending'>(initialPopularity);
  const [comingSoonState, setComingSoonState] = useState({
    message: '',
    isComingSoon: false,
    isLoaded: false
  });
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState<Record<string, boolean>>({});

  const productsPerPage = 12;
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Safely handle category check
  const category = categoryName || '';
  
  // Ensure this runs after we have a category
  useEffect(() => {
    if (!category || !productCategories[category]) {
      navigate('/404');
      return;
    }
  }, [category, navigate]);
  
  // if (!category || !productCategories[category]) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold mb-2">Category not found</h2>
  //         <p className="text-gray-600 mb-4">We couldn't find the category you're looking for.</p>
  //         <button 
  //           onClick={() => navigate('/')}
  //           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  //         >
  //           Go Home
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (!productCategories[category].available) {
    return (
      <ComingSoonPage 
        title={productCategories[category].title}
        description={productCategories[category].description}
        expectedDate={productCategories[category].expectedDate}
      />
    );
  }

  const categoryConfig = productCategories[category];
  const { title, description, filters } = categoryConfig;
  const { categories, tags, sortOptions } = filters;
  
  // Available ratings for filter
  const ratings = [4, 3, 2, 1];

  const handleLike = (productId: string) => {
    setLiked(prev => {
      const newState = { ...prev, [productId]: !prev[productId] };
      return newState;
    });
    
    if (!liked[productId]) {
      // Show popup for this specific product
      setShowPopup(prev => ({ ...prev, [productId]: true }));
      
      // Also send request to update product popularity on server
      productService.incrementPopularity(productId).catch(error => {
        console.error("Failed to update product popularity", error);
      });
      
      // Hide popup after delay
      setTimeout(() => {
        setShowPopup(prev => ({ ...prev, [productId]: false }));
      }, 1500);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'products',
      category,
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
        // Check if we have any filters applied
        const hasActiveFilters = 
          searchQuery !== '' || 
          !selectedCategories.includes('All') ||
          !selectedTags.includes('All') ||
          selectedRating !== null ||
          popularityFilter !== 'all' ||
          currentPriceRange.min !== priceRange.min ||
          currentPriceRange.max !== priceRange.max;
        
        const result = await productService.getProductsByType(category, {
          page: currentPage,
          search: searchQuery,
          categories: selectedCategories.includes('All') ? [] : selectedCategories,
          tags: selectedTags.includes('All') ? [] : selectedTags,
          sort: sortBy,
          rating: selectedRating,
          minPrice: currentPriceRange.min,
          maxPrice: currentPriceRange.max,
          popularity: popularityFilter !== 'all' ? popularityFilter : undefined,
          limit: productsPerPage,
        });
        
        // If we got zero results and we're not sure if the category has products yet
        if (result.total === 0 && hasProducts === null) {
          // Check if the category has any products without filters
          if (!hasActiveFilters) {
            // If no filters and still zero results, this is a truly empty category
            setHasProducts(false);
            setComingSoonState({
              isComingSoon: true,
              message: `Products for ${title} will be available soon! Stay tuned.`,
              isLoaded: true
            });
          } else {
            // We have filters, so we need to check if category has any products without filters
            try {
              const unfilteredCheck = await productService.getProductsByType(category, {
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
    enabled: !!category,
    staleTime: 60000, // 1 minute before refetch
  });

  // Update price range based on available products (min and max)
  useEffect(() => {
    if (data?.minPrice !== undefined && data?.maxPrice !== undefined) {
      // Only update the price range if we have valid min/max values
      if (data.minPrice !== data.maxPrice) {
        setPriceRange({
          min: data.minPrice,
          max: data.maxPrice
        });
        
        // Only update current price range if user hasn't set it yet
        if (initialPriceMin === 0 && initialPriceMax === 2000) {
          setCurrentPriceRange({
            min: data.minPrice,
            max: data.maxPrice
          });
        }
      }
    }
  }, [data?.minPrice, data?.maxPrice]);

  // Debounce search so that we don't fire requests on every keystroke
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
      updateURLParams({ search: query });
    }, 300),
    []
  );

  const updateURLParams = (params: Record<string, any>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '' && 
          // Don't add default values to URL
          !(key === 'minPrice' && value === 0) && 
          !(key === 'maxPrice' && value === 2000) &&
          !(key === 'popularity' && value === 'all')) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });
    
    setSearchParams(newParams);
  };

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
    updateURLParams({ categories: newCategories.join(',') });
  };

  const handleTagChange = (tag: string) => {
    const newTags = toggleSelection(tag, selectedTags);
    setSelectedTags(newTags);
    setCurrentPage(1);
    updateURLParams({ tags: newTags.join(',') });
  };

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(prevRating => prevRating === rating ? null : rating);
    setCurrentPage(1);
    updateURLParams({ rating: rating });
  };

  const handlePriceChange = (min: number, max: number) => {
    // Validation to prevent slider bugs
    if (min < 0) min = 0;
    if (max <= min) max = min + 100;
    
    setCurrentPriceRange({ min, max });
    setCurrentPage(1);
    updateURLParams({ minPrice: min, maxPrice: max });
  };

  const handlePopularityChange = (option: 'all' | 'popular' | 'trending') => {
    setPopularityFilter(option);
    setCurrentPage(1);
    updateURLParams({ popularity: option });
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setCurrentPage(1);
    updateURLParams({ sort: sortOption });
    setIsSortOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategories(['All']);
    setSelectedTags(['All']);
    setSelectedRating(null);
    setSearchQuery('');
    setCurrentPage(1);
    setPopularityFilter('all');
    
    // Reset price range to the data's min/max or defaults if not available
    if (data?.minPrice !== undefined && data?.maxPrice !== undefined) {
      setCurrentPriceRange({ min: data.minPrice, max: data.maxPrice });
    } else {
      setCurrentPriceRange({ min: 0, max: 2000 });
    }
    
    setSearchParams(new URLSearchParams());
  };


  // Count active filters
  const activeFiltersCount = 
    (selectedCategories.filter(c => c !== 'All').length) +
    (selectedTags.filter(t => t !== 'All').length) +
    (selectedRating !== null ? 1 : 0) +
    (popularityFilter !== 'all' ? 1 : 0) +
    ((currentPriceRange.min !== priceRange.min || currentPriceRange.max !== priceRange.max) ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="text-white py-2 px-4 mb-6">
      </div> 

      <div className="max-w-7xl mx-auto px-4">
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
                resetFilters={resetFilters}
                popularityFilter={popularityFilter}
                handlePopularityChange={handlePopularityChange}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    defaultValue={searchQuery}
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                </div>
                
                <div className="flex gap-2">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="md:hidden flex items-center gap-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    <Filter size={16} />
                    <span className="text-sm">Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 text-sm"
                    >
                      <SlidersHorizontal size={16} />
                      <span className="hidden sm:inline">Sort by:</span> {sortBy}
                      <ChevronDown size={14} className={isSortOpen ? 'rotate-180' : ''} />
                    </button>
                    <AnimatePresence>
                      {isSortOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                        >
                          {sortOptions.map(option => (
                            <button
                              key={option}
                              onClick={() => handleSortChange(option)}
                              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                sortBy === option
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* View Toggle */}
                  <div className="hidden sm:flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Active Filters Chips */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategories.filter(c => c !== 'All').map(category => (
                    <span key={category} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm">
                      {category}
                      <button onClick={() => handleCategoryChange(category)} className="hover:text-blue-500">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  
                  {selectedTags.filter(t => t !== 'All').map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm">
                      {tag}
                      <button onClick={() => handleTagChange(tag)} className="hover:text-purple-500">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  
                  {selectedRating !== null && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-sm">
                      {selectedRating}+ Stars
                      <button onClick={() => handleRatingChange(null)} className="hover:text-yellow-500">
                        <X size={14} />
                      </button>
                    </span>
                  )}

                  {popularityFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-sm">
                      {popularityFilter === 'popular' ? 'Popular' : 'Trending'}
                      <button onClick={() => handlePopularityChange('all')} className="hover:text-orange-500">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  
                  {(currentPriceRange.min !== priceRange.min || currentPriceRange.max !== priceRange.max) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm">
                      Rs.{currentPriceRange.min} - Rs.{currentPriceRange.max}
                      <button 
                        onClick={() => handlePriceChange(priceRange.min, priceRange.max)} 
                        className="hover:text-green-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  
                  {activeFiltersCount > 1 && (
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-sm hover:bg-gray-200"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {isError ? (
              <div className="bg-white p-12 rounded-lg shadow text-center">
                <p className="text-red-600 text-lg mb-2">⚠️ Error loading products</p>
                <p className="text-gray-600">{error?.message || 'Please try again later.'}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Product count and results summary */}
                {!isLoading && data?.products && (
                  <div className="mb-4 text-sm text-gray-600">
                    Showing {data.products.length} of {data.total} products
                  </div>
                )}

                {/* Product Grid/List */}
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'flex flex-col gap-4'
                }`}>
                  {isLoading
                    ? Array(6)
                        .fill(null)
                        .map((_, index) => (
                          <div 
                            key={index} 
                            className={`animate-pulse bg-gray-200 rounded-lg ${
                              viewMode === 'grid' ? 'h-80' : 'h-40'
                            }`} 
                          />
                        ))
                    : data?.products?.length === 0 ? (
                      <div className="col-span-full bg-white p-12 rounded-lg shadow text-center">
                        {/* Only show "No products found" if the category has products but filters don't match */}
                        {hasProducts ? (
                          <>
                            <p className="text-lg font-medium text-gray-700 mb-2">
                              No products found
                            </p>
                            <p className="text-gray-500 mb-4">
                              Try adjusting your filters or search terms.
                            </p>
                            <button
                              onClick={resetFilters}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                              Clear Filters
                            </button>
                          </>
                        ) : (
                          <div className="flex justify-center">
                            <AlertCircle size={64} className="text-blue-500" />
                          </div>
                        )}
                      </div>
                    ) : (
                      data?.products?.map((product) => (
                        <motion.div
                          key={product._id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className={viewMode === 'list' ? 'w-full' : ''}
                        >
                          <div className="group relative">
                            {/* Wishlist button */}
                            <button
                              onClick={() => handleLike(product._id)}
                              className={`absolute top-2 right-2 z-10 p-1.5 bg-white bg-opacity-70 rounded-full opacity-0 
                              group-hover:opacity-100 transition-opacity hover:bg-opacity-100
                              transform ${liked[product._id] ? "scale-110" : "scale-100"} transition-transform duration-200 ease-out`}
                              aria-label="Add to wishlist"
                            >
                              <Heart
                                size={18}
                                className={`transition-colors duration-300 ${
                                  liked[product._id] ? "text-red-500 scale-110" : "text-gray-600 hover:text-red-500"
                                }`}
                              />
                            </button>

                            {/* Floating Popup Animation */}
                            <AnimatePresence>
                              {showPopup[product._id] && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: -10, scale: 1 }}
                                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                  transition={{ duration: 0.5 }}
                                  className="absolute top-10 right-2 bg-black text-white px-3 py-1.5 rounded-lg text-sm shadow-lg"
                                >
                                  ❤️ Thanks for liking!
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            <ProductCard 
                              product={product} 
                              showFullDetails={viewMode === 'list'}
                            />
                          </div>
                        </motion.div>
                      ))
                    )}
                </div>

                {/* Pagination */}
                {data?.totalPages > 1 && (
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-sm">
                      Showing {(currentPage - 1) * productsPerPage + 1} -{' '}
                      {Math.min(currentPage * productsPerPage, data?.total || 0)} of{' '}
                      {data?.total || 0} products
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: data?.totalPages || 0 }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 border rounded-md transition-colors ${
                            currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, data?.totalPages || 1))}
                        disabled={currentPage === data?.totalPages}
                        className="px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Filter Modal */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden"
                onClick={() => setIsFilterOpen(false)}
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween' }}
                  className="bg-white h-full w-3/4 max-w-sm p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded">
                      <X size={24} />
                    </button>
                  </div>
                  
                  {/* Mobile Filter Content */}
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
                    resetFilters={resetFilters}
                    popularityFilter={popularityFilter}
                    handlePopularityChange={handlePopularityChange}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coming Soon State - Only show outside the product grid when category has no products */}
          {comingSoonState.isLoaded && comingSoonState.isComingSoon && !hasProducts && (
            <div className="bg-white p-12 rounded-lg shadow text-center mt-6">
              <div className="flex justify-center mb-6">
                <AlertCircle size={64} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                {comingSoonState.message}
              </p>
              <button 
                onClick={() => navigate('/')}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
