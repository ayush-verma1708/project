import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../api';
import { debounce } from 'lodash';

// Sample categories and tags
const categories = ['All', 'Embossed', 'Leather'];
const customTags = ['All', 'Mobile-Skin', 'Laptop-Skin', 'Stickers'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

export function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [selectedTags, setSelectedTags] = useState(['All']);
  const [sortBy, setSortBy] = useState('Newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch products with react-query
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
    refetchOnWindowFocus: true,
  });

  // Debounce search input for better performance
  const debouncedSetSearchQuery = useMemo(() => debounce(setSearchQuery, 300), []);

  // Optimized filtering using useMemo
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        (selectedCategories.includes('All') || selectedCategories.includes(product.category)) &&
        (selectedTags.includes('All') || product.tags?.some((tag) => selectedTags.includes(tag))) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'Price: Low to High':
            return a.price - b.price;
          case 'Price: High to Low':
            return b.price - a.price;
          case 'Most Popular':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [products, selectedCategories, selectedTags, searchQuery, sortBy]);

  // Toggle category/tag selection
  const toggleSelection = (value, state, setState) => {
    if (value === 'All') {
      setState(['All']);
    } else {
      const updatedSelection = state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state.filter((item) => item !== 'All'), value];
      setState(updatedSelection.length ? updatedSelection : ['All']);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.h1
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Our Products
          </motion.h1>

          {/* Search and Filter Buttons */}
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button onClick={() => setIsFilterOpen(true)} className="p-2 text-gray-600 hover:text-black transition">
              <SlidersHorizontal size={24} />
            </button>
          </div>
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
                {/* Filter Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                {/* Categories Filter */}
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedCategories.includes(category) ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Tags Filter */}
                <h3 className="text-sm font-medium text-gray-900 mt-4 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {customTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedTags.includes(tag) ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading products: {error.message}</p>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }} // Start position (faded and below the viewport)
                whileInView={{ opacity: 1, y: 0 }} // Animate to final state (visible and centered)
                transition={{ duration: 0.5 }}    // Animation duration
                viewport={{ once: true }}        // Trigger animation once when element comes into view
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

// import { useState, useMemo, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, SlidersHorizontal, X } from 'lucide-react';
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
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <motion.h1 className="text-3xl font-bold text-gray-900" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             Our Products
//           </motion.h1>

//           {/* Search and Filter Buttons */}
//           <div className="flex items-center space-x-4 w-full md:w-auto">
//             <div className="relative flex-grow md:flex-grow-0">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 onChange={(e) => debouncedSetSearchQuery(e.target.value)}
//                 className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//               />
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//             </div>
//             <button onClick={() => setIsFilterOpen(true)} className="p-2 text-gray-600 hover:text-black transition">
//               <SlidersHorizontal size={24} />
//             </button>
//           </div>
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
//                 {/* Filter Header */}
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold">Filters</h2>
//                   <button onClick={() => setIsFilterOpen(false)}>
//                     <X size={24} />
//                   </button>
//                 </div>

//                 {/* Categories Filter */}
//                 <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
//                       className={`px-4 py-2 rounded-md text-sm ${
//                         selectedCategories.includes(category) ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Tags Filter */}
//                 <h3 className="text-sm font-medium text-gray-900 mt-4 mb-2">Tags</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {customTags.map((tag) => (
//                     <button
//                       key={tag}
//                       onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
//                       className={`px-4 py-2 rounded-md text-sm ${
//                         selectedTags.includes(tag) ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                       }`}
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Products Grid */}
//         <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {isLoading ? (
//             <p>Loading...</p>
//           ) : isError ? (
//             <p>Error loading products: {error.message}</p>
//           ) : (
//             filteredProducts.map((product) =>
//                <ProductCard key={product._id} product={product} />)
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // import { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Search, SlidersHorizontal, X } from 'lucide-react';
// // import { useQuery } from '@tanstack/react-query';
// // import { ProductCard } from '../components/ProductCard';
// // import { productService } from '../api';

// // const categories = ['Embossed', 'Leather'];
// // const customTags = ['Mobile-Skin', 'Laptop-Skin', 'Stickers'];
// // const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

// // export function Products() {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedTag, setSelectedTag] = useState('All');
// //   const [sortBy, setSortBy] = useState('Newest');
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);

// //   const { data: products = [], isLoading, isError, error } = useQuery({
// //     queryKey: ['products'],
// //     queryFn: productService.getAll,
// //     refetchOnWindowFocus: true,
// //   });

// //   const filteredProducts = products
// //     .filter((product) =>
// //       (selectedCategory === 'All' || product.category === selectedCategory) &&
// //       (selectedTag === 'All' || product.tags?.includes(selectedTag)) &&
// //       (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         product.description.toLowerCase().includes(searchQuery.toLowerCase()))
// //     )
// //     .sort((a, b) => {
// //       switch (sortBy) {
// //         case 'Price: Low to High':
// //           return a.price - b.price;
// //         case 'Price: High to Low':
// //           return b.price - a.price;
// //         case 'Most Popular':
// //           return b.rating - a.rating;
// //         default:
// //           return 0;
// //       }
// //     });

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
// //           <motion.h1
// //             className="text-3xl font-bold text-gray-900 mb-4 md:mb-0"
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //           >
// //             Our Products
// //           </motion.h1>

// //           <div className="flex items-center space-x-4 w-full md:w-auto">
// //             <div className="relative flex-grow md:flex-grow-0">
// //               <input
// //                 type="text"
// //                 placeholder="Search products..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-transparent"
// //               />
// //               <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
// //             </div>
// //             <button
// //               onClick={() => setIsFilterOpen(true)}
// //               className="p-2 text-gray-600 hover:text-black-600 transition-colors"
// //             >
// //               <SlidersHorizontal size={24} />
// //             </button>
// //           </div>
// //         </div>

// //         <AnimatePresence>
// //           {isFilterOpen && (
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
// //               onClick={() => setIsFilterOpen(false)}
// //             >
// //               <motion.div
// //                 initial={{ scale: 0.9, opacity: 0 }}
// //                 animate={{ scale: 1, opacity: 1 }}
// //                 exit={{ scale: 0.9, opacity: 0 }}
// //                 className="bg-white p-6 rounded-lg w-full max-w-md m-4"
// //                 onClick={(e) => e.stopPropagation()}
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h2 className="text-xl font-semibold">Filters</h2>
// //                   <button onClick={() => setIsFilterOpen(false)}>
// //                     <X size={24} />
// //                   </button>
// //                 </div>

// //                 <div className="space-y-6">
// //                   <div>
// //                     <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
// //                     <div className="grid grid-cols-2 gap-2">
// //                       {categories.map((category) => (
// //                         <button
// //                           key={category}
// //                           onClick={() => setSelectedCategory(category)}
// //                           className={`px-4 py-2 rounded-md text-sm ${
// //                             selectedCategory === category
// //                               ? 'bg-black-600 text-white'
// //                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
// //                           }`}
// //                         >
// //                           {category}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
// //                     <div className="grid grid-cols-2 gap-2">
// //                       {customTags.map((tag) => (
// //                         <button
// //                           key={tag}
// //                           onClick={() => setSelectedTag(tag)}
// //                           className={`px-4 py-2 rounded-md text-sm ${
// //                             selectedTag === tag
// //                               ? 'bg-black-600 text-white'
// //                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
// //                           }`}
// //                         >
// //                           {tag}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
// //                     <div className="space-y-2">
// //                       {sortOptions.map((option) => (
// //                         <button
// //                           key={option}
// //                           onClick={() => setSortBy(option)}
// //                           className={`w-full px-4 py-2 rounded-md text-sm text-left ${
// //                             sortBy === option
// //                               ? 'bg-black-600 text-white'
// //                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
// //                           }`}
// //                         >
// //                           {option}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>

// //         <motion.div
// //           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ staggerChildren: 0.1 }}
// //         >
// //           {isLoading ? (
// //             <p>Loading products...</p>
// //           ) : isError ? (
// //             <p>Error loading products: {error.message}</p>
// //           ) : (
// //             filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
// //           )}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// // // import  { useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Search, SlidersHorizontal, X } from 'lucide-react';
// // // import { ProductCard } from '../components/ProductCard';

// // // import { productService } from '../api';
// // // import type { Product } from '../api/types';

// // // // Sample product data

// // // const categories = ['Embossed', 'Leather'];
// // // const Custom_tags = ['Mobile-Skin','Laptop-Skin','Stickers'];

// // // const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

// // // export function Products() {
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [selectedCategory, setSelectedCategory] = useState('All');
// // //   const [sortBy, setSortBy] = useState('Newest');
// // //   const [isFilterOpen, setIsFilterOpen] = useState(false);


// // //   const { data: products, isLoading, isError, error } = useQuery({
// // //     queryKey: ['products'],
// // //     queryFn: productService.getAll,
// // //     refetchOnWindowFocus: true,
// // //   });
  
  
// // //   const filteredProducts = products
// // //     .filter(product => 
// // //       (selectedCategory === 'All' || product.category === selectedCategory) &&
// // //       (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
// // //     )
// // //     .sort((a, b) => {
// // //       switch (sortBy) {
// // //         case 'Price: Low to High':
// // //           return a.price - b.price;
// // //         case 'Price: High to Low':
// // //           return b.price - a.price;
// // //         case 'Most Popular':
// // //           return b.rating - a.rating;
// // //         default:
// // //           return 0;
// // //       }
// // //     });

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-12">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         {/* Header */}
// // //         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
// // //           <motion.h1 
// // //             className="text-3xl font-bold text-gray-900 mb-4 md:mb-0"
// // //             initial={{ opacity: 0, y: -20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //           >
// // //             Our Products
// // //           </motion.h1>
          
// // //           {/* Search and Filter */}
// // //           <div className="flex items-center space-x-4 w-full md:w-auto">
// // //             <div className="relative flex-grow md:flex-grow-0">
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search products..."
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-transparent"
// // //               />
// // //               <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
// // //             </div>
// // //             <button
// // //               onClick={() => setIsFilterOpen(true)}
// // //               className="p-2 text-gray-600 hover:text-black-600 transition-colors"
// // //             >
// // //               <SlidersHorizontal size={24} />
// // //             </button>
// // //           </div>
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
// // //                 onClick={e => e.stopPropagation()}
// // //               >
// // //                 <div className="flex justify-between items-center mb-4">
// // //                   <h2 className="text-xl font-semibold">Filters</h2>
// // //                   <button onClick={() => setIsFilterOpen(false)}>
// // //                     <X size={24} />
// // //                   </button>
// // //                 </div>
                
// // //                 <div className="space-y-6">
// // //                   <div>
// // //                     <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
// // //                     <div className="grid grid-cols-2 gap-2">
// // //                       {categories.map(category => (
// // //                         <button
// // //                           key={category}
// // //                           onClick={() => setSelectedCategory(category)}
// // //                           className={`px-4 py-2 rounded-md text-sm ${
// // //                             selectedCategory === category
// // //                               ? 'bg-black-600 text-white'
// // //                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
// // //                           }`}
// // //                         >
// // //                           {category}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   </div>
                  
// // //                   <div>
// // //                     <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
// // //                     <div className="space-y-2">
// // //                       {sortOptions.map(option => (
// // //                         <button
// // //                           key={option}
// // //                           onClick={() => setSortBy(option)}
// // //                           className={`w-full px-4 py-2 rounded-md text-sm text-left ${
// // //                             sortBy === option
// // //                               ? 'bg-black-600 text-white'
// // //                               : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
// // //                           }`}
// // //                         >
// // //                           {option}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>

// // //         {/* Product Grid */}
// // //         <motion.div 
// // //           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ staggerChildren: 0.1 }}
// // //         >
// // //           {filteredProducts.map((product) => (
// // //             <ProductCard key={product.id} product={product} />
// // //           ))}
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // }