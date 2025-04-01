export interface Product {
  id: string;
  productType: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  images: string[];
  stock: number;
  rating: number;
  popularityScore: number;
  createdAt: string;
  instagramLink: string;
}

export interface CartItem extends Product {
  selectedBrand: string;  // Adding selectedBrand here for items in the cart
  selectedModel: string;  // Assuming selectedModel is another property you need
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  orders: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}