import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Category {
  name: string;
  path: string;
  subcategories?: {
    name: string;
    path: string;
  }[];
}

const categories: Category[] = [
  {
    name: 'MOBILE SKINS',
    path: '/category/mobile-skins',
    subcategories: [
      { name: 'IPHONE', path: '/category/mobile-skins/iphone' },
      { name: 'SAMSUNG', path: '/category/mobile-skins/samsung' },
      { name: 'ONEPLUS', path: '/category/mobile-skins/oneplus' },
    ]
  },
  {
    name: 'LAPTOP SKINS',
    path: '/category/laptop-skins',
    subcategories: [
      { name: 'MACBOOK', path: '/category/laptop-skins/macbook' },
      { name: 'DELL', path: '/category/laptop-skins/dell' },
      { name: 'HP', path: '/category/laptop-skins/hp' },
    ]
  },
  {
    name: 'CONSOLE SKINS',
    path: '/category/console-skins',
    subcategories: [
      { name: 'PS5', path: '/category/console-skins/ps5' },
      { name: 'XBOX', path: '/category/console-skins/xbox' },
      { name: 'NINTENDO', path: '/category/console-skins/nintendo' },
    ]
  },
  {
    name: 'ACCESSORIES',
    path: '/category/accessories',
    subcategories: [
      { name: 'AIRPODS', path: '/category/accessories/airpods' },
      { name: 'APPLE WATCH', path: '/category/accessories/apple-watch' },
      { name: 'OTHERS', path: '/category/accessories/others' },
    ]
  }
];

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="hidden md:block fixed top-20 left-0 right-0 z-30 bg-white border-b border-black/10">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8">
            {categories.map((category) => (
              <div
                key={category.path}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={category.path}
                  className="text-xs tracking-[0.1em] text-black/60 hover:text-black transition-colors flex items-center gap-1"
                >
                  {category.name}
                  {category.subcategories && (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </Link>
                
                {category.subcategories && activeCategory === category.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-black/5 min-w-[160px]"
                  >
                    <div className="py-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2 text-xs tracking-[0.1em] text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 