import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

export function cartReducer(cart, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = cart.find((item) => item.idMeal === action.item.idMeal);
      if (existing) {
        return cart.map((item) =>
          item.idMeal === action.item.idMeal
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...cart, { ...action.item, quantity: 1 }];
    }
    case "INCREMENT":
      return cart.map((item) =>
        item.idMeal === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    case "DECREMENT":
      return cart
        .map((item) =>
          item.idMeal === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    case "REMOVE_ITEM":
      return cart.filter((item) => item.idMeal !== action.id);
    case "CLEAR_CART":
      return [];
    default:
      throw new Error(`Unknown cart action: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const value = useMemo(() => ({ cart, dispatch }), [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
