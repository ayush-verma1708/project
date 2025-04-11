export const productCategories = {
  'mobile-skins': {
    title: 'Mobile Phone Skins',
    description: 'Premium protective skins for your smartphone',
    available: true, // Products are available
    filters: {
      categories: ['All', 'Luxury', 'Embossed', 'Leather'],
      tags: ['All', 'premium', 'trendy', 'best seller'],
      sortOptions: ['Newest', 'Price: Low to High', 'Most Popular']
    }
  },
  'laptop-skins': {
    title: 'Laptop Skins',
    description: 'Durable skins for laptops and notebooks',
    available: true, // Products are available
    filters: {
      categories: ['All', 'Textured', 'Transparent', 'Metallic'],
      tags: ['All', '15-inch', '17-inch', 'MacBook', 'Windows'],
      sortOptions: ['Price: Low to High', 'Most Popular', 'Best Rating']
    }
  },
  stickers: {
    title: 'Decorative Stickers',
    description: 'Express yourself with our unique sticker collection',
    available: true, // Products are available
    filters: {
      categories: ['All', 'Cartoon', 'Minimalist', 'Custom'],
      tags: ['All', 'Small', 'Medium', 'Large'],
      sortOptions: ['Newest', 'Price: High to Low', 'Best Selling']
    }
  },
  'new-arrivals': {
    title: 'New Arrivals',
    description: 'Coming soon - Exciting new products launching shortly!',
    available: false, // Products not yet available
    comingSoon: true, // Additional flag for coming soon status
    expectedDate: '2023-12-01', // Optional: Expected availability date
    filters: {
      categories: ['All', 'Cartoon', 'Minimalist', 'Custom'],
      tags: ['All', 'Small', 'Medium', 'Large'],
      sortOptions: ['Newest', 'Price: High to Low', 'Best Selling']
    }
  }
};