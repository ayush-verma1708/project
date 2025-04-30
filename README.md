# Mobiiwrap E-commerce Platform

A full-stack e-commerce platform with three main components:
1. Customer-facing website (Mobiiwrap-Base-onlyclient)
2. Admin dashboard (Mobiiwrap-Admin)
3. Backend server (Mobiiwrap-Admin/server)

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Development Environment Setup](#development-environment-setup)
- [Testing Strategy](#testing-strategy)
- [Security Guidelines](#security-guidelines)
- [Performance Optimization](#performance-optimization)
- [Documentation Standards](#documentation-standards)
- [Release Management](#release-management)
- [Maintenance Procedures](#maintenance-procedures)
- [Troubleshooting Guide](#troubleshooting-guide)
- [API Reference](#api-reference)
- [Database Management](#database-management)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
- [State Management](#state-management)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [Payment Integration](#payment-integration)
- [Deployment](#deployment)
- [Development Guidelines](#development-guidelines)
- [Unused/Deprecated Files](#unuseddeprecated-files)
- [Contributing](#contributing)
- [License](#license)
- [Software Architecture](#software-architecture)
- [Development Workflows](#development-workflows)
- [System Integration](#system-integration)
- [Error Handling](#error-handling)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Deployment Scenarios](#deployment-scenarios)
- [Business Logic and Workflows](#business-logic-and-workflows)
- [Advanced Features](#advanced-features)
- [Real-World Scenarios](#real-world-scenarios)

## Project Overview

Mobiiwrap is a comprehensive e-commerce platform with three main components:

### 1. Customer Website (Mobiiwrap-Base-onlyclient)
- Frontend for customers to browse and purchase products
- Features product listing, cart management, and checkout
- Built with React, TypeScript, and Vite
- Responsive design for all devices
- Progressive Web App (PWA) support
- SEO optimized

### 2. Admin Dashboard (Mobiiwrap-Admin/client)
- Management interface for administrators
- Features product management, order tracking, and analytics
- Built with React and TypeScript
- Role-based access control
- Real-time updates
- Advanced analytics dashboard

### 3. Backend Server (Mobiiwrap-Admin/server)
- RESTful API serving both customer and admin interfaces
- Built with Node.js, Express, and MongoDB
- Handles authentication, payment processing, and data management
- WebSocket support for real-time features
- Caching layer for improved performance
- Rate limiting and security measures

## Project Structure

### Customer Website (Mobiiwrap-Base-onlyclient)
```
src/
├── api/                 # API services and configurations
│   ├── services/       # API service implementations
│   │   ├── auth.ts     # Authentication services
│   │   ├── products.ts # Product services
│   │   ├── cart.ts     # Cart services
│   │   ├── orders.ts   # Order services
│   │   └── users.ts    # User services
│   ├── types.ts        # API type definitions
│   └── index.ts        # API client configuration
├── assets/             # Static assets
│   ├── images/         # Image assets
│   ├── fonts/          # Font files
│   └── icons/          # Icon assets
├── components/         # Reusable UI components
│   ├── Product/        # Product-related components
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductList.tsx
│   │   └── FilterPanel.tsx
│   ├── Cart/          # Cart-related components
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   ├── MiniCart.tsx
│   │   └── CartPage.tsx
│   ├── Checkout/      # Checkout-related components
│   │   ├── CheckoutForm.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── OrderSummary.tsx
│   │   └── OrderConfirmation.tsx
│   ├── Navigation/    # Navigation components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Breadcrumbs.tsx
│   └── ui/            # Generic UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── Alert.tsx
├── context/           # React Context providers
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── FilterContext.tsx
├── css/               # Global styles
│   ├── tailwind.css
│   └── custom.css
├── hooks/             # Custom React hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useOrders.ts
├── layout/            # Layout components
│   ├── MainLayout.tsx
│   └── AuthLayout.tsx
├── pages/             # Page components
│   ├── Main/          # Main pages
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   └── Orders.tsx
│   └── Auth/          # Authentication pages
│       ├── Login.tsx
│       ├── Register.tsx
│       └── ForgotPassword.tsx
├── types/             # TypeScript type definitions
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── user.ts
├── utils/             # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── helpers.ts
└── constants/         # Application constants
    ├── routes.ts
    ├── config.ts
    └── messages.ts
```

### Admin Dashboard (Mobiiwrap-Admin/client)
```
src/
├── components/         # Reusable UI components
│   ├── Dashboard/     # Dashboard components
│   │   ├── Stats.tsx
│   │   ├── Charts.tsx
│   │   └── RecentOrders.tsx
│   ├── Products/      # Product management
│   │   ├── ProductList.tsx
│   │   ├── ProductForm.tsx
│   │   └── ProductFilters.tsx
│   ├── Orders/        # Order management
│   │   ├── OrderList.tsx
│   │   ├── OrderDetails.tsx
│   │   └── OrderStatus.tsx
│   ├── Users/         # User management
│   │   ├── UserList.tsx
│   │   ├── UserForm.tsx
│   │   └── UserRoles.tsx
│   └── Analytics/     # Analytics components
│       ├── SalesChart.tsx
│       ├── RevenueChart.tsx
│       └── CustomerChart.tsx
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── Orders.tsx
│   ├── Users.tsx
│   └── Settings.tsx
├── services/          # API services
│   ├── auth.ts
│   ├── products.ts
│   ├── orders.ts
│   └── users.ts
├── hooks/             # Custom React hooks
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useOrders.ts
│   └── useUsers.ts
├── context/           # React Context providers
│   ├── AuthContext.tsx
│   └── AdminContext.tsx
└── utils/             # Utility functions
    ├── formatters.ts
    ├── validators.ts
    └── helpers.ts
```

### Backend Server (Mobiiwrap-Admin/server)
```
src/
├── config/            # Configuration files
│   ├── database.ts
│   ├── jwt.ts
│   ├── razorpay.ts
│   └── cloudinary.ts
├── controllers/       # Route controllers
│   ├── auth.ts
│   ├── products.ts
│   ├── orders.ts
│   ├── users.ts
│   └── admin.ts
├── middleware/        # Custom middleware
│   ├── auth.ts
│   ├── admin.ts
│   ├── rateLimit.ts
│   ├── error.ts
│   └── validation.ts
├── models/           # Database models
│   ├── User.ts
│   ├── Product.ts
│   ├── Order.ts
│   ├── Cart.ts
│   └── Coupon.ts
├── routes/           # API routes
│   ├── auth.ts
│   ├── products.ts
│   ├── orders.ts
│   ├── users.ts
│   └── admin.ts
├── services/         # Business logic
│   ├── auth.ts
│   ├── products.ts
│   ├── orders.ts
│   ├── users.ts
│   └── payment.ts
├── utils/            # Utility functions
│   ├── validators.ts
│   ├── formatters.ts
│   ├── helpers.ts
│   └── logger.ts
└── validators/       # Request validators
    ├── auth.ts
    ├── products.ts
    ├── orders.ts
    └── users.ts
```

## Tech Stack

### Frontend (Customer & Admin)
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Data Fetching**: React Query
- **UI Components**: Custom components with Tailwind CSS
- **Charts**: Chart.js
- **Maps**: Google Maps API
- **Notifications**: React-Toastify
- **Date Handling**: date-fns
- **Internationalization**: i18next
- **Testing**: Jest, React Testing Library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT
- **Payment Processing**: Razorpay
- **File Storage**: Cloudinary
- **Email Service**: Nodemailer
- **Validation**: Joi
- **Testing**: Jest
- **Logging**: Winston
- **Caching**: Redis
- **Real-time**: Socket.io
- **Documentation**: Swagger
- **Monitoring**: New Relic

## Environment Setup

### Prerequisites
```bash
# Required Software
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Redis (v6 or higher)
- Git
- Docker (optional)
- VS Code (recommended IDE)
```

### IDE Configuration
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5"
}
```

### Environment Setup
```bash
# Clone repositories
git clone https://github.com/your-org/mobiiwrap-base.git
git clone https://github.com/your-org/mobiiwrap-admin.git

# Install dependencies
cd mobiiwrap-base
npm install

cd ../mobiiwrap-admin/client
npm install

cd ../server
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Common Development Issues
1. **Port Conflicts**
   ```bash
   # Check running processes
   lsof -i :3000
   
   # Kill process
   kill -9 <PID>
   ```

2. **Database Connection Issues**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongodb
   
   # Check MongoDB logs
   tail -f /var/log/mongodb/mongod.log
   ```

3. **Dependency Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules
   rm -rf node_modules
   
   # Reinstall dependencies
   npm install
   ```

## Features

### Customer Website
- **Product Management**
  - Advanced product search with filters
  - Product categories and tags
  - Product variants (brands and models)
  - Product reviews and ratings
  - Product recommendations
  - Wishlist functionality
  - Recently viewed products

- **Shopping Experience**
  - Real-time inventory updates
  - Price alerts
  - Bulk ordering
  - Gift wrapping options
  - Product customization
  - Size guides
  - Color swatches

- **Cart & Checkout**
  - Persistent cart across devices
  - Multiple shipping addresses
  - Multiple payment methods
  - Coupon code support
  - Gift card support
  - Order tracking
  - Return management

- **User Features**
  - Social login (Google, Facebook)
  - Two-factor authentication
  - Profile management
  - Order history
  - Address book
  - Saved payment methods
  - Subscription management

- **Mobile Features**
  - PWA support
  - Push notifications
  - Offline mode
  - Camera integration
  - Location services
  - Touch gestures

### Admin Dashboard
- **Product Management**
  - Bulk product import/export
  - Product variants management
  - Inventory tracking
  - Price management
  - Product categorization
  - SEO management
  - Product analytics

- **Order Management**
  - Order processing
  - Order fulfillment
  - Return management
  - Refund processing
  - Order analytics
  - Customer communication
  - Shipping management

- **User Management**
  - User roles and permissions
  - Customer segmentation
  - User activity tracking
  - Customer support
  - User analytics
  - Communication management
  - Security management

- **Analytics & Reporting**
  - Sales analytics
  - Customer analytics
  - Product performance
  - Marketing analytics
  - Financial reports
  - Custom reports
  - Export capabilities

- **Marketing Tools**
  - Email campaigns
  - Discount management
  - Promotional tools
  - Social media integration
  - SEO tools
  - Content management
  - A/B testing

### Backend Services
- **API Features**
  - RESTful API
  - GraphQL support
  - WebSocket support
  - API versioning
  - Rate limiting
  - Caching
  - Request validation

- **Security**
  - JWT authentication
  - Role-based access control
  - Data encryption
  - CSRF protection
  - XSS protection
  - SQL injection prevention
  - Security headers

- **Performance**
  - Response compression
  - Query optimization
  - Caching strategies
  - Load balancing
  - CDN integration
  - Image optimization
  - Database indexing

- **Integration**
  - Payment gateways
  - Shipping providers
  - Email services
  - SMS services
  - Analytics services
  - Social media
  - Third-party APIs

## API Documentation

### Authentication
- `POST /auth/register` - User registration
  - Request body: { name, email, password }
  - Response: { user, token }
- `POST /auth/login` - User login
  - Request body: { email, password }
  - Response: { user, token }
- `POST /auth/admin/login` - Admin login
  - Request body: { email, password }
  - Response: { user, token }
- `GET /auth/verify` - Verify token
  - Headers: Authorization: Bearer {token}
  - Response: { user }
- `POST /auth/forgot-password` - Request password reset
  - Request body: { email }
  - Response: { message }
- `POST /auth/reset-password` - Reset password
  - Request body: { token, password }
  - Response: { message }

### Products
- `GET /products` - Get all products
  - Query params: page, limit, sort, filter
  - Response: { products, total, page, limit }
- `GET /products/:id` - Get product details
  - Response: { product }
- `POST /products` - Create product (admin)
  - Request body: Product data
  - Response: { product }
- `PUT /products/:id` - Update product (admin)
  - Request body: Product data
  - Response: { product }
- `DELETE /products/:id` - Delete product (admin)
  - Response: { message }

### Orders
- `POST /orders` - Create order
  - Request body: Order data
  - Response: { order }
- `GET /orders` - Get user orders
  - Query params: page, limit, status
  - Response: { orders, total, page, limit }
- `GET /orders/:id` - Get order details
  - Response: { order }
- `PUT /orders/:id` - Update order status (admin)
  - Request body: { status }
  - Response: { order }

### Users
- `GET /users` - Get all users (admin)
  - Query params: page, limit, role
  - Response: { users, total, page, limit }
- `GET /users/:id` - Get user details
  - Response: { user }
- `PUT /users/:id` - Update user
  - Request body: User data
  - Response: { user }
- `DELETE /users/:id` - Delete user (admin)
  - Response: { message }

## Database Schema

### User
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  addresses: Address[];
  phone?: string;
  avatar?: string;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
  socialAccounts?: {
    google?: string;
    facebook?: string;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Address {
  _id: string;
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}
```

### Product
```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand?: string;
  model?: string;
  quantity: number;
  tags: string[];
  rating: number;
  reviews: Review[];
  popularityScore: number;
  attributes: {
    [key: string]: string | number;
  };
  variants?: ProductVariant[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  status: 'active' | 'inactive' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

interface Review {
  _id: string;
  user: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

interface ProductVariant {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  attributes: {
    [key: string]: string;
  };
}
```

### Order
```typescript
interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes?: string;
  history: OrderHistory[];
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  _id: string;
  product: string;
  variant?: string;
  quantity: number;
  price: number;
  total: number;
}

interface OrderHistory {
  status: string;
  date: Date;
  notes?: string;
  user?: string;
}
```

## Authentication & Authorization

### JWT Implementation
- Access tokens (15 minutes expiry)
- Refresh tokens (7 days expiry)
- Token rotation on refresh
- Role-based access control
- Token blacklisting
- Secure cookie storage
- CSRF protection

### Middleware
- `authMiddleware` - Verifies JWT tokens
  - Checks token validity
  - Handles token refresh
  - Manages user session
- `adminMiddleware` - Checks admin privileges
  - Verifies admin role
  - Checks permissions
  - Logs admin actions
- `rateLimitMiddleware` - Prevents abuse
  - IP-based rate limiting
  - User-based rate limiting
  - Custom rate limits
- `errorMiddleware` - Handles errors
  - Logs errors
  - Formats error responses
  - Handles different error types

## Payment Integration

### Razorpay Integration
- Order creation
- Payment verification
- Webhook handling
- Refund processing
- Subscription management
- Payment analytics
- Fraud detection

### Additional Payment Methods
- Credit/Debit Cards
- Net Banking
- UPI
- Wallets
- EMI
- Cash on Delivery

## Deployment

### Customer Website
```bash
# Build
npm run build

# Deploy to Vercel
vercel

# Environment Setup
vercel env add VITE_API_URL
vercel env add VITE_RAZORPAY_KEY
vercel env add VITE_CLOUDINARY_CLOUD_NAME
```

### Admin Dashboard
```bash
# Build
npm run build

# Deploy to Vercel
vercel

# Environment Setup
vercel env add VITE_API_URL
vercel env add VITE_ADMIN_SECRET
```

### Backend Server
```bash
# Build
npm run build

# Start production server
npm start

# Environment Setup
# Create .env file with all required variables
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Document complex logic
- Use meaningful variable names
- Follow SOLID principles

### Testing
- Write unit tests for services
- Test API endpoints
- Test React components
- Use Jest and React Testing Library
- Mock external services
- Test error cases
- Maintain test coverage

### Git Workflow
1. Create feature branch
2. Make changes
3. Run tests
4. Create pull request
5. Get code review
6. Merge to main
7. Deploy to staging
8. Test in staging
9. Deploy to production

## Unused/Deprecated Files

### Customer Website
- `src/components2/` - Old component versions
- `src/sample/` - Sample/test components
- `src/hook/` - Duplicate hooks directory
- `src/legacy/` - Legacy code
- `src/old/` - Old implementations

### Admin Dashboard
- `src/old/` - Deprecated components
- `src/legacy/` - Legacy code
- `src/deprecated/` - Deprecated features
- `src/temp/` - Temporary files

### Backend
- `src/controllers/old/` - Old controller versions
- `src/services/deprecated/` - Deprecated services
- `src/middleware/legacy/` - Legacy middleware
- `src/utils/old/` - Old utility functions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
6. Address review comments
7. Get approval
8. Merge to main

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Software Architecture

### Frontend Architecture (Customer & Admin)

#### Component Architecture
- **Atomic Design Pattern**
  - Atoms: Basic UI elements (buttons, inputs)
  - Molecules: Combinations of atoms (forms, cards)
  - Organisms: Complex components (product cards, order summaries)
  - Templates: Page layouts
  - Pages: Complete views

#### State Management
- **Context API Implementation**
  ```typescript
  // Example: Cart Context
  interface CartState {
    items: CartItem[];
    total: number;
    loading: boolean;
  }
  
  interface CartActions {
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
  }
  
  const CartContext = createContext<{
    state: CartState;
    actions: CartActions;
  }>(null);
  ```

#### Data Flow
1. **API Calls**
   ```typescript
   // Example: Product Service
   const getProducts = async (params: ProductQueryParams) => {
     const response = await api.get('/products', { params });
     return response.data;
   };
   ```

2. **State Updates**
   ```typescript
   // Example: Cart Reducer
   const cartReducer = (state: CartState, action: CartAction) => {
     switch (action.type) {
       case 'ADD_ITEM':
         return {
           ...state,
           items: [...state.items, action.payload],
           total: calculateTotal([...state.items, action.payload])
         };
       // ... other cases
     }
   };
   ```

3. **UI Updates**
   ```typescript
   // Example: Product List Component
   const ProductList = () => {
     const { data, isLoading } = useQuery(['products'], getProducts);
     if (isLoading) return <LoadingSpinner />;
     return (
       <div className="grid grid-cols-4 gap-4">
         {data.map(product => (
           <ProductCard key={product._id} product={product} />
         ))}
       </div>
     );
   };
   ```

### Backend Architecture

#### Layered Architecture
1. **Controller Layer**
   ```typescript
   // Example: Product Controller
   class ProductController {
     async create(req: Request, res: Response) {
       const product = await productService.create(req.body);
       res.status(201).json(product);
     }
   }
   ```

2. **Service Layer**
   ```typescript
   // Example: Product Service
   class ProductService {
     async create(data: ProductInput) {
       const product = new Product(data);
       await product.save();
       return product;
     }
   }
   ```

3. **Repository Layer**
   ```typescript
   // Example: Product Repository
   class ProductRepository {
     async findById(id: string) {
       return Product.findById(id).populate('category');
     }
   }
   ```

#### Database Design
- **MongoDB Schema Design**
  ```typescript
  // Example: Product Schema
  const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    // ... other fields
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  ```

- **Indexing Strategy**
  ```typescript
  // Example: Product Indexes
  productSchema.index({ name: 'text', description: 'text' });
  productSchema.index({ price: 1 });
  productSchema.index({ category: 1 });
  ```

## Development Workflows

### Feature Development
1. **Branch Strategy**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes
   git add .
   git commit -m "feat: add new feature"
   
   # Push changes
   git push origin feature/new-feature
   ```

2. **Code Review Process**
   - Create pull request
   - Run automated tests
   - Get code review
   - Address feedback
   - Merge to main

### Testing Workflow
1. **Unit Testing**
   ```typescript
   // Example: Product Service Test
   describe('ProductService', () => {
     it('should create a product', async () => {
       const product = await productService.create({
         name: 'Test Product',
         price: 100
       });
       expect(product.name).toBe('Test Product');
     });
   });
   ```

2. **Integration Testing**
   ```typescript
   // Example: Product API Test
   describe('Product API', () => {
     it('should return products', async () => {
       const response = await request(app)
         .get('/api/products')
         .expect(200);
       expect(response.body).toHaveProperty('products');
     });
   });
   ```

3. **E2E Testing**
   ```typescript
   // Example: Product Flow Test
   describe('Product Flow', () => {
     it('should complete purchase flow', async () => {
       await page.goto('/products');
       await page.click('.add-to-cart');
       await page.goto('/cart');
       await page.click('.checkout');
       // ... complete checkout flow
     });
   });
   ```

## System Integration

### API Integration
1. **REST API Design**
   ```typescript
   // Example: API Routes
   router.get('/products', productController.getAll);
   router.post('/products', authMiddleware, adminMiddleware, productController.create);
   router.put('/products/:id', authMiddleware, adminMiddleware, productController.update);
   ```

2. **WebSocket Integration**
   ```typescript
   // Example: Real-time Updates
   io.on('connection', (socket) => {
     socket.on('order:update', async (orderId) => {
       const order = await orderService.findById(orderId);
       socket.emit('order:updated', order);
     });
   });
   ```

### Third-Party Integration
1. **Payment Gateway**
   ```typescript
   // Example: Razorpay Integration
   const razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_KEY_SECRET
   });
   
   const order = await razorpay.orders.create({
     amount: total * 100,
     currency: 'INR'
   });
   ```

2. **File Storage**
   ```typescript
   // Example: Cloudinary Integration
   const cloudinary = require('cloudinary').v2;
   
   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });
   
   const result = await cloudinary.uploader.upload(file);
   ```

## Performance Optimization

### Frontend Optimization
1. **Code Splitting**
   ```typescript
   // Example: Route-based Code Splitting
   const ProductDetails = lazy(() => import('./ProductDetails'));
   const OrderHistory = lazy(() => import('./OrderHistory'));
   ```

2. **Image Optimization**
   ```typescript
   // Example: Image Component
   const OptimizedImage = ({ src, alt }) => (
     <img
       src={src}
       alt={alt}
       loading="lazy"
       decoding="async"
       width="100%"
       height="auto"
     />
   );
   ```

### Backend Optimization
1. **Query Optimization**
   ```typescript
   // Example: Optimized Query
   const getProducts = async () => {
     return Product.find()
       .select('name price images')
       .populate('category', 'name')
       .lean();
   };
   ```

2. **Caching Strategy**
   ```typescript
   // Example: Redis Caching
   const getProduct = async (id: string) => {
     const cacheKey = `product:${id}`;
     const cached = await redis.get(cacheKey);
     
     if (cached) return JSON.parse(cached);
     
     const product = await Product.findById(id).lean();
     await redis.set(cacheKey, JSON.stringify(product), 'EX', 3600);
     
     return product;
   };
   ```

## Security Implementation

### Authentication
1. **JWT Implementation**
   ```typescript
   // Example: JWT Service
   class JWTService {
     generateToken(user: User) {
       return jwt.sign(
         { id: user._id, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: '15m' }
       );
     }
   }
   ```

2. **Password Hashing**
   ```typescript
   // Example: Password Service
   class PasswordService {
     async hash(password: string) {
       return bcrypt.hash(password, 10);
     }
     
     async compare(password: string, hash: string) {
       return bcrypt.compare(password, hash);
     }
   }
   ```

### Authorization
1. **Role-Based Access**
   ```typescript
   // Example: Role Middleware
   const requireRole = (role: string) => {
     return (req: Request, res: Response, next: NextFunction) => {
       if (req.user.role !== role) {
         return res.status(403).json({ message: 'Forbidden' });
       }
       next();
     };
   };
   ```

2. **Permission System**
   ```typescript
   // Example: Permission Check
   const hasPermission = (user: User, permission: string) => {
     return user.role.permissions.includes(permission);
   };
   ```

## Error Handling

### Frontend Error Handling
1. **Error Boundaries**
   ```typescript
   // Example: Error Boundary
   class ErrorBoundary extends React.Component {
     state = { hasError: false };
     
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
     
     render() {
       if (this.state.hasError) {
         return <ErrorFallback />;
       }
       return this.props.children;
     }
   }
   ```

2. **API Error Handling**
   ```typescript
   // Example: API Error Handler
   const handleApiError = (error: AxiosError) => {
     if (error.response) {
       switch (error.response.status) {
         case 401:
           // Handle unauthorized
           break;
         case 403:
           // Handle forbidden
           break;
         // ... other cases
       }
     }
   };
   ```

### Backend Error Handling
1. **Global Error Handler**
   ```typescript
   // Example: Error Middleware
   const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
     console.error(err.stack);
     
     if (err instanceof ValidationError) {
       return res.status(400).json({
         message: 'Validation Error',
         errors: err.errors
       });
     }
     
     res.status(500).json({
       message: 'Internal Server Error'
     });
   };
   ```

2. **Logging System**
   ```typescript
   // Example: Logger Service
   class Logger {
     error(message: string, meta?: any) {
       winston.error(message, meta);
     }
     
     info(message: string, meta?: any) {
       winston.info(message, meta);
     }
   }
   ```

## Monitoring and Analytics

### Frontend Monitoring
1. **Error Tracking**
   ```typescript
   // Example: Sentry Integration
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV
   });
   
   // Error boundary
   componentDidCatch(error, errorInfo) {
     Sentry.captureException(error, { extra: errorInfo });
   }
   ```

2. **Performance Monitoring**
   ```typescript
   // Example: Performance Tracking
   const trackPerformance = (metric: string, value: number) => {
     analytics.track('performance_metric', {
       metric,
       value,
       timestamp: Date.now()
     });
   };
   ```

### Backend Monitoring
1. **Health Checks**
   ```typescript
   // Example: Health Check Endpoint
   router.get('/health', (req, res) => {
     const health = {
       status: 'ok',
       timestamp: Date.now(),
       uptime: process.uptime()
     };
     res.json(health);
   });
   ```

2. **Metrics Collection**
   ```typescript
   // Example: Metrics Middleware
   const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
     const start = Date.now();
     res.on('finish', () => {
       const duration = Date.now() - start;
       metrics.record('request_duration', duration, {
         method: req.method,
         path: req.path,
         status: res.statusCode
       });
     });
     next();
   };
   ```

## Deployment Scenarios

### Local Development Setup
1. **Prerequisites**
   ```bash
   # Required Software
   - Node.js (v16 or higher)
   - MongoDB (v4.4 or higher)
   - Redis (v6 or higher)
   - Git
   - Docker (optional)
   - VS Code (recommended IDE)
   ```

2. **Environment Setup**
   ```bash
   # Clone repositories
   git clone https://github.com/your-org/mobiiwrap-base.git
   git clone https://github.com/your-org/mobiiwrap-admin.git
   
   # Install dependencies
   cd mobiiwrap-base
   npm install
   
   cd ../mobiiwrap-admin/client
   npm install
   
   cd ../server
   npm install
   ```

3. **Database Setup**
   ```bash
   # Start MongoDB
   mongod --dbpath /path/to/data/directory
   
   # Create initial admin user
   mongo
   > use mobiiwrap
   > db.users.insertOne({
       name: "Admin User",
       email: "admin@example.com",
       password: "$2a$10$...", // Hashed password
       role: "admin"
     })
   ```

### Production Deployment
1. **Server Requirements**
   ```bash
   # Minimum Requirements
   - CPU: 4 cores
   - RAM: 8GB
   - Storage: 50GB SSD
   - OS: Ubuntu 20.04 LTS
   
   # Recommended Requirements
   - CPU: 8 cores
   - RAM: 16GB
   - Storage: 100GB SSD
   - OS: Ubuntu 22.04 LTS
   ```

2. **Deployment Steps**
   ```bash
   # Build frontend applications
   cd mobiiwrap-base
   npm run build
   
   cd ../mobiiwrap-admin/client
   npm run build
   
   # Deploy backend
   cd ../server
   npm run build
   pm2 start dist/index.js --name "mobiiwrap-server"
   
   # Configure Nginx
   sudo nano /etc/nginx/sites-available/mobiiwrap
   ```

3. **Nginx Configuration**
   ```nginx
   # Customer Website
   server {
       listen 80;
       server_name shop.mobiiwrap.com;
       
       location / {
           root /var/www/mobiiwrap-base/dist;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   
   # Admin Dashboard
   server {
       listen 80;
       server_name admin.mobiiwrap.com;
       
       location / {
           root /var/www/mobiiwrap-admin/client/dist;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Docker Deployment
1. **Docker Compose Setup**
   ```yaml
   version: '3.8'
   
   services:
     mongodb:
       image: mongo:4.4
       volumes:
         - mongodb_data:/data/db
       ports:
         - "27017:27017"
   
     redis:
       image: redis:6
       volumes:
         - redis_data:/data
       ports:
         - "6379:6379"
   
     backend:
       build: ./mobiiwrap-admin/server
       ports:
         - "5000:5000"
       environment:
         - MONGODB_URI=mongodb://mongodb:27017/mobiiwrap
         - REDIS_URL=redis://redis:6379
       depends_on:
         - mongodb
         - redis
   
     frontend:
       build: ./mobiiwrap-base
       ports:
         - "3000:80"
       depends_on:
         - backend
   
     admin:
       build: ./mobiiwrap-admin/client
       ports:
         - "3001:80"
       depends_on:
         - backend
   
   volumes:
     mongodb_data:
     redis_data:
   ```

2. **Docker Build**
   ```bash
   # Build and start containers
   docker-compose build
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   ```

## Troubleshooting Guide

### Common Issues
1. **API Errors**
   ```typescript
   // Error Codes Reference
   const ERROR_CODES = {
     400: 'Bad Request',
     401: 'Unauthorized',
     403: 'Forbidden',
     404: 'Not Found',
     500: 'Internal Server Error'
   };
   ```

2. **Performance Issues**
   ```bash
   # Check server resources
   top
   htop
   
   # Check MongoDB performance
   mongotop
   mongostat
   
   # Check Redis performance
   redis-cli info
   ```

### Debugging Tools

1. **Frontend Debugging**
   ```typescript
   // React Developer Tools
   // Chrome DevTools
   // Network Tab
   // Console Logging
   console.log('Debug Info:', {
     state,
     props,
     context
   });
   ```

2. **Backend Debugging**
   ```typescript
   // Debug Logging
   const debug = require('debug')('mobiiwrap:server');
   
   // Add debug logs
   debug('Request received: %o', req.body);
   debug('Database query: %o', query);
   ```

3. **Database Debugging**
   ```javascript
   // MongoDB Shell
   > db.setLogLevel(1)
   > db.currentOp()
   > db.serverStatus()
   ```

## Practical Implementation Examples

### Product Management

1. **Product Creation Flow**
   ```typescript
   // Frontend Implementation
   const createProduct = async (data: ProductInput) => {
     try {
       // Upload images
       const images = await Promise.all(
         data.images.map(file => uploadToCloudinary(file))
       );
       
       // Create product
       const product = await api.post('/products', {
         ...data,
         images
       });
       
       // Update cache
       queryClient.invalidateQueries(['products']);
       
       return product;
     } catch (error) {
       handleApiError(error);
     }
   };
   ```

2. **Inventory Management**
   ```typescript
   // Backend Implementation
   class InventoryService {
     async updateStock(productId: string, quantity: number) {
       const product = await Product.findById(productId);
       
       if (product.quantity + quantity < 0) {
         throw new Error('Insufficient stock');
       }
       
       product.quantity += quantity;
       await product.save();
       
       // Emit real-time update
       io.emit('inventory:update', {
         productId,
         quantity: product.quantity
       });
     }
   }
   ```

### Order Processing

1. **Order Creation Flow**
   ```typescript
   // Frontend Implementation
   const createOrder = async (data: OrderInput) => {
     try {
       // Validate cart
       const cart = await validateCart(data.cartId);
       
       // Create payment intent
       const payment = await createPaymentIntent(cart.total);
       
       // Create order
       const order = await api.post('/orders', {
         ...data,
         paymentId: payment.id
       });
       
       // Clear cart
       await clearCart();
       
       return order;
     } catch (error) {
       handleApiError(error);
     }
   };
   ```

2. **Order Fulfillment**
   ```typescript
   // Backend Implementation
   class OrderService {
     async fulfillOrder(orderId: string) {
       const order = await Order.findById(orderId)
         .populate('items.product');
       
       // Update inventory
       await Promise.all(
         order.items.map(item => 
           inventoryService.updateStock(
             item.product._id,
             -item.quantity
           )
         )
       );
       
       // Update order status
       order.status = 'Processing';
       await order.save();
       
       // Send notifications
       await sendOrderUpdateEmail(order);
       io.emit('order:update', order);
     }
   }
   ```

### User Management

1. **User Authentication**
   ```typescript
   // Frontend Implementation
   const login = async (credentials: LoginInput) => {
     try {
       // Authenticate user
       const response = await api.post('/auth/login', credentials);
       
       // Store tokens
       localStorage.setItem('token', response.token);
       localStorage.setItem('refreshToken', response.refreshToken);
       
       // Update auth context
       setAuthState({
         user: response.user,
         isAuthenticated: true
       });
       
       return response.user;
     } catch (error) {
       handleApiError(error);
     }
   };
   ```

2. **Password Reset**
   ```typescript
   // Backend Implementation
   class AuthService {
     async resetPassword(token: string, newPassword: string) {
       // Verify token
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
       // Update password
       const hashedPassword = await passwordService.hash(newPassword);
       await User.findByIdAndUpdate(decoded.userId, {
         password: hashedPassword
       });
       
       // Send confirmation email
       await sendPasswordResetConfirmationEmail(decoded.email);
     }
   }
   ```

## Best Practices

### Code Organization
1. **File Structure**
   ```
   src/
   ├── features/           # Feature-based modules
   │   ├── products/      # Product-related code
   │   ├── orders/        # Order-related code
   │   └── users/         # User-related code
   ├── shared/            # Shared utilities
   │   ├── hooks/         # Custom hooks
   │   ├── components/    # Shared components
   │   └── utils/         # Utility functions
   └── config/            # Configuration files
   ```

2. **Naming Conventions**
   ```typescript
   // Components
   ProductCard.tsx
   OrderSummary.tsx
   
   // Hooks
   useProducts.ts
   useOrders.ts
   
   // Services
   productService.ts
   orderService.ts
   
   // Types
   Product.ts
   Order.ts
   ```

### Performance Optimization
1. **Frontend Optimization**
   ```typescript
   // Lazy Loading
   const ProductDetails = lazy(() => import('./ProductDetails'));
   
   // Memoization
   const ProductCard = memo(({ product }) => (
     <div>{product.name}</div>
   ));
   
   // Virtualization
   const ProductList = () => (
     <VirtualList
       items={products}
       itemHeight={200}
       renderItem={product => (
         <ProductCard product={product} />
       )}
     />
   );
   ```

2. **Backend Optimization**
   ```typescript
   // Query Optimization
   const getProducts = async () => {
     return Product.find()
       .select('name price images')
       .populate('category', 'name')
       .lean();
   };
   
   // Caching
   const getProduct = async (id: string) => {
     const cacheKey = `product:${id}`;
     const cached = await redis.get(cacheKey);
     
     if (cached) return JSON.parse(cached);
     
     const product = await Product.findById(id).lean();
     await redis.set(cacheKey, JSON.stringify(product), 'EX', 3600);
     
     return product;
   };
   ```

### Security Measures
1. **Input Validation**
   ```typescript
   // Frontend Validation
   const validateProduct = (data: ProductInput) => {
     const errors = {};
     
     if (!data.name) errors.name = 'Name is required';
     if (data.price <= 0) errors.price = 'Price must be positive';
     
     return errors;
   };
   
   // Backend Validation
   const productSchema = Joi.object({
     name: Joi.string().required(),
     price: Joi.number().positive().required(),
     description: Joi.string().required()
   });
   ```

2. **Security Headers**
   ```typescript
   // Express Security Middleware
   app.use(helmet());
   app.use(cors({
     origin: process.env.ALLOWED_ORIGINS.split(','),
     credentials: true
   }));
   ```

## Business Logic and Workflows

### Product Management Workflow
1. **Product Lifecycle**
   ```typescript
   // Product States
   enum ProductState {
     DRAFT = 'draft',
     PENDING_REVIEW = 'pending_review',
     ACTIVE = 'active',
     INACTIVE = 'inactive',
     DISCONTINUED = 'discontinued'
   }

   // Product Approval Flow
   class ProductApprovalService {
     async requestApproval(productId: string) {
       const product = await Product.findById(productId);
       product.state = ProductState.PENDING_REVIEW;
       await product.save();
       
       // Notify admins
       await notifyAdmins('product_pending_review', { productId });
     }

     async approveProduct(productId: string, adminId: string) {
       const product = await Product.findById(productId);
       product.state = ProductState.ACTIVE;
       product.approvedBy = adminId;
       product.approvedAt = new Date();
       await product.save();
       
       // Notify product owner
       await notifyProductOwner(product.owner, 'product_approved', { productId });
     }
   }
   ```

2. **Inventory Management**
   ```typescript
   // Stock Management
   class StockService {
     async updateStock(productId: string, quantity: number, reason: string) {
       const product = await Product.findById(productId);
       
       // Check minimum stock level
       if (product.quantity + quantity < product.minStockLevel) {
         await notifyLowStock(product);
       }
       
       // Update stock
       product.quantity += quantity;
       await product.save();
       
       // Record stock movement
       await StockMovement.create({
         product: productId,
         quantity,
         type: quantity > 0 ? 'in' : 'out',
         reason,
         previousStock: product.quantity - quantity,
         newStock: product.quantity
       });
     }

     async handleBackorder(order: Order) {
       const backorder = await Backorder.create({
         order: order._id,
         items: order.items.map(item => ({
           product: item.product,
           quantity: item.quantity,
           expectedDate: calculateExpectedDate()
         }))
       });
       
       // Notify customer
       await notifyCustomer(order.user, 'backorder_created', {
         orderId: order._id,
         backorderId: backorder._id
       });
     }
   }
   ```

### Order Processing Workflow
1. **Order States and Transitions**
   ```typescript
   // Order State Machine
   class OrderStateMachine {
     private transitions = {
       PENDING: ['PROCESSING', 'CANCELLED'],
       PROCESSING: ['SHIPPED', 'CANCELLED'],
       SHIPPED: ['DELIVERED', 'RETURN_REQUESTED'],
       DELIVERED: ['COMPLETED', 'RETURN_REQUESTED'],
       RETURN_REQUESTED: ['RETURN_APPROVED', 'RETURN_REJECTED'],
       RETURN_APPROVED: ['REFUNDED'],
       COMPLETED: [],
       CANCELLED: [],
       REFUNDED: []
     };

     async transition(order: Order, newState: string) {
       if (!this.transitions[order.state].includes(newState)) {
         throw new Error(`Invalid transition from ${order.state} to ${newState}`);
       }

       order.state = newState;
       order.stateHistory.push({
         state: newState,
         timestamp: new Date(),
         changedBy: 'system'
       });

       await order.save();
       await this.handleStateChange(order);
     }

     private async handleStateChange(order: Order) {
       switch (order.state) {
         case 'SHIPPED':
           await this.handleShipped(order);
           break;
         case 'DELIVERED':
           await this.handleDelivered(order);
           break;
         // ... other cases
       }
     }
   }
   ```

2. **Payment Processing**
   ```typescript
   // Payment Service
   class PaymentService {
     async processPayment(order: Order, paymentMethod: PaymentMethod) {
       try {
         // Create payment record
         const payment = await Payment.create({
           order: order._id,
           amount: order.total,
           method: paymentMethod,
           status: 'pending'
         });

         // Process based on payment method
         switch (paymentMethod) {
           case 'credit_card':
             await this.processCreditCard(payment);
             break;
           case 'razorpay':
             await this.processRazorpay(payment);
             break;
           case 'cod':
             await this.processCOD(payment);
             break;
         }

         // Update order status
         await orderStateMachine.transition(order, 'PROCESSING');
       } catch (error) {
         await this.handlePaymentError(order, payment, error);
       }
     }

     async handleRefund(order: Order, reason: string) {
       const refund = await Refund.create({
         order: order._id,
         amount: order.total,
         reason,
         status: 'pending'
       });

       // Process refund based on original payment method
       await this.processRefund(refund);

       // Update order status
       await orderStateMachine.transition(order, 'REFUNDED');
     }
   }
   ```

### Customer Management
1. **Customer Segmentation**
   ```typescript
   // Customer Analytics
   class CustomerAnalyticsService {
     async segmentCustomers() {
       const customers = await User.find({ role: 'customer' });
       
       return customers.map(customer => ({
         customer,
         segment: this.calculateSegment(customer),
         lifetimeValue: await this.calculateLTV(customer),
         churnRisk: await this.calculateChurnRisk(customer)
       }));
     }

     private calculateSegment(customer: User) {
       const orders = await Order.find({ user: customer._id });
       const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
       
       if (totalSpent > 10000) return 'VIP';
       if (totalSpent > 5000) return 'Premium';
       if (totalSpent > 1000) return 'Regular';
       return 'New';
     }
   }
   ```

2. **Loyalty Program**
   ```typescript
   // Loyalty Service
   class LoyaltyService {
     async calculatePoints(order: Order) {
       const points = Math.floor(order.total * 0.1); // 10% of order value
       
       await LoyaltyPoints.create({
         user: order.user,
         order: order._id,
         points,
         type: 'earned'
       });
       
       await this.updateTier(order.user);
     }

     async updateTier(userId: string) {
       const points = await this.getTotalPoints(userId);
       const currentTier = await this.getCurrentTier(userId);
       const newTier = this.calculateTier(points);
       
       if (newTier !== currentTier) {
         await UserTier.create({
           user: userId,
           tier: newTier,
           achievedAt: new Date()
         });
         
         await this.notifyTierUpgrade(userId, newTier);
       }
     }
   }
   ```

## Advanced Features

### AI-Powered Recommendations
1. **Product Recommendations**
   ```typescript
   // Recommendation Engine
   class RecommendationEngine {
     async getRecommendations(userId: string) {
       const user = await User.findById(userId);
       const recentOrders = await Order.find({ user: userId })
         .sort({ createdAt: -1 })
         .limit(5);
       
       // Get similar users
       const similarUsers = await this.findSimilarUsers(user);
       
       // Get popular products in user's category
       const popularProducts = await this.getPopularProducts(user);
       
       // Get personalized recommendations
       const personalized = await this.getPersonalizedRecommendations(user);
       
       return {
         basedOnHistory: this.filterRecommendations(recentOrders),
         basedOnSimilarUsers: this.filterRecommendations(similarUsers),
         popularInCategory: this.filterRecommendations(popularProducts),
         personalized: this.filterRecommendations(personalized)
       };
     }
   }
   ```

2. **Price Optimization**
   ```typescript
   // Pricing Service
   class PricingService {
     async optimizePrice(productId: string) {
       const product = await Product.findById(productId);
       const salesData = await this.getSalesData(productId);
       const competitorData = await this.getCompetitorData(product);
       
       const optimalPrice = this.calculateOptimalPrice({
         currentPrice: product.price,
         salesData,
         competitorData,
         demandCurve: this.calculateDemandCurve(salesData),
         elasticity: this.calculatePriceElasticity(salesData)
       });
       
       if (this.shouldUpdatePrice(product.price, optimalPrice)) {
         await this.updatePrice(productId, optimalPrice);
         await this.notifyPriceChange(productId, optimalPrice);
       }
     }
   }
   ```

### Analytics and Reporting
1. **Sales Analytics**
   ```typescript
   // Analytics Service
   class AnalyticsService {
     async generateSalesReport(params: ReportParams) {
       const sales = await Order.aggregate([
         { $match: this.buildDateFilter(params) },
         { $group: {
             _id: {
               date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
               category: "$items.category"
             },
             totalSales: { $sum: "$total" },
             orderCount: { $sum: 1 },
             averageOrderValue: { $avg: "$total" }
           }
         }
       ]);
       
       return this.formatReport(sales);
     }

     async generateCustomerReport(params: ReportParams) {
       const customers = await User.aggregate([
         { $match: { role: 'customer' } },
         { $lookup: {
             from: 'orders',
             localField: '_id',
             foreignField: 'user',
             as: 'orders'
           }
         },
         { $project: {
             name: 1,
             email: 1,
             orderCount: { $size: "$orders" },
             totalSpent: { $sum: "$orders.total" },
             lastOrderDate: { $max: "$orders.createdAt" }
           }
         }
       ]);
       
       return this.formatCustomerReport(customers);
     }
   }
   ```

2. **Inventory Analytics**
   ```typescript
   // Inventory Analytics
   class InventoryAnalyticsService {
     async generateStockReport() {
       const products = await Product.find()
         .populate('category')
         .lean();
       
       const stockLevels = products.map(product => ({
         product: product.name,
         category: product.category.name,
         currentStock: product.quantity,
         minimumStock: product.minStockLevel,
         stockStatus: this.calculateStockStatus(product),
         turnoverRate: await this.calculateTurnoverRate(product._id),
         reorderPoint: this.calculateReorderPoint(product)
       }));
       
       return this.formatStockReport(stockLevels);
     }

     async predictStockOutages() {
       const products = await Product.find();
       const predictions = await Promise.all(
         products.map(async product => ({
           product: product._id,
           currentStock: product.quantity,
           dailySales: await this.calculateDailySales(product._id),
           daysUntilOutOfStock: this.calculateDaysUntilOutOfStock(
             product.quantity,
             await this.calculateDailySales(product._id)
           ),
           recommendedReorderQuantity: this.calculateReorderQuantity(product)
         }))
       );
       
       return this.formatPredictions(predictions);
     }
   }
   ```

## Real-World Scenarios

### Handling Peak Traffic
1. **Load Balancing**
   ```typescript
   // Load Balancer Configuration
   const loadBalancer = {
     strategy: 'round-robin',
     healthCheck: {
       interval: 30,
       timeout: 5,
       unhealthyThreshold: 2,
       healthyThreshold: 2
     },
     servers: [
       { host: 'server1.mobiiwrap.com', weight: 1 },
       { host: 'server2.mobiiwrap.com', weight: 1 },
       { host: 'server3.mobiiwrap.com', weight: 1 }
     ]
   };
   ```

2. **Caching Strategy**
   ```typescript
   // Cache Configuration
   const cacheConfig = {
     product: {
       ttl: 3600, // 1 hour
       maxSize: 1000,
       strategy: 'lru'
     },
     user: {
       ttl: 1800, // 30 minutes
       maxSize: 5000,
       strategy: 'lru'
     },
     cart: {
       ttl: 86400, // 24 hours
       maxSize: 10000,
       strategy: 'lru'
     }
   };
   ```

### Handling Failures
1. **Circuit Breaker Pattern**
   ```typescript
   // Circuit Breaker Implementation
   class CircuitBreaker {
     private failures = 0;
     private lastFailureTime: Date;
     private state: 'closed' | 'open' | 'half-open' = 'closed';
     
     async execute(fn: () => Promise<any>) {
       if (this.state === 'open') {
         if (this.shouldAttemptReset()) {
           this.state = 'half-open';
         } else {
           throw new Error('Circuit breaker is open');
         }
       }
       
       try {
         const result = await fn();
         this.onSuccess();
         return result;
       } catch (error) {
         this.onFailure();
         throw error;
       }
     }
     
     private onSuccess() {
       this.failures = 0;
       this.state = 'closed';
     }
     
     private onFailure() {
       this.failures++;
       this.lastFailureTime = new Date();
       
       if (this.failures >= this.threshold) {
         this.state = 'open';
       }
     }
   }
   ```

2. **Retry Strategy**
   ```typescript
   // Retry Service
   class RetryService {
     async withRetry<T>(
       fn: () => Promise<T>,
       options: RetryOptions = {}
     ): Promise<T> {
       const {
         maxAttempts = 3,
         delay = 1000,
         backoff = 2
       } = options;
       
       let attempt = 0;
       let lastError: Error;
       
       while (attempt < maxAttempts) {
         try {
           return await fn();
         } catch (error) {
           lastError = error;
           attempt++;
           
           if (attempt === maxAttempts) {
             break;
           }
           
           await this.delay(delay * Math.pow(backoff, attempt - 1));
         }
       }
       
       throw lastError;
     }
   }
   ```

### Data Migration
1. **Migration Strategy**
   ```typescript
   // Migration Service
   class MigrationService {
     async migrateData(source: DataSource, target: DataSource) {
       // Backup current data
       await this.createBackup(target);
       
       // Migrate in batches
       const batchSize = 1000;
       let offset = 0;
       let hasMore = true;
       
       while (hasMore) {
         const data = await source.getBatch(offset, batchSize);
         if (data.length === 0) {
           hasMore = false;
           continue;
         }
         
         await target.saveBatch(data);
         offset += batchSize;
         
         // Log progress
         await this.logProgress(offset);
       }
       
       // Verify migration
       await this.verifyMigration(source, target);
     }
   }
   ```

2. **Data Validation**
   ```typescript
   // Data Validation Service
   class DataValidationService {
     async validateMigration(source: DataSource, target: DataSource) {
       const sourceCount = await source.getCount();
       const targetCount = await target.getCount();
       
       if (sourceCount !== targetCount) {
         throw new Error(`Count mismatch: source=${sourceCount}, target=${targetCount}`);
       }
       
       // Sample validation
       const samples = await this.getRandomSamples(source, 100);
       for (const sample of samples) {
         const targetData = await target.findById(sample._id);
         if (!this.areEqual(sample, targetData)) {
           throw new Error(`Data mismatch for id ${sample._id}`);
         }
       }
     }
   }
   ```

## Additional Best Practices

### Code Review Process
```typescript
// Example: Code Review Checklist
const codeReviewChecklist = {
  general: [
    'Code follows style guide',
    'No commented-out code',
    'Proper error handling',
    'Adequate logging',
    'Security considerations'
  ],
  frontend: [
    'Responsive design',
    'Accessibility standards',
    'Performance optimization',
    'Cross-browser compatibility',
    'State management'
  ],
  backend: [
    'Input validation',
    'Error handling',
    'Database optimization',
    'API documentation',
    'Security measures'
  ]
};
```

### Git Workflow
```bash
# Feature Branch Workflow
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create Pull Request
# Get code review
# Address feedback
# Merge to main
```

### Continuous Integration
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Check coverage
        run: npm run coverage
```

### Code Quality Tools
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

### Performance Monitoring
```typescript
// Example: Performance Monitoring Setup
const performanceMonitor = {
  metrics: {
    pageLoad: 'page_load_time',
    apiResponse: 'api_response_time',
    databaseQuery: 'db_query_time'
  },
  thresholds: {
    pageLoad: 2000, // ms
    apiResponse: 500, // ms
    databaseQuery: 100 // ms
  },
  alerting: {
    email: 'devops@mobiiwrap.com',
    slack: '#alerts'
  }
};
```

### Security Scanning
```bash
# Dependency Scanning
npm audit
npm audit fix

# Code Scanning
npx eslint .
npx tsc --noEmit

# Security Scanning
npx snyk test
npx snyk monitor
```

### Documentation Generation
```bash
# Generate API Documentation
npm run docs:api

# Generate Component Documentation
npm run docs:components

# Generate Type Documentation
npm run docs:types
```

### Error Tracking
```typescript
// Example: Error Tracking Setup
const errorTracker = {
  service: 'Sentry',
  config: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: process.env.APP_VERSION,
    tracesSampleRate: 1.0
  },
  ignoreErrors: [
    'NetworkError',
    'TimeoutError'
  ]
};
```

### Logging Strategy
```typescript
// Example: Logging Configuration
const logger = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
};
``` 
