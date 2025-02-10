import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../api';
import { debounce } from 'lodash';
import { useParams, useSearchParams } from 'react-router-dom';
import { productCategories } from '../constants/productCategories';

interface FilterPanelProps {
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
  tags: string[];
  selectedTags: string[];
  handleTagChange: (tag: string) => void;
  resetFilters: () => void;
}

interface FilterPanelProps {
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
  tags: string[];
  selectedTags: string[];
  handleTagChange: (tag: string) => void;
  resetFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategories,
  handleCategoryChange,
  tags,
  selectedTags,
  handleTagChange,
  resetFilters,
}) => {
  return (
    <motion.div
      className="p-6 bg-white rounded-md shadow border border-gray-300 space-y-6"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Categories Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
          Departments
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((category) => (
            <label
              key={category}
              className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer ${
                selectedCategories.includes(category) ? 'bg-blue-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
          Brands & Features
        </h3>
        <div className="flex flex-col gap-1">
          {tags.map((tag) => (
            <label
              key={tag}
              className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer ${
                selectedTags.includes(tag) ? 'bg-purple-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              />
              <span className="text-gray-700 text-sm">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors font-medium text-sm"
      >
        Clear Filters
      </button>
    </motion.div>
  );
};




export const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Initialize state from URL params
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
  const { category } = useParams<{ category: keyof typeof productCategories }>();

  if (!category) return <div>Category not found</div>;
  const categoryConfig = productCategories[category];
  if (!categoryConfig) return <div>Category not found</div>;

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

  // Debounce search so that we don't fire requests on every keystroke
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
      updateURLParams({ search: query });
    }, 300),
    []
  );

  const updateURLParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value.toString());
      else newParams.delete(key);
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

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setCurrentPage(1);
    updateURLParams({ sort: sortOption });
  };

  const resetFilters = () => {
    setSelectedCategories(['All']);
    setSelectedTags(['All']);
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Desktop Sidebar */}
      <aside className="hidden md:block absolute top-20 left-0 h-full w-72 p-6">
        <FilterPanel
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          tags={tags}
          selectedTags={selectedTags}
          handleTagChange={handleTagChange}
          resetFilters={resetFilters}
        />
      </aside>

      {/* Main Content */}
      <div className="md:ml-80 p-4 md:p-6">
        {/* Header & Mobile Controls */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col">
            <motion.h1
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {title}
            </motion.h1>
            <p className="text-gray-600 max-w-2xl">{description}</p>
          </div>

          {/* Mobile Search & Controls */}
          <div className="md:hidden flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter size={16} />
                <span className="text-sm text-gray-800">Filters</span>
                {(selectedCategories.length > 1 || selectedTags.length > 1) && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {selectedCategories.length + selectedTags.length - 2}
                  </span>
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                >
                  <span>Sort: {sortBy}</span>
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
                          onClick={() => {
                            handleSortChange(option);
                            setIsSortOpen(false);
                          }}
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
            </div>
          </div>

          {/* Active Filters (Desktop/Tablet) */}
          <div className="hidden md:flex flex-wrap gap-2 mb-4">
            {selectedCategories.filter(c => c !== 'All').map(category => (
              <span
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
              >
                {category}
                <button onClick={() => handleCategoryChange(category)} className="hover:text-blue-600">
                  <X size={12} />
                </button>
              </span>
            ))}
            {selectedTags.filter(t => t !== 'All').map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button onClick={() => handleTagChange(tag)} className="hover:text-purple-600">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isError ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-600 mb-2">⚠️ Error loading products</p>
            <p className="text-gray-600">{error?.message || 'Please try again later.'}</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              {isLoading
                ? Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <div key={index} className="animate-pulse bg-gray-300 rounded-md h-80" />
                    ))
                : data?.products?.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <p className="text-gray-500 mb-2">🔍 No products found</p>
                    <p className="text-gray-600 mb-4">
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
                    >
                      {/* Adjust ProductCard styling to be larger */}
                      <ProductCard product={product} className="h-full" />
                    </motion.div>
                  ))
                )}
            </motion.div>

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
              <FilterPanel
                categories={categories}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                tags={tags}
                selectedTags={selectedTags}
                handleTagChange={handleTagChange}
                resetFilters={resetFilters}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// import { useState, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, X, Filter } from 'lucide-react';
// import { useQuery } from '@tanstack/react-query';
// import { ProductCard } from '../components/ProductCard';
// import { productService } from '../api';
// import { debounce } from 'lodash';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { productCategories } from '../constants/productCategories';

// interface FilterPanelProps {
//   categories: string[];
//   selectedCategories: string[];
//   handleCategoryChange: (category: string) => void;
//   tags: string[];
//   selectedTags: string[];
//   handleTagChange: (tag: string) => void;
//   resetFilters: () => void;
// }

// const FilterPanel: React.FC<FilterPanelProps> = ({
//   categories,
//   selectedCategories,
//   handleCategoryChange,
//   tags,
//   selectedTags,
//   handleTagChange,
//   resetFilters,
// }) => {
//   return (
//     <motion.div
//       className="p-6 bg-white rounded-md shadow border border-gray-300 space-y-6"
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Categories Section */}
//       <div className="space-y-3">
//         <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
//           Departments
//         </h3>
//         <div className="flex flex-col gap-1">
//           {categories.map((category) => (
//             <label
//               key={category}
//               className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer ${
//                 selectedCategories.includes(category) ? 'bg-blue-50' : ''
//               }`}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleCategoryChange(category)}
//                 className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//               />
//               <span className="text-gray-700 text-sm">{category}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Tags Section */}
//       <div className="space-y-3">
//         <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
//           Brands & Features
//         </h3>
//         <div className="flex flex-col gap-1">
//           {tags.map((tag) => (
//             <label
//               key={tag}
//               className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer ${
//                 selectedTags.includes(tag) ? 'bg-purple-50' : ''
//               }`}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedTags.includes(tag)}
//                 onChange={() => handleTagChange(tag)}
//                 className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
//               />
//               <span className="text-gray-700 text-sm">{tag}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Reset Button */}
//       <button
//         onClick={resetFilters}
//         className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors font-medium text-sm"
//       >
//         Clear Filters
//       </button>
//     </motion.div>
//   );
// };

// export const ProductListing = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);

//   // Initialize state from URL params
//   const initialPage = parseInt(searchParams.get('page') || '1');
//   const initialSearch = searchParams.get('search') || '';
//   const initialCategories = searchParams.get('categories')?.split(',') || ['All'];
//   const initialTags = searchParams.get('tags')?.split(',') || ['All'];
//   const initialSort = searchParams.get('sort') || 'Newest';

//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [searchQuery, setSearchQuery] = useState(initialSearch);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
//   const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
//   const [sortBy, setSortBy] = useState(initialSort);

//   const productsPerPage = 12;
//   const { category } = useParams<{ category: keyof typeof productCategories }>();

//   if (!category) return <div>Category not found</div>;
//   const categoryConfig = productCategories[category];
//   if (!categoryConfig) return <div>Category not found</div>;

//   const { title, description, filters } = categoryConfig;
//   const { categories, tags, sortOptions } = filters;

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: [
//       'products',
//       category,
//       currentPage,
//       searchQuery,
//       selectedCategories,
//       selectedTags,
//       sortBy,
//     ],
//     queryFn: () => {
//       return productService.getProductsByType(category, {
//         page: currentPage,
//         search: searchQuery,
//         categories: selectedCategories,
//         tags: selectedTags,
//         sort: sortBy,
//         limit: productsPerPage,
//       });
//     },
//     enabled: !!category,
//   });

//   // Debounce search so that we don't fire requests on every keystroke
//   const debouncedSearch = useCallback(
//     debounce((query: string) => {
//       setSearchQuery(query);
//       setCurrentPage(1);
//       updateURLParams({ search: query });
//     }, 300),
//     []
//   );

//   const updateURLParams = (params: Record<string, string | number>) => {
//     const newParams = new URLSearchParams(searchParams);
//     Object.entries(params).forEach(([key, value]) => {
//       if (value) newParams.set(key, value.toString());
//       else newParams.delete(key);
//     });
//     setSearchParams(newParams);
//   };

//   const toggleSelection = (value: string, currentSelection: string[]) => {
//     if (value === 'All') return ['All'];
//     const newSelection = currentSelection.includes(value)
//       ? currentSelection.filter(item => item !== value)
//       : [...currentSelection.filter(item => item !== 'All'), value];
//     return newSelection.length ? newSelection : ['All'];
//   };

//   const handleCategoryChange = (category: string) => {
//     const newCategories = toggleSelection(category, selectedCategories);
//     setSelectedCategories(newCategories);
//     setCurrentPage(1);
//     updateURLParams({ categories: newCategories.join(',') });
//   };

//   const handleTagChange = (tag: string) => {
//     const newTags = toggleSelection(tag, selectedTags);
//     setSelectedTags(newTags);
//     setCurrentPage(1);
//     updateURLParams({ tags: newTags.join(',') });
//   };

//   const handleSortChange = (sortOption: string) => {
//     setSortBy(sortOption);
//     setCurrentPage(1);
//     updateURLParams({ sort: sortOption });
//   };

//   const resetFilters = () => {
//     setSelectedCategories(['All']);
//     setSelectedTags(['All']);
//     setSearchQuery('');
//     setCurrentPage(1);
//     setSearchParams(new URLSearchParams());
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6">
//         {/* Desktop Sidebar */}
//         <aside className="hidden md:block w-72">
//           <FilterPanel
//             categories={categories}
//             selectedCategories={selectedCategories}
//             handleCategoryChange={handleCategoryChange}
//             tags={tags}
//             selectedTags={selectedTags}
//             handleTagChange={handleTagChange}
//             resetFilters={resetFilters}
//           />
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1">
//           {/* Header & Mobile Controls */}
//           <div className="flex flex-col gap-4 mb-6">
//             <div className="flex flex-col">
//               <motion.h1
//                 className="text-3xl font-bold text-gray-900"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 {title}
//               </motion.h1>
//               <p className="text-gray-600 max-w-2xl">{description}</p>
//             </div>

//             {/* Mobile Search & Controls */}
//             <div className="md:hidden flex flex-col gap-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   onChange={(e) => debouncedSearch(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setIsFilterOpen(true)}
//                   className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//                 >
//                   <Filter size={16} />
//                   <span className="text-sm text-gray-800">Filters</span>
//                   {(selectedCategories.length > 1 || selectedTags.length > 1) && (
//                     <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
//                       {selectedCategories.length + selectedTags.length - 2}
//                     </span>
//                   )}
//                 </button>
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsSortOpen(!isSortOpen)}
//                     className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
//                   >
//                     <span>Sort: {sortBy}</span>
//                   </button>
//                   <AnimatePresence>
//                     {isSortOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
//                       >
//                         {sortOptions.map(option => (
//                           <button
//                             key={option}
//                             onClick={() => {
//                               handleSortChange(option);
//                               setIsSortOpen(false);
//                             }}
//                             className={`w-full px-3 py-2 text-left text-sm transition-colors ${
//                               sortBy === option
//                                 ? 'bg-blue-50 text-blue-700'
//                                 : 'hover:bg-gray-100 text-gray-700'
//                             }`}
//                           >
//                             {option}
//                           </button>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Active Filters (Desktop/Tablet) */}
//           <div className="hidden md:flex flex-wrap gap-2 mb-4">
//             {selectedCategories.filter(c => c !== 'All').map(category => (
//               <span
//                 key={category}
//                 className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
//               >
//                 {category}
//                 <button onClick={() => handleCategoryChange(category)} className="hover:text-blue-600">
//                   <X size={12} />
//                 </button>
//               </span>
//             ))}
//             {selectedTags.filter(t => t !== 'All').map(tag => (
//               <span
//                 key={tag}
//                 className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1"
//               >
//                 {tag}
//                 <button onClick={() => handleTagChange(tag)} className="hover:text-purple-600">
//                   <X size={12} />
//                 </button>
//               </span>
//             ))}
//           </div>

//           {/* Products Grid */}
//           {isError ? (
//             <motion.div
//               className="text-center py-16"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <p className="text-red-600 mb-2">⚠️ Error loading products</p>
//               <p className="text-gray-600">{error?.message || 'Please try again later.'}</p>
//             </motion.div>
//           ) : (
//             <>
//               <motion.div
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//                 layout
//               >
//                 {isLoading
//                   ? Array(6)
//                       .fill(null)
//                       .map((_, index) => (
//                         <div key={index} className="animate-pulse bg-gray-300 rounded-md aspect-square" />
//                       ))
//                   : data?.products?.length === 0 ? (
//                     <div className="col-span-full text-center py-16">
//                       <p className="text-gray-500 mb-2">🔍 No products found</p>
//                       <p className="text-gray-600 mb-4">
//                         Try adjusting your filters or search terms.
//                       </p>
//                       <button
//                         onClick={resetFilters}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                       >
//                         Clear Filters
//                       </button>
//                     </div>
//                   ) : (
//                     data?.products?.map((product) => (
//                       <motion.div
//                         key={product._id}
//                         layout
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <ProductCard product={product} />
//                       </motion.div>
//                     ))
//                   )}
//               </motion.div>

//               {/* Pagination */}
//               {data?.totalPages > 1 && (
//                 <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//                   <p className="text-gray-600 text-sm">
//                     Showing {(currentPage - 1) * productsPerPage + 1} -{' '}
//                     {Math.min(currentPage * productsPerPage, data?.total || 0)} of{' '}
//                     {data?.total || 0} products
//                   </p>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                       disabled={currentPage === 1}
//                       className="px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
//                     >
//                       Previous
//                     </button>
//                     {Array.from({ length: data?.totalPages || 0 }, (_, i) => i + 1).map(page => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`px-4 py-2 border rounded-md transition-colors ${
//                           currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setCurrentPage(p => Math.min(p + 1, data?.totalPages || 1))}
//                       disabled={currentPage === data?.totalPages}
//                       className="px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>

//       {/* Mobile Filter Modal */}
//       <AnimatePresence>
//         {isFilterOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden"
//             onClick={() => setIsFilterOpen(false)}
//           >
//             <motion.div
//               initial={{ x: '-100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '-100%' }}
//               transition={{ type: 'tween' }}
//               className="bg-white h-full w-3/4 max-w-sm p-6 overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
//                 <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded">
//                   <X size={24} />
//                 </button>
//               </div>
//               <FilterPanel
//                 categories={categories}
//                 selectedCategories={selectedCategories}
//                 handleCategoryChange={handleCategoryChange}
//                 tags={tags}
//                 selectedTags={selectedTags}
//                 handleTagChange={handleTagChange}
//                 resetFilters={resetFilters}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // import { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Search, X, Filter } from 'lucide-react';
// // import { useQuery } from '@tanstack/react-query';
// // import { ProductCard } from '../components/ProductCard';
// // import { productService } from '../api';
// // import { debounce } from 'lodash';
// // import { useParams, useSearchParams } from 'react-router-dom';
// // import { productCategories } from '../constants/productCategories';


// // interface FilterPanelProps {
// //   categories: string[];
// //   selectedCategories: string[];
// //   handleCategoryChange: (category: string) => void;
// //   tags: string[];
// //   selectedTags: string[];
// //   handleTagChange: (tag: string) => void;
// //   resetFilters: () => void;
// // }

// // const FilterPanel: React.FC<FilterPanelProps> = ({
// //   categories,
// //   selectedCategories,
// //   handleCategoryChange,
// //   tags,
// //   selectedTags,
// //   handleTagChange,
// //   resetFilters,
// // }) => {
// //   return (
// //     <motion.div
// //       className="p-6 bg-white rounded-lg shadow-md border border-gray-200 space-y-6"
// //       initial={{ opacity: 0, y: 10 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4 }}
// //     >
// //       {/* Categories Section */}
// //       <div className="space-y-4">
// //         <h3 className="text-xl font-medium text-gray-800">Categories</h3>
// //         <div className="flex flex-col gap-2">
// //           {categories.map((category) => (
// //             <label
// //               key={category}
// //               className={`flex items-center space-x-2 p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100 ${
// //                 selectedCategories.includes(category) ? 'bg-blue-50' : 'bg-transparent'
// //               }`}
// //             >
// //               <input
// //                 type="checkbox"
// //                 checked={selectedCategories.includes(category)}
// //                 onChange={() => handleCategoryChange(category)}
// //                 className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
// //               />
// //               <span className="text-gray-700">{category}</span>
// //             </label>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Tags Section */}
// //       <div className="space-y-4">
// //         <h3 className="text-xl font-medium text-gray-800">Tags</h3>
// //         <div className="flex flex-col gap-2">
// //           {tags.map((tag) => (
// //             <label
// //               key={tag}
// //               className={`flex items-center space-x-2 p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100 ${
// //                 selectedTags.includes(tag) ? 'bg-purple-50' : 'bg-transparent'
// //               }`}
// //             >
// //               <input
// //                 type="checkbox"
// //                 checked={selectedTags.includes(tag)}
// //                 onChange={() => handleTagChange(tag)}
// //                 className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
// //               />
// //               <span className="text-gray-700">{tag}</span>
// //             </label>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Reset Filters Button */}
// //       <button
// //         onClick={resetFilters}
// //         className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors font-medium"
// //       >
// //         Reset All Filters
// //       </button>
// //     </motion.div>
// //   );
// // };



// // export const ProductListing = () => {
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [isSortOpen, setIsSortOpen] = useState(false);
  
// //   // State initialization from URL params
// //   const initialPage = parseInt(searchParams.get('page') || '1');
// //   const initialSearch = searchParams.get('search') || '';
// //   const initialCategories = searchParams.get('categories')?.split(',') || ['All'];
// //   const initialTags = searchParams.get('tags')?.split(',') || ['All'];
// //   const initialSort = searchParams.get('sort') || 'Newest';

// //   const [currentPage, setCurrentPage] = useState(initialPage);
// //   const [searchQuery, setSearchQuery] = useState(initialSearch);
// //   const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
// //   const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
// //   const [sortBy, setSortBy] = useState(initialSort);

// //   const productsPerPage = 12;
// //   const { category } = useParams<{ category: keyof typeof productCategories }>();
  
// //   if (!category) return <div>Category not found</div>;
// //   const categoryConfig = productCategories[category];
// //   if (!categoryConfig) return <div>Category not found</div>;
  
// //   const { title, description, filters } = categoryConfig;
// //   const { categories, tags, sortOptions } = filters;

// //   const { data, isLoading, isError, error } = useQuery({
// //     queryKey: [
// //       'products',
// //       category,
// //       currentPage,
// //       searchQuery,
// //       selectedCategories,
// //       selectedTags,
// //       sortBy,
// //     ],
// //     queryFn: () => {
// //       return productService.getProductsByType(category, {
// //         page: currentPage,
// //         search: searchQuery,
// //         categories: selectedCategories,
// //         tags: selectedTags,
// //         sort: sortBy,
// //         limit: productsPerPage,
// //       });
// //     },
// //     enabled: !!category,
// //   });

// //   const debouncedSearch = debounce((query: string) => {
// //     setSearchQuery(query);
// //     setCurrentPage(1);
// //     updateURLParams({ search: query });
// //   }, 300);

// //   const updateURLParams = (params: Record<string, string | number>) => {
// //     const newParams = new URLSearchParams(searchParams);
// //     Object.entries(params).forEach(([key, value]) => {
// //       if (value) newParams.set(key, value.toString());
// //       else newParams.delete(key);
// //     });
// //     setSearchParams(newParams);
// //   };

// //   const handleCategoryChange = (category: string) => {
// //     const newCategories = toggleSelection(category, selectedCategories);
// //     setSelectedCategories(newCategories);
// //     setCurrentPage(1);
// //     updateURLParams({ categories: newCategories.join(',') });
// //   };

// //   const handleTagChange = (tag: string) => {
// //     const newTags = toggleSelection(tag, selectedTags);
// //     setSelectedTags(newTags);
// //     setCurrentPage(1);
// //     updateURLParams({ tags: newTags.join(',') });
// //   };

// //   const handleSortChange = (sortOption: string) => {
// //     setSortBy(sortOption);
// //     setCurrentPage(1);
// //     updateURLParams({ sort: sortOption });
// //   };

// //   const toggleSelection = (value: string, currentSelection: string[]) => {
// //     if (value === 'All') return ['All'];
// //     const newSelection = currentSelection.includes(value)
// //       ? currentSelection.filter(item => item !== value)
// //       : [...currentSelection.filter(item => item !== 'All'), value];
// //     return newSelection.length ? newSelection : ['All'];
// //   };

// //   const resetFilters = () => {
// //     setSelectedCategories(['All']);
// //     setSelectedTags(['All']);
// //     setSearchQuery('');
// //     setCurrentPage(1);
// //     setSearchParams(new URLSearchParams());
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
// //         {/* Desktop Filters Sidebar */}
// //         <div className="hidden md:block w-72 flex-shrink-0">
// //           <FilterPanel
// //             categories={categories}
// //             selectedCategories={selectedCategories}
// //             handleCategoryChange={handleCategoryChange}
// //             tags={tags}
// //             selectedTags={selectedTags}
// //             handleTagChange={handleTagChange}
// //             resetFilters={resetFilters}
// //           />
// //         </div>

// //         {/* Main Content */}
// //         <div className="flex-1">
// //           <div className="flex flex-col gap-6 mb-8">
// //             {/* Header */}
// //             <div className="space-y-2">
// //               <motion.h1
// //                 className="text-3xl font-bold text-gray-900"
// //                 initial={{ opacity: 0, y: -20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //               >
// //                 {title}
// //               </motion.h1>
// //               <p className="text-gray-600 max-w-2xl">{description}</p>
// //             </div>

// //             {/* Mobile Controls */}
// //             <div className="md:hidden flex flex-col gap-4">
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   placeholder="Search products..."
// //                   onChange={(e) => debouncedSearch(e.target.value)}
// //                   className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 />
// //                 <Search className="absolute left-3 top-3 text-gray-400" size={18} />
// //               </div>

// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => setIsFilterOpen(true)}
// //                   className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
// //                 >
// //                   <Filter size={16} />
// //                   <span>Filters</span>
// //                   {(selectedCategories.length > 1 || selectedTags.length > 1) && (
// //                     <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs">
// //                       {selectedCategories.length + selectedTags.length - 2}
// //                     </span>
// //                   )}
// //                 </button>

// //                 <div className="relative">
// //                   <button
// //                     onClick={() => setIsSortOpen(!isSortOpen)}
// //                     className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
// //                   >
// //                     <span>Sort: {sortBy}</span>
// //                   </button>
                  
// //                   <AnimatePresence>
// //                     {isSortOpen && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: -10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: -10 }}
// //                         className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
// //                       >
// //                         {sortOptions.map(option => (
// //                           <button
// //                             key={option}
// //                             onClick={() => {
// //                               handleSortChange(option);
// //                               setIsSortOpen(false);
// //                             }}
// //                             className={`w-full px-4 py-2 text-left text-sm ${
// //                               sortBy === option 
// //                                 ? 'bg-blue-50 text-blue-600' 
// //                                 : 'hover:bg-gray-50'
// //                             }`}
// //                           >
// //                             {option}
// //                           </button>
// //                         ))}
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Active Filters */}
// //             <div className="flex flex-wrap gap-2">
// //               {selectedCategories.filter(c => c !== 'All').map(category => (
// //                 <span 
// //                   key={category}
// //                   className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1.5"
// //                 >
// //                   {category}
// //                   <button 
// //                     onClick={() => handleCategoryChange(category)}
// //                     className="hover:text-blue-600"
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </span>
// //               ))}
              
// //               {selectedTags.filter(t => t !== 'All').map(tag => (
// //                 <span 
// //                   key={tag}
// //                   className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1.5"
// //                 >
// //                   {tag}
// //                   <button 
// //                     onClick={() => handleTagChange(tag)}
// //                     className="hover:text-purple-600"
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Products Grid */}
// //           {isError ? (
// //             <motion.div 
// //               className="text-center py-20"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //             >
// //               <div className="text-red-500 mb-4">⚠️</div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading products</h3>
// //               <p className="text-gray-600 mb-4">{error?.message || 'Please try again later'}</p>
// //             </motion.div>
// //           ) : (
// //             <>
// //               <motion.div 
// //                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// //                 layout
// //               >
// //                 {isLoading ? (
// //                   Array(6).fill(null).map((_, index) => (
// //                     <div key={index} className="animate-pulse bg-gray-200 rounded-xl aspect-square" />
// //                   ))
// //                 ) : data?.products?.length === 0 ? (
// //                   <div className="col-span-full text-center py-20">
// //                     <div className="text-gray-400 mb-4">🔍</div>
// //                     <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
// //                     <p className="text-gray-600 mb-4">
// //                       Try adjusting your filters or search terms
// //                     </p>
// //                     <button
// //                       onClick={resetFilters}
// //                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
// //                     >
// //                       Reset Filters
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   data?.products?.map((product) => (
// //                     <motion.div
// //                       key={product._id}
// //                       layout
// //                       initial={{ opacity: 0, scale: 0.9 }}
// //                       animate={{ opacity: 1, scale: 1 }}
// //                       transition={{ duration: 0.2 }}
// //                     >
// //                       <ProductCard product={product} />
// //                     </motion.div>
// //                   ))
// //                 )}
// //               </motion.div>

// //               {/* Pagination */}
// //               {data?.totalPages > 1 && (
// //                 <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
// //                   <div className="text-gray-600 text-sm">
// //                     Showing {(currentPage - 1) * productsPerPage + 1} -{' '}
// //                     {Math.min(currentPage * productsPerPage, data?.total || 0)} of{' '}
// //                     {data?.total || 0} products
// //                   </div>
                  
// //                   <div className="flex gap-1">
// //                     <button
// //                       onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
// //                       disabled={currentPage === 1}
// //                       className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
// //                     >
// //                       Previous
// //                     </button>
                    
// //                     {Array.from({ length: data?.totalPages || 0 }, (_, i) => i + 1).map(page => (
// //                       <button
// //                         key={page}
// //                         onClick={() => setCurrentPage(page)}
// //                         className={`px-4 py-2 rounded-md ${
// //                           currentPage === page 
// //                             ? 'bg-blue-500 text-white' 
// //                             : 'hover:bg-gray-100'
// //                         }`}
// //                       >
// //                         {page}
// //                       </button>
// //                     ))}
                    
// //                     <button
// //                       onClick={() => setCurrentPage(p => Math.min(p + 1, data?.totalPages || 1))}
// //                       disabled={currentPage === data?.totalPages}
// //                       className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* Mobile Filter Modal */}
// //       <AnimatePresence>
// //         {isFilterOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden"
// //             onClick={() => setIsFilterOpen(false)}
// //           >
// //             <motion.div
// //               initial={{ x: '-100%' }}
// //               animate={{ x: 0 }}
// //               exit={{ x: '-100%' }}
// //               transition={{ type: 'tween' }}
// //               className="bg-white h-full w-3/4 max-w-sm p-6 overflow-y-auto"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <div className="flex justify-between items-center mb-6">
// //                 <h2 className="text-xl font-semibold">Filters</h2>
// //                 <button 
// //                   onClick={() => setIsFilterOpen(false)}
// //                   className="p-2 hover:bg-gray-100 rounded-lg"
// //                 >
// //                   <X size={24} />
// //                 </button>
// //               </div>
// //               <FilterPanel
// //                 categories={categories}
// //                 selectedCategories={selectedCategories}
// //                 handleCategoryChange={handleCategoryChange}
// //                 tags={tags}
// //                 selectedTags={selectedTags}
// //                 handleTagChange={handleTagChange}
// //                 resetFilters={resetFilters}
// //               />
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };



// // // import {  useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Search, X, Filter } from 'lucide-react';
// // // import { useQuery } from '@tanstack/react-query';
// // // import { ProductCard } from '../components/ProductCard';
// // // import { productService } from '../api';
// // // import { debounce } from 'lodash';
// // // import {useParams, useSearchParams } from 'react-router-dom';
// // // import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component
// // // import {productCategories} from '../constants/productCategories.tsx' 

  

// // // export const ProductListing = () => {
 
// // //   const [searchParams, setSearchParams] = useSearchParams();
// // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// // //   const [isSortOpen, setIsSortOpen] = useState(false);
// // //   // Get initial state from URL params
// // //   const initialPage = parseInt(searchParams.get('page') || '1');
// // //   const initialSearch = searchParams.get('search') || '';
// // //   const initialCategories = searchParams.get('categories')?.split(',') || ['All'];
// // //   const initialTags = searchParams.get('tags')?.split(',') || ['All'];
// // //   const initialSort = searchParams.get('sort') || 'Newest';
// // //   const [currentPage, setCurrentPage] = useState(initialPage);
// // //   const [searchQuery, setSearchQuery] = useState(initialSearch);
// // //   const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
// // //   const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
// // //   const [sortBy, setSortBy] = useState(initialSort);
// // //   const productsPerPage = 12;
// // //   const { category } = useParams<{ category: keyof typeof productCategories }>();
// // //   if (!category) {
// // //     return <div>Category not found</div>;
// // //   }
// // //   const categoryConfig = productCategories[category];
// // //   if (!categoryConfig) {
// // //     return <div>Category not found</div>;
// // //   }
// // //   const { title, description, filters } = categoryConfig;
// // //   const { categories, tags, sortOptions } = filters;
// // //   const { data, isLoading, isError, error } = useQuery({
// // //     queryKey: [
// // //       'products',
// // //       category,
// // //       currentPage,
// // //       searchQuery,
// // //       selectedCategories,
// // //       selectedTags,
// // //       sortBy,
// // //     ],
// // //     queryFn: () => {
// // //       return productService.getProductsByType(category, {
// // //         page: currentPage,
// // //         search: searchQuery,
// // //         categories: selectedCategories,
// // //         tags: selectedTags,
// // //         sort: sortBy,
// // //         limit: productsPerPage,
// // //       });
// // //     },
// // //     enabled: !!category,
// // //   });
  
// // //   if (isLoading) {
// // //     return <LoadingSpinner />; // Use the custom spinner here
// // //   }

// // //   if (isError) {
// // //     return <div>Error: {error.message}</div>;
// // //   }

  
// // //   const debouncedSearch = debounce((query: string) => {
// // //     setSearchQuery(query);
// // //     setCurrentPage(1);
// // //     updateURLParams({ search: query });
// // //   }, 300);

// // //   const updateURLParams = (params: Record<string, string | number>) => {
// // //     const newParams = new URLSearchParams(searchParams);
// // //     Object.entries(params).forEach(([key, value]) => {
// // //       if (value) {
// // //         newParams.set(key, value.toString());
// // //       } else {
// // //         newParams.delete(key);
// // //       }
// // //     });
// // //     setSearchParams(newParams);
// // //   };
  
  

// // //   const handleCategoryChange = (category: string) => {
// // //     const newCategories = toggleSelection(category, selectedCategories);
// // //     setSelectedCategories(newCategories);
// // //     setCurrentPage(1);
// // //     updateURLParams({ categories: newCategories.join(',') });
// // //   };

// // //   const handleTagChange = (tag: string) => {
// // //     const newTags = toggleSelection(tag, selectedTags);
// // //     setSelectedTags(newTags);
// // //     setCurrentPage(1);
// // //     updateURLParams({ tags: newTags.join(',') });
// // //   };

// // //   const handleSortChange = (sortOption: string) => {
// // //     setSortBy(sortOption);
// // //     setCurrentPage(1);
// // //     updateURLParams({ sort: sortOption });
// // //   };

// // //   const toggleSelection = (value: string, currentSelection: string[]) => {
// // //     if (value === 'All') return ['All'];
// // //     const newSelection = currentSelection.includes(value)
// // //       ? currentSelection.filter(item => item !== value)
// // //       : [...currentSelection.filter(item => item !== 'All'), value];
// // //     return newSelection.length ? newSelection : ['All'];
// // //   };

// // //   const resetFilters = () => {
// // //     setSelectedCategories(['All']);
// // //     setSelectedTags(['All']);
// // //     setSearchQuery('');
// // //     setCurrentPage(1);
// // //     setSearchParams(new URLSearchParams());
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-12">
// // //       {/* Header Section */}
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
// // //           <div>
// // //             <motion.h1
// // //               className="text-3xl font-bold text-gray-900 mb-2"
// // //               initial={{ opacity: 0, y: -20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //             >
// // //               {title} 
// // //             </motion.h1>
// // //             <p className="text-gray-600">{description}</p>
// // //           </div>

// // //           {/* Search and Controls */}
// // //           <div className="flex flex-col w-full md:w-auto gap-4">
// // //             <div className="relative">
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search products by name or description..."
// // //                 onChange={(e) => debouncedSearch(e.target.value)}
// // //                 className="w-full md:w-96 pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
// // //               />
// // //               <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
// // //             </div>

// // //             <div className="flex items-center gap-3">
// // //               <button 
// // //                 onClick={() => setIsFilterOpen(true)}
// // //                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
// // //                 aria-label="Open filters"
// // //               >
// // //                 <Filter size={18} />
// // //                 <span>Filters</span>
// // //                 {(selectedCategories.length > 1 || selectedTags.length > 1) && (
// // //                   <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
// // //                     {selectedCategories.length + selectedTags.length - 2}
// // //                   </span>
// // //                 )}
// // //               </button>

// // //               <div className="relative">
// // //                 <button 
// // //                   onClick={() => setIsSortOpen(!isSortOpen)}
// // //                   className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
// // //                   aria-label="Sort options"
// // //                 >
// // //                   <span>Sort by: {sortBy}</span>
// // //                 </button>
                
// // //                 <AnimatePresence>
// // //                   {isSortOpen && (
// // //                     <motion.div
// // //                       initial={{ opacity: 0, y: -10 }}
// // //                       animate={{ opacity: 1, y: 0 }}
// // //                       exit={{ opacity: 0, y: -10 }}
// // //                       className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
// // //                     >
// // //                       {sortOptions.map(option => (
// // //                         <button
// // //                           key={option}
// // //                           onClick={() => {
// // //                             handleSortChange(option);
// // //                             setIsSortOpen(false);
// // //                           }}
// // //                           className={`w-full px-4 py-2 text-left text-sm ${
// // //                             sortBy === option 
// // //                               ? 'bg-blue-50 text-blue-600' 
// // //                               : 'hover:bg-gray-50'
// // //                           }`}
// // //                         >
// // //                           {option}
// // //                         </button>
// // //                       ))}
// // //                     </motion.div>
// // //                   )}
// // //                 </AnimatePresence>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Active Filters Display */}
// // //         <div className="mb-6 flex flex-wrap gap-3">
// // //           {selectedCategories.filter(c => c !== 'All').map(category => (
// // //             <span 
// // //               key={category}
// // //               className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
// // //             >
// // //               {category}
// // //               <button 
// // //                 onClick={() => handleCategoryChange(category)}
// // //                 className="hover:text-blue-600"
// // //                 aria-label={`Remove ${category} filter`}
// // //               >
// // //                 <X size={14} />
// // //               </button>
// // //             </span>
// // //           ))}
          
// // //           {selectedTags.filter(t => t !== 'All').map(tag => (
// // //             <span 
// // //               key={tag}
// // //               className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2"
// // //             >
// // //               {tag}
// // //               <button 
// // //                 onClick={() => handleTagChange(tag)}
// // //                 className="hover:text-purple-600"
// // //                 aria-label={`Remove ${tag} filter`}
// // //               >
// // //                 <X size={14} />
// // //               </button>
// // //             </span>
// // //           ))}
// // //         </div>

// // //         {/* Filter Modal */}
// // //         <AnimatePresence>
// // //           {isFilterOpen && (
// // //             <motion.div
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: 1 }}
// // //               exit={{ opacity: 0 }}
// // //               className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
// // //               onClick={() => setIsFilterOpen(false)}
// // //             >
// // //               <motion.div
// // //                 initial={{ scale: 0.9, opacity: 0 }}
// // //                 animate={{ scale: 1, opacity: 1 }}
// // //                 exit={{ scale: 0.9, opacity: 0 }}
// // //                 className="bg-white p-6 rounded-lg w-full max-w-md m-4"
// // //                 onClick={(e) => e.stopPropagation()}
// // //               >
// // //                 <div className="flex justify-between items-center mb-4">
// // //                   <h2 className="text-xl font-semibold">Filters</h2>
// // //                   <button 
// // //                     onClick={() => setIsFilterOpen(false)}
// // //                     aria-label="Close filters"
// // //                   >
// // //                     <X size={24} />
// // //                   </button>
// // //                 </div>

// // //                 <div className="space-y-6">
// // //                   <div>
// // //                     <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
// // //                     <div className="flex flex-wrap gap-2">
// // //                       {categories.map((category) => (
// // //                         <button
// // //                           key={category}
// // //                           onClick={() => handleCategoryChange(category)}
// // //                           className={`px-4 py-2 rounded-md text-sm ${
// // //                             selectedCategories.includes(category) 
// // //                               ? 'bg-black text-white' 
// // //                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
// // //                           }`}
// // //                         >
// // //                           {category}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   </div>

// // //                   <div>
// // //                     <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
// // //                     <div className="flex flex-wrap gap-2">
// // //                       {tags.map((tag) => (
// // //                         <button
// // //                           key={tag}
// // //                           onClick={() => handleTagChange(tag)}
// // //                           className={`px-4 py-2 rounded-md text-sm ${
// // //                             selectedTags.includes(tag) 
// // //                               ? 'bg-black text-white' 
// // //                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
// // //                           }`}
// // //                         >
// // //                           {tag}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>

// // //         {/* Products Grid */}
// // //         {isError ? (
// // //           <motion.div 
// // //             className="text-center py-20"
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //           >
// // //             <div className="text-red-500 mb-4">⚠️</div>
// // //             <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading products</h3>
// // //             <p className="text-gray-600 mb-4">{error?.message || 'Please try again later'}</p>
// // //           </motion.div>
// // //         ) : (
// // //           <>
// // //             {data?.products?.length === 0 ? (
// // //               <motion.div 
// // //                 className="text-center py-20"
// // //                 initial={{ opacity: 0 }}
// // //                 animate={{ opacity: 1 }}
// // //               >
// // //                 <div className="text-gray-400 mb-4">🔍</div>
// // //                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
// // //                 <p className="text-gray-600 mb-4">
// // //                   Try adjusting your filters or search terms
// // //                 </p>
// // //                 <button
// // //                   onClick={resetFilters}
// // //                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
// // //                 >
// // //                   Reset Filters
// // //                 </button>
// // //               </motion.div>
// // //             ) : (
// // //               <motion.div 
// // //                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// // //                 layout
// // //               >
// // //                 {isLoading ? (
// // //                   Array(6).fill(null).map((_, index) => (
// // //                     <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-96 w-full" />
// // //                   ))
// // //                 ) : (
// // //                   data?.products?.map((product) => (
// // //                     <motion.div
// // //                       key={product._id}
// // //                       layout
// // //                       initial={{ opacity: 0, scale: 0.9 }}
// // //                       animate={{ opacity: 1, scale: 1 }}
// // //                       exit={{ opacity: 0, scale: 0.9 }}
// // //                       transition={{ duration: 0.2 }}
// // //                     >
// // //                       <ProductCard product={product} />
// // //                     </motion.div>
// // //                   ))
// // //                 )}
// // //               </motion.div>
// // //             )}

// // //             {/* Pagination */}
// // //             {data?.totalPages > 1 && (
// // //               <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
// // //                 <div className="text-gray-600 text-sm">
// // //                   Showing {(currentPage - 1) * productsPerPage + 1} -{' '}
// // //                   {Math.min(currentPage * productsPerPage, data?.total || 0)} of{' '}
// // //                   {data?.total || 0} products
// // //                 </div>
                
// // //                 <div className="flex gap-1">
// // //                   <button
// // //                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
// // //                     disabled={currentPage === 1}
// // //                     className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// // //                   >
// // //                     Previous
// // //                   </button>
                  
// // //                   {Array.from({ length: data?.totalPages || 0 }, (_, i) => {
// // //                     const page = i + 1;
// // //                     if (
// // //                       page === 1 || 
// // //                       page === data?.totalPages ||
// // //                       Math.abs(page - currentPage) <= 1
// // //                     ) {
// // //                       return (
// // //                         <button
// // //                           key={page}
// // //                           onClick={() => setCurrentPage(page)}
// // //                           className={`px-4 py-2 rounded-md ${
// // //                             currentPage === page 
// // //                               ? 'bg-blue-500 text-white' 
// // //                               : 'hover:bg-gray-100'
// // //                           }`}
// // //                         >
// // //                           {page}
// // //                         </button>
// // //                       );
// // //                     }
// // //                     return null;
// // //                   })}
                  
// // //                   <button
// // //                     onClick={() => setCurrentPage(p => Math.min(p + 1, data?.totalPages || 1))}
// // //                     disabled={currentPage === data?.totalPages}
// // //                     className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// // //                   >
// // //                     Next
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };
