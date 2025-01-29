export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  features: string[]; // Added to describe key features of the product
  specifications: {
    [key: string]: string; // Added to describe various specifications like Material, Finish, etc.
  };
  colors: string[]; // Added to list available color options

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