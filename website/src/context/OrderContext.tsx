'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, CartItem, ServiceMode, Address } from '@/types';

interface OrderContextType {
  orders: Order[];
  createOrder: (
    items: CartItem[],
    serviceMode: ServiceMode,
    subtotal: number,
    deliveryFee: number,
    total: number,
    userInfo: { name: string; email: string; phone: string },
    tableNumber?: string,
    deliveryAddress?: Address
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getUserOrders: (userEmail: string) => Order[];
}

const MOCK_INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9901',
    createdAt: '2026-07-24 18:30',
    userEmail: 'amine@lornor-gourmet.fr',
    userName: 'Amine El Mansouri',
    userPhone: '+33 6 98 76 54 32',
    serviceMode: 'sur_place',
    tableNumber: '07',
    items: [
      {
        product: {
          id: 'burger-gold-truffle',
          name: { fr: "L'Or Noir Truffe Burger", ar: 'برجر الكمأة والذهب الأسود', en: 'Black Gold Truffle Burger' },
          description: { fr: 'Double steak Wagyu 180g', ar: 'لحم واغيو', en: 'Double Wagyu beef patty' },
          price: 24.90,
          category: 'burgers',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
          spiceLevel: 1,
          isHealthy: false,
          preparationTimeMinutes: 15
        },
        quantity: 1
      },
      {
        product: {
          id: 'frites-truffe-parmesan',
          name: { fr: 'Frites à la Truffe & Parmesan Doré', ar: 'بطاطس مقلية بالكمأة والبارميزان', en: 'Truffle & Golden Parmesan Fries' },
          description: { fr: 'Frites fraîches', ar: 'بطاطس طازجة', en: 'Belgian fries' },
          price: 8.50,
          category: 'sides',
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
          spiceLevel: 0,
          isHealthy: false,
          preparationTimeMinutes: 7
        },
        quantity: 1
      }
    ],
    subtotal: 33.40,
    deliveryFee: 0,
    total: 33.40,
    status: 'preparing',
    paymentMethod: 'stripe',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-9884',
    createdAt: '2026-07-24 16:15',
    userEmail: 'amine@lornor-gourmet.fr',
    userName: 'Amine El Mansouri',
    userPhone: '+33 6 98 76 54 32',
    serviceMode: 'livraison',
    deliveryAddress: {
      id: 'addr-1',
      title: 'Résidence Principale',
      street: '42 Avenue des Champs-Élysées',
      city: 'Paris',
      zipCode: '75008',
      phone: '+33 6 98 76 54 32',
      isDefault: true
    },
    items: [
      {
        product: {
          id: 'healthy-bowl-saumon-keto',
          name: { fr: 'Bowl Saumon Sauvage Keto & Avocat', ar: 'وعاء السلمون البري كيتو والأفوكادو', en: 'Keto Wild Salmon & Avocado Bowl' },
          description: { fr: 'Filet de saumon', ar: 'شرائح سلمون', en: 'Grilled wild salmon' },
          price: 22.50,
          category: 'healthy',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          spiceLevel: 0,
          isHealthy: true,
          preparationTimeMinutes: 10
        },
        quantity: 2
      }
    ],
    subtotal: 45.00,
    deliveryFee: 3.50,
    total: 48.50,
    status: 'delivered',
    paymentMethod: 'stripe',
    paymentStatus: 'paid'
  }
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(MOCK_INITIAL_ORDERS);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('or_noir_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('or_noir_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (
    items: CartItem[],
    serviceMode: ServiceMode,
    subtotal: number,
    deliveryFee: number,
    total: number,
    userInfo: { name: string; email: string; phone: string },
    tableNumber?: string,
    deliveryAddress?: Address
  ): Order => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userEmail: userInfo.email,
      userName: userInfo.name,
      userPhone: userInfo.phone,
      serviceMode,
      tableNumber,
      deliveryAddress,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'pending',
      paymentMethod: 'stripe',
      paymentStatus: 'paid'
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const getUserOrders = (userEmail: string) => {
    return orders.filter(o => o.userEmail === userEmail);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};
