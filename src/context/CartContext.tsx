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
  | { type: 'ADD_ITEM'; payload: Product & { color?: string; selectedBrand?: string; selectedModel?: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; selectedBrand: string; selectedModel: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number; selectedBrand: string; selectedModel: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addItem: (product: Product & { color?: string; selectedBrand?: string; selectedModel?: string }) => void;
  removeItem: (id: string, selectedBrand: string, selectedModel: string) => void;
  updateQuantity: (id: string, quantity: number, selectedBrand: string, selectedModel: string) => void;
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
    case 'ADD_ITEM': {
      const { id, selectedBrand, selectedModel, color } = action.payload;
      
      // Ensure items is an array
      if (!state.items) {
        return { ...state, items: [], ...calculateTotals([]) };
      }
      
      const existingItemIndex = state.items.findIndex(
        item => item._id === id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel && item.color === color
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
      const { id, selectedBrand, selectedModel } = action.payload;
      const newItems = state.items.filter(
        item => !(item._id === id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel)
      );
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity, selectedBrand, selectedModel } = action.payload;
      const newItems = state.items.map(item =>
        item._id === id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel
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
      return initialState;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);
  
  useEffect(() => {
    if (state.items.length > 0) {
      // Save the entire cart state (items, subtotal, tax, etc.) to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        subtotal: state.subtotal,
        tax: state.tax,
        total: state.total,
        itemCount: state.itemCount,
      }));
    }
  }, [state.items, state.subtotal, state.tax, state.total, state.itemCount]);

  const addItem = (product: Product & { color?: string; selectedBrand?: string; selectedModel?: string }) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: string, selectedBrand: string, selectedModel: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, selectedBrand, selectedModel } });
  };

  const updateQuantity = (id: string, quantity: number, selectedBrand: string, selectedModel: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity, selectedBrand, selectedModel } });
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

// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import type { CartItem, Product } from '../types/types';

// interface CartState {
//   items: CartItem[];
//   subtotal: number;
//   tax: number;
//   total: number;
//   itemCount: number;
// }

// type CartAction =
//   | { type: 'ADD_ITEM'; payload: Product & { color?: string; selectedBrand?: string; selectedModel?: string } }
//   | { type: 'REMOVE_ITEM'; payload: { id: string; selectedBrand: string; selectedModel: string } }
//   | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number; selectedBrand: string; selectedModel: string } }
//   | { type: 'CLEAR_CART' }
//   | { type: 'LOAD_CART'; payload: CartState };

// interface CartContextType {
//   state: CartState;
//   addItem: (product: Product & { color?: string; selectedBrand?: string; selectedModel?: string }) => void;
//   removeItem: (id: string, selectedBrand: string, selectedModel: string) => void;
//   updateQuantity: (id: string, quantity: number, selectedBrand: string, selectedModel: string) => void;
//   clearCart: () => void;
// }

// const TAX_RATE = 0.08; // 8% tax rate

// const initialState: CartState = {
//   items: [],
//   subtotal: 0,
//   tax: 0,
//   total: 0,
//   itemCount: 0,
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// const calculateTotals = (items: CartItem[]) => {
//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const tax = subtotal * TAX_RATE;
//   const total = subtotal + tax;
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
//   return { subtotal, tax, total, itemCount };
// };

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case 'ADD_ITEM': {
//       const { id, selectedBrand, selectedModel, color } = action.payload;
      
//       // Ensure items is an array
//       if (!state.items) {
//         return { ...state, items: [], ...calculateTotals([]) };
//       }
      
//       const existingItemIndex = state.items.findIndex(
//         item => item._id === id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel && item.color === color
//       );
    
//       let newItems;
//       if (existingItemIndex > -1) {
//         // If the item exists, update quantity
//         newItems = state.items.map((item, index) =>
//           index === existingItemIndex
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Otherwise, add as a new variant
//         newItems = [...state.items, { ...action.payload, quantity: 1 }];
//       }
    
//       return {
//         ...state,
//         items: newItems,
//         ...calculateTotals(newItems),
//       };
//     }
    
//     case 'REMOVE_ITEM': {
//       const { id, selectedBrand, selectedModel } = action.payload;
//       const newItems = state.items.filter(
//         item => !(item._id === id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel)
//       );
//       return {
//         ...state,
//         items: newItems,
//         ...calculateTotals(newItems),
//       };
//     }

//     case 'UPDATE_QUANTITY': {
//       const { id, quantity, selectedBrand, selectedModel } = action.payload;
//       const newItems = state.items.map(item =>
//         item._id === id && item.selectedBrand === selectedBrand && item.selectedModel === selectedModel
//           ? { ...item, quantity: Math.max(1, quantity) } // Prevent 0 quantity
//           : item
//       );
    
//       return {
//         ...state,
//         items: newItems,
//         ...calculateTotals(newItems),
//       };
//     }

//     case 'CLEAR_CART':
//       return initialState;

//     case 'LOAD_CART':
//       return action.payload;

//     default:
//       return state;
//   }
// };

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   useEffect(() => {
//     // Load cart from localStorage on mount
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
//     }
  
//     // Load selected phone details
//     const savedPhone = localStorage.getItem('selectedPhone');
//     if (savedPhone) {
//       dispatch({ type: 'ADD_ITEM', payload: JSON.parse(savedPhone) });
//     }
//   }, []);
  
//   useEffect(() => {
//     if (state.items.length > 0) {
//       localStorage.setItem('cart', JSON.stringify(state.items)); // Store only items, not full state
//     }
//   }, [state.items]);

//   const addItem = (product: Product & { color?: string; selectedBrand?: string; selectedModel?: string }) => {
//     dispatch({ type: 'ADD_ITEM', payload: product });
//     // Save the selected phone to localStorage for persistence
//     localStorage.setItem('selectedPhone', JSON.stringify(product));
//   };

//   const removeItem = (id: string, selectedBrand: string, selectedModel: string) => {
//     // dispatch({ type: 'REMOVE_ITEM', payload: { id, selectedBrand, selectedModel } });
//     console.log('removeItem', id, selectedBrand, selectedModel);
//   };

//   const updateQuantity = (id: string, quantity: number, selectedBrand: string, selectedModel: string) => {
//     // dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity, selectedBrand, selectedModel } });
//     console.log('removeItem', id, selectedBrand, selectedModel);

//   };

//   const clearCart = () => {
//     dispatch({ type: 'CLEAR_CART' });
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         state,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }
