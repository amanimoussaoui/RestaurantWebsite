'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, ServiceMode, Address } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: MenuItem, quantity?: number, notes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  serviceMode: ServiceMode;
  setServiceMode: (mode: ServiceMode) => void;
  tableNumber: string;
  setTableNumber: (table: string) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  deliveryAddress: Address | null;
  setDeliveryAddress: (address: Address | null) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [serviceMode, setServiceMode] = useState<ServiceMode>('sur_place');
  const [tableNumber, setTableNumber] = useState<string>('07');
  const [pickupTime, setPickupTime] = useState<string>('19:45');
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load saved cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('or_noir_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch {
      // Ignore fallback
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('or_noir_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: MenuItem, quantity = 1, notes?: string) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      }
      return [...prev, { product, quantity, notes }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = serviceMode === 'livraison' && subtotal > 0 ? 3.50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        serviceMode,
        setServiceMode,
        tableNumber,
        setTableNumber,
        pickupTime,
        setPickupTime,
        deliveryAddress,
        setDeliveryAddress,
        subtotal,
        deliveryFee,
        total,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
