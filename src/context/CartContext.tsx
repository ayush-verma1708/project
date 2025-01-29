import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CartItem, Product } from '../types/types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product & { color?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addItem: (product: Product & { color?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
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
    // case 'ADD_ITEM': {
    //   const existingItemIndex = state.items.findIndex(
    //     item => item.id === action.payload.id 
    //     // && item.color === action.payload.color
    //   );

    //   let newItems;
    //   if (existingItemIndex > -1) {
    //     newItems = state.items.map((item, index) =>
    //       index === existingItemIndex
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     );
    //   } else {
    //     newItems = [...state.items, { ...action.payload, quantity: 1 }];
    //   }

    //   return {
    //     ...state,
    //     items: newItems,
    //     ...calculateTotals(newItems),
    //   };
    // }
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
    
      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            ...action.payload,
            quantity: 1, // Ensure quantity is set
          },
        ];
      }
    
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // useEffect(() => {
  //   // Load cart from localStorage on mount
  //   const savedCart = localStorage.getItem('cart');
  //   if (savedCart) {
  //     // Check if savedCart exists, then parse it and dispatch to load into state
  //     dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
  //   }
  // }, []); // Only run once when component mounts

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  
    // Load selected phone details
    const savedPhone = localStorage.getItem('selectedPhone');
    if (savedPhone) {
      dispatch({ type: 'ADD_ITEM', payload: JSON.parse(savedPhone) });
    }
  }, []);
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    // Only save state to localStorage if the cart is not empty (optional)
    if (state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]); // Listen to changes in cart state

  // const addItem = (product: Product & { color?: string }) => {
  //   dispatch({ type: 'ADD_ITEM', payload: product });
  // };
  const addItem = (product: Product & { color?: string }) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    
    // Save the selected phone to localStorage for persistence
    localStorage.setItem('selectedPhone', JSON.stringify(product));
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
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