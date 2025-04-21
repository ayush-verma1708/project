export interface Category {
  title: string;
  description: string;
  available: boolean;
  filters: {
    categories: string[];
    tags: string[];
    sortOptions: string[];
  };
}

export const productCategories: Category[] = [
  {
    title: 'MOBILE SKINS',
    description: 'Premium quality skins for your mobile devices',
    available: true,
    filters: {
      categories: ['iPhone', 'Samsung', 'Google Pixel', 'OnePlus'],
      tags: ['Matte', 'Glossy', 'Textured', 'Clear'],
      sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular']
    }
  },
  {
    title: 'LAPTOP SKINS',
    description: 'Protective and stylish skins for laptops',
    available: true,
    filters: {
      categories: ['MacBook', 'Windows', 'Chromebook'],
      tags: ['Matte', 'Glossy', 'Textured', 'Clear'],
      sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular']
    }
  },
  {
    title: 'TABLET SKINS',
    description: 'Custom skins for tablets and e-readers',
    available: true,
    filters: {
      categories: ['iPad', 'Samsung Tablet', 'Kindle'],
      tags: ['Matte', 'Glossy', 'Textured', 'Clear'],
      sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular']
    }
  }
]; 