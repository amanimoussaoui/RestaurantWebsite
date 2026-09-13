'use client';

import React, { useState, useEffect } from 'react';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_MENU, MOCK_REVIEWS, MOCK_RECLAMATIONS } from '@/data/mockData';
import { MenuItem, Review, Reclamation } from '@/types';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  Star, 
  Utensils, 
  History, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Download, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Lock, 
  Unlock, 
  Printer, 
  Eye, 
  Dumbbell,
  Filter, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Power, 
  Check, 
  X,
  MessageSquare,
  ChevronRight,
  TrendingDown,
  Activity,
  Flame,
  HeartPulse,
  Crown,
  Upload,
  Key,
  LogOut,
  BarChart3,
  PieChart,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
}

interface AdminUserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'cook' | 'cashier' | 'admin';
  status: 'active' | 'disabled';
  createdAt: string;
  orderCount: number;
}

export default function AdminDashboardPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { user, login, logout } = useAuth();
  const { t } = useLanguage();

  // Admin Security Access Check State
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState(false);

  // Navigation Sidebar Section State (8 Sections)
  const [activeSection, setActiveSection] = useState<
    'overview' | 'users' | 'orders' | 'claims' | 'reviews' | 'menu' | 'logs' | 'settings'
  >('overview');

  // Time Period Filter for Stats
  const [periodFilter, setPeriodFilter] = useState<'today' | 'week' | 'month'>('today');

  // Dynamic Sales Chart Data depending on periodFilter
  const getSalesChartData = () => {
    if (periodFilter === 'today') {
      return [
        { label: '11h-13h', sales: 342.50, percentage: 65 },
        { label: '13h-15h', sales: 580.00, percentage: 90 },
        { label: '15h-18h', sales: 210.00, percentage: 40 },
        { label: '18h-20h', sales: 790.50, percentage: 100 },
        { label: '20h-22h', sales: 640.00, percentage: 85 },
        { label: '22h-00h', sales: 380.00, percentage: 55 },
      ];
    } else if (periodFilter === 'week') {
      return [
        { label: 'Lun', sales: 1250.00, percentage: 55 },
        { label: 'Mar', sales: 1480.00, percentage: 65 },
        { label: 'Mer', sales: 1620.00, percentage: 72 },
        { label: 'Jeu', sales: 1890.00, percentage: 82 },
        { label: 'Ven', sales: 2450.00, percentage: 95 },
        { label: 'Sam', sales: 2780.00, percentage: 100 },
        { label: 'Dim', sales: 2150.00, percentage: 88 },
      ];
    } else {
      return [
        { label: 'Sem 1', sales: 8450.00, percentage: 70 },
        { label: 'Sem 2', sales: 9800.00, percentage: 82 },
        { label: 'Sem 3', sales: 11200.00, percentage: 92 },
        { label: 'Sem 4', sales: 12450.00, percentage: 100 },
      ];
    }
  };

  // Export Modal State & Handlers
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExportCSV = () => {
    const headers = ["ID Commande", "Date", "Client", "Email", "Telephone", "Mode Service", "Total EUR", "Statut"];
    const rows = orders.map((o: any) => [
      o.id,
      o.createdAt ? new Date(o.createdAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      `"${(o.userName || 'Client').replace(/"/g, '""')}"`,
      o.userEmail || o.email || 'client@example.com',
      o.userPhone || '09 56 07 00 91',
      o.serviceMode || 'Livraison',
      Number(o.total || 0).toFixed(2),
      o.status || 'paid'
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + 
      [headers.join(";"), ...rows.map((e: any) => e.join(";"))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rapport_Ventes_LeCrispy_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportModal(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const totalSales = orders.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0).toFixed(2);
    const totalOrders = orders.length;
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

    const rowsHtml = orders.map((o: any) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px; font-weight: bold; font-family: monospace;">${o.id}</td>
        <td style="padding: 10px;">${o.createdAt ? new Date(o.createdAt).toLocaleDateString('fr-FR') : dateStr}</td>
        <td style="padding: 10px;">${o.userName || 'Client'}</td>
        <td style="padding: 10px; text-transform: uppercase;">${o.serviceMode || 'Livraison'}</td>
        <td style="padding: 10px; text-align: right; font-weight: bold; color: #b48529; font-family: monospace;">${Number(o.total || 0).toFixed(2)} €</td>
        <td style="padding: 10px; text-align: center; text-transform: uppercase; font-size: 11px;">${o.status || 'Payée'}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rapport d'Activité & Ventes — Le Crispy Dormans</title>
        <style>
          body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; padding: 40px; color: #111; background-color: #fff; }
          .header { text-align: center; border-bottom: 3px solid #c9a24a; padding-bottom: 20px; margin-bottom: 25px; }
          .logo { font-size: 26px; font-weight: 900; color: #c9a24a; text-transform: uppercase; letter-spacing: 2px; }
          .subtitle { font-size: 14px; color: #555; margin-top: 6px; font-weight: 600; }
          .kpi-container { display: flex; justify-content: space-between; margin-bottom: 30px; gap: 20px; }
          .kpi-box { flex: 1; border: 2px solid #c9a24a; padding: 18px; border-radius: 12px; text-align: center; background: #fdfbf7; }
          .kpi-value { font-size: 26px; font-weight: 900; color: #111; margin-top: 6px; font-family: monospace; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
          th { background: #121814; color: #c9a24a; padding: 12px; text-align: left; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
          .footer { text-align: center; margin-top: 50px; font-size: 11px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">👑 LE CRISPY DORMANS</div>
          <div class="subtitle">Rapport Officiel d'Activité et des Ventes — ${dateStr}</div>
        </div>

        <div class="kpi-container">
          <div class="kpi-box">
            <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #666;">Chiffre d'Affaires Total</div>
            <div class="kpi-value">${totalSales} €</div>
          </div>
          <div class="kpi-box">
            <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #666;">Commandes Enregistrées</div>
            <div class="kpi-value">${totalOrders}</div>
          </div>
          <div class="kpi-box">
            <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #666;">Panier Moyen Client</div>
            <div class="kpi-value">${(totalOrders > 0 ? (Number(totalSales) / totalOrders).toFixed(2) : '0.00')} €</div>
          </div>
        </div>

        <h3 style="color: #121814; border-bottom: 2px solid #c9a24a; padding-bottom: 8px; margin-top: 30px;">Journal Complet des Commandes & Ventes</h3>
        <table>
          <thead>
            <tr>
              <th>N° Commande</th>
              <th>Date</th>
              <th>Client</th>
              <th>Mode Service</th>
              <th style="text-align: right;">Total (€)</th>
              <th style="text-align: center;">Statut</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="footer">
          Document d'administration officiel généré par Le Crispy Dormans (1 rue Jean de Dormans, 51700 Dormans). Tel: 09 56 07 00 91
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    setShowExportModal(false);
  };

  // --- SECTION 2: USERS STATE (POSTGRESQL SYNCED) ---
  const [userList, setUserList] = useState<AdminUserAccount[]>([
    { id: 'usr-1', name: 'ben moussa malek', email: 'benmoussamalek12@gmail.com', phone: '+216 27 500 246', role: 'customer', status: 'active', createdAt: '2026-07-20', orderCount: 8 },
    { id: 'usr-2', name: 'ben moussa malek (Admin)', email: 'amounatahfouna443@gmail.com', phone: '+216 27 500 246', role: 'admin', status: 'active', createdAt: '2026-06-10', orderCount: 15 },
    { id: 'usr-3', name: 'Ines Triki (Caisse)', email: 'ines.caisse@lecrispy.com', phone: '+33 6 55 88 99 00', role: 'cashier', status: 'active', createdAt: '2026-07-01', orderCount: 0 }
  ]);
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<'cook' | 'cashier'>('cook');
  const [selectedUserDetail, setSelectedUserDetail] = useState<AdminUserAccount | null>(null);

  // --- SECTION 3: ORDERS STATE ---
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderModeFilter, setOrderModeFilter] = useState('all');

  // --- SECTION 4: CLAIMS STATE ---
  const [claimsList, setClaimsList] = useState<Reclamation[]>(MOCK_RECLAMATIONS);

  // --- SECTION 5: REVIEWS STATE ---
  const [reviewsList, setReviewsList] = useState<Review[]>(MOCK_REVIEWS);
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number | 'all'>('all');

  // --- SECTION 6: MENU STATE & FULL PRODUCT FORM MATCHING FRONTEND DISPLAY ---
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU);
  const [menuCategoryFilter, setMenuCategoryFilter] = useState('all');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Form Fields Matching Frontend Display Exactly (Euro €):
  const [formNameFr, setFormNameFr] = useState('');
  const [formNameAr, setFormNameAr] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formCategory, setFormCategory] = useState('burgers');
  const [formPriceEUR, setFormPriceEUR] = useState('24.90');
  const [formDescFr, setFormDescFr] = useState('');
  const [formDescAr, setFormDescAr] = useState('');
  const [formDescEn, setFormDescEn] = useState('');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80');
  const [formSpiceLevel, setFormSpiceLevel] = useState<number>(0);
  const [formPrepTime, setFormPrepTime] = useState<number>(15);
  const [formIsPopular, setFormIsPopular] = useState<boolean>(true);
  const [formIsNew, setFormIsNew] = useState<boolean>(true);
  const [formIsHealthy, setFormIsHealthy] = useState<boolean>(false);
  const [formCalories, setFormCalories] = useState<number>(850);
  const [formProtein, setFormProtein] = useState<number>(52);
  const [formCarbs, setFormCarbs] = useState<number>(48);
  const [formFat, setFormFat] = useState<number>(46);
  const [formDietTags, setFormDietTags] = useState<string[]>(['high_protein']);

  // Fetch PostgreSQL Users, Menu Items, Reviews & Reclamations on Mount + Real-Time Sync
  const loadAdminData = () => {
    // 1. Fetch Users
    fetch('/api/users')
      .then(res => res.ok ? res.json() : [])
      .then(dbUsers => {
        if (Array.isArray(dbUsers) && dbUsers.length > 0) {
          const mappedUsers: AdminUserAccount[] = dbUsers.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone || '09 56 07 00 91',
            role: u.role || 'customer',
            status: 'active',
            createdAt: u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : '2026-08-12',
            orderCount: u._count?.orders || 0
          }));
          setUserList(prev => {
            const combined = [...mappedUsers, ...prev];
            return combined.filter((v, i, a) => a.findIndex(t => t.email === v.email) === i);
          });
        }
      })
      .catch(() => {});

    // 2. Fetch Menu Items & Load localStorage custom_dishes
    let customDishes: MenuItem[] = [];
    try {
      const saved = localStorage.getItem('custom_dishes');
      if (saved) customDishes = JSON.parse(saved);
    } catch {}

    fetch('/api/menu')
      .then(res => res.ok ? res.json() : null)
      .then(apiDishes => {
        if (Array.isArray(apiDishes) && apiDishes.length > 0) {
          const combined = [...apiDishes, ...customDishes, ...MOCK_MENU];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setMenuItems(unique);
        } else {
          const combined = [...customDishes, ...MOCK_MENU];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          setMenuItems(unique);
        }
      })
      .catch(() => {
        const combined = [...customDishes, ...MOCK_MENU];
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        setMenuItems(unique);
      });

    // 3. Fetch Reviews from PostgreSQL & localStorage
    let customRevs: Review[] = [];
    try {
      const savedRevs = localStorage.getItem('custom_reviews');
      if (savedRevs) customRevs = JSON.parse(savedRevs);
    } catch {}

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

    // 4. Fetch Reclamations from PostgreSQL & localStorage
    let customRecs: Reclamation[] = [];
    try {
      const savedRecs = localStorage.getItem('custom_reclamations');
      if (savedRecs) customRecs = JSON.parse(savedRecs);
    } catch {}

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
    loadAdminData();
    window.addEventListener('storage', loadAdminData);
    return () => window.removeEventListener('storage', loadAdminData);
  }, []);

  // --- SECTION 7: AUDIT LOGS STATE ---
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'log-1', adminName: 'Super Admin Malek', action: 'Changement de statut commande', target: 'ORD-6190 ➔ Prête', timestamp: '2026-08-08 15:15' },
    { id: 'log-2', adminName: 'Super Admin Malek', action: 'Désactivation de compte client', target: 'Client Mohamed Ali (dali@example.com)', timestamp: '2026-08-08 14:30' },
    { id: 'log-3', adminName: 'Ines (Caissière)', action: 'Validation de paiement', target: 'Paiement Carte Table #03 (18.50 €)', timestamp: '2026-08-08 13:40' }
  ]);

  // --- SECTION 8: SETTINGS STATE ---
  const [onlineOrderingEnabled, setOnlineOrderingEnabled] = useState(true);
  const [deliveryFeeEUR, setDeliveryFeeEUR] = useState('3.50');
  const [openingHours, setOpeningHours] = useState('7j/7 : 11h30 – 02h00');
  const [restaurantAddress, setRestaurantAddress] = useState('42 Avenue des Champs-Élysées, 75008 Paris');
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Helper log addition
  const addLog = (action: string, target: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      adminName: user?.name || 'Admin',
      action,
      target,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Admin Login Handler
  const handleAdminGateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'admin123' || adminPasswordInput === 'admin') {
      await login('admin@lecrispy.fr', 'admin', 'Super Administrateur Malek', '+33 1 42 68 00 00');
      setAdminAuthError(false);
    } else {
      setAdminAuthError(true);
    }
  };

  // KPIs Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgBasket = orders.length > 0 ? totalRevenue / orders.length : 0;
  const pendingClaimsCount = claimsList.filter(c => c.status !== 'resolved').length;

  // Filtered Lists
  const filteredUsers = userList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredOrdersList = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) || o.userName.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const matchesMode = orderModeFilter === 'all' || o.serviceMode === orderModeFilter;
    return matchesSearch && matchesStatus && matchesMode;
  });

  const filteredReviewsList = reviewsList.filter(r => {
    return reviewRatingFilter === 'all' || r.rating === Number(reviewRatingFilter);
  });

  const filteredMenuList = menuItems.filter(m => menuCategoryFilter === 'all' || m.category === menuCategoryFilter);

  // User Actions
  const toggleUserStatus = (userId: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'disabled' : 'active';
        addLog(`Modification statut compte`, `${u.name} ➔ ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newAccount: AdminUserAccount = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone || '+33 1 00 00 00 00',
      role: newUserRole,
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
      orderCount: 0
    };
    setUserList(prev => [newAccount, ...prev]);
    addLog(`Création de compte ${newUserRole}`, `${newUserName} (${newUserEmail})`);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
  };

  // Product Stock Toggle
  const toggleProductStock = (productId: string) => {
    setMenuItems(prev => prev.map(p => {
      if (p.id === productId) {
        const nextState = !p.isPopular;
        addLog(`Changement disponibilité produit`, `${p.name.fr}`);
        return { ...p, isPopular: nextState };
      }
      return p;
    }));
  };

  // Create Product in Database & State with complete frontend fields in Euro €
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameFr || !formPriceEUR) return;

    const newDish: MenuItem = {
      id: `dish-${Date.now()}`,
      name: {
        fr: formNameFr,
        ar: formNameAr || formNameFr,
        en: formNameEn || formNameFr
      },
      description: {
        fr: formDescFr || 'Spécialité gourmande Le Crispy',
        ar: formDescAr || formDescFr,
        en: formDescEn || formDescFr
      },
      price: parseFloat(formPriceEUR),
      category: formCategory,
      image: formImage,
      spiceLevel: formSpiceLevel as 0 | 1 | 2 | 3,
      isHealthy: formIsHealthy || formCategory === 'healthy',
      isPopular: formIsPopular,
      isNew: formIsNew,
      preparationTimeMinutes: formPrepTime,
      nutrition: {
        calories: formCalories,
        protein: formProtein,
        carbs: formCarbs,
        fat: formFat
      },
      dietTags: formDietTags as any[]
    };

    // Save to PostgreSQL via API
    try {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDish)
      });
    } catch {}

    // Save to localStorage for real-time frontend & dashboard sync
    try {
      const existing = localStorage.getItem('custom_dishes');
      const list = existing ? JSON.parse(existing) : [];
      const updated = [newDish, ...list];
      localStorage.setItem('custom_dishes', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch {}

    setMenuItems(prev => [newDish, ...prev]);
    addLog(`Ajout plat au menu (PostgreSQL)`, `${formNameFr} (${formPriceEUR} €)`);
    setShowAddProductModal(false);

    // Reset Form
    setFormNameFr('');
    setFormNameAr('');
    setFormNameEn('');
    setFormDescFr('');
    setFormDescAr('');
    setFormDescEn('');
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addLog(`Modification paramètres généraux`, `Frais: ${deliveryFeeEUR} €, Statut Service: ${onlineOrderingEnabled ? 'Actif' : 'Maintenance'}`);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  // =========================================================================
  // STANDALONE ADMIN PORTAL LAYOUT (ISOLATED FROM CUSTOMER FRONTEND HEADER/FOOTER)
  // =========================================================================
  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row select-none">
      
      {/* LEFT ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-stone-950 border-r border-[var(--border-gold)]/40 p-5 flex flex-col justify-between shrink-0 space-y-6">
        
        <div className="space-y-6">
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--border-gold)]/40">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a24a] to-[#a8823a] p-0.5 overflow-hidden shadow-[0_0_20px_rgba(201,162,74,0.5)] shrink-0">
              <img src="/logo.png" alt="Le Crispy Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="font-gold font-extrabold text-lg text-gold-gradient leading-tight">
                Le Crispy
              </h2>
              <span className="text-[10px] text-[var(--accent-gold)] font-mono uppercase tracking-widest block">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="space-y-1.5 text-xs font-bold">
            {[
              { id: 'overview', label: "1. Tableau de Bord", icon: LayoutDashboard },
              { id: 'users', label: "2. Utilisateurs & Staff", icon: Users, badge: userList.length },
              { id: 'orders', label: "3. Commandes Live", icon: ShoppingBag, badge: orders.length },
              { id: 'claims', label: "4. Réclamations", icon: AlertTriangle, badge: pendingClaimsCount },
              { id: 'reviews', label: "5. Avis Clients", icon: Star, badge: reviewsList.length },
              { id: 'menu', label: "6. Gestion Carte Menu", icon: Utensils, badge: menuItems.length },
              { id: 'logs', label: "7. Journal Actions", icon: History, badge: auditLogs.length },
              { id: 'settings', label: "8. Paramètres", icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`w-full px-3.5 py-3 rounded-xl flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c9a24a] to-[#a8823a] text-[#0d1f14] shadow-[0_0_20px_rgba(201,162,74,0.4)] font-extrabold'
                      : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-[#0d1f14] text-[var(--accent-gold)]' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Admin Profile & Back to Site Link */}
        <div className="pt-4 border-t border-[var(--border-gold)]/30 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-stone-900 border border-[var(--border-gold)]/30">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-[#0d1f14] flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0 text-left">
              <span className="font-bold text-xs text-white block truncate">{user?.name || 'Super Administrateur'}</span>
              <span className="text-[10px] text-emerald-400 block font-mono">Super Admin</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 btn-gold-outline py-2 text-[11px] text-center font-bold flex items-center justify-center gap-1"
            >
              <span>Site Client</span>
            </Link>
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-300 hover:bg-rose-900 transition-colors"
              title="Déconnexion Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* RIGHT MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 bg-black">
        
        {/* Top Bar Workspace Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[var(--border-gold)]/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider">Espace d'Administration</span>
              <span className="px-2 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 text-[10px] font-mono">EN DIRECT</span>
            </div>
            <h1 className="font-gold text-2xl sm:text-3xl font-extrabold text-gold-gradient">
              {activeSection === 'overview' && "1. Vue d'Ensemble & Statistiques Financières"}
              {activeSection === 'users' && "2. Gestion des Comptes Utilisateurs & Brigade"}
              {activeSection === 'orders' && "3. Moniteur des Commandes en Direct"}
              {activeSection === 'claims' && "4. Centre de Traitement des Réclamations"}
              {activeSection === 'reviews' && "5. Modération des Avis & Commentaires"}
              {activeSection === 'menu' && "6. Gestion de la Carte & Ingrédients du Menu"}
              {activeSection === 'logs' && "7. Traçabilité & Journal d'Audit des Actions"}
              {activeSection === 'settings' && "8. Configuration Générale du Restaurant"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-stone-900 border border-[var(--border-gold)]/40 rounded-full p-1 text-xs">
              {(['today', 'week', 'month'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriodFilter(p)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                    periodFilter === p ? 'bg-[var(--accent-gold)] text-[#0d1f14]' : 'text-stone-400'
                  }`}
                >
                  {p === 'today' ? "Aujourd'hui" : p === 'week' ? "Semaine" : "Mois"}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowExportModal(true)}
              className="btn-gold px-4 py-2 text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Exporter Rapport</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: VUE D'ENSEMBLE & RICH STATISTICAL CHARTS (EURO €) */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Stat Cards (Euro €) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="card-gold p-6 space-y-2 bg-gradient-to-br from-stone-950 to-[#0d1f14] border-[var(--border-gold)]">
                <div className="flex justify-between items-center text-stone-400 text-xs font-bold uppercase">
                  <span>Chiffre d'Affaires</span>
                  <DollarSign className="w-5 h-5 text-[var(--accent-gold)]" />
                </div>
                <div className="font-gold font-extrabold text-3xl text-white">
                  {totalRevenue.toFixed(2)} €
                </div>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs période précédente
                </span>
              </div>

              <div className="card-gold p-6 space-y-2 bg-gradient-to-br from-stone-950 to-[#0d1f14] border-[var(--border-gold)]">
                <div className="flex justify-between items-center text-stone-400 text-xs font-bold uppercase">
                  <span>Commandes Total</span>
                  <ShoppingBag className="w-5 h-5 text-sky-400" />
                </div>
                <div className="font-gold font-extrabold text-3xl text-sky-400">
                  {orders.length}
                </div>
                <span className="text-[11px] text-stone-400">Suivi en temps réel</span>
              </div>

              <div className="card-gold p-6 space-y-2 bg-gradient-to-br from-stone-950 to-[#0d1f14] border-[var(--border-gold)]">
                <div className="flex justify-between items-center text-stone-400 text-xs font-bold uppercase">
                  <span>Panier Moyen</span>
                  <Activity className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-gold font-extrabold text-3xl text-amber-400">
                  {avgBasket.toFixed(2)} €
                </div>
                <span className="text-[11px] text-stone-400">Menu Gourmet 5 Étoiles</span>
              </div>

              <div className="card-gold p-6 space-y-2 bg-gradient-to-br from-stone-950 to-[#0d1f14] border-[var(--border-gold)]">
                <div className="flex justify-between items-center text-stone-400 text-xs font-bold uppercase">
                  <span>Alertes Support</span>
                  <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" />
                </div>
                <div className="font-gold font-extrabold text-3xl text-rose-400">
                  {pendingClaimsCount}
                </div>
                <span className="text-[11px] text-rose-300">Action requise</span>
              </div>

            </div>

            {/* Sales Charts & Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 card-gold p-6 space-y-4 bg-stone-950">
                <div className="flex justify-between items-center border-b border-[var(--border-gold)]/40 pb-3">
                  <h3 className="font-gold font-bold text-lg text-white">Évolution des Ventes ({periodFilter})</h3>
                  <span className="text-xs text-[var(--accent-gold)] font-mono">Devise: Euro (€)</span>
                </div>
                
                {/* Dynamic Visual Bar Chart with Euro Amounts */}
                <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2 bg-stone-900/60 rounded-2xl border border-[var(--border-gold)]/20 p-4">
                  {getSalesChartData().map((bar, i) => (
                    <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-2 group relative">
                      
                      {/* Price Badge on top of Bar */}
                      <div className="opacity-90 group-hover:opacity-100 transition-opacity bg-black/90 border border-[var(--accent-gold)] px-2 py-0.5 rounded text-[10px] text-[var(--accent-gold)] font-mono font-bold whitespace-nowrap shadow-lg">
                        {bar.sales.toFixed(0)} €
                      </div>

                      {/* Bar flex container */}
                      <div className="w-full flex-1 flex items-end justify-center px-1">
                        <div 
                          style={{ height: `${Math.max(bar.percentage, 12)}%` }}
                          className="w-full max-w-[42px] bg-gradient-to-t from-[#c9a24a] via-amber-400 to-yellow-200 rounded-t-lg group-hover:brightness-125 transition-all duration-500 shadow-[0_0_20px_rgba(201,162,74,0.5)] border-t border-amber-300"
                        />
                      </div>

                      {/* Label under bar */}
                      <span className="text-[11px] font-mono text-stone-300 font-bold tracking-wider">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 card-gold p-6 space-y-4 bg-stone-950">
                <h3 className="font-gold font-bold text-lg text-white border-b border-[var(--border-gold)]/40 pb-3">
                  Répartition des Ventes
                </h3>
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Burgers Prestige</span>
                      <span className="text-[var(--accent-gold)] font-bold">52%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent-gold)] w-[52%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Healthy & Fitness</span>
                      <span className="text-emerald-400 font-bold">28%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[28%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Desserts & Boissons</span>
                      <span className="text-amber-400 font-bold">20%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[20%]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Top 5 & Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-gold p-6 space-y-4 bg-stone-950">
                <h3 className="font-gold font-bold text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
                  <span>Top 5 des Plats les Plus Vendus</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {menuItems.slice(0, 5).map((dish, idx) => (
                    <div key={dish.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-[var(--border-gold)]/30">
                      <div className="flex items-center gap-3">
                        <span className="font-gold font-bold text-base text-[var(--accent-gold)]">#{idx + 1}</span>
                        <img src={dish.image} alt={dish.name.fr} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <span className="font-bold text-white block">{dish.name.fr}</span>
                          <span className="text-[10px] text-stone-400 uppercase">{dish.category}</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[var(--accent-gold)]">{dish.price.toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-gold p-6 space-y-4 bg-stone-950">
                <h3 className="font-gold font-bold text-lg text-white flex items-center gap-2 text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Alertes Support</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {claimsList.filter(c => c.status !== 'resolved').map(claim => (
                    <div key={claim.id} className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-rose-300">{claim.subject} ({claim.userName})</span>
                        <span className="text-[10px] text-rose-400 font-mono">{claim.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-rose-200">{claim.description}</p>
                    </div>
                  ))}
                  {claimsList.filter(c => c.status !== 'resolved').length === 0 && (
                    <div className="text-center py-8 text-emerald-400 text-xs font-bold">
                      ✓ Aucune réclamation urgente.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 2: GESTION DES UTILISATEURS */}
        {activeSection === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-stone-950 border border-[var(--border-gold)]">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[var(--accent-gold)] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Rechercher nom, email..."
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="w-full bg-black border border-[var(--border-gold)] rounded-full pl-9 pr-4 py-2 text-xs text-white"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={e => setRoleFilter(e.target.value)}
                  className="bg-black border border-[var(--border-gold)] rounded-full px-3 py-2 text-xs text-white"
                >
                  <option value="all">Tous les Rôles</option>
                  <option value="customer">Clients</option>
                  <option value="cook">Cuisiniers</option>
                  <option value="cashier">Caissiers</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="btn-gold px-4 py-2 text-xs flex items-center gap-1.5 w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>Créer Compte Employé / Caissier</span>
              </button>
            </div>

            <div className="card-gold overflow-hidden bg-stone-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900 border-b border-[var(--border-gold)] text-[var(--accent-gold)] font-gold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Utilisateur</th>
                      <th className="p-3.5">Contact</th>
                      <th className="p-3.5">Rôle</th>
                      <th className="p-3.5">Commandes</th>
                      <th className="p-3.5">Statut</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-gold)]/30">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-stone-900/60 transition-colors">
                        <td className="p-3.5">
                          <span className="font-bold text-white block">{u.name}</span>
                          <span className="text-[10px] text-stone-400 font-mono">Inscrit: {u.createdAt}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-white block">{u.email}</span>
                          <span className="text-[10px] text-[var(--accent-gold)] font-mono">{u.phone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.role === 'admin' ? 'bg-amber-950 text-amber-300 border border-amber-500' :
                            u.role === 'cook' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' :
                            u.role === 'cashier' ? 'bg-sky-950 text-sky-300 border border-sky-500' : 'bg-stone-800 text-stone-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold font-mono text-[var(--accent-gold)]">
                          {u.orderCount} cmd(s)
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.status === 'active' ? 'text-emerald-400 bg-emerald-950' : 'text-rose-400 bg-rose-950'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setSelectedUserDetail(u)}
                            className="p-1 text-sky-400 hover:text-sky-300"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className="p-1 text-amber-400 hover:text-amber-300"
                          >
                            {u.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4 text-emerald-400" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: GESTION DES COMMANDES */}
        {activeSection === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-stone-950 border border-[var(--border-gold)] text-xs">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Rechercher N° commande ou client..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="bg-black border border-[var(--border-gold)] rounded-full px-4 py-2 text-xs text-white"
                />
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="bg-black border border-[var(--border-gold)] rounded-full px-3 py-2 text-xs text-white"
                >
                  <option value="all">Tous les Statuts</option>
                  <option value="pending">En attente</option>
                  <option value="preparing">En préparation</option>
                  <option value="ready">Prête</option>
                  <option value="delivered">Livrée / Servie</option>
                </select>
              </div>
            </div>

            <div className="card-gold overflow-hidden bg-stone-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900 border-b border-[var(--border-gold)] text-[var(--accent-gold)] font-gold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">N° Commande</th>
                      <th className="p-3.5">Client & Contact</th>
                      <th className="p-3.5">Mode</th>
                      <th className="p-3.5">Montant Total</th>
                      <th className="p-3.5">Statut Actuel</th>
                      <th className="p-3.5 text-right">Actions & Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-gold)]/30">
                    {filteredOrdersList.map(ord => (
                      <tr key={ord.id} className="hover:bg-stone-900/60 transition-colors">
                        <td className="p-3.5 font-bold font-mono text-[var(--accent-gold)]">
                          {ord.id}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-white block">{ord.userName}</span>
                          <span className="text-[10px] text-stone-400">{ord.userPhone}</span>
                        </td>
                        <td className="p-3.5 uppercase font-bold text-[10px]">
                          {ord.serviceMode.replace('_', ' ')} {ord.tableNumber ? `(T#${ord.tableNumber})` : ''}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          {ord.total.toFixed(2)} €
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.status === 'delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' :
                            ord.status === 'preparing' ? 'bg-amber-950 text-amber-300 border border-amber-500' : 'bg-stone-800 text-stone-300'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'preparing')}
                            className="px-2 py-1 text-[10px] font-bold bg-amber-500 text-black rounded"
                          >
                            Cuisine
                          </button>
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'delivered')}
                            className="px-2 py-1 text-[10px] font-bold bg-emerald-500 text-black rounded"
                          >
                            Livrée
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: RÉCLAMATIONS */}
        {activeSection === 'claims' && (
          <div className="space-y-6">
            <h3 className="font-gold font-bold text-xl text-white">Gestion des Réclamations Clients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {claimsList.map(claim => (
                <div key={claim.id} className="card-gold p-5 space-y-4 bg-stone-950 border-[var(--border-gold)]">
                  <div className="flex justify-between items-center border-b border-[var(--border-gold)]/40 pb-3">
                    <div>
                      <span className="font-gold font-bold text-sm text-[var(--accent-gold)]">{claim.id}</span>
                      <span className="text-xs text-white font-bold block">{claim.subject}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      claim.status === 'resolved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-rose-950 text-rose-300 border border-rose-500'
                    }`}>
                      {claim.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-stone-400">
                    <p><strong>Client :</strong> {claim.userName} ({claim.userEmail})</p>
                    <p><strong>Téléphone :</strong> {claim.userPhone}</p>
                    <p className="text-white pt-2 bg-black p-3 rounded-xl border border-[var(--border-gold)]/30">
                      "{claim.description}"
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        setClaimsList(prev => prev.map(c => c.id === claim.id ? { ...c, status: 'resolved' } : c));
                        addLog('Résolution de réclamation', `${claim.id} (${claim.userName})`);
                      }}
                      className="btn-gold px-4 py-1.5 text-xs flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>Marquer comme Résolue</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: AVIS CLIENTS (MODÉRATION) */}
        {activeSection === 'reviews' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 rounded-xl bg-stone-950 border border-[var(--border-gold)] text-xs">
              <h3 className="font-gold font-bold text-base text-white">Modération des Avis Clients</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviewsList.map(rev => (
                <div key={rev.id} className="card-gold p-5 space-y-3 bg-stone-950">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover border border-[var(--border-gold)]" />
                      <div>
                        <span className="font-bold text-xs text-white block">{rev.userName}</span>
                        <span className="text-[10px] text-stone-400">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex text-amber-300">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-300" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-white italic bg-black p-3 rounded-xl border border-[var(--border-gold)]/30">
                    "{rev.comment}"
                  </p>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        setReviewsList(prev => prev.filter(r => r.id !== rev.id));
                        addLog('Masquage/Suppression avis', `Avis de ${rev.userName}`);
                      }}
                      className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Masquer / Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: GESTION DU MENU & FORMULAIRE CONFORME À L'AFFICHAGE FRONTEND (EURO €) */}
        {activeSection === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-stone-950 border border-[var(--border-gold)]">
              <div className="flex items-center gap-3">
                <h3 className="font-gold font-bold text-base text-white">Gestion de la Carte du Restaurant</h3>
                <select
                  value={menuCategoryFilter}
                  onChange={e => setMenuCategoryFilter(e.target.value)}
                  className="bg-black border border-[var(--border-gold)] rounded-full px-3 py-1 text-xs text-white"
                >
                  <option value="all">Toutes les Catégories</option>
                  <option value="healthy">🥗 Healthy & Fitness (Salades & Bols)</option>
                  <option value="gym">🏋️ Plats Protéinés (Gym & Musculation)</option>
                  <option value="krousty">Krousty Gourmet</option>
                  <option value="texmex">Tex-Mex & Finger Food</option>
                  <option value="assiettes">Les Assiettes</option>
                  <option value="salades">Nos Salades</option>
                  <option value="pates">Nos Pâtes</option>
                  <option value="gratins">Nos Gratins</option>
                  <option value="burgers">Burgers & Tacos</option>
                  <option value="drinks">Boissons Fraîches</option>
                  <option value="desserts">Desserts Maison</option>
                </select>
              </div>

              <button 
                onClick={() => setShowAddProductModal(true)} 
                className="btn-gold px-5 py-2.5 text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Plat au Menu (€)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuList.map(dish => (
                <div key={dish.id} className="card-gold p-4 space-y-3 relative group bg-stone-950 border-[var(--border-gold)]">
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-[var(--border-gold)]">
                    <img src={dish.image} alt={dish.name.fr} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    
                    <button
                      onClick={() => toggleProductStock(dish.id)}
                      className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        dish.isPopular ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-rose-950 text-rose-300 border border-rose-500'
                      }`}
                    >
                      {dish.isPopular ? "En Stock" : "Rupture"}
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-gold font-bold text-sm text-white">{dish.name.fr}</h4>
                      <span className="font-gold font-bold text-base text-[var(--accent-gold)]">{dish.price.toFixed(2)} €</span>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">{dish.description.fr}</p>

                    {dish.nutrition && (
                      <div className="grid grid-cols-3 gap-1 mt-2 p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-[10px] text-center font-mono">
                        <div><span className="text-stone-400 block text-[9px]">Prot.</span><span className="text-emerald-400 font-bold">{dish.nutrition.protein || 30}g</span></div>
                        <div><span className="text-stone-400 block text-[9px]">Carbs</span><span className="text-amber-400 font-bold">{dish.nutrition.carbs || 20}g</span></div>
                        <div><span className="text-stone-400 block text-[9px]">Fat</span><span className="text-rose-400 font-bold">{dish.nutrition.fat || 15}g</span></div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-gold)]/30">
                    <button
                      onClick={() => {
                        setMenuItems(prev => {
                          const updated = prev.filter(m => m.id !== dish.id);
                          try {
                            localStorage.setItem('custom_dishes', JSON.stringify(updated));
                            window.dispatchEvent(new Event('storage'));
                          } catch {}
                          return updated;
                        });
                        addLog('Suppression plat du menu', `${dish.name.fr}`);
                      }}
                      className="text-rose-400 hover:text-rose-300 text-xs p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* MODAL ADAPTÉE EXACTEMENT À L'AFFICHAGE FRONTEND EN EURO € ET MACRONUTRIMENTS */}
            {showAddProductModal && (
              <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-stone-950 border-2 border-[var(--accent-gold)] rounded-2xl p-6 sm:p-8 w-full max-w-5xl my-8 space-y-6 shadow-[0_0_60px_rgba(201,162,74,0.4)]">
                  
                  <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-4">
                    <div>
                      <h3 className="font-gold text-2xl font-bold text-gold-gradient">
                        Ajouter un Plat au Menu & Espace Healthy / Gym (€)
                      </h3>
                      <p className="text-xs text-stone-400">
                        Formulaire conforme avec saisie des macronutriments (Prot., Carbs, Fat) et aperçu live frontend.
                      </p>
                    </div>
                    <button onClick={() => setShowAddProductModal(false)} className="text-stone-400 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: FORM INPUTS */}
                    <form onSubmit={handleCreateProduct} className="lg:col-span-7 space-y-4 text-xs">
                      
                      <div className="space-y-1">
                        <label className="font-bold text-white block">Nom du produit (Français *)</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Salade Méldoise ou Poulet Protéiné Gym"
                          value={formNameFr}
                          onChange={e => setFormNameFr(e.target.value)}
                          className="w-full bg-black border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-bold text-white block">Catégorie *</label>
                          <select
                            value={formCategory}
                            onChange={e => {
                              const cat = e.target.value;
                              setFormCategory(cat);
                              if (cat === 'healthy' || cat === 'gym') {
                                setFormIsHealthy(true);
                              }
                            }}
                            className="w-full bg-black border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white"
                          >
                            <option value="healthy">🥗 Healthy & Fitness (Salades & Bols)</option>
                            <option value="gym">🏋️ Plats Protéinés (Gym & Musculation)</option>
                            <option value="krousty">Krousty Gourmet</option>
                            <option value="texmex">Tex-Mex & Finger Food</option>
                            <option value="assiettes">Les Assiettes</option>
                            <option value="salades">Nos Salades</option>
                            <option value="pates">Nos Pâtes</option>
                            <option value="gratins">Nos Gratins</option>
                            <option value="burgers">Burgers Prestige</option>
                            <option value="drinks">Boissons Artisanales</option>
                            <option value="desserts">Desserts Maison</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-white block">Prix (€) *</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            placeholder="7.50"
                            value={formPriceEUR}
                            onChange={e => setFormPriceEUR(e.target.value)}
                            className="w-full bg-black border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-white block">Description gourmande / Ingrédients</label>
                        <textarea
                          placeholder="Ex: Salade verte, tomates fraîches, fromage de Brie fondant, chèvre chaud."
                          value={formDescFr}
                          onChange={e => setFormDescFr(e.target.value)}
                          className="w-full bg-black border border-[var(--border-gold)] rounded-xl p-3 text-xs text-white h-20"
                        />
                      </div>

                      {/* MACRONUTRIMENTS SECTION (PROT, CARBS, FAT, CALORIES) */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <Dumbbell className="w-4 h-4" />
                            <span>Macronutriments & Profil Healthy / Gym</span>
                          </span>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formIsHealthy}
                              onChange={e => setFormIsHealthy(e.target.checked)}
                              className="accent-emerald-500 w-4 h-4 rounded"
                            />
                            <span className="text-[11px] font-bold text-emerald-300">Activer Mode Healthy</span>
                          </label>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] text-stone-300 font-bold block">Prot. (g)</label>
                            <input
                              type="number"
                              value={formProtein}
                              onChange={e => setFormProtein(parseInt(e.target.value) || 0)}
                              className="w-full bg-black border border-emerald-500/50 rounded-lg p-2 text-xs text-emerald-400 font-bold text-center font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-stone-300 font-bold block">Carbs (g)</label>
                            <input
                              type="number"
                              value={formCarbs}
                              onChange={e => setFormCarbs(parseInt(e.target.value) || 0)}
                              className="w-full bg-black border border-amber-500/50 rounded-lg p-2 text-xs text-amber-300 font-bold text-center font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-stone-300 font-bold block">Fat (g)</label>
                            <input
                              type="number"
                              value={formFat}
                              onChange={e => setFormFat(parseInt(e.target.value) || 0)}
                              className="w-full bg-black border border-rose-500/50 rounded-lg p-2 text-xs text-rose-300 font-bold text-center font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-stone-300 font-bold block">Calories (kcal)</label>
                            <input
                              type="number"
                              value={formCalories}
                              onChange={e => setFormCalories(parseInt(e.target.value) || 0)}
                              className="w-full bg-black border border-[var(--border-gold)] rounded-lg p-2 text-xs text-[var(--accent-gold)] font-bold text-center font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div className="space-y-2 p-3 rounded-xl bg-black border border-dashed border-[var(--accent-gold)]">
                        <label className="font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
                          <Upload className="w-4 h-4" />
                          <span>Photo du Produit (Importer depuis votre appareil)</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setFormImage(event.target.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-[10px] text-stone-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-[var(--accent-gold)] file:text-[#0d1f14]"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border-gold)]">
                        <button
                          type="button"
                          onClick={() => setShowAddProductModal(false)}
                          className="btn-gold-outline px-5 py-2.5 text-xs"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="btn-gold px-6 py-2.5 text-xs font-bold shadow-lg"
                        >
                          Enregistrer & Publier
                        </button>
                      </div>

                    </form>

                    {/* RIGHT COLUMN: LIVE FRONTEND HEALTHY PRODUCT CARD PREVIEW */}
                    <div className="lg:col-span-5 space-y-3">
                      <h4 className="font-gold font-bold text-sm text-[var(--accent-gold)] flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>Aperçu Exact Carte Frontend (€ & Macros)</span>
                      </h4>

                      <div className="card-gold p-4 space-y-3 bg-stone-900 border-2 border-[var(--accent-gold)] shadow-2xl relative rounded-2xl">
                        <div className="relative h-44 w-full rounded-xl overflow-hidden border border-[var(--border-gold)]">
                          <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 flex gap-1">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500 text-[9px] font-bold uppercase font-mono">
                              HIGH PROTEIN
                            </span>
                          </div>
                          <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-black/80 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-[10px] font-mono font-bold">
                            {formCalories || 335} kcal
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h5 className="font-gold font-bold text-base text-white">
                            {formNameFr || "Salade Méldoise"}
                          </h5>
                          <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                            {formDescFr || "Salade verte, tomates fraîches, fromage de Brie fondant, chèvre chaud."}
                          </p>
                        </div>

                        {/* MACRO NUTRIENTS GRID EXACT FRONTEND FORMAT */}
                        <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-black border border-[var(--border-gold)]/40 text-center text-xs">
                          <div className="p-1">
                            <div className="text-[10px] text-stone-400">Prot.</div>
                            <div className="font-bold text-emerald-400 font-mono text-sm">{formProtein || 30}g</div>
                          </div>
                          <div className="p-1 border-x border-[var(--border-gold)]/20">
                            <div className="text-[10px] text-stone-400">Carbs</div>
                            <div className="font-bold text-amber-300 font-mono text-sm">{formCarbs || 20}g</div>
                          </div>
                          <div className="p-1">
                            <div className="text-[10px] text-stone-400">Fat</div>
                            <div className="font-bold text-rose-300 font-mono text-sm">{formFat || 15}g</div>
                          </div>
                        </div>

                        <div className="pt-1 flex items-center justify-between">
                          <span className="font-gold font-bold text-xl text-[var(--accent-gold)] font-mono">
                            {parseFloat(formPriceEUR || '7.50').toFixed(2)} €
                          </span>
                          <button type="button" className="btn-gold px-3.5 py-1.5 text-xs font-bold">
                            Ajouter au Panier
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* SECTION 7: JOURNAL DES ACTIONS */}
        {activeSection === 'logs' && (
          <div className="space-y-6">
            <h3 className="font-gold font-bold text-xl text-white">Journal d'Audit & Traçabilité des Actions</h3>
            <div className="card-gold overflow-hidden bg-stone-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900 border-b border-[var(--border-gold)] text-[var(--accent-gold)] font-gold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Horodatage</th>
                      <th className="p-3.5">Administrateur / Employé</th>
                      <th className="p-3.5">Action Effectuée</th>
                      <th className="p-3.5">Cible / Détails</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-gold)]/30">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-stone-900/60 transition-colors">
                        <td className="p-3.5 font-mono text-stone-400">{log.timestamp}</td>
                        <td className="p-3.5 font-bold text-white">{log.adminName}</td>
                        <td className="p-3.5 text-[var(--accent-gold)] font-bold">{log.action}</td>
                        <td className="p-3.5 text-stone-300 font-mono">{log.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: PARAMÈTRES GÉNÉRAUX */}
        {activeSection === 'settings' && (
          <div className="card-gold p-6 space-y-6 max-w-2xl bg-stone-950 border-[var(--border-gold)]">
            <h3 className="font-gold font-bold text-xl text-white border-b border-[var(--border-gold)]/40 pb-3">
              Paramètres Généraux du Restaurant Le Crispy
            </h3>

            {settingsSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-5 h-5 shrink-0" />
                <span>Paramètres enregistrés avec succès !</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-black border border-[var(--border-gold)]/40">
                <div>
                  <span className="font-bold text-white block">Service de Commande en Ligne</span>
                  <span className="text-[10px] text-stone-400">Activer ou passer en maintenance temporaire</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOnlineOrderingEnabled(!onlineOrderingEnabled)}
                  className={`px-4 py-2 rounded-full font-bold text-xs uppercase flex items-center gap-2 ${
                    onlineOrderingEnabled ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{onlineOrderingEnabled ? "SERVICE ACTIF" : "MAINTENANCE"}</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Frais de Livraison (€)</label>
                <input
                  type="text"
                  value={deliveryFeeEUR}
                  onChange={e => setDeliveryFeeEUR(e.target.value)}
                  className="w-full bg-black border border-[var(--border-gold)] rounded-xl p-3 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Horaires d'Ouverture Affichés</label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={e => setOpeningHours(e.target.value)}
                  className="w-full bg-black border border-[var(--border-gold)] rounded-xl p-3 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Adresse du Restaurant</label>
                <input
                  type="text"
                  value={restaurantAddress}
                  onChange={e => setRestaurantAddress(e.target.value)}
                  className="w-full bg-black border border-[var(--border-gold)] rounded-xl p-3 text-white"
                />
              </div>

              <button type="submit" className="w-full btn-gold py-3 text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Enregistrer les Paramètres</span>
              </button>
            </form>
          </div>
        )}

        {/* --- EXPORT REPORT MODAL (PDF & CSV) --- */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="card-gold p-6 max-w-md w-full bg-stone-950 border border-[var(--border-gold)] space-y-6 shadow-2xl rounded-2xl relative">
              <button
                onClick={() => setShowExportModal(false)}
                className="absolute right-4 top-4 text-stone-400 hover:text-white p-1 rounded-lg border border-stone-800"
              >
                ✕
              </button>

              <div className="space-y-1 text-center border-b border-[var(--border-gold)]/30 pb-4">
                <h3 className="font-gold text-xl font-bold text-gold-gradient flex items-center justify-center gap-2">
                  <Download className="w-5 h-5 text-[var(--accent-gold)]" />
                  <span>Exporter le Rapport Financier & Ventes</span>
                </h3>
                <p className="text-xs text-stone-400">
                  Choisissez le format d'exportation souhaité pour télécharger les données réelles du restaurant.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleExportPDF}
                  className="w-full btn-gold py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg group hover:scale-[1.02] transition-all"
                >
                  <FileText className="w-5 h-5 text-amber-300" />
                  <span>📄 Exporter en PDF (Format Document / Imprimer)</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full py-3.5 rounded-xl bg-stone-900 border border-[var(--border-gold)] hover:border-[var(--accent-gold)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-stone-800 transition-all"
                >
                  <Download className="w-5 h-5 text-emerald-400" />
                  <span>📊 Exporter en CSV (Fichier Excel / Tableur)</span>
                </button>
              </div>

              <div className="text-[11px] text-stone-500 text-center pt-2 font-mono">
                Le Crispy Dormans — Data Export System v2.0
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
