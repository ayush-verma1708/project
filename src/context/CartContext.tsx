import React, { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import type { CartItem, Product } from '../types/types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product & { selectedBrand: string; selectedModel: string } }
  | { type: 'REMOVE_ITEM'; payload: { _id: string; selectedBrand: string; selectedModel: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { _id: string; quantity: number; selectedBrand: string; selectedModel: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addItem: (product: Product & { selectedBrand: string; selectedModel: string }) => void;
  removeItem: (id: string, selectedBrand: string, selectedModel: string) => void;
  updateQuantity: (id: string, quantity: number, selectedBrand: string, selectedModel: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const TAX_RATE = 0.08; // 8% tax rate

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  itemCount: 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { subtotal, tax, total, itemCount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { _id, selectedBrand, selectedModel } = action.payload;
      
      // Ensure items is an array
      if (!state.items) {
        return { ...state, items: [], ...calculateTotals([]) };
      }
      
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item._id === _id &&
          item.selectedBrand === selectedBrand &&
          item.selectedModel === selectedModel 
      );
      
      let newItems;
      if (existingItemIndex > -1) {
        // If the item exists, update quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add as a new variant
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
    
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }
    
    case 'REMOVE_ITEM': {
      const { _id, selectedBrand, selectedModel } = action.payload;
      const newItems = state.items.filter(
        item => !(item._id === _id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel)
      );
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { _id, quantity, selectedBrand, selectedModel } = action.payload;
      const newItems = state.items.map(item =>
        item._id === _id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel
          ? { ...item, quantity: Math.max(1, quantity) } // Prevent 0 quantity
          : item
      );
    
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return initialState;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Validate the loaded cart data
        if (parsedCart.items && Array.isArray(parsedCart.items)) {
          // Check if cart is older than 24 hours
          const cartTimestamp = localStorage.getItem('cart_timestamp');
          if (cartTimestamp) {
            const cartAge = Date.now() - parseInt(cartTimestamp);
            if (cartAge > 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
              localStorage.removeItem('cart');
              localStorage.removeItem('cart_timestamp');
              return;
            }
          }
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        } else {
          localStorage.removeItem('cart');
          localStorage.removeItem('cart_timestamp');
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
        localStorage.removeItem('cart_timestamp');
      }
    }
  }, []);
  
  useEffect(() => {
    // Only save to localStorage if there are items
    if (state.items.length > 0) {
      try {
        localStorage.setItem('cart', JSON.stringify({
          items: state.items,
          subtotal: state.subtotal,
          tax: state.tax,
          total: state.total,
          itemCount: state.itemCount,
        }));
        localStorage.setItem('cart_timestamp', Date.now().toString());
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    } else {
      localStorage.removeItem('cart');
      localStorage.removeItem('cart_timestamp');
    }
  }, [state.items]); // Only watch for items changes

  const addItem = (product: Product & { selectedBrand: string; selectedModel: string }) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (_id: string, selectedBrand: string, selectedModel: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { _id, selectedBrand, selectedModel } });
  };

  const updateQuantity = (_id: string, quantity: number, selectedBrand: string, selectedModel: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { _id, quantity, selectedBrand, selectedModel } });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
