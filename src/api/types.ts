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

export interface ProductType {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  productType: ProductType;
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
  instagramLink?: string;
}

export interface ProductVariant {
  color: string;
  size: string;
  additionalPrice: number;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface Feedback {
  id: string;
  emailOrPhone: string;  // Replacing 'customer' with email or phone number
  product?: string;      // Optional, can be null for general feedback
  feedbackType: 'productFeedback' | 'siteFeedback';  // Enum for feedback type
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

export interface Tag {
  _id: string;
  name: string;
}

export interface ProductType {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface SubscriptionResponse {
  message: string;
  isSubscribed?: boolean; // Add this line
  status: number;
  couponCode?: string;
}

export interface SubscriptionData {
  email: string;
  subscribe?: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  pin: string;
  phone: string;
  email: string;
}

export interface ProductItem {
  product: string; // Assuming it stores the product ID (MongoDB ObjectId)
  quantity: number;
  customData?: Record<string, any>; // For additional product details (e.g., brand, model, etc.)
}

export interface Coupon {
  _id: string;
  code: string;
  discount: number;
}

export interface Order {
  _id: string;
  user: User;
  products: ProductItem[];
  shippingInfo: ShippingInfo;
  coupon?: Coupon;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string; // For tracking feature
  createdAt: string;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

export interface CartItem {
  _id: string;
  name: string;
  images: string[];
  selectedBrand: string;
  selectedModel: string;
  description?: string;
  quantity: number;
  price: number;
}