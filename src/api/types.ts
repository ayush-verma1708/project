// Common Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Product {
  _id: string;
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
}

export interface ProductVariant {
  color: string;
  size: string;
  additionalPrice: number;
}

export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface Feedback {
  id: string;
  customer: string;
  product: string;
  feedbackType: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Record<string, boolean>;
}

export interface Settings {
  currency: string;
  taxRate: number;
  supportEmail: string;
}