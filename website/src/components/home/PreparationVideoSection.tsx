'use client';

import React from 'react';
import { Sparkles, Flame, Shield, Award } from 'lucide-react';

export default function PreparationVideoSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
          Coulisses & Savoir-Faire
        </span>
        <h2 className="font-gold text-3xl sm:text-4xl font-bold text-gold-gradient">
          La Magie de la Préparation à la Minute
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Découvrez la précision des gestes de nos chefs lors de la saisie des steaks Wagyu et du dressage à la feuille d'or.
        </p>
      </div>

      {/* Video Container Card */}
      <div className="relative rounded-2xl overflow-hidden border border-[var(--border-gold)] shadow-[0_0_40px_rgba(201,162,74,0.25)] bg-[var(--bg-secondary)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[350px] sm:h-[480px] object-cover"
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>

        {/* Video Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14] via-transparent to-black/40 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[var(--accent-warm)]" />
              <span>Live Preparation</span>
            </span>
            <span className="text-xs text-white/80 font-mono">4K UHD Cinema</span>
          </div>

          <div className="max-w-xl space-y-2">
            <h3 className="font-gold text-2xl sm:text-3xl font-bold text-white">
              Une Saisie Haute Température & Dorure Artisanale
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Nos pains briochés sont dorés au beurre clarifié et nos sauces signatures sont assemblées sous vos yeux.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
