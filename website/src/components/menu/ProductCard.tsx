'use client';

import React from 'react';
import { MenuItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Flame, Clock, Plus, Sparkles, HeartPulse } from 'lucide-react';

interface ProductCardProps {
  product: MenuItem;
  onSelect: (product: MenuItem) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addItem } = useCart();

  const name = product.name[language] || product.name['fr'];
  const description = product.description[language] || product.description['fr'];

  return (
    <div className="card-gold flex flex-col justify-between overflow-hidden group">
      
      {/* Product Image & Badges Container */}
      <div
        onClick={() => onSelect(product)}
        className="relative h-52 w-full overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {product.isPopular && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--accent-gold)] text-[#0d1f14] text-[10px] font-extrabold uppercase tracking-wider shadow-md">
              ★ Popular
            </span>
          )}
          {product.isHealthy && (
            <span className="px-2 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
              <HeartPulse className="w-3 h-3" />
              <span>Healthy</span>
            </span>
          )}
        </div>

        {/* Top Right Spice Badges */}
        {product.spiceLevel > 0 && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/70 border border-[var(--accent-warm)] text-[var(--accent-warm)] text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
            <Flame className="w-3 h-3 fill-[var(--accent-warm)]" />
            <span>{Array(product.spiceLevel).fill('🌶️').join('')}</span>
          </div>
        )}

        {/* Bottom Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="font-gold font-bold text-xl text-[var(--accent-gold)] drop-shadow-md">
            {product.price.toFixed(2)} €
          </span>
          <span className="text-[11px] text-white/80 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-[var(--accent-gold)]" />
            <span>{product.preparationTimeMinutes} {t('mins')}</span>
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h3
            onClick={() => onSelect(product)}
            className="font-gold text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
          >
            {name}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="pt-2 flex items-center justify-between border-t border-[var(--border-gold)]/30">
          {product.nutrition && (
            <span className="text-[11px] text-[var(--text-secondary)] font-mono">
              {product.nutrition.calories} kcal
            </span>
          )}
          <button
            onClick={() => onSelect(product)}
            className="btn-gold px-3.5 py-1.5 text-xs flex items-center gap-1.5 ml-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Personnaliser & Ajouter</span>
          </button>
        </div>

      </div>

    </div>
  );
}
