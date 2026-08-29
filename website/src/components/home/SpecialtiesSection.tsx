'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Crown, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

export default function SpecialtiesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-28">
      
      {/* Row 1: Image Left, Text Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border-gold)] shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
              alt="Art du Burger Le Crispy"
              className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">Le Crispy Savoir-Faire</span>
              <h4 className="font-gold text-2xl sm:text-3xl font-bold text-white mt-1">Saisie au Charbon de Bois</h4>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--accent-gold)] p-4 rounded-xl shadow-2xl">
            <Flame className="w-8 h-8 text-[var(--accent-warm)]" />
            <div>
              <div className="text-xs font-bold text-[var(--accent-gold)]">Flamme Directe</div>
              <div className="text-[11px] text-[var(--text-secondary)]">Saisie à 350°C</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] tracking-widest uppercase">
            <Crown className="w-4 h-4" />
            <span>Création Le Crispy</span>
          </div>
          <h2 className="font-gold text-3xl sm:text-5xl font-bold text-gold-gradient leading-tight">
            L'Art de la Viande Wagyu & de la Truffe d'Alba
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Chaque steak Le Crispy est sélectionné parmi les plus beaux élevages certifiés. Notre brigade associe la jutosité du bœuf Wagyu maturé à la délicatesse des truffes fraîches râpées à la commande.
          </p>

          <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-primary)]">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span>Pain brioché artisanal au levain doré à l'or fin 24k</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span>Fromages AOP affinés pendant au moins 18 à 24 mois</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span>Sauces Le Crispy secrètes mijotées pendant 6 heures</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link href="/menu" className="btn-gold px-7 py-3.5 text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
              <span>Découvrir la Sélection Burgers</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Text Left, Image Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Nouveauté Le Crispy</span>
          </div>
          <h2 className="font-gold text-3xl sm:text-5xl font-bold text-gold-gradient leading-tight">
            Des Options Healthy & Fitness Sans Compromis
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Manger équilibré chez Le Crispy est une expérience savoureuse. Nos Bowls Kéto et Salades Royales proposent des apports protéinés élevés et un contrôle des calories.
          </p>

          <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-primary)]">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span>Macronutriments mesurés avec précision pour les athlètes</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span>Adapté aux régimes Kéto, végétariens et diabétiques</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link href="/healthy" className="btn-gold-outline px-7 py-3.5 text-xs sm:text-sm inline-flex items-center gap-2 hover:scale-105 transition-all">
              <span>Explorer la carte Healthy & Fitness</span>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative order-1 lg:order-2"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border-gold)] shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
              alt="Bowl Saumon Le Crispy"
              className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">Protéines & Fraîcheur</span>
              <h4 className="font-gold text-2xl sm:text-3xl font-bold text-white mt-1">Bowl Saumon Sauvage Le Crispy</h4>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
