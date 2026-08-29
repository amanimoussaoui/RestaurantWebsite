'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Language } from '@/types';
import { Globe, Sun, Moon, Sparkles, ArrowRight, Flame } from 'lucide-react';

export default function WelcomePage() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 select-none bg-black overflow-y-auto">
      
      {/* Background Video (video1.mp4) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover scale-105 filter brightness-90 contrast-105 pointer-events-none"
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay Gradient for Legibility */}
      <div className="fixed inset-0 bg-gradient-to-t from-[#0d1f14] via-[#0d1f14]/55 to-black/70 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Header Controls (Language & Theme) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto shrink-0 mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#c9a24a] to-[#a8823a] p-0.5 shadow-[0_0_20px_rgba(201,162,74,0.6)]">
            <img src="/logo.png" alt="Le Crispy Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="font-gold text-xl sm:text-2xl font-extrabold text-gold-gradient tracking-wider">
            Le Crispy
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Lang Selector */}
          <div className="flex items-center gap-1 bg-black/60 border border-[var(--border-gold)] rounded-full p-1 backdrop-blur-md">
            {(['fr', 'ar', 'en'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-full uppercase transition-all ${
                  language === lang
                    ? 'bg-gradient-to-r from-[#c9a24a] to-[#a8823a] text-[#0d1f14] shadow-md'
                    : 'text-white/80 hover:text-[var(--accent-gold)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black/60 border border-[var(--border-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/20 transition-all backdrop-blur-md"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[var(--accent-gold)]" />}
          </button>
        </div>
      </motion.div>

      {/* Main Centered Hero & Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-4 max-w-4xl mx-auto space-y-6 py-6">
        
        {/* Logo Medallion */}
        <motion.div 
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#c9a24a] via-[#f3e5ab] to-[#a8823a] opacity-50 blur-xl group-hover:opacity-80 transition duration-1000 animate-pulse" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#c9a24a] via-[#f3e5ab] to-[#a8823a] p-1 shadow-[0_0_50px_rgba(201,162,74,0.7)] overflow-hidden">
            <img
              src="/logo.png"
              alt="Le Crispy Logo"
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-gold text-3xl sm:text-5xl md:text-6xl font-extrabold text-gold-gradient leading-tight drop-shadow-2xl"
        >
          {t('welcomeTitle')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-lg text-[var(--text-primary)] max-w-2xl font-light leading-relaxed opacity-95 drop-shadow-md"
        >
          Bienvenue chez <span className="font-bold text-[var(--accent-gold)]">Le Crispy</span>. La fusion entre le croustillant gourmet et la haute gastronomie 5 étoiles.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full"
        >
          <Link
            href="/home"
            className="w-full sm:w-auto btn-gold px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-extrabold flex items-center justify-center gap-3 group shadow-[0_0_35px_rgba(201,162,74,0.6)] hover:scale-105 transition-all duration-300"
          >
            <span>Explorer Le Crispy</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>

          <Link
            href="/menu"
            className="w-full sm:w-auto btn-gold-outline px-6 py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Voir le Menu Direct</span>
          </Link>
        </motion.div>

      </div>

      {/* Footer Tagline */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-20 text-center text-xs text-[var(--accent-gold)] font-mono tracking-widest uppercase opacity-90 shrink-0 pt-4"
      >
        Le Crispy • Sur Place • À Emporter • Livraison Haute Précision
      </motion.div>

    </div>
  );
}
