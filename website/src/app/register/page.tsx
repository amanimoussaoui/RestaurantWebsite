'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Crown, Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Save registered email & password into localStorage credentials registry
    try {
      const saved = localStorage.getItem('registered_credentials');
      const creds = saved ? JSON.parse(saved) : {};
      creds[email.toLowerCase().trim()] = password;
      localStorage.setItem('registered_credentials', JSON.stringify(creds));
    } catch {}

    await login(email, 'customer', name, phone);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="card-gold w-full max-w-md p-8 space-y-6 bg-[var(--bg-secondary)] border-[var(--border-gold)]">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a24a] to-[#a8823a] p-0.5 mx-auto">
              <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                <Crown className="w-6 h-6 text-[var(--accent-gold)]" />
              </div>
            </div>
            <h1 className="font-gold text-2xl font-bold text-gold-gradient">
              {t('registerTitle')}
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Rejoignez le club privilégié Le Crispy et profitez de la haute gastronomie rapide.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-[var(--text-secondary)]">{t('nameLabel')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Amani Moussaoui"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[var(--text-secondary)]">{t('emailLabel')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[var(--text-secondary)]">{t('phoneLabel')}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[var(--text-secondary)]">{t('passwordLabel')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>{t('registerBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="text-center pt-2 border-t border-[var(--border-gold)]/30 text-xs text-[var(--text-secondary)]">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="text-[var(--accent-gold)] font-bold hover:underline">
              {t('loginTitle')}
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
