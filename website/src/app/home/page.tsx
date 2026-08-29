'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import AtoutsSection from '@/components/home/AtoutsSection';
import SpecialtiesSection from '@/components/home/SpecialtiesSection';
import PreparationVideoSection from '@/components/home/PreparationVideoSection';
import QRScannerModal from '@/components/home/QRScannerModal';
import AiChatbotWidget from '@/components/chatbot/AiChatbotWidget';
import StripeCheckoutModal from '@/components/checkout/StripeCheckoutModal';

export default function HomePage() {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Header />

      <main className="flex-1">
        <Hero onOpenQrModal={() => setIsQrModalOpen(true)} />
        <AtoutsSection />
        <SpecialtiesSection />
        <PreparationVideoSection />
      </main>

      <Footer />

      {/* QR Code Camera Modal */}
      <QRScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Floating AI Concierge Chatbot */}
      <AiChatbotWidget />

      {/* Cart & Checkout Modal Drawer */}
      <StripeCheckoutModal />
    </div>
  );
}
