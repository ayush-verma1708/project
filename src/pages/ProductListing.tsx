import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, ChevronDown, Heart, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
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
            left: `${((currentMin - minPrice) / (maxPrice - minPrice)) * 100}%`, 
            right: `${100 - ((currentMax - minPrice) / (maxPrice - minPrice)) * 100}%` 
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
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
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

      <FilterSection title="Customer Rating" section="ratings">
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
      </FilterSection>

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

  // Initialize state from URL params
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialSearch = searchParams.get('search') || '';
  const initialCategories = searchParams.get('categories')?.split(',') || ['All'];
  const initialTags = searchParams.get('tags')?.split(',') || ['All'];
  const initialSort = searchParams.get('sort') || 'Newest';
  const initialRating = searchParams.get('rating') ? parseInt(searchParams.get('rating') || '0') : null;
  const initialPriceMin = parseInt(searchParams.get('minPrice') || '0');
  const initialPriceMax = parseInt(searchParams.get('maxPrice') || '2000');

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
  
  if (!category || !productCategories[category]) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Category not found</h2>
          <p className="text-gray-600 mb-4">We couldn't find the category you're looking for.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const categoryConfig = productCategories[category];
  const { title, description, filters } = categoryConfig;
  const { categories, tags, sortOptions } = filters;
  
  // Available ratings for filter
  const ratings = [4, 3, 2, 1];

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
      currentPriceRange.max
    ],
    queryFn: () => {
      return productService.getProductsByType(category, {
        page: currentPage,
        search: searchQuery,
        categories: selectedCategories.includes('All') ? [] : selectedCategories,
        tags: selectedTags.includes('All') ? [] : selectedTags,
        sort: sortBy,
        rating: selectedRating,
        minPrice: currentPriceRange.min,
        maxPrice: currentPriceRange.max,
        limit: productsPerPage,
      });
    },
    enabled: !!category,
    staleTime: 60000, // 1 minute before refetch
  });

  // Update price range based on available products (min and max)
  useEffect(() => {
    if (data?.minPrice !== undefined && data?.maxPrice !== undefined) {
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
          !(key === 'maxPrice' && value === 2000)) {
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
    setCurrentPriceRange({ min, max });
    setCurrentPage(1);
    updateURLParams({ minPrice: min, maxPrice: max });
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
    setCurrentPriceRange({ min: priceRange.min, max: priceRange.max });
    setSearchParams(new URLSearchParams());
  };

  // Count active filters
  const activeFiltersCount = 
    (selectedCategories.filter(c => c !== 'All').length) +
    (selectedTags.filter(t => t !== 'All').length) +
    (selectedRating !== null ? 1 : 0) +
    ((currentPriceRange.min !== priceRange.min || currentPriceRange.max !== priceRange.max) ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-8 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-blue-100 max-w-2xl">{description}</p>
        </div>
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
                        <img 
                          src="/api/placeholder/200/200" 
                          alt="No results"
                          className="mx-auto mb-4"
                        />
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
                              className="absolute top-2 right-2 z-10 p-1.5 bg-white bg-opacity-70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-100"
                              aria-label="Add to wishlist"
                            >
                              <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
                            </button>
                            
                            <ProductCard 
                              product={product} 
                              showFullDetails={viewMode === 'list'}
                              onAddToCart={(product) => console.log('Added to cart:', product)}
                            />
                          </div>
                        </motion.div>
                      ))
                    )}
                </div>

                {/* //             Pagination */}
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
             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  </div>
  );
}

