'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useLanguage } from '@/context/LanguageContext';
import { ServiceMode, Order } from '@/types';
import GoogleMapPicker from '@/components/common/GoogleMapPicker';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Utensils, 
  Package, 
  Truck, 
  QrCode, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function StripeCheckoutModal() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    serviceMode, 
    setServiceMode, 
    tableNumber, 
    setTableNumber, 
    deliveryAddress, 
    setDeliveryAddress, 
    subtotal, 
    deliveryFee, 
    total, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { t, language } = useLanguage();

  const [step, setStep] = useState<'cart' | 'service' | 'stripe' | 'confirmed'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Stripe Card State simulation
  const [cardHolder, setCardHolder] = useState(user?.name || 'Amine El Mansouri');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expDate, setExpDate] = useState('12/28');
  const [cvc, setCvc] = useState('888');

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
    if (step === 'confirmed') {
      setStep('cart');
    }
  };

  const handlePayWithStripe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = createOrder(
        items,
        serviceMode,
        subtotal,
        deliveryFee,
        total,
        {
          name: cardHolder,
          email: user?.email || 'client@lor-noir-gourmet.fr',
          phone: user?.phone || '+33 6 12 34 56 78'
        },
        serviceMode === 'sur_place' ? tableNumber : undefined,
        serviceMode === 'livraison' ? (deliveryAddress || user?.addresses[0]) : undefined
      );

      setCompletedOrder(newOrder);
      clearCart();
      setStep('confirmed');

      // Dispatch real WhatsApp payment receipt notification to API
      try {
        const rawPhone = user?.whatsappPhone || user?.phone || '33612345678';
        const itemsSummary = items.map(it => `• ${it.quantity}x ${it.product.name.fr} (${(it.product.price * it.quantity).toFixed(2)} €)${it.notes ? `\n  └ ${it.notes}` : ''}`).join('\n');
        const message = `✨ *LE CRISPY - REÇU DE PAIEMENT CONFIRMÉ* 👑\n-------------------------------------\nN° Commande : #${newOrder.id}\nNom Client : ${newOrder.userName}\nMontant Payé : ${newOrder.total.toFixed(2)} € (Paiement En Ligne Sécurisé)\nMode : ${newOrder.serviceMode.toUpperCase()}\n\n🛍️ *Détails des Produits :*\n${itemsSummary}\n\n📍 *Lieu / Adresse :*\n${newOrder.deliveryAddress ? `${newOrder.deliveryAddress.street}, ${newOrder.deliveryAddress.city}` : newOrder.tableNumber ? `Table #${newOrder.tableNumber}` : 'À emporter'}\n\nStatut : En préparation par notre Chef 👨‍🍳\nMerci pour votre confiance chez Le Crispy Gourmet ! 🚀`;

        fetch('/api/notifications/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: rawPhone,
            message,
            orderId: newOrder.id,
            total: newOrder.total
          })
        }).catch(() => {});
      } catch {}

      // Dispatch real Gmail Email Payment Confirmation to amounatahfouna443@gmail.com
      try {
        fetch('/api/notifications/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order: newOrder,
            customerEmail: user?.email || 'amounatahfouna443@gmail.com'
          })
        }).catch(() => {});
      } catch {}
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[var(--bg-secondary)] border-l border-[var(--border-gold)] h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[var(--bg-primary)] border-b border-[var(--border-gold)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="font-gold font-bold text-lg text-gold-gradient">
              {step === 'confirmed' ? t('orderConfirmed') : t('cartTitle')}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART ITEMS LIST */}
        {step === 'cart' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {items.length > 0 ? (
                items.map(item => (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 flex items-center justify-between gap-3 shadow-md"
                  >
                    <img
                      src={item.product.image}
                      alt={typeof item.product.name === 'string' ? item.product.name : (item.product.name?.[language] || item.product.name?.fr || (item.product as any).nameFr || 'Plat Le Crispy')}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-gold font-bold text-xs text-white truncate">
                        {typeof item.product.name === 'string' ? item.product.name : (item.product.name?.[language] || item.product.name?.fr || (item.product as any).nameFr || 'Plat Le Crispy')}
                      </h4>
                      <span className="font-bold text-xs text-[var(--accent-gold)]">
                        {item.product.price.toFixed(2)} €
                      </span>
                      {item.notes && (
                        <p className="text-[10px] text-amber-300 italic truncate">Note: {item.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[var(--accent-gold)]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[var(--accent-gold)]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[var(--accent-gold)] mx-auto opacity-50" />
                  <p className="text-xs text-[var(--text-secondary)]">{t('cartEmpty')}</p>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-5 bg-[var(--bg-primary)] border-t border-[var(--border-gold)] space-y-4">
                <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span className="font-mono text-white">{subtotal.toFixed(2)} €</span>
                  </div>
                  {serviceMode === 'livraison' && (
                    <div className="flex justify-between">
                      <span>{t('deliveryFee')}</span>
                      <span className="font-mono text-white">{deliveryFee.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-[var(--border-gold)]/30 font-bold text-sm text-[var(--accent-gold)]">
                    <span>{t('total')}</span>
                    <span className="font-mono text-base">{total.toFixed(2)} €</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('service')}
                  className="w-full btn-gold py-3 text-xs flex items-center justify-center gap-2"
                >
                  <span>Mettre le Mode de Service & Réglage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SERVICE MODE SELECTOR (Sur Place / À Emporter / Livraison) */}
        {step === 'service' && (
          <div className="flex-1 flex flex-col justify-between p-5 space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)] uppercase tracking-wider">
                {t('selectServiceMode')}
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setServiceMode('sur_place')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    serviceMode === 'sur_place'
                      ? 'bg-[var(--accent-gold)] text-[#0d1f14] border-[var(--accent-gold)] font-bold shadow-lg'
                      : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-gold)]/40'
                  }`}
                >
                  <Utensils className="w-5 h-5" />
                  <span className="text-xs">{t('surPlace')}</span>
                </button>

                <button
                  onClick={() => setServiceMode('a_emporter')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    serviceMode === 'a_emporter'
                      ? 'bg-[var(--accent-gold)] text-[#0d1f14] border-[var(--accent-gold)] font-bold shadow-lg'
                      : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-gold)]/40'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="text-xs">{t('aEmporter')}</span>
                </button>

                <button
                  onClick={() => setServiceMode('livraison')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    serviceMode === 'livraison'
                      ? 'bg-[var(--accent-gold)] text-[#0d1f14] border-[var(--accent-gold)] font-bold shadow-lg'
                      : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-gold)]/40'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span className="text-xs">{t('livraison')}</span>
                </button>
              </div>

              {/* Mode Options Input */}
              {serviceMode === 'sur_place' && (
                <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 space-y-2">
                  <label className="text-xs font-bold text-[var(--text-secondary)] block">
                    {t('tableNumberLabel')}
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    placeholder={t('tablePlaceholder')}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              )}

              {serviceMode === 'livraison' && (
                <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[var(--accent-gold)] font-gold text-sm block">
                      📍 Emplacement de livraison sur la Carte Google Maps
                    </label>
                  </div>
                  <GoogleMapPicker
                    initialAddress={deliveryAddress ? `${deliveryAddress.street}, ${deliveryAddress.city}` : '42 Avenue des Champs-Élysées, 75008 Paris'}
                    onSelectLocation={(loc) => {
                      setDeliveryAddress({
                        id: 'loc-map',
                        title: 'Position Carte Google Maps',
                        street: loc.address,
                        city: 'Paris',
                        zipCode: '75000',
                        phone: user?.phone || '+33 6 12 34 56 78',
                        isDefault: true
                      });
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('cart')}
                className="btn-gold-outline px-4 py-3 text-xs"
              >
                Retour
              </button>
              <button
                onClick={() => setStep('stripe')}
                className="flex-1 btn-gold py-3 text-xs flex items-center justify-center gap-2"
              >
                <span>Accéder au Paiement Stripe ({total.toFixed(2)} €)</span>
                <CreditCard className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: STRIPE PAYMENT FORM SIMULATION */}
        {step === 'stripe' && (
          <div className="flex-1 flex flex-col justify-between p-5 space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-gold)]/40 pb-3">
                <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>{t('stripeTitle')}</span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono">256-bit SSL Encrypted</span>
              </div>

              {/* Credit Card Element Graphic */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-tr from-stone-900 via-[#14261a] to-[#0d1f14] border border-[var(--accent-gold)] shadow-xl text-white space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-gold text-xs font-bold text-[var(--accent-gold)]">L'Or Noir Card</span>
                  <CreditCard className="w-6 h-6 text-[var(--accent-gold)]" />
                </div>

                <div className="font-mono text-base tracking-widest text-[var(--text-primary)]">
                  {cardNumber}
                </div>

                <div className="flex justify-between text-[10px] text-[var(--text-secondary)] font-mono">
                  <div>
                    <span className="block opacity-60">HOLDER</span>
                    <span className="font-bold text-white uppercase">{cardHolder}</span>
                  </div>
                  <div>
                    <span className="block opacity-60">EXPIRES</span>
                    <span className="font-bold text-white">{expDate}</span>
                  </div>
                </div>
              </div>

              {/* Inputs Form */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">{t('cardHolder')}</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={e => setCardHolder(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">{t('cardNumber')}</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[var(--text-secondary)]">{t('expiryDate')}</label>
                    <input
                      type="text"
                      value={expDate}
                      onChange={e => setExpDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[var(--text-secondary)]">{t('cvc')}</label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={e => setCvc(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handlePayWithStripe}
                disabled={isProcessing}
                className="w-full btn-gold py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-xl"
              >
                {isProcessing ? (
                  <span>{t('processingPayment')}</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>{t('payNow')} • {total.toFixed(2)} €</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setStep('service')}
                className="w-full text-center text-xs text-[var(--text-secondary)] hover:text-white"
              >
                Retour
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER CONFIRMED RECEIPT */}
        {step === 'confirmed' && completedOrder && (
          <div className="flex-1 p-6 text-center space-y-6 overflow-y-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />

            <div className="space-y-2">
              <h3 className="font-gold text-2xl font-bold text-gold-gradient">
                Merci ! Votre Commande est Validée
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Votre référence : <span className="text-[var(--accent-gold)] font-bold font-mono">{completedOrder.id}</span>
              </p>
            </div>

            {/* REAL WHATSAPP PAYMENT NOTIFICATION CARD */}
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  📱 Reçu de Paiement WhatsApp
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-extrabold uppercase font-mono">EN DIRECT</span>
              </div>
              
              <p className="text-[11px] text-emerald-200 text-left leading-relaxed">
                Le reçu officiel de votre paiement de <strong className="text-white">{completedOrder.total.toFixed(2)} €</strong> est prêt pour votre WhatsApp : <strong className="text-white font-mono">{user?.whatsappPhone || user?.phone || '+33 6 12 34 56 78'}</strong>.
              </p>

              <button
                type="button"
                onClick={() => {
                  const rawPhone = user?.whatsappPhone || user?.phone || '33612345678';
                  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
                  const itemsSummary = completedOrder.items.map(it => `• ${it.quantity}x ${it.product.name.fr} (${(it.product.price * it.quantity).toFixed(2)} €)${it.notes ? `\n  └ ${it.notes}` : ''}`).join('\n');
                  const message = `✨ *LE CRISPY - REÇU DE PAIEMENT CONFIRMÉ* 👑\n-------------------------------------\nN° Commande : #${completedOrder.id}\nNom Client : ${completedOrder.userName}\nMontant Payé : ${completedOrder.total.toFixed(2)} € (Paiement En Ligne Sécurisé)\nMode : ${completedOrder.serviceMode.toUpperCase()}\n\n🛍️ *Détails des Produits :*\n${itemsSummary}\n\n📍 *Lieu / Adresse :*\n${completedOrder.deliveryAddress ? `${completedOrder.deliveryAddress.street}, ${completedOrder.deliveryAddress.city}` : completedOrder.tableNumber ? `Table #${completedOrder.tableNumber}` : 'À emporter'}\n\nStatut : En préparation par notre Chef 👨‍🍳\nMerci pour votre confiance chez Le Crispy Gourmet ! 🚀`;
                  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>💬 Recevoir mon Reçu sur WhatsApp (Direct)</span>
              </button>
            </div>

            {/* Receipt Card */}
            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 text-xs space-y-3 text-left">
              <div className="flex justify-between border-b border-[var(--border-gold)]/30 pb-2 font-bold text-[var(--accent-gold)]">
                <span>{completedOrder.serviceMode.toUpperCase()}</span>
                <span>{completedOrder.total.toFixed(2)} €</span>
              </div>
              
              <div className="space-y-1">
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-[var(--text-primary)]">
                    <span>{it.quantity}x {it.product.name.fr}</span>
                    <span>{(it.product.price * it.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full btn-gold py-3 text-xs"
            >
              Fermer & Suivre ma Commande
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
