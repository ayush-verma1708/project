import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Carbon Fiber iPhone 15 Pro Skin',
    price: 29.99,
    rating: 4.8,
    reviews: 128,
    description: 'Premium carbon fiber textured skin providing ultimate protection and style for your iPhone 15 Pro. Precision-cut for a perfect fit.',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581993192008-63e896f4f744?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587856635640-3912f17d5fcd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581993192008-63e896f4f744?auto=format&fit=crop&q=80'
    ],
    features: [
      'Precision-cut design',
      'Bubble-free application',
      'Ultra-thin profile',
      'Scratch protection',
      'Textured grip'
    ],
    specifications: {
      Material: 'Premium 3M vinyl',
      Thickness: '0.2mm',
      Finish: 'Matte',
      Installation: 'Wet or dry application',
      Warranty: '30-day guarantee'
    },
    colors: ['Carbon Black', 'Matte White', 'Navy Blue', 'Red'],
    category: 'Leather'
  },
  {
    id: '2',
    name: 'Marble Samsung Skin',
    price: 24.99,
    rating: 4.8,
    reviews: 95,
    description: 'Elegant marble design skin for Samsung phones, providing both style and protection.',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581993192008-63e896f4f744?auto=format&fit=crop&q=80'
    ],
    features: [
      'Premium marble finish',
      'Non-slip texture',
      'Easy installation',
      'Perfect fit for Samsung models'
    ],
    specifications: {
      Material: 'High-quality vinyl',
      Thickness: '0.3mm',
      Finish: 'Glossy',
      Installation: 'Dry application',
      Warranty: '30-day guarantee'
    },
    colors: ['White Marble', 'Black Marble', 'Grey Marble'],
    category: 'Embossed'
  },
  {
    id: '3',
    name: 'Wood Grain Pixel Skin',
    price: 27.99,
    rating: 4.3,
    reviews: 67,
    description: 'Natural wood grain texture for Google Pixel, offering a unique and organic look while protecting your device.',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581993192008-63e896f4f744?auto=format&fit=crop&q=80'
    ],
    features: [
      'Natural wood grain finish',
      'Scratch-resistant surface',
      'Eco-friendly material',
      'Perfect cutouts for Google Pixel'
    ],
    specifications: {
      Material: 'Real wood veneer',
      Thickness: '0.5mm',
      Finish: 'Satin matte',
      Installation: 'Dry application',
      Warranty: '30-day guarantee'
    },
    colors: ['Light Oak', 'Dark Walnut', 'Cherry'],
    category: 'Art'
  },
  // Add more products as needed
];
