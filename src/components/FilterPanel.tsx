import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import PriceRangeSelector from './PriceRangeSlider';

export interface FilterPanelProps {
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
  tags: string[];
  selectedTags: string[];
  handleTagChange: (tag: string) => void;
  priceRange: { min: number, max: number };
  currentPriceRange: { min: number, max: number };
  handlePriceChange: (min: number, max: number) => void;
  ratings?: number[];
  selectedRating?: number | null;
  handleRatingChange?: (rating: number | null) => void;
  popularityOptions?: { value: string, label: string }[];
  popularityFilter?: string;
  handlePopularityChange?: (option: any) => void;
  resetFilters: () => void;
  activeFiltersCount?: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategories,
  handleCategoryChange,
  tags,
  selectedTags,
  handleTagChange,
  priceRange,
  currentPriceRange,
  handlePriceChange,
  ratings,
  selectedRating,
  handleRatingChange,
  popularityOptions,
  popularityFilter,
  handlePopularityChange,
  resetFilters,
  activeFiltersCount = 0
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    popularity: false,
    ratings: false,
    tags: true
  });
  
  // For mobile filter panel
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    children,
    badge,
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode;
    badge?: number;
  }) => (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left font-medium"
      >
        <div className="flex items-center">
          <span>{title}</span>
          {badge ? (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          ) : null}
        </div>
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

  // Count active filters for each section
  const categoriesCount = selectedCategories.includes('All') ? 0 : selectedCategories.length;
  const tagsCount = selectedTags.includes('All') ? 0 : selectedTags.length;
  const priceCount = 
    (currentPriceRange.min !== priceRange.min || currentPriceRange.max !== priceRange.max) ? 1 : 0;
  const ratingsCount = selectedRating ? 1 : 0;
  const popularityCount = popularityFilter !== 'all' ? 1 : 0;

  // Desktop filter panel
  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      <FilterSection 
        title="Categories" 
        section="categories"
        badge={categoriesCount}
      >
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* <FilterSection 
        title="Price Range" 
        section="price"
        badge={priceCount}
      >
        <PriceRangeSelector
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
          currentMin={currentPriceRange.min}
          currentMax={currentPriceRange.max}
          onChange={handlePriceChange}
        />
      </FilterSection> */}

      <FilterSection 
        title="Tags" 
        section="tags"
        badge={tagsCount}
      >
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-all ${
                selectedTags.includes(tag) 
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium' 
                  : 'border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* {ratings && handleRatingChange && (
        <FilterSection 
          title="Rating" 
          section="ratings"
          badge={ratingsCount}
        >
          <div className="space-y-2">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center w-full px-2 py-1.5 rounded ${
                  selectedRating === rating 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm">{rating}+ stars</span>
                </div>
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {popularityOptions && handlePopularityChange && (
        <FilterSection 
          title="Popularity" 
          section="popularity"
          badge={popularityCount}
        >
          <div className="space-y-2">
            {popularityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handlePopularityChange(option.value)}
                className={`w-full px-2 py-1.5 text-left rounded ${
                  popularityFilter === option.value 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </FilterSection>
      )} */}
    </>
  );

  // Mobile filter toggle button (always visible on mobile)
  const mobileFilterButton = (
    <div className="md:hidden fixed bottom-20 right-4 z-40">
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg"
      >
        <SlidersHorizontal size={20} />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop filter panel */}
      <div className="hidden md:block bg-white rounded-lg shadow p-4">
        {filterContent}
      </div>

      {/* Mobile filter toggle button */}
      {mobileFilterButton}

      {/* Mobile filter panel (slide-in from right) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 md:hidden w-full max-w-xs bg-white shadow-xl overflow-y-auto"
            >
              <div className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filterContent}
                </div>

                <div className="pt-4 mt-auto border-t">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        resetFilters();
                        setIsMobileFilterOpen(false);
                      }}
                      className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-md font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
