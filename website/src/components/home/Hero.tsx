'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ArrowRight, QrCode, ShieldCheck, Flame, Star } from 'lucide-react';

interface HeroProps {
  onOpenQrModal: () => void;
}

export default function Hero({ onOpenQrModal }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Background Video 2 — Crystal Clear & High Quality Visuals */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-110 saturate-110 scale-105"
      >
        <source src="/videos/video2.mp4" type="video/mp4" />
      </video>

      {/* Subtle Transparent Overlay Gradient for Perfect Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f14]/90 via-[#0d1f14]/65 to-black/40 z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto w-full text-left space-y-6">
        
        {/* Dynamic Animations */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl"
        >
          
          <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-[var(--accent-gold)] bg-[var(--bg-secondary)]/90 text-[var(--accent-gold)] text-xs font-extrabold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(201,162,74,0.3)]">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Fast-Food Gourmet 5 Étoiles</span>
          </div>

          {/* Title */}
          <h1 className="font-gold text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
            Le Crispy{' '}
            <span className="text-gold-gradient block mt-2 drop-shadow-2xl">
              Haute Cuisine
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[var(--text-primary)] max-w-xl leading-relaxed font-light opacity-95">
            Recettes signatures croustillantes, bœuf Wagyu maturé 28 jours, truffe noire d'Alba et pain brioché artisanal doré à l'or fin 24k.
          </p>

          {/* Animated Action Buttons */}
          <div className="flex flex-wrap items-center gap-5 pt-4">
            <Link
              href="/menu"
              className="btn-gold px-9 py-4 text-base font-extrabold flex items-center gap-3 shadow-[0_0_35px_rgba(201,162,74,0.5)] hover:scale-105 transition-all duration-300"
            >
              <span>{t('heroOrderCta')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={onOpenQrModal}
              className="btn-gold-outline px-7 py-4 text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all"
            >
              <QrCode className="w-5 h-5 text-[var(--accent-gold)]" />
              <span>{t('heroBookTableCta')}</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[var(--border-gold)]/50 max-w-md">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-[var(--accent-gold)] shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-[var(--text-primary)] block">100% Bio</span>
                <span className="text-[var(--text-secondary)]">Ingrédients d'origine</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Flame className="w-6 h-6 text-[var(--accent-warm)] shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-[var(--text-primary)] block">Feu de Bois</span>
                <span className="text-[var(--text-secondary)]">Saisie à 350°C</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Star className="w-6 h-6 text-[var(--accent-gold)] fill-[var(--accent-gold)] shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-[var(--text-primary)] block">4.9 / 5</span>
                <span className="text-[var(--text-secondary)]">+1,400 avis</span>
              </div>
            </div>
          </div>

        </motion.div>

      </div>

    </section>
  );
}
