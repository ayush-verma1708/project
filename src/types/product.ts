export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface AutocompleteSuggestion {
  id: string;
  name: string;
  category: string;
} 