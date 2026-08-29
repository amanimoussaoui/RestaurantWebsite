-- ========================================================
-- SCRIPT SUPABASE SQL - RESTAURANT "LE CRISPY / MALEK"
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLE USERS
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer',
  preferred_language TEXT DEFAULT 'fr',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE ADDRESSES
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- 4. TABLE MENU_ITEMS
CREATE TABLE IF NOT EXISTS public.menu_items (
  id TEXT PRIMARY KEY,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  desc_fr TEXT,
  desc_ar TEXT,
  desc_en TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  spice_level INT DEFAULT 0,
  is_healthy BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  preparation_time_minutes INT DEFAULT 10,
  calories INT,
  protein NUMERIC(10,2),
  carbs NUMERIC(10,2),
  fat NUMERIC(10,2),
  diet_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  service_mode TEXT NOT NULL, -- 'sur_place' | 'a_emporter' | 'livraison'
  table_number TEXT,
  delivery_address JSONB,
  items JSONB NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) DEFAULT 0.00,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  payment_method TEXT DEFAULT 'cash', -- 'cash' | 'stripe'
  payment_status TEXT DEFAULT 'paid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  reply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLE RECLAMATIONS
CREATE TABLE IF NOT EXISTS public.reclamations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'new', -- 'new' | 'in_progress' | 'resolved'
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- INSERTION DES DONNÉES DE DÉMARRAGE (SEED)
-- ========================================================

-- Insert Categories
INSERT INTO public.categories (id, name_fr, name_ar, name_en, icon) VALUES
('krousty', 'Krousty Bowls', 'كروستي بول', 'Krousty Bowls', 'Crown'),
('texmex', 'Tex Mex & Snacking', 'تكس مكس', 'Tex Mex', 'Flame'),
('assiettes', 'Les Assiettes', 'الأطباق', 'Platters', 'UtensilsCrossed'),
('salades', 'Nos Salades', 'سلطات', 'Salads', 'HeartPulse'),
('pates', 'Nos Pâtes', 'معكرونة', 'Pasta', 'Sparkles'),
('gratins', 'Nos Gratins', 'غراتان', 'Gratins', 'Layers'),
('burgers', 'Burgers & Tacos', 'برجر وتاكوس', 'Burgers & Tacos', 'Crown'),
('drinks', 'Nos Boissons', 'مشروبات', 'Drinks', 'Wine'),
('desserts', 'Nos Desserts', 'حلويات', 'Desserts', 'Cake')
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Items
INSERT INTO public.menu_items (id, name_fr, name_ar, name_en, desc_fr, desc_ar, desc_en, price, category, image, spice_level, is_healthy, is_popular, is_new, preparation_time_minutes, calories, protein, carbs, fat, diet_tags) VALUES
('krousty-tenders', 'Krousty Tenders', 'كروستي تندر', 'Krousty Tenders', 'Riz parfumé, tenders de poulet croustillants, oignons frits, sauce maison, sauce chili thaï.', 'أرز معطر، تندر دجاج مقرمش، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.', 'Fragrant rice, crispy chicken tenders, fried onions, house sauce, thai chili sauce.', 10.90, 'krousty', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80', 1, false, true, true, 12, 650, 32, 70, 18, '{"High Protein"}'),
('krousty-kebab', 'Krousty Kebab', 'كروستي كباب', 'Krousty Kebab', 'Riz parfumé, viande kebab grillée, oignons frits, sauce maison, sauce chili thaï.', 'أرز معطر، لحم كباب مشوي، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.', 'Fragrant rice, grilled kebab meat, fried onions, house sauce, thai chili sauce.', 10.90, 'krousty', 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', 1, false, true, false, 12, 680, 30, 68, 22, '{"High Protein"}'),
('krousty-cordon-bleu', 'Krousty Cordon Bleu', 'كروستي كوردون بلو', 'Krousty Cordon Bleu', 'Riz parfumé, cordon bleu, oignons frits, sauce maison, sauce chili thaï.', 'أرز معطر، كوردون بلو، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.', 'Fragrant rice, cordon bleu, fried onions, house sauce, thai chili sauce.', 10.90, 'krousty', 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80', 1, false, true, false, 12, 720, 28, 75, 24, '{}'),
('wings-kfc-5', 'Wings Type KFC (x5)', 'أجنحة دجاج KFC (5 قطع)', 'KFC Style Wings (5pcs)', '5 ailerons de poulet mariné panure épicée façon KFC.', '5 قطع أجنحة دجاج متبلة مقرمشة.', '5 crispy spiced marinated chicken wings.', 5.90, 'texmex', 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80', 2, false, true, false, 8, 420, 26, 18, 22, '{}'),
('salade-poulet-grille', 'Salade Poulet Grillé Fit', 'سلطة دجاج مشوي صحية', 'Grilled Chicken Fit Salad', 'Blanc de poulet grillé aux herbes, mélange de jeunes pousses, tomates cerises, concombres, maïs et vinaigrette allégée.', 'صدر دجاج مشوي بالأعشاب، خضار مشكلة، طماطم كرزية، خيار، ذرة وصلصة لايت.', 'Grilled herb chicken breast, mixed greens, cherry tomatoes, cucumbers, corn and light dressing.', 9.50, 'salades', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', 0, true, true, true, 10, 380, 42, 15, 10, '{"Healthy", "High Protein", "Low Carb", "Keto"}'),
('burger-black-truffle', 'Black Truffle Gourmet Burger', 'برجر الترفاس الأسود الفاخر', 'Black Truffle Gourmet Burger', 'Steak haché Wagyu 180g, cheddar affiné, sauce mayonnaise truffée, oignons confits, bun brioché artisanal.', 'شريحة واغيو 180غ، جبن شيدر معتق، صوص الكمأة البيضاء، بصل مكرمل، خبز بريوش.', '180g Wagyu beef patty, aged cheddar, truffle mayo, caramelized onions, artisan brioche bun.', 14.90, 'burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', 0, false, true, true, 15, 820, 45, 50, 42, '{"Popular"}'),
('pizza-crispy-special', 'Pizza Le Crispy Royale', 'بيتزا كريسبي رويال', 'Le Crispy Royale Pizza', 'Sauce tomate bio, mozzarella di bufala, tenders poulet épicé, champignons frais, sauce gruyère maison.', 'صلصة طماطم عضوية، موزاريلا بوفالا، تندر دجاج حار، فطر طازج، صوص غرويير.', 'Organic tomato sauce, bufala mozzarella, spicy chicken tenders, fresh mushrooms, house gruyere sauce.', 12.50, 'burgers', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', 1, false, true, false, 15, 950, 38, 90, 36, '{"Popular"}')
ON CONFLICT (id) DO NOTHING;

-- Insert Initial Reviews
INSERT INTO public.reviews (user_name, rating, comment, is_approved) VALUES
('Amine K.', 5, 'Le meilleur Krousty de la région ! Le poulet est ultra croustillant et la sauce chili est incroyable.', true),
('Sarah M.', 5, 'Option Healthy parfaite pour ma diète sport. La salade poulet est ultra fraîche et super bien servie.', true),
('Youssef B.', 5, 'Service rapide, viande de super qualité. Le burger à la truffe est un pur chef d''œuvre !', true);
