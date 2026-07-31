import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [vendorId, setVendorId] = useState(null);

  const addItem = (item, vId) => {
    if (vendorId && vendorId !== vId) {
      // Typically, clear cart or warn user, here we just clear it for simplicity
      setCartItems([{ ...item, qty: 1 }]);
      setVendorId(vId);
      return;
    }
    setVendorId(vId);
    setCartItems(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (itemId) => {
    setCartItems(prev => {
      const existing = prev.find(i => i._id === itemId);
      if (existing && existing.qty > 1) {
        return prev.map(i => i._id === itemId ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter(i => i._id !== itemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setVendorId(null);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, vendorId, addItem, removeItem, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
