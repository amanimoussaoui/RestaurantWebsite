'use client';

import React from 'react';
import { MenuItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { HeartPulse, Plus, Dumbbell, ShieldAlert, Sparkles } from 'lucide-react';

interface NutritionFactCardProps {
  product: MenuItem;
  onSelect: (product: MenuItem) => void;
}

export default function NutritionFactCard({ product, onSelect }: NutritionFactCardProps) {
  const { language, t } = useLanguage();
  const { addItem } = useCart();

  const name = product.name[language] || product.name['fr'];
  const description = product.description[language] || product.description['fr'];
  const nutrition = product.nutrition || { calories: 400, protein: 30, carbs: 20, fat: 15 };

  return (
    <div className="card-gold flex flex-col justify-between overflow-hidden group border-emerald-900/40">
      
      {/* Image & Diet Badges */}
      <div
        onClick={() => onSelect(product)}
        className="relative h-48 w-full overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14] via-transparent to-transparent opacity-70" />

        {/* Diet Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 max-w-[85%]">
          {product.dietTags?.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-500/40 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md"
            >
              {tag.replace('_', ' ')}
            </span>
          ))}
        </div>

        {/* Calories Badge */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs font-black font-mono shadow-md backdrop-blur-md">
          {nutrition.calories} kcal
        </div>
      </div>

      {/* Details & Nutrition Table */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3
              onClick={() => onSelect(product)}
              className="font-gold text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
            >
              {name}
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Macro Nutrients Facts Grid */}
        <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 text-center text-xs">
          <div className="p-1">
            <div className="text-[10px] text-[var(--text-secondary)] flex items-center justify-center gap-1">
              <Dumbbell className="w-3 h-3 text-emerald-400" />
              <span>Prot.</span>
            </div>
            <div className="font-bold text-emerald-400 font-mono">{nutrition.protein}g</div>
          </div>
          <div className="p-1 border-x border-[var(--border-gold)]/20">
            <div className="text-[10px] text-[var(--text-secondary)]">Carbs</div>
            <div className="font-bold text-amber-300 font-mono">{nutrition.carbs}g</div>
          </div>
          <div className="p-1">
            <div className="text-[10px] text-[var(--text-secondary)]">Fat</div>
            <div className="font-bold text-rose-300 font-mono">{nutrition.fat}g</div>
          </div>
        </div>

        {/* Footer Add Button & Price */}
        <div className="pt-2 flex items-center justify-between border-t border-[var(--border-gold)]/30">
          <span className="font-gold font-bold text-lg text-[var(--accent-gold)]">
            {product.price.toFixed(2)} €
          </span>

          <button
            onClick={() => addItem(product)}
            className="btn-gold px-3.5 py-1.5 text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('addToCart')}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
