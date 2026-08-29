'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Address } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, role?: 'customer' | 'admin', name?: string, phone?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updated: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const DEFAULT_MOCK_USER: UserProfile = {
  id: 'usr-amani-001',
  name: 'moussaoui amani',
  email: 'amanimoussaoui06@gmail.com',
  phone: '+216 27 500 246',
  whatsappPhone: '+33 6 12 34 56 78',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'customer',
  preferredLanguage: 'fr',
  addresses: [
    {
      id: 'addr-dormans-1',
      title: 'Résidence Principale (Domicile)',
      street: '1 rue Jean de Dormans',
      city: 'Dormans',
      zipCode: '51700',
      phone: '+216 27 500 246',
      isDefault: true
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_MOCK_USER);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('or_noir_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(DEFAULT_MOCK_USER);
      }
    } catch {
      setUser(DEFAULT_MOCK_USER);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('or_noir_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('or_noir_user');
    }
  }, [user]);

  const login = async (email: string, role: 'customer' | 'admin' = 'customer', name?: string, phone?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const displayName = name || (cleanEmail.includes('amani') ? 'moussaoui amani' : cleanEmail.split('@')[0]);
    const displayPhone = phone || '+216 27 500 246';

    try {
      // Call PostgreSQL Auth API to save/authenticate user in PostgreSQL
      const endpoint = name ? '/api/auth/register' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, role, name: displayName, phone: displayPhone })
      });

      if (res.ok) {
        const dbUser = await res.json();
        setUser({
          id: dbUser.id || `usr-${Date.now()}`,
          name: dbUser.name || displayName,
          email: dbUser.email || cleanEmail,
          phone: dbUser.phone || displayPhone,
          whatsappPhone: dbUser.whatsappPhone || displayPhone || '+33 6 12 34 56 78',
          avatarUrl: dbUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          role: (dbUser.role as any) || role,
          preferredLanguage: (dbUser.preferredLanguage as any) || 'fr',
          addresses: (dbUser.addresses && dbUser.addresses.length > 0) ? dbUser.addresses : [
            {
              id: 'addr-dormans-1',
              title: 'Résidence Principale',
              street: '1 rue Jean de Dormans',
              city: 'Dormans',
              zipCode: '51700',
              phone: displayPhone,
              isDefault: true
            }
          ]
        });
        return;
      }
    } catch (e) {
      console.error('Error connecting to PostgreSQL Auth API:', e);
    }

    // Fallback local state creation
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      role,
      name: displayName,
      phone: displayPhone,
      whatsappPhone: '+33 6 12 34 56 78',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      preferredLanguage: 'fr',
      addresses: [
        {
          id: 'addr-dormans-1',
          title: 'Résidence Principale',
          street: '1 rue Jean de Dormans',
          city: 'Dormans',
          zipCode: '51700',
          phone: displayPhone,
          isDefault: true
        }
      ]
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const nextUser = { ...user, ...updated };
    setUser(nextUser);

    // Save to PostgreSQL DB
    fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: nextUser.email,
        name: nextUser.name,
        phone: nextUser.phone,
        avatarUrl: nextUser.avatarUrl
      })
    }).catch(err => console.error('Erreur mise à jour utilisateur PostgreSQL:', err));
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    const addresses = addressData.isDefault
      ? user.addresses.map(a => ({ ...a, isDefault: false }))
      : user.addresses;
    const nextUser = {
      ...user,
      addresses: [...addresses, newAddr]
    };
    setUser(nextUser);
  };

  const removeAddress = (addressId: string) => {
    if (!user) return;
    const nextUser = {
      ...user,
      addresses: user.addresses.filter(a => a.id !== addressId)
    };
    setUser(nextUser);
  };

  const setDefaultAddress = (addressId: string) => {
    if (!user) return;
    const nextUser = {
      ...user,
      addresses: user.addresses.map(a => ({
        ...a,
        isDefault: a.id === addressId
      }))
    };
    setUser(nextUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      updateUser,
      addAddress,
      removeAddress,
      setDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
