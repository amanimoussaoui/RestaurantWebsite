export type Language = 'fr' | 'ar' | 'en';
export type ServiceMode = 'sur_place' | 'a_emporter' | 'livraison';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type UserRole = 'customer' | 'admin';

export interface Category {
  id: string;
  name: { fr: string; ar: string; en: string };
  icon: string;
}

export interface NutritionFacts {
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  sugar?: number; // g
  sodium?: number; // mg
}

export interface MenuItem {
  id: string;
  name: { fr: string; ar: string; en: string };
  description: { fr: string; ar: string; en: string };
  price: number;
  category: string;
  image: string;
  spiceLevel: 0 | 1 | 2 | 3;
  isHealthy: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  nutrition?: NutritionFacts;
  dietTags?: Array<'diabetic' | 'keto' | 'high_protein' | 'low_fat' | 'vegetarian' | 'gluten_free'>;
  preparationTimeMinutes: number;
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
  notes?: string;
  selectedOptions?: string[];
}

export interface Address {
  id: string;
  title: string; // e.g. "Maison", "Bureau"
  street: string;
  city: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsappPhone?: string;
  avatarUrl?: string;
  role: UserRole;
  addresses: Address[];
  preferredLanguage: Language;
}

export interface Order {
  id: string;
  createdAt: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  serviceMode: ServiceMode;
  tableNumber?: string;
  deliveryAddress?: Address;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'stripe' | 'cash';
  paymentStatus: 'paid' | 'pending';
}

export interface Review {
  id: string;
  orderId?: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  isApproved: boolean;
  reply?: string;
}

export interface Reclamation {
  id: string;
  orderId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  subject: string;
  description: string;
  imageUrl?: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
  adminNote?: string;
}
