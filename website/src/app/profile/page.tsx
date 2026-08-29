'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AiChatbotWidget from '@/components/chatbot/AiChatbotWidget';
import StripeCheckoutModal from '@/components/checkout/StripeCheckoutModal';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  CreditCard, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Globe, 
  Moon, 
  Sun, 
  LogOut,
  ShieldCheck,
  Edit3,
  Camera,
  Save,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout, updateUser, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const { getUserOrders } = useOrders();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'payments' | 'settings'>('profile');
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editWhatsappPhone, setEditWhatsappPhone] = useState(user?.whatsappPhone || user?.phone || '+33 6 12 34 56 78');
  const [editAvatarUrl, setEditAvatarUrl] = useState(user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);

  // Address State
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newZip, setNewZip] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="card-gold p-8 max-w-md space-y-4">
            <User className="w-12 h-12 text-[var(--accent-gold)] mx-auto" />
            <h2 className="font-gold text-2xl font-bold text-[var(--text-primary)]">Veuillez vous connecter</h2>
            <p className="text-xs text-[var(--text-secondary)]">Accédez à votre espace privilège pour gérer votre profil et suivre vos commandes.</p>
            <div className="flex justify-center gap-3">
              <Link href="/login" className="btn-gold px-6 py-2 text-xs">{t('loginBtn')}</Link>
              <Link href="/register" className="btn-gold-outline px-6 py-2 text-xs">{t('registerBtn')}</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userOrders = getUserOrders(user.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editName,
      email: editEmail,
      phone: editPhone,
      whatsappPhone: editWhatsappPhone,
      avatarUrl: editAvatarUrl
    });
    setIsEditingProfile(false);
    setProfileSuccessMsg(true);
    setTimeout(() => setProfileSuccessMsg(false), 4000);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    addAddress({
      title: newTitle || 'Nouvelle Adresse',
      street: newStreet,
      city: newCity,
      zipCode: newZip || '75000',
      phone: editPhone || user.phone,
      isDefault: user.addresses.length === 0
    });
    setShowAddAddressModal(false);
    setNewTitle('');
    setNewStreet('');
    setNewCity('');
    setNewZip('');
  };

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* User Banner Header */}
        <div className="card-gold p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[var(--bg-secondary)] border-[var(--border-gold)]">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[var(--accent-gold)] overflow-hidden shadow-[0_0_25px_rgba(201,162,74,0.5)] shrink-0">
              <img
                src={user.avatarUrl || editAvatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <h1 className="font-gold text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">{user.name}</h1>
                {user.role === 'admin' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-gold)] text-[#0d1f14] text-[10px] font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ADMIN</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{user.email} • {user.phone}</p>
              <span className="inline-block text-[11px] text-[var(--accent-gold)] font-mono">Membre Privilège Le Crispy</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('profile');
                setIsEditingProfile(true);
              }}
              className="btn-gold px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>Modifier Profil</span>
            </button>
            <button
              onClick={logout}
              className="btn-gold-outline px-4 py-2 text-xs flex items-center gap-1.5 text-rose-400 hover:border-rose-500"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {profileSuccessMsg && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
            <Check className="w-5 h-5 shrink-0" />
            <span>Vos informations de profil ont été mises à jour avec succès !</span>
          </div>
        )}

        {/* Profile Tabs */}
        <div className="flex border-b border-[var(--border-gold)]/40 overflow-x-auto">
          {[
            { id: 'profile', label: "Mon Profil Client", icon: User },
            { id: 'orders', label: t('orderHistory'), icon: ShoppingBag },
            { id: 'addresses', label: t('savedAddresses'), icon: MapPin },
            { id: 'payments', label: "Moyens de Paiement", icon: CreditCard },
            { id: 'settings', label: "Préférences", icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3.5 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${
                  isActive
                    ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 0: EDIT / VIEW PROFILE INFO */}
        {activeTab === 'profile' && (
          <div className="card-gold p-6 sm:p-8 space-y-6 max-w-2xl bg-[var(--bg-secondary)] border-[var(--border-gold)]">
            <div className="flex justify-between items-center border-b border-[var(--border-gold)]/40 pb-4">
              <h3 className="font-gold text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--accent-gold)]" />
                <span>Informations Personnelles</span>
              </h3>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="btn-gold-outline px-3 py-1.5 text-xs flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? "Annuler Modification" : "Editer"}</span>
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
                
                {/* Avatar Picker & Native File Upload from Device */}
                <div className="space-y-3">
                  <label className="font-bold text-[var(--text-secondary)] block">Photo de Profil / Importer depuis votre appareil</label>
                  
                  {/* Native File Upload Input */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-dashed border-[var(--accent-gold)]">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[var(--border-gold)] shrink-0">
                      <img src={editAvatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <span className="text-[11px] text-[var(--text-primary)] font-bold block">Choisir un fichier image depuis votre ordinateur / téléphone</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setEditAvatarUrl(event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-[10px] text-[var(--text-secondary)] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-[var(--accent-gold)] file:text-[#0d1f14] hover:file:cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[10px] text-[var(--text-secondary)]">Avatars présélectionnés :</span>
                    {avatarPresets.map((url, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setEditAvatarUrl(url)}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                          editAvatarUrl === url ? 'border-[var(--accent-gold)] scale-110 shadow-lg' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">Nom Complet</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">Adresse Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[var(--text-secondary)]">Numéro de Téléphone Appel</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-3 text-xs text-[var(--text-primary)]"
                  />
                </div>

                {/* WhatsApp Phone Field */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>📱 Numéro WhatsApp (Reçu de Paiement & Suivi Direct)</span>
                    </label>
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-extrabold uppercase font-mono">ACTIF</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78 ou +216 98 123 456"
                    value={editWhatsappPhone}
                    onChange={e => setEditWhatsappPhone(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-emerald-500/60 rounded-xl p-3 text-xs text-[var(--text-primary)] font-mono"
                  />
                  <span className="text-[10px] text-emerald-300/80 block">
                    💬 Les confirmations de paiement Stripe / Espèces et les mises à jour de livraison seront envoyées directement sur ce numéro WhatsApp.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3 text-xs flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer les Modifications</span>
                </button>

              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-secondary)] font-medium">Nom :</span>
                    <span className="font-bold text-[var(--text-primary)]">{user.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[var(--border-gold)]/20 pt-2">
                    <span className="text-[var(--text-secondary)] font-medium">Email :</span>
                    <span className="font-bold text-[var(--text-primary)]">{user.email}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[var(--border-gold)]/20 pt-2">
                    <span className="text-[var(--text-secondary)] font-medium">Téléphone :</span>
                    <span className="font-bold text-[var(--text-primary)]">{user.phone}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-emerald-500/30 pt-2 text-emerald-400">
                    <span className="font-bold">📱 WhatsApp Notification :</span>
                    <span className="font-bold font-mono">{user.whatsappPhone || user.phone || '+33 6 12 34 56 78'}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[var(--border-gold)]/20 pt-2">
                    <span className="text-[var(--text-secondary)] font-medium">Adresses enregistrées :</span>
                    <span className="font-bold text-[var(--accent-gold)]">{user.addresses.length} adresse(s)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {userOrders.length > 0 ? (
              userOrders.map(order => (
                <div key={order.id} className="card-gold p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-gold)]/40 pb-3 gap-2">
                    <div>
                      <span className="font-gold font-bold text-sm text-[var(--accent-gold)]">{order.id}</span>
                      <span className="text-xs text-[var(--text-secondary)] block">{order.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-primary)] border border-[var(--border-gold)] text-[var(--text-primary)]">
                        Mode: {order.serviceMode.replace('_', ' ')}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-amber-950 text-amber-300 border border-amber-500'
                      }`}>
                        Statut: {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--accent-gold)]">{item.quantity}x</span>
                          <span className="text-[var(--text-primary)] font-medium">{item.product.name.fr}</span>
                        </div>
                        <span className="font-mono text-[var(--text-secondary)]">{(item.product.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[var(--border-gold)]/30 flex justify-between items-center text-xs">
                    <span className="text-[var(--text-secondary)]">Paiement Stripe (Payé)</span>
                    <span className="font-gold font-bold text-base text-[var(--accent-gold)]">Total: {order.total.toFixed(2)} €</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="card-gold p-8 text-center space-y-2">
                <ShoppingBag className="w-10 h-10 text-[var(--accent-gold)] mx-auto" />
                <h3 className="font-gold text-lg font-bold text-[var(--text-primary)]">Aucune commande pour le moment</h3>
                <p className="text-xs text-[var(--text-secondary)]">Passez votre première commande sur notre carte gastronomique Le Crispy !</p>
                <Link href="/menu" className="btn-gold px-4 py-2 text-xs inline-block mt-2">Explorer le Menu</Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-gold text-lg font-bold text-[var(--text-primary)]">{t('savedAddresses')}</h3>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="btn-gold px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{t('addAddress')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.addresses.map(addr => (
                <div key={addr.id} className="card-gold p-5 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)]">{addr.title}</h4>
                    {addr.isDefault ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500 text-[10px] font-bold">
                        {t('defaultAddress')}
                      </span>
                    ) : (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[10px] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] underline"
                      >
                        Définir par défaut
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                    {addr.street}<br />
                    {addr.zipCode} {addr.city}<br />
                    Tél: {addr.phone}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="text-rose-400 hover:text-rose-300 p-1 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Add Address */}
            {showAddAddressModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-2xl p-6 w-full max-w-md space-y-4">
                  <h3 className="font-gold text-lg font-bold text-[var(--text-primary)]">Ajouter une nouvelle adresse</h3>
                  <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
                    <input
                      type="text"
                      placeholder="Titre (ex: Maison, Bureau)"
                      required
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-[var(--text-primary)]"
                    />
                    <input
                      type="text"
                      placeholder="Rue & Numéro"
                      required
                      value={newStreet}
                      onChange={e => setNewStreet(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-[var(--text-primary)]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Code Postal"
                        value={newZip}
                        onChange={e => setNewZip(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-[var(--text-primary)]"
                      />
                      <input
                        type="text"
                        placeholder="Ville"
                        required
                        value={newCity}
                        onChange={e => setNewCity(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl p-2.5 text-[var(--text-primary)]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="btn-gold-outline px-4 py-2"
                      >
                        Annuler
                      </button>
                      <button type="submit" className="btn-gold px-4 py-2">
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="card-gold p-6 space-y-4">
            <h3 className="font-gold text-lg font-bold text-[var(--text-primary)]">Cartes Enregistrées (Stripe Customer)</h3>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 max-w-sm">
              <CreditCard className="w-8 h-8 text-[var(--accent-gold)]" />
              <div>
                <span className="font-bold text-xs text-[var(--text-primary)] block">Visa Signature •••• 4242</span>
                <span className="text-[10px] text-[var(--text-secondary)]">Expire 12/28 • Stripe Verified</span>
              </div>
              <span className="ml-auto text-[10px] text-emerald-400 font-bold">Actif</span>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="card-gold p-6 space-y-6 max-w-xl">
            <h3 className="font-gold text-lg font-bold text-[var(--text-primary)]">Préférences de Compte</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/30">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Langue d'Affichage</span>
                </div>
                <div className="flex gap-1">
                  {(['fr', 'ar', 'en'] as any[]).map(l => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`px-2.5 py-1 rounded-full uppercase text-[10px] font-bold ${
                        language === l ? 'bg-[var(--accent-gold)] text-[#0d1f14]' : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/30">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-[var(--accent-gold)]" /> : <Sun className="w-4 h-4 text-amber-300" />}
                  <span>Thème Graphique</span>
                </div>
                <button
                  onClick={toggleTheme}
                  className="btn-gold-outline px-3 py-1 text-[10px]"
                >
                  Basculer en mode {theme === 'dark' ? 'Clair' : 'Sombre'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
      <AiChatbotWidget />
      <StripeCheckoutModal />
    </div>
  );
}
