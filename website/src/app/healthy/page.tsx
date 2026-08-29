'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NutritionFactCard from '@/components/healthy/NutritionFactCard';
import ProductDetailModal from '@/components/menu/ProductDetailModal';
import AiChatbotWidget from '@/components/chatbot/AiChatbotWidget';
import StripeCheckoutModal from '@/components/checkout/StripeCheckoutModal';
import { MOCK_MENU } from '@/data/mockData';
import { MenuItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { HeartPulse, Dumbbell, SlidersHorizontal, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export default function HealthyPage() {
  const { language, t } = useLanguage();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU);

  const [maxCalories, setMaxCalories] = useState<number>(750);
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [minProtein, setMinProtein] = useState<number>(0);
  const [maxCarbs, setMaxCarbs] = useState<number>(100);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Fetch PostgreSQL & localStorage custom dishes for real-time sync with Admin Dashboard
  const loadHealthyMenuItems = () => {
    let customDishes: MenuItem[] = [];
    try {
      const saved = localStorage.getItem('custom_dishes');
      if (saved) customDishes = JSON.parse(saved);
    } catch {}

    fetch('/api/menu')
      .then(res => res.ok ? res.json() : null)
      .then(apiDishes => {
        if (Array.isArray(apiDishes) && apiDishes.length > 0) {
          const combined = [...apiDishes, ...customDishes, ...MOCK_MENU];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setMenuItems(unique);
        } else {
          const combined = [...customDishes, ...MOCK_MENU];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setMenuItems(unique);
        }
      })
      .catch(() => {
        const combined = [...customDishes, ...MOCK_MENU];
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        setMenuItems(unique);
      });
  };

  useEffect(() => {
    loadHealthyMenuItems();
    window.addEventListener('storage', loadHealthyMenuItems);
    return () => window.removeEventListener('storage', loadHealthyMenuItems);
  }, []);

  // Filter healthy & gym menu items
  const healthyProducts = useMemo(() => {
    return menuItems.filter(item => {
      // Must be healthy, categorized in healthy/gym, or contain diet tags/nutrition
      const isHealthyItem = 
        item.isHealthy || 
        item.category === 'healthy' || 
        item.category === 'gym' || 
        item.category === 'salades' ||
        (item.nutrition && item.nutrition.protein > 0);

      if (!isHealthyItem) return false;

      const calories = item.nutrition?.calories || 400;
      const protein = item.nutrition?.protein || 0;
      const carbs = item.nutrition?.carbs || 0;

      const matchesCalories = calories <= maxCalories;
      const matchesProtein = protein >= minProtein;
      const matchesCarbs = carbs <= maxCarbs;

      const matchesDiet =
        selectedDiet === 'all' ||
        (item.dietTags && item.dietTags.includes(selectedDiet as any));

      return matchesCalories && matchesProtein && matchesCarbs && matchesDiet;
    });
  }, [menuItems, maxCalories, selectedDiet, minProtein, maxCarbs]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500 bg-emerald-950/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <HeartPulse className="w-4 h-4" />
            <span>Nutrition & Haute Gastronomie Le Crispy</span>
          </div>
          <h1 className="font-gold text-4xl sm:text-5xl font-extrabold text-gold-gradient">
            Espace Healthy & Fitness Gym
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Découvrez nos créations équilibrées enrichies en protéines, pauvres en glucides et préparées à la minute par notre Chef.
          </p>
        </div>

        {/* Advanced Filters Panel */}
        <div className="card-gold p-6 space-y-6 bg-[var(--bg-secondary)] border-[var(--border-gold)]">
          
          <div className="flex items-center gap-2 border-b border-[var(--border-gold)]/40 pb-3">
            <SlidersHorizontal className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="font-gold text-lg font-bold text-[var(--text-primary)]">
              Filtres Diététiques & Macronutriments (Prot, Carbs, Fat)
            </h3>
          </div>

          {/* Diet Buttons Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              {t('dietType')}
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: t('allDiets') },
                { id: 'high_protein', label: t('dietHighProtein') },
                { id: 'keto', label: t('dietKeto') },
                { id: 'diabetic', label: t('dietDiabetic') },
                { id: 'low_fat', label: t('dietLowFat') },
                { id: 'vegetarian', label: t('dietVegetarian') },
                { id: 'gluten_free', label: t('dietGlutenFree') }
              ].map(diet => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedDiet === diet.id
                      ? 'bg-emerald-600 text-white shadow-lg border border-emerald-400'
                      : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-gold)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Calories Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[var(--text-secondary)]">{t('maxCalories')}</span>
                <span className="text-[var(--accent-gold)] font-mono">{maxCalories} kcal</span>
              </div>
              <input
                type="range"
                min={300}
                max={900}
                step={25}
                value={maxCalories}
                onChange={e => setMaxCalories(parseInt(e.target.value))}
                className="w-full accent-[var(--accent-gold)]"
              />
            </div>

            {/* Protein Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[var(--text-secondary)]">{t('minProtein')}</span>
                <span className="text-emerald-400 font-mono">{minProtein} g</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={minProtein}
                onChange={e => setMinProtein(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Carbs Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[var(--text-secondary)]">{t('maxCarbs')}</span>
                <span className="text-amber-400 font-mono">{maxCarbs} g</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={maxCarbs}
                onChange={e => setMaxCarbs(parseInt(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

          </div>

        </div>

        {/* Healthy Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-gold text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-emerald-400" />
              <span>Plats Équilibrés & Gym ({healthyProducts.length})</span>
            </h2>
          </div>

          {healthyProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthyProducts.map(product => (
                <NutritionFactCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="card-gold p-12 text-center space-y-3 bg-[var(--bg-secondary)]">
              <ShieldAlert className="w-12 h-12 text-[var(--accent-gold)] mx-auto" />
              <h3 className="font-gold text-xl font-bold text-[var(--text-primary)]">Aucun plat ne correspond à vos filtres</h3>
              <p className="text-xs text-[var(--text-secondary)]">Essayez d'augmenter le seuil de calories ou de diminuer l'exigence en protéines.</p>
              <button
                onClick={() => {
                  setMaxCalories(750);
                  setMinProtein(0);
                  setMaxCarbs(100);
                  setSelectedDiet('all');
                }}
                className="btn-gold px-4 py-2 text-xs inline-block mt-2 font-bold"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
      <AiChatbotWidget />
      <StripeCheckoutModal />
    </div>
  );
}
