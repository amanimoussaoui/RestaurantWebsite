'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Language } from '@/types';
import { Crown, Globe, Sun, Moon, Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none bg-black">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-75"
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay Gradient for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14] via-[#0d1f14]/60 to-black/70 backdrop-blur-[1px]" />

      {/* Header Controls (Language & Theme) */}
      <div className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a24a] to-[#a8823a] p-0.5">
            <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
              <Crown className="w-4 h-4 text-[var(--accent-gold)]" />
            </div>
          </div>
          <span className="font-gold text-lg font-bold text-gold-gradient tracking-wider">
            {t('brandName')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Lang Selector */}
          <div className="flex items-center gap-1 bg-black/40 border border-[var(--border-gold)] rounded-full p-1 backdrop-blur-md">
            {(['fr', 'ar', 'en'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase transition-all ${
                  language === lang
                    ? 'bg-[var(--accent-gold)] text-[#0d1f14] shadow-md'
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
            className="p-2 rounded-full bg-black/40 border border-[var(--border-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/20 transition-all backdrop-blur-md"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[var(--accent-gold)]" />}
          </button>
        </div>
      </div>

      {/* Main Centered Hero Medallion & Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-4 max-w-3xl mx-auto">
        
        {/* Animated Gold Logo Medallion */}
        <div className="relative mb-6 group cursor-pointer">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#c9a24a] via-[#f3e5ab] to-[#a8823a] opacity-40 blur-xl group-hover:opacity-75 transition duration-1000 animate-pulse" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#c9a24a] via-[#f3e5ab] to-[#a8823a] p-1 shadow-[0_0_50px_rgba(201,162,74,0.6)] overflow-hidden">
            <img
              src="/logo.png"
              alt="Le Crispy Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-gold text-3xl sm:text-5xl md:text-6xl font-extrabold text-gold-gradient leading-tight mb-4 drop-shadow-md">
          {t('welcomeTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-[var(--text-primary)] max-w-xl font-light leading-relaxed mb-8 opacity-90">
          {t('welcomeSubtitle')}
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="btn-gold px-8 py-4 text-base flex items-center gap-3 group shadow-[0_0_30px_rgba(201,162,74,0.4)]"
          >
            <span>{t('welcomeExplore')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/menu"
            className="btn-gold-outline px-6 py-3.5 text-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Voir le Menu Direct</span>
          </Link>
        </div>

      </div>

      {/* Footer Tagline */}
      <div className="relative z-20 text-center text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase opacity-75">
        Sur Place • À Emporter • Livraison Haute Précision
      </div>

    </div>
  );
}
