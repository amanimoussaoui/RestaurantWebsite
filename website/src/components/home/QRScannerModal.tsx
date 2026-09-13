'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, QrCode, Camera, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const { setTableNumber, setServiceMode } = useCart();
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [scannedTable, setScannedTable] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setScanning(true);
    // Simulate camera scanning delay
    setTimeout(() => {
      const randomTable = `0${Math.floor(Math.random() * 9) + 1}`;
      setScannedTable(randomTable);
      setTableNumber(randomTable);
      setServiceMode('sur_place');
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(201,162,74,0.3)] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)] flex items-center justify-center mx-auto">
            <QrCode className="w-6 h-6 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-gold text-2xl font-bold text-gold-gradient">
            {t('qrScanModalTitle')}
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Scannez le QR code posé sur votre table pour associer automatiquement vos commandes et recevoir votre service sur place.
          </p>
        </div>

        {/* Scanning View / Camera Simulator */}
        <div className="relative w-full h-64 rounded-xl border-2 border-dashed border-[var(--border-gold)] bg-black/60 flex flex-col items-center justify-center overflow-hidden">
          {scanning ? (
            <div className="space-y-4 text-center">
              {/* Laser line animation */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-gold-light)] to-transparent animate-pulse shadow-[0_0_15px_#e0b84a]" />
              <Camera className="w-12 h-12 text-[var(--accent-gold)] animate-bounce mx-auto" />
              <p className="text-xs text-[var(--accent-gold)] font-mono animate-pulse">
                Analyse de la caméra en cours...
              </p>
            </div>
          ) : scannedTable ? (
            <div className="space-y-3 text-center p-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-gold text-xl font-bold text-white">
                Table Détectée : <span className="text-[var(--accent-gold)]">N° {scannedTable}</span>
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Votre mode de service est configuré sur "Sur Place".
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-center p-4">
              {/* Simulated QR Code SVG Graphic */}
              <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg shadow-inner flex items-center justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://lecrispy.vercel.app"
                  alt="QR Code Table Le Crispy"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Pointez l'objectif de votre appareil vers le QR code de la table
              </p>
            </div>
          )}
        </div>

        {/* Modal Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {!scannedTable ? (
            <button
              onClick={handleStartScan}
              disabled={scanning}
              className="w-full btn-gold py-3 text-xs flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>{scanning ? "Détection en cours..." : t('qrScanBtn')}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full btn-gold py-3 text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Accéder au Menu pour Table {scannedTable}</span>
            </button>
          )}

          <button
            onClick={() => {
              setTableNumber('07');
              setServiceMode('sur_place');
              onClose();
            }}
            className="w-full sm:w-auto btn-gold-outline py-3 px-4 text-xs whitespace-nowrap"
          >
            {t('qrScanSimulateBtn')}
          </button>
        </div>

      </div>
    </div>
  );
}
