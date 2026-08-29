'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Crown, MapPin, Phone, Mail, Share2, Globe, Clock, Send } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-gold)] text-[var(--text-secondary)] pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a24a] to-[#a8823a] p-0.5 overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="Le Crispy Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="font-gold text-2xl font-bold text-gold-gradient">
              {t('brandName')}
            </span>
          </div>
          <p className="text-xs leading-relaxed">
            {t('welcomeSubtitle')} Le premier fast-food gastronomique alliant raffinement culinaire et gourmandise d'exception.
          </p>
          <div className="flex items-center gap-4 text-[var(--accent-gold)] pt-2">
            <a href="#" className="p-2 rounded-full border border-[var(--border-gold)] hover:bg-[var(--accent-gold)] hover:text-[#0d1f14] transition-all">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full border border-[var(--border-gold)] hover:bg-[var(--accent-gold)] hover:text-[#0d1f14] transition-all">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="font-gold text-sm font-bold text-[var(--accent-gold)] uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">{t('navHome')}</Link></li>
            <li><Link href="/menu" className="hover:text-[var(--accent-gold)] transition-colors">{t('navMenu')}</Link></li>
            <li><Link href="/healthy" className="hover:text-[var(--accent-gold)] transition-colors">{t('navHealthy')}</Link></li>
            <li><Link href="/reviews" className="hover:text-[var(--accent-gold)] transition-colors">{t('navReviews')}</Link></li>
            <li><Link href="/welcome" className="hover:text-[var(--accent-gold)] transition-colors">Page d'introduction Video</Link></li>
          </ul>
        </div>

        {/* Col 3: Hours & Address */}
        <div className="space-y-3">
          <h4 className="font-gold text-sm font-bold text-[var(--accent-gold)] uppercase tracking-wider">
            Horaires & Contact
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span>Ouvert 7j/7 : 11h00 – 23h00 (Non Stop)</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span>1 rue Jean de Dormans - 51700 Dormans</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span className="font-bold text-white font-mono">09 56 07 00 91</span>
            </li>
            <li className="flex items-center gap-2 text-amber-400 font-bold pt-1">
              <span>🍕 Offre : 2 PIZZAS ACHETÉES = 1 PIZZA OFFERTE</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="space-y-3">
          <h4 className="font-gold text-sm font-bold text-[var(--accent-gold)] uppercase tracking-wider">
            Newsletter Privilège
          </h4>
          <p className="text-xs">
            Recevez nos créations éphémères et invitations exclusives.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 pt-1">
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-full px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
            <button
              type="submit"
              className="btn-gold px-4 py-2 text-xs flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[var(--border-gold)]/40 text-center text-[11px] text-[var(--text-secondary)]">
        <p>© 2026 L'Or Noir Gourmet — Fast-Food Haute Gastronomie. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
