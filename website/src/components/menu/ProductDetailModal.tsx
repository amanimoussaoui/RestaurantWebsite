'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Clock, Flame, HeartPulse, ShoppingBag, Check, Sparkles, Utensils, Wine, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: MenuItem | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');

  // --- CUSTOMIZATION OPTIONS STATE ---
  // 1. Sauces Selection (Radio/Single choice)
  const SAUCE_OPTIONS = [
    { id: 'sauce-maison', label: 'Sauce Burger Le Crispy (Maison)', price: 0 },
    { id: 'sauce-truffe', label: 'Sauce Truffe Noire d\'Alba', price: 1.50 },
    { id: 'sauce-bbq', label: 'Sauce BBQ Fumée au Miel', price: 0 },
    { id: 'sauce-algerienne', label: 'Sauce Algérienne Épicée', price: 0 },
    { id: 'sauce-samourai', label: 'Sauce Samouraï Piquante', price: 0 },
    { id: 'sauce-mayo', label: 'Sauce Mayo-Moutarde à l\'Ancienne', price: 0 }
  ];
  const [selectedSauce, setSelectedSauce] = useState(SAUCE_OPTIONS[0]);

  // 2. Base Vegetables / Crudités (Checkboxes)
  const SALAD_OPTIONS = [
    { id: 'laitue', label: 'Laitue Croquante Bio' },
    { id: 'tomates', label: 'Tomates Fraîches' },
    { id: 'oignons', label: 'Oignons Rouges' },
    { id: 'cornichons', label: 'Cornichons D-Pickles' }
  ];
  const [selectedSalads, setSelectedSalads] = useState<string[]>(['laitue', 'tomates', 'oignons', 'cornichons']);

  // 3. Gourmet Extras & Cheeses (Checkboxes with Price Modifiers)
  const EXTRA_OPTIONS = [
    { id: 'cheddar', label: 'Extra Cheddar Fondu Ambré', price: 1.50 },
    { id: 'comte', label: 'Double Comté Affiné 24 mois', price: 2.50 },
    { id: 'bacon', label: 'Bacon Grillé au Miel d\'Acacia', price: 2.00 },
    { id: 'oignons-confits', label: 'Oignons Confits Caramelisés', price: 1.00 },
    { id: 'truffe-extra', label: 'Paillettes de Truffe Noire', price: 3.00 }
  ];
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // 4. Drink Selection (Radio choice)
  const DRINK_OPTIONS = [
    { id: 'drink-none', label: 'Sans Boisson', price: 0 },
    { id: 'drink-coca', label: 'Coca-Cola Zéro 33cl', price: 2.50 },
    { id: 'drink-fanta', label: 'Fanta Orange 33cl', price: 2.50 },
    { id: 'drink-elixir', label: 'Élixir Citron, Gingembre & Or 33cl', price: 4.50 },
    { id: 'drink-water', label: 'Eau Minérale Gazéifiée 50cl', price: 1.50 }
  ];
  const [selectedDrink, setSelectedDrink] = useState(DRINK_OPTIONS[0]);

  if (!product) return null;

  const name = product.name[language] || product.name['fr'];
  const description = product.description[language] || product.description['fr'];

  // Calculate Extra Costs
  const extrasCost = selectedExtras.reduce((sum, extraId) => {
    const found = EXTRA_OPTIONS.find(e => e.id === extraId);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitPrice = product.price + selectedSauce.price + extrasCost + selectedDrink.price;
  const totalPrice = unitPrice * quantity;

  // Toggle Checkbox Helpers
  const toggleSalad = (id: string) => {
    setSelectedSalads(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleAddToCart = () => {
    const saladLabels = selectedSalads.map(s => SALAD_OPTIONS.find(o => o.id === s)?.label).join(', ');
    const extraLabels = selectedExtras.map(e => EXTRA_OPTIONS.find(o => o.id === e)?.label).join(', ');

    const formattedNotes = [
      `Sauce: ${selectedSauce.label}`,
      saladLabels ? `Garnitures: ${saladLabels}` : 'Sans garnitures',
      extraLabels ? `Suppléments: ${extraLabels}` : '',
      selectedDrink.id !== 'drink-none' ? `Boisson: ${selectedDrink.label}` : '',
      customNotes ? `Note: ${customNotes}` : ''
    ].filter(Boolean).join(' | ');

    // Add product to cart with modified total price item
    const customizedProduct = {
      ...product,
      price: unitPrice
    };

    addItem(customizedProduct, quantity, formattedNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(201,162,74,0.4)] max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:text-[var(--accent-gold)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-black/40 to-black/60" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                {product.category}
              </span>
              <h2 className="font-gold text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
                {name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-300 block font-mono">Prix Unitaire: {unitPrice.toFixed(2)} €</span>
              <span className="font-gold font-extrabold text-2xl text-[var(--accent-gold)]">
                {totalPrice.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left text-xs">
          
          <p className="text-stone-300 leading-relaxed text-xs">
            {description}
          </p>

          {/* Quick Badges Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>{product.preparationTimeMinutes} min de prép.</span>
            </div>
            {product.spiceLevel > 0 && (
              <div className="flex items-center gap-2 text-[var(--accent-warm)] font-bold">
                <Flame className="w-4 h-4 fill-[var(--accent-warm)]" />
                <span>Piquant: {product.spiceLevel}/3</span>
              </div>
            )}
            {product.isHealthy && (
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <HeartPulse className="w-4 h-4" />
                <span>Gamme Healthy</span>
              </div>
            )}
          </div>

          {/* 1. SAUCE SELECTION (RADIO GROUP) */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-gold)]/30">
            <div className="flex justify-between items-center">
              <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)] flex items-center gap-1.5">
                <Utensils className="w-4 h-4" />
                <span>1. Choix de la Sauce (Obligatoire)</span>
              </h4>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-mono">1 au choix</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAUCE_OPTIONS.map(sauce => {
                const isSelected = selectedSauce.id === sauce.id;
                return (
                  <button
                    key={sauce.id}
                    type="button"
                    onClick={() => setSelectedSauce(sauce)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[var(--accent-gold)]/15 border-[var(--accent-gold)] text-white font-bold'
                        : 'bg-[var(--bg-primary)] border-[var(--border-gold)]/30 text-stone-300 hover:border-[var(--accent-gold)]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[#0d1f14]' : 'border-stone-500'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{sauce.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold">
                      {sauce.price > 0 ? `+${sauce.price.toFixed(2)} €` : 'Inclus'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. BASE SALAD & VEGETABLES (CHECKBOX GROUP) */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-gold)]/30">
            <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>2. Garnitures & Crudités de Base (Cocher / Décocher)</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SALAD_OPTIONS.map(salad => {
                const isSelected = selectedSalads.includes(salad.id);
                return (
                  <button
                    key={salad.id}
                    type="button"
                    onClick={() => toggleSalad(salad.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-[var(--bg-primary)] border-stone-800 text-stone-400 line-through'
                    }`}
                  >
                    <span>{salad.label}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isSelected ? 'border-emerald-500 bg-emerald-500 text-black' : 'border-stone-600'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. GOURMET EXTRAS & CHEESES (CHECKBOX WITH PRICE MODIFIER) */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-gold)]/30">
            <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)] flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>3. Suppléments Gourmands & Fromages (+ Extra)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXTRA_OPTIONS.map(extra => {
                const isSelected = selectedExtras.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[var(--accent-gold)]/20 border-[var(--accent-gold)] text-white font-bold'
                        : 'bg-[var(--bg-primary)] border-[var(--border-gold)]/30 text-stone-300 hover:border-[var(--accent-gold)]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[#0d1f14]' : 'border-stone-500'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{extra.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold">
                      +{extra.price.toFixed(2)} €
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. DRINK SELECTION (COMBO MEAL) */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-gold)]/30">
            <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)] flex items-center gap-1.5">
              <Wine className="w-4 h-4" />
              <span>4. Choix de la Boisson (Optionnel)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DRINK_OPTIONS.map(drink => {
                const isSelected = selectedDrink.id === drink.id;
                return (
                  <button
                    key={drink.id}
                    type="button"
                    onClick={() => setSelectedDrink(drink)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[var(--accent-gold)]/15 border-[var(--accent-gold)] text-white font-bold'
                        : 'bg-[var(--bg-primary)] border-[var(--border-gold)]/30 text-stone-300 hover:border-[var(--accent-gold)]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[#0d1f14]' : 'border-stone-500'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{drink.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold">
                      {drink.price > 0 ? `+${drink.price.toFixed(2)} €` : 'Inclus'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions Note */}
          <div className="space-y-2 pt-2 border-t border-[var(--border-gold)]/30">
            <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
              Remarques / Demandes Spéciales
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={e => setCustomNotes(e.target.value)}
              placeholder="Ex: Sauce à part, pain bien toasté..."
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-[var(--border-gold)] bg-[var(--bg-primary)] flex items-center justify-between gap-4">
          
          {/* Quantity Counter */}
          <div className="flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-full px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-[var(--accent-gold)] hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm text-white px-2 font-mono">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-[var(--accent-gold)] hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-gold py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ajouter au Panier • {totalPrice.toFixed(2)} €</span>
          </button>

        </div>

      </div>
    </div>
  );
}
