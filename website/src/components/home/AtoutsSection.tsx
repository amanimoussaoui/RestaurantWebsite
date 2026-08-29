'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Truck, Sparkles, ChefHat } from 'lucide-react';

export default function AtoutsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-16 space-y-3"
      >
        <h2 className="font-gold text-3xl sm:text-5xl font-bold text-gold-gradient">
          L'Excellence Le Crispy
        </h2>
        <div className="gold-divider">
          <Sparkles className="gold-divider-icon w-6 h-6 text-amber-300 animate-spin" />
        </div>
        <p className="text-sm sm:text-base text-[var(--text-secondary)]">
          Nous réinventons les codes du fast-food en appliquant la rigueur et l'élégance de la haute gastronomie 5 étoiles.
        </p>
      </motion.div>

      {/* 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Fast Delivery */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="card-gold p-8 text-center space-y-4 relative group hover:border-[var(--accent-gold)] shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(201,162,74,0.4)] group-hover:scale-110 transition-transform">
            <Truck className="w-10 h-10 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-gold text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
            {t('atout1Title')}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {t('atout1Desc')}
          </p>
        </motion.div>

        {/* Card 2 (Central): Fresh Organic Ingredients (High-res Photo Image) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="card-gold p-8 text-center space-y-4 relative group border-[var(--accent-gold)] shadow-[0_0_35px_rgba(201,162,74,0.3)]"
        >
          <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-[var(--accent-gold-light)] shadow-[0_0_25px_rgba(201,162,74,0.6)] group-hover:scale-110 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80"
              alt="Ingrédients Frais Le Crispy"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-gold text-2xl font-bold text-[var(--accent-gold)]">
            {t('atout2Title')}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {t('atout2Desc')}
          </p>
        </motion.div>

        {/* Card 3: Artisanal Homemade */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="card-gold p-8 text-center space-y-4 relative group hover:border-[var(--accent-gold)] shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(201,162,74,0.4)] group-hover:scale-110 transition-transform">
            <ChefHat className="w-10 h-10 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-gold text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
            {t('atout3Title')}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {t('atout3Desc')}
          </p>
        </motion.div>

      </div>

    </section>
  );
}
