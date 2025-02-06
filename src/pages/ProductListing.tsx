import {  useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../api';
import { debounce } from 'lodash';
import {useParams, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component

const productCategories = {
  'mobile-skins': {
    title: 'Mobile Phone Skins',
    description: 'Premium protective skins for your smartphone',
    filters: {
      categories: ['All', 'Luxury', 'Embossed', 'Leather'],
      tags: ['All', 'premium', 'trendy', 'best seller'],
      sortOptions: ['Newest', 'Price: Low to High', 'Most Popular']
    }
  },
  'laptop-skins': {
    title: 'Laptop Skins',
    description: 'Durable skins for laptops and notebooks',
    filters: {
      categories: ['All', 'Textured', 'Transparent', 'Metallic'],
      tags: ['All', '15-inch', '17-inch', 'MacBook', 'Windows'],
      sortOptions: ['Price: Low to High', 'Most Popular', 'Best Rating']
    }
  },
  stickers: {
    title: 'Decorative Stickers',
    description: 'Express yourself with our unique sticker collection',
    filters: {
      categories: ['All', 'Cartoon', 'Minimalist', 'Custom'],
      tags: ['All', 'Small', 'Medium', 'Large'],
      sortOptions: ['Newest', 'Price: High to Low', 'Best Selling']
    }
  }
};
  

export const ProductListing = () => {
  const { category } = useParams<{ category: keyof typeof productCategories }>();

  if (!category) {
    return <div>Category not found</div>;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Get initial state from URL params
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialSearch = searchParams.get('search') || '';


  const initialCategories = searchParams.get('categories')?.split(',') || ['All'];
  const initialTags = searchParams.get('tags')?.split(',') || ['All'];
  const initialSort = searchParams.get('sort') || 'Newest';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  
  const [sortBy, setSortBy] = useState(initialSort);

  const productsPerPage = 12;

  const categoryConfig = productCategories[category];
  if (!categoryConfig) {
    return <div>Category not found</div>;
  }

  const { title, description, filters } = categoryConfig;
  const { categories, tags, sortOptions } = filters;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'products',
      category,
      currentPage,
      searchQuery,
      selectedCategories,
      selectedTags,
      sortBy,
    ],
    queryFn: () => {
      return productService.getProductsByType(category, {
        page: currentPage,
        search: searchQuery,
        categories: selectedCategories,
        tags: selectedTags,
        sort: sortBy,
        limit: productsPerPage,
      });
    },
    enabled: !!category,
  });

  
  if (isLoading) {
    return <LoadingSpinner />; // Use the custom spinner here
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  
  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateURLParams({ search: query });
  }, 300);

  // const updateURLParams = (params: Record<string, string | number>) => {
  //   const newParams = new URLSearchParams(searchParams);
  //   Object.entries(params).forEach(([key, value]) => {
  //     if (value) {
  //       newParams.set(key, value.toString());
  //     } else {
  //       newParams.delete(key);
  //     }
  //   });
  //   setSearchParams(newParams);
  // };
  const updateURLParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
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

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setCurrentPage(1);
    updateURLParams({ sort: sortOption });
  };

  const toggleSelection = (value: string, currentSelection: string[]) => {
    if (value === 'All') return ['All'];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection.filter(item => item !== 'All'), value];
    return newSelection.length ? newSelection : ['All'];
  };

  const resetFilters = () => {
    setSelectedCategories(['All']);
    setSelectedTags(['All']);
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <motion.h1
              className="text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {title} 
            </motion.h1>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col w-full md:w-auto gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name or description..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full md:w-96 pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                aria-label="Open filters"
              >
                <Filter size={18} />
                <span>Filters</span>
                {(selectedCategories.length > 1 || selectedTags.length > 1) && (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    {selectedCategories.length + selectedTags.length - 2}
                  </span>
                )}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  aria-label="Sort options"
                >
                  <span>Sort by: {sortBy}</span>
                </button>
                
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                    >
                      {sortOptions.map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            handleSortChange(option);
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm ${
                            sortBy === option 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="mb-6 flex flex-wrap gap-3">
          {selectedCategories.filter(c => c !== 'All').map(category => (
            <span 
              key={category}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
            >
              {category}
              <button 
                onClick={() => handleCategoryChange(category)}
                className="hover:text-blue-600"
                aria-label={`Remove ${category} filter`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
          
          {selectedTags.filter(t => t !== 'All').map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button 
                onClick={() => handleTagChange(tag)}
                className="hover:text-purple-600"
                aria-label={`Remove ${tag} filter`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        {/* Filter Modal */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
              onClick={() => setIsFilterOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-lg w-full max-w-md m-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    aria-label="Close filters"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`px-4 py-2 rounded-md text-sm ${
                            selectedCategories.includes(category) 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagChange(tag)}
                          className={`px-4 py-2 rounded-md text-sm ${
                            selectedTags.includes(tag) 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {isError ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-red-500 mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading products</h3>
            <p className="text-gray-600 mb-4">{error?.message || 'Please try again later'}</p>
          </motion.div>
        ) : (
          <>
            {data?.products?.length === 0 ? (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-gray-400 mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                {isLoading ? (
                  Array(6).fill(null).map((_, index) => (
                    <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-96 w-full" />
                  ))
                ) : (
                  data?.products?.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {/* Pagination */}
            {data?.totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-gray-600 text-sm">
                  Showing {(currentPage - 1) * productsPerPage + 1} -{' '}
                  {Math.min(currentPage * productsPerPage, data?.total || 0)} of{' '}
                  {data?.total || 0} products
                </div>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: data?.totalPages || 0 }, (_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 || 
                      page === data?.totalPages ||
                      Math.abs(page - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === page 
                              ? 'bg-blue-500 text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, data?.totalPages || 1))}
                    disabled={currentPage === data?.totalPages}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
