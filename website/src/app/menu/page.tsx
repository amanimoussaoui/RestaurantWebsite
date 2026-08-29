'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/menu/ProductCard';
import ProductDetailModal from '@/components/menu/ProductDetailModal';
import AiChatbotWidget from '@/components/chatbot/AiChatbotWidget';
import StripeCheckoutModal from '@/components/checkout/StripeCheckoutModal';
import { CATEGORIES, MOCK_MENU } from '@/data/mockData';
import { MenuItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Sparkles, SlidersHorizontal, Crown, UtensilsCrossed, HeartPulse, Wine, Cake } from 'lucide-react';

export default function MenuPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Dynamic Menu Items State (Populated from API + localStorage + MOCK_MENU)
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>(MOCK_MENU);

  // Mouse Drag Scroll Ref for Category Bar
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch Menu Items from API & localStorage
  const loadMenuItems = () => {
    // 1. Load custom items saved in localStorage by Admin Dashboard
    let customDishes: MenuItem[] = [];
    try {
      const saved = localStorage.getItem('custom_dishes');
      if (saved) {
        customDishes = JSON.parse(saved);
      }
    } catch {}

    // 2. Fetch from API
    fetch('/api/menu')
      .then(res => res.ok ? res.json() : null)
      .then(apiDishes => {
        if (Array.isArray(apiDishes) && apiDishes.length > 0) {
          const combined = [...apiDishes, ...customDishes, ...MOCK_MENU];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setAllMenuItems(unique);
        } else {
          const combined = [...customDishes, ...MOCK_MENU];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setAllMenuItems(unique);
        }
      })
      .catch(() => {
        const combined = [...customDishes, ...MOCK_MENU];
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        setAllMenuItems(unique);
      });
  };

  useEffect(() => {
    loadMenuItems();
    window.addEventListener('storage', loadMenuItems);
    return () => window.removeEventListener('storage', loadMenuItems);
  }, []);

  // Mouse Drag Handlers for Category Scroll Container
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoryScrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - categoryScrollRef.current.offsetLeft);
    setScrollLeft(categoryScrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll multiplier
    categoryScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Wine': return <Wine className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Filtered Menu Items
  const filteredProducts = useMemo(() => {
    return allMenuItems.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const itemName = (item.name[language] || item.name['fr']).toLowerCase();
      const itemDesc = (item.description[language] || item.description['fr']).toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchQuery = !query || itemName.includes(query) || itemDesc.includes(query);
      return matchCategory && matchQuery;
    });
  }, [allMenuItems, selectedCategory, searchQuery, language]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full border border-[var(--accent-gold)] bg-[var(--bg-secondary)] text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider">
            La Carte Gastronomique
          </span>
          <h1 className="font-gold text-4xl sm:text-5xl font-extrabold text-gold-gradient">
            {t('menuTitle')}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {t('menuSubtitle')}
          </p>
        </div>

        {/* Search Bar & Elegant Category Filter Bar (No Visible Scrollbar, Smooth Mouse Drag Translation) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[var(--bg-secondary)] border border-[var(--border-gold)] p-4 rounded-2xl shadow-lg">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-full pl-10 pr-4 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>

          {/* Category Tabs Container: Completely hidden scrollbar (.no-scrollbar) + Drag Translation */}
          <div 
            ref={categoryScrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#c9a24a] to-[#a8823a] text-[#0d1f14] shadow-md'
                  : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-gold)] hover:text-[var(--accent-gold)]'
              }`}
            >
              {t('allCategories')}
            </button>

            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              const catName = cat.name[language] || cat.name['fr'];
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c9a24a] to-[#a8823a] text-[#0d1f14] shadow-md'
                      : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-gold)] hover:text-[var(--accent-gold)]'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{catName}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 card-gold p-8 space-y-3 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-[var(--accent-gold)] mx-auto animate-pulse" />
            <h3 className="font-gold text-xl font-bold text-[var(--text-primary)]">Aucun plat trouvé</h3>
            <p className="text-xs text-[var(--text-secondary)]">Aucune création ne correspond à votre recherche. Essayez un autre mot clé.</p>
          </div>
        )}

      </main>

      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* AI Concierge Chatbot */}
      <AiChatbotWidget />

      {/* Stripe Checkout Drawer */}
      <StripeCheckoutModal />
    </div>
  );
}
