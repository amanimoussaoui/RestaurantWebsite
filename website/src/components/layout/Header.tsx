'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types';
import { 
  ShoppingBag, 
  User as UserIcon, 
  Sun, 
  Moon, 
  Globe, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  Crown,
  ShieldCheck
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { items, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const navItems = [
    { href: '/', label: t('navHome') },
    { href: '/menu', label: t('navMenu') },
    { href: '/healthy', label: t('navHealthy') },
    { href: '/reviews', label: t('navReviews') },
    { href: '/profile', label: t('navProfile') }
  ];

  if (user?.role === 'admin') {
    navItems.push({ href: '/admin', label: '🛡️ Dashboard Admin' });
  }

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-[var(--border-gold)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left / Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a24a] via-[#f3e5ab] to-[#a8823a] p-0.5 shadow-[0_0_15px_rgba(201,162,74,0.4)] group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src="/logo.png"
              alt="Le Crispy Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-gold text-xl font-bold tracking-wider text-gold-gradient">
              {t('brandName')}
            </span>
            <span className="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">
              {t('brandSubtitle')}
            </span>
          </div>
        </Link>

        {/* Center / Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-semibold tracking-wide transition-colors py-1 ${
                  isActive
                    ? 'text-[var(--accent-gold)] font-bold'
                    : 'text-[var(--text-primary)] hover:text-[var(--accent-gold-light)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right / Actions & Controls */}
        <div className="flex items-center gap-4">
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-[var(--border-gold)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
              title={t('language')}
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-xl shadow-xl py-1.5 z-50">
                <button
                  onClick={() => handleLangSelect('fr')}
                  className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-[var(--accent-gold)]/10 ${
                    language === 'fr' ? 'text-[var(--accent-gold)] font-bold' : 'text-[var(--text-primary)]'
                  }`}
                >
                  <span>Français</span>
                  <span>🇫🇷</span>
                </button>
                <button
                  onClick={() => handleLangSelect('ar')}
                  className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-[var(--accent-gold)]/10 ${
                    language === 'ar' ? 'text-[var(--accent-gold)] font-bold' : 'text-[var(--text-primary)]'
                  }`}
                >
                  <span>العربية</span>
                  <span>🇸🇦</span>
                </button>
                <button
                  onClick={() => handleLangSelect('en')}
                  className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-[var(--accent-gold)]/10 ${
                    language === 'en' ? 'text-[var(--accent-gold)] font-bold' : 'text-[var(--text-primary)]'
                  }`}
                >
                  <span>English</span>
                  <span>🇬🇧</span>
                </button>
              </div>
            )}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-colors"
            title={theme === 'dark' ? t('lightTheme') : t('darkTheme')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent-gold)]" />
            )}
          </button>

          {/* User Profile Button */}
          <Link
            href={user ? '/profile' : '/login'}
            className="p-2 rounded-full border border-[var(--border-gold)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors relative"
            title={t('navProfile')}
          >
            {user?.role === 'admin' ? (
              <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
            ) : (
              <UserIcon className="w-4 h-4 text-[var(--accent-gold)]" />
            )}
          </Link>

          {/* Cart Icon & Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#a8823a] text-[#0d1f14] hover:shadow-[0_0_15px_rgba(201,162,74,0.5)] transition-all"
            title={t('cartTitle')}
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--accent-warm)] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-[var(--bg-primary)]">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--accent-gold)]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-gold)] px-4 pt-2 pb-6 space-y-3">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold py-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
