'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AiChatbotWidget from '@/components/chatbot/AiChatbotWidget';
import StripeCheckoutModal from '@/components/checkout/StripeCheckoutModal';
import { MOCK_REVIEWS, MOCK_RECLAMATIONS } from '@/data/mockData';
import { Review, Reclamation } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Star, MessageSquare, AlertCircle, CheckCircle2, Send, ThumbsUp, ShieldCheck, Upload } from 'lucide-react';

export default function ReviewsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'reviews' | 'reclamation'>('reviews');

  // Dynamic Reviews & Claims State (Merged with API + localStorage + MOCK)
  const [reviewsList, setReviewsList] = useState<Review[]>(MOCK_REVIEWS);
  const [claimsList, setClaimsList] = useState<Reclamation[]>(MOCK_RECLAMATIONS);

  // Review Form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  // Claim Form state
  const [claimOrderId, setClaimOrderId] = useState<string>('');
  const [claimSubject, setClaimSubject] = useState<string>('');
  const [claimDesc, setClaimDesc] = useState<string>('');
  const [claimEmail, setClaimEmail] = useState<string>('');
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);

  // Fetch Reviews & Reclamations from API & localStorage
  const loadReviewsAndClaims = () => {
    // 1. Load custom items from localStorage
    let customRevs: Review[] = [];
    let customRecs: Reclamation[] = [];
    try {
      const savedRevs = localStorage.getItem('custom_reviews');
      if (savedRevs) customRevs = JSON.parse(savedRevs);

      const savedRecs = localStorage.getItem('custom_reclamations');
      if (savedRecs) customRecs = JSON.parse(savedRecs);
    } catch {}

    // 2. Fetch Reviews from API / PostgreSQL
    fetch('/api/reviews')
      .then(res => res.ok ? res.json() : null)
      .then(apiRevs => {
        if (Array.isArray(apiRevs) && apiRevs.length > 0) {
          const combined = [...apiRevs, ...customRevs, ...MOCK_REVIEWS];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setReviewsList(unique);
        } else {
          const combined = [...customRevs, ...MOCK_REVIEWS];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setReviewsList(unique);
        }
      })
      .catch(() => {
        const combined = [...customRevs, ...MOCK_REVIEWS];
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        setReviewsList(unique);
      });

    // 3. Fetch Reclamations from API / PostgreSQL
    fetch('/api/reclamations')
      .then(res => res.ok ? res.json() : null)
      .then(apiRecs => {
        if (Array.isArray(apiRecs) && apiRecs.length > 0) {
          const combined = [...apiRecs, ...customRecs, ...MOCK_RECLAMATIONS];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setClaimsList(unique);
        } else {
          const combined = [...customRecs, ...MOCK_RECLAMATIONS];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setClaimsList(unique);
        }
      })
      .catch(() => {
        const combined = [...customRecs, ...MOCK_RECLAMATIONS];
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        setClaimsList(unique);
      });
  };

  useEffect(() => {
    loadReviewsAndClaims();
    window.addEventListener('storage', loadReviewsAndClaims);
    return () => window.removeEventListener('storage', loadReviewsAndClaims);
  }, []);

  // Submit Review to PostgreSQL & Sync with Admin Dashboard
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: userName.trim() || 'Client Privilège',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      isApproved: true
    };

    // Save to PostgreSQL via API
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRev)
      });
    } catch {}

    // Save to localStorage & notify storage event
    try {
      const existing = localStorage.getItem('custom_reviews');
      const list = existing ? JSON.parse(existing) : [];
      const updated = [newRev, ...list];
      localStorage.setItem('custom_reviews', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch {}

    setReviewsList(prev => [newRev, ...prev]);
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Submit Claim to PostgreSQL & Sync with Admin Dashboard
  const handleAddClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimOrderId || !claimDesc) return;

    const newRec: Reclamation = {
      id: `rec-${Date.now()}`,
      orderId: claimOrderId,
      userName: userName || 'Client',
      userEmail: claimEmail || 'client@example.com',
      userPhone: '09 56 07 00 91',
      subject: claimSubject || 'Demande Suivi Commande',
      description: claimDesc,
      status: 'new',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    // Save to PostgreSQL via API
    try {
      await fetch('/api/reclamations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRec)
      });
    } catch {}

    // Save to localStorage & notify storage event
    try {
      const existing = localStorage.getItem('custom_reclamations');
      const list = existing ? JSON.parse(existing) : [];
      const updated = [newRec, ...list];
      localStorage.setItem('custom_reclamations', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch {}

    setClaimsList(prev => [newRec, ...prev]);
    setClaimOrderId('');
    setClaimSubject('');
    setClaimDesc('');
    setClaimSubmitted(true);
    setTimeout(() => setClaimSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full border border-[var(--accent-gold)] bg-[var(--bg-secondary)] text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider">
            Transparence & Qualité Le Crispy
          </span>
          <h1 className="font-gold text-4xl sm:text-5xl font-extrabold text-gold-gradient">
            Avis Clients & Service Relation Client
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Découvrez les avis authentiques de nos gourmets à Dormans ou déposez votre témoignage transmis en direct au Dashboard Admin.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center border-b border-[var(--border-gold)]/40 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Avis Clients ({reviewsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reclamation')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'reclamation'
                ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Réclamation / Support</span>
          </button>
        </div>

        {/* TAB 1: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-10 max-w-4xl mx-auto">
            
            {/* Add Review Form */}
            <div className="card-gold p-6 sm:p-8 space-y-6 bg-[var(--bg-secondary)] border-[var(--border-gold)] shadow-xl">
              <div className="space-y-1 border-b border-[var(--border-gold)]/30 pb-4">
                <h3 className="font-gold text-2xl font-bold text-gold-gradient flex items-center gap-2">
                  <Star className="w-5 h-5 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
                  <span>Donnez Votre Avis Gourmet sur Le Crispy Dormans</span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">Votre avis sera directement transmis au Dashboard d'Administration.</p>
              </div>

              {reviewSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Merci ! Votre avis a été enregistré et transmis en direct au Dashboard Admin.</span>
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-5 text-xs">
                
                <div className="space-y-2">
                  <label className="font-bold text-[var(--text-primary)] block uppercase tracking-wider">Note globale</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating
                              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                              : 'text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-bold text-amber-400 text-sm ml-2 font-mono">{newRating} / 5 étoiles</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[var(--text-primary)] block">Votre Nom / Pseudo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ben Moussa Malek"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-primary)] block">Votre Commentaire & Expérience *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Racontez-nous votre expérience culinaire chez Le Crispy Dormans..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Publier mon Avis en Direct</span>
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              <h3 className="font-gold text-xl font-bold text-white">Témoignages & Avis Récents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="card-gold p-6 space-y-4 bg-[var(--bg-secondary)] border-[var(--border-gold)]/40">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={rev.userName}
                          className="w-10 h-10 rounded-full object-cover border border-[var(--border-gold)]"
                        />
                        <div>
                          <span className="font-bold text-white text-xs block">{rev.userName}</span>
                          <span className="text-[10px] text-[var(--text-secondary)] font-mono">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-primary)] italic leading-relaxed bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-gold)]/20">
                      "{rev.comment}"
                    </p>

                    {rev.reply && (
                      <div className="p-3 rounded-xl bg-stone-900 border-l-2 border-[var(--accent-gold)] text-[11px] text-[var(--accent-gold)] space-y-1">
                        <span className="font-bold block uppercase text-[10px]">Réponse du Gérant Le Crispy :</span>
                        <p className="text-stone-300 italic">"{rev.reply}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: RECLAMATION */}
        {activeTab === 'reclamation' && (
          <div className="card-gold p-6 sm:p-8 space-y-6 max-w-2xl mx-auto bg-[var(--bg-secondary)] border-[var(--border-gold)] shadow-xl">
            <div className="space-y-1 border-b border-[var(--border-gold)]/30 pb-4">
              <h3 className="font-gold text-2xl font-bold text-gold-gradient flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>Formulaire de Réclamation & Support</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">Votre demande sera prise en charge immédiatement par la direction.</p>
            </div>

            {claimSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Votre réclamation a été transmise en direct au Dashboard Admin. Merci !</span>
              </div>
            )}

            <form onSubmit={handleAddClaim} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[var(--text-primary)] block">N° de Commande *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: ORD-6190"
                  value={claimOrderId}
                  onChange={(e) => setClaimOrderId(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-primary)] block">Sujet de la Réclamation *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ingrédient manquant, retard livraison..."
                    value={claimSubject}
                    onChange={(e) => setClaimSubject(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-primary)] block">Email de contact *</label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@example.com"
                    value={claimEmail}
                    onChange={(e) => setClaimEmail(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--text-primary)] block">Description détaillée du problème *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Expliquez en détail le souci rencontré lors de votre commande..."
                  value={claimDesc}
                  onChange={(e) => setClaimDesc(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma Réclamation au Dashboard Admin</span>
              </button>
            </form>
          </div>
        )}

      </main>

      <Footer />

      {/* AI Concierge Chatbot */}
      <AiChatbotWidget />

      {/* Stripe Checkout Drawer */}
      <StripeCheckoutModal />
    </div>
  );
}
