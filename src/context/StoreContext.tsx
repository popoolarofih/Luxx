'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('luxe-cart');
    const savedWishlist = localStorage.getItem('luxe-wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('luxe-cart', JSON.stringify(cart));
    localStorage.setItem('luxe-wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: Number(product.price), quantity: 1, image_url: product.image_url }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, toggleWishlist, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
