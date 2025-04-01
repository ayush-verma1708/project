// probably not being used
// import { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';
// import { useQuery } from '@tanstack/react-query';
// import { ProductCard } from '../components/ProductCard';
// import { productService } from '../api';
// import { debounce } from 'lodash';

// // Sample categories and tags
// const categories = ['All', 'Embossed', 'Leather'];
// const customTags = ['All', 'Mobile-Skin', 'Laptop-Skin', 'Stickers'];
// const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

// export function Products() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState(['All']);
//   const [selectedTags, setSelectedTags] = useState(['All']);
//   const [sortBy, setSortBy] = useState('Newest');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9;
//   const [isSortOpen, setIsSortOpen] = useState(false);


//    // Add loading skeletons for better perceived performance
//    const LoadingSkeleton = () => (
//     <div className="animate-pulse bg-gray-200 rounded-lg h-96 w-full" />
//   );

//   // Fetch products with react-query
//   const { data: products = [], isLoading, isError, error } = useQuery({
//     queryKey: ['products'],
//     queryFn: productService.getAll,
//     refetchOnWindowFocus: true,
//   });

//   // Debounce search input for better performance
//   const debouncedSetSearchQuery = useMemo(() => debounce(setSearchQuery, 300), []);

//   // Optimized filtering using useMemo
//   const filteredProducts = useMemo(() => {
//     return products
//       .filter((product) =>
//         (selectedCategories.includes('All') || selectedCategories.includes(product.category)) &&
//         (selectedTags.includes('All') || product.tags?.some((tag) => selectedTags.includes(tag))) &&
//         (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.description.toLowerCase().includes(searchQuery.toLowerCase()))
//       )
//       .sort((a, b) => {
//         switch (sortBy) {
//           case 'Price: Low to High':
//             return a.price - b.price;
//           case 'Price: High to Low':
//             return b.price - a.price;
//           case 'Most Popular':
//             return b.rating - a.rating;
//           default:
//             return 0;
//         }
//       });
//   }, [products, selectedCategories, selectedTags, searchQuery, sortBy]);

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Toggle category/tag selection
//   const toggleSelection = (value, state, setState) => {
//     if (value === 'All') {
//       setState(['All']);
//     } else {
//       const updatedSelection = state.includes(value)
//         ? state.filter((item) => item !== value)
//         : [...state.filter((item) => item !== 'All'), value];
//       setState(updatedSelection.length ? updatedSelection : ['All']);
//     }
//   };

//   return (
//     <>
    
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Enhanced Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
//           <div>
//             <motion.h1
//               className="text-3xl font-bold text-gray-900 mb-2"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               Explore Our Collection
//             </motion.h1>
//             <p className="text-gray-600">Discover premium skins and accessories for your devices</p>
//           </div>

//           {/* Search and Controls */}
//           <div className="flex flex-col w-full md:w-auto gap-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products by name or description..."
//                 onChange={(e) => debouncedSetSearchQuery(e.target.value)}
//                 className="w-full md:w-96 pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
//               />
//               <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={() => setIsFilterOpen(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 <Filter size={18} />
//                 <span>Filters</span>
//                 {(selectedCategories.length > 1 || selectedTags.length > 1) && (
//                   <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
//                     {selectedCategories.length + selectedTags.length - 2}
//                   </span>
//                 )}
//               </button>

//               <div className="relative">
//                 <button 
//                   onClick={() => setIsSortOpen(!isSortOpen)}
//                   className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//                 >
//                   <span>Sort by: {sortBy}</span>
//                 </button>
                
//                 <AnimatePresence>
//                   {isSortOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
//                     >
//                       {sortOptions.map(option => (
//                         <button
//                           key={option}
//                           onClick={() => {
//                             setSortBy(option);
//                             setIsSortOpen(false);
//                           }}
//                           className={`w-full px-4 py-2 text-left text-sm ${
//                             sortBy === option 
//                               ? 'bg-blue-50 text-blue-600' 
//                               : 'hover:bg-gray-50'
//                           }`}
//                         >
//                           {option}
//                         </button>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         <div className="mb-6 flex flex-wrap gap-3">
//           {selectedCategories.filter(c => c !== 'All').map(category => (
//             <span 
//               key={category}
//               className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
//             >
//               {category}
//               <button 
//                 onClick={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
//                 className="hover:text-blue-600"
//               >
//                 <X size={14} />
//               </button>
//             </span>
//           ))}
          
//           {selectedTags.filter(t => t !== 'All').map(tag => (
//             <span 
//               key={tag}
//               className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2"
//             >
//               {tag}
//               <button 
//                 onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
//                 className="hover:text-purple-600"
//               >
//                 <X size={14} />
//               </button>
//             </span>
//           ))}
//         </div>

//         {/* Filter Modal */}
//         <AnimatePresence>
//           {isFilterOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
//               onClick={() => setIsFilterOpen(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white p-6 rounded-lg w-full max-w-md m-4"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold">Filters</h2>
//                   <button onClick={() => setIsFilterOpen(false)}>
//                     <X size={24} />
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map((category) => (
//                         <button
//                           key={category}
//                           onClick={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
//                           className={`px-4 py-2 rounded-md text-sm ${
//                             selectedCategories.includes(category) 
//                               ? 'bg-black text-white' 
//                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//                           }`}
//                         >
//                           {category}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {customTags.map((tag) => (
//                         <button
//                           key={tag}
//                           onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
//                           className={`px-4 py-2 rounded-md text-sm ${
//                             selectedTags.includes(tag) 
//                               ? 'bg-black text-white' 
//                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//                           }`}
//                         >
//                           {tag}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Products Grid with Empty State */}
//         {!isLoading && filteredProducts.length === 0 ? (
//           <motion.div 
//             className="text-center py-20"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div className="text-gray-400 mb-4">🔍</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
//             <p className="text-gray-600 mb-4">
//               Try adjusting your filters or search terms
//             </p>
//             <button
//               onClick={() => {
//                 setSelectedCategories(['All']);
//                 setSelectedTags(['All']);
//                 setSearchQuery('');
//               }}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Reset Filters
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div 
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//             layout
//           >
//             {isLoading ? (
//               Array(6).fill().map((_, i) => (
//                 <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-96 w-full" />
//               ))
//             ) : (
//               currentProducts.map((product) => (
//                 <motion.div
//                   key={product._id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))
//             )}
//           </motion.div>
//         )}

//         {/* Enhanced Pagination */}
//         {filteredProducts.length > productsPerPage && (
//           <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="text-gray-600 text-sm">
//               Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
//             </div>
            
//             <div className="flex gap-1">
//               <button
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
              
//               {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => {
//                 const page = i + 1;
//                 if (
//                   page === 1 || 
//                   page === Math.ceil(filteredProducts.length / productsPerPage) ||
//                   Math.abs(page - currentPage) <= 1
//                 ) {
//                   return (
//                     <button
//                       key={page}
//                       onClick={() => paginate(page)}
//                       className={`px-4 py-2 rounded-md ${
//                         currentPage === page 
//                           ? 'bg-blue-500 text-white' 
//                           : 'hover:bg-gray-100'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   );
//                 }
//                 return null;
//               })}
              
//               <button
//                 onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filteredProducts.length / productsPerPage)))}
//                 disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
//                 className="px-3 py-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     </>
//   );
// }
