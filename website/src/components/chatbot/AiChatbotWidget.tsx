'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { MOCK_MENU } from '@/data/mockData';
import { MenuItem } from '@/types';
import { Bot, X, Send, Sparkles, ShoppingBag, Flame, Clock, HeartPulse } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  recommendedProducts?: MenuItem[];
}

export default function AiChatbotWidget() {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: t('chatWelcomeMsg')
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, language })
      });

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "Voici nos suggestions gourmandes du Chef :",
        recommendedProducts: data.products || MOCK_MENU.slice(0, 2)
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      // Fallback local logic
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Bonjour ! Je suis votre Concierge IA Le Crispy. Nos plats signature Wagyu et nos options Healthy sont servis chaud en moins de 30 minutes !",
        recommendedProducts: MOCK_MENU.slice(0, 2)
      };
      setMessages(prev => [...prev, botMsg]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-[#c9a24a] via-[#f3e5ab] to-[#a8823a] text-[#0d1f14] shadow-[0_0_30px_rgba(201,162,74,0.6)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          title="Chef IA — Concierge Culinaire"
        >
          <Bot className="w-7 h-7 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[var(--bg-primary)] animate-pulse" />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="relative w-[360px] sm:w-[420px] h-[540px] bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-2xl shadow-[0_0_50px_rgba(201,162,74,0.3)] flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Chat Header */}
          <div className="p-4 bg-[var(--bg-primary)] border-b border-[var(--border-gold)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a24a] to-[#a8823a] p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0d1f14] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[var(--accent-gold)]" />
                </div>
              </div>
              <div>
                <h4 className="font-gold font-bold text-sm text-gold-gradient flex items-center gap-1.5">
                  <span>{t('chatHeaderTitle')}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('chatHeaderStatus')}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#c9a24a] to-[#a8823a] text-[#0d1f14] font-semibold rounded-br-none'
                      : 'bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 text-[var(--text-primary)] rounded-bl-none shadow-md'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Recommended Product Cards inside Chat */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="w-full mt-3 space-y-2">
                    {msg.recommendedProducts.map(prod => (
                      <div
                        key={prod.id}
                        className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/50 flex items-center justify-between gap-3 shadow-md"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name.fr}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-gold font-bold text-xs text-white truncate">
                            {prod.name[language] || prod.name.fr}
                          </h5>
                          <span className="font-gold font-bold text-xs text-[var(--accent-gold)]">
                            {prod.price.toFixed(2)} €
                          </span>
                        </div>
                        <button
                          onClick={() => addItem(prod)}
                          className="btn-gold p-2 text-[10px] shrink-0"
                          title="Ajouter au panier"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-1.5 bg-[var(--bg-primary)] border-t border-[var(--border-gold)]/30 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setInput("Je veux un plat Healthy à moins de 500 kcal")}
              className="px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-gold)] text-[10px] text-[var(--accent-gold)] whitespace-nowrap hover:bg-[var(--accent-gold)]/10"
            >
              🥗 Healthy &lt; 500 kcal
            </button>
            <button
              onClick={() => setInput("Propose-moi le meilleur burger à la truffe")}
              className="px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-gold)] text-[10px] text-[var(--accent-gold)] whitespace-nowrap hover:bg-[var(--accent-gold)]/10"
            >
              🍔 Burger Truffe
            </button>
            <button
              onClick={() => setInput("Quelque chose d'épicé !")}
              className="px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-gold)] text-[10px] text-[var(--accent-gold)] whitespace-nowrap hover:bg-[var(--accent-gold)]/10"
            >
              🌶️ Épicé
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[var(--bg-primary)] border-t border-[var(--border-gold)] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t('chatPlaceholder')}
              className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-gold)] rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-gold)]"
            />
            <button
              type="submit"
              className="btn-gold p-2.5 rounded-full flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
