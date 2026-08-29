# 📄 Récapitulatif du Projet "Le Crispy / Malek" & Synthèse de la Conversation

Ce document regroupe l'intégralité de la documentation des fonctionnalités du site web / application mobile **Le Crispy**, ainsi que l'historique complet des échanges, décisions et réalisations de cette session de travail.

---

## 🎨 1. Identité Visuelle & Thème "Luxury Gourmet"

- **Palette de Couleurs** :
  - **Fond Principal** : Vert Émeraude Sombre (`#0D1F14`).
  - **Cartes & Surfaces** : Vert Forêt Sombre (`#14261A`).
  - **Accents & Boutons** : Or Gourmet (`#C9A24A`), Or Lumineux (`#E0B84A`) et Rouge Épicé (`#B3452C`).
  - **Textes** : Crème Blanche (`#F5F1E8`) et Gris Crème (`#C9C4B8`).
- **Support Multilingue (i18n)** :
  - **Français (FR)**, **Arabe (AR)** avec gestion automatique de la mise en page **RTL** (*Right-to-Left*), et **Anglais (EN)**.
- **Bascule de Thème** : Mode Sombre Luxe (par défaut) et Mode Clair.

---

## 🌐 2. Fonctionnalités & Structure des Pages

### 1. Page de Bienvenue (Landing / Welcome)
- **Design Immersif** : Logo central avec lueur et effet de pulsation doré.
- **Sélecteur de Langue** (FR / AR / EN) et bascule de thème.
- **Titre & Accroche** : *"Une Expérience Gastronomique Fast-Food Incroyable — La fusion entre le prestige de la haute cuisine et la gourmandise du burger."*
- **Boutons d'Action** : *"Explorer Le Crispy"* & *"Accéder au Menu"*.

### 2. Page d'Accueil (Home)
- **Header Prestige** : Logo "Le Crispy", navigation, sélecteur de langue, bascule de thème et badge de panier interactif.
- **Section Hero** : Slogan *"Le Fast-Food Haute Couture"* et bouton *"Scanner QR Table"*.
- **Scanner QR Code de Table** : Modal interactif pour simuler ou scanner le numéro de table (ex: *Table 07*) afin de commander directement depuis sa place.
- **Section "Nos Atouts"** :
  1. *Livraison Haute Précision* (Boîte isotherme dorée sous 30 min).
  2. *Viandes Maturées 28 Jours* (Boeuf Wagyu & Black Angus grillé sur pierre de lave).
  3. *Fait Maison & Bio* (Pains briochés pétris quotidiennement par des maîtres boulangers).
- **Section "Spécialités Star du Chef"** : Carrousel horizontal présentant les plats populaires.
- **Footer** : Coordonnées, horaires 7j/7 11h-23h, et bannière promo *"2 PIZZAS ACHETÉES = 1 PIZZA OFFERTE"*.

### 3. Page du Menu & Catalogue (Menu)
- **Barre de recherche en temps réel** pour filtrer par nom ou description de plat.
- **Filtres par Catégories** : *Krousty Bowls*, *Tex Mex & Snacking*, *Les Assiettes*, *Nos Salades*, *Nos Pâtes*, *Nos Gratins*, *Burgers & Tacos*, *Nos Boissons*, *Nos Desserts*.
- **Cartes Produits Interactives** : Image, prix en DT, calories, temps de préparation, niveau d'épices et bouton d'ajout rapide au panier.
- **Modal de Détails Produit** : Fiche complète avec valeurs nutritionnelles (Calories, Protéines, Glucides, Lipides), champ d'instructions spéciales et sélection de quantité.

### 4. Espace Healthy & Fitness Gym (Healthy)
- **Page dédiée aux sportifs et régimes alimentaires**.
- **Sliders de macronutriments** :
  - *Calories Max* (Curseur 300 à 1000 kcal).
  - *Protéines Min* (Curseur 0 à 60 g).
- **Filtres par Régimes** : *Tous*, *Riche en Protéines*, *Kéto / Low Carb*, *Adapté Diabétique*, *Super Healthy*.
- **Cartes Nutritionnelles (NutritionFactCard)** : Badges détaillés des protéines, glucides, lipides et ajout direct au panier.

### 5. Page des Avis Clients (Reviews)
- **Score d'Excellence** : Note globale de **4.9 / 5.0 ★** basée sur +128 avis vérifiés.
- **Formulaire de Dépôt d'Avis** : Saisie du nom, sélection de la note par étoiles (1 à 5 stars), rédaction du commentaire et soumission instantanée.
- **Flux des Avis** : Consultation des commentaires des clients.

### 6. Authentification & Compte Client (Profile & Auth)
- **Connexion / Inscription** : Formulaires sécurisés par email/mot de passe.
- **Profil Client** : Badge *★ Membre Le Crispy Club*.
- **Gestion des Adresses de Livraison** : Ajout et gestion d'adresses avec option *Par défaut*.

### 7. Suivi des Commandes & Panel Administration (Dashboard & Admin)
- **Suivi Live des Commandes** :
  - ⏳ `pending` (En attente).
  - 🍳 `preparing` (En préparation).
  - 🔔 `ready` (Prête).
  - ✅ `delivered` (Livrée).
  - ❌ `cancelled` (Annulée).
- **Interface Admin** : Changement d'état des commandes en direct par le gérant du restaurant.

### 8. Assistant IA Concierge Culinaire (AiChatbotWidget)
- **Widget Flottant Interactif** 🤖 présent sur toutes les pages.
- **Conseils Personnalisés** : Analyse les besoins de l'utilisateur (*"Je veux un plat piquant"*, *"Un plat healthy pour la musculation"*, *"Le meilleur burger"*).
- **Ajout Direct au Panier** : Propose des cartes de plats recommandés directement dans le fil de discussion.

### 9. Panier & Checkout Modal (Checkout)
- **Choix du Mode de Service** :
  - 🍽️ **Sur Place** : Saisie obligatoire du N° de Table (ex: *Table 04*).
  - 🛍️ **À Emporter**.
  - 🛵 **Livraison à Domicile** : Sélection de l'adresse et calcul des frais de livraison.
- **Calculs en temps réel** : Sous-total, frais de livraison, total et récapitulatif.

---

## 🗄️ 3. Schéma de la Base de Données Supabase (`supabase_schema.sql`)

1. **`users`** : ID, email, name, phone, avatar_url, role (`customer`|`admin`), preferred_language, timestamps.
2. **`addresses`** : ID, user_id, title, street, city, zip_code, phone, is_default.
3. **`categories`** : ID, name_fr, name_ar, name_en, icon.
4. **`menu_items`** : ID, name_fr, name_ar, name_en, desc_fr, desc_ar, desc_en, price, category, image, spice_level, is_healthy, is_popular, is_new, preparation_time_minutes, calories, protein, carbs, fat, diet_tags.
5. **`orders`** : ID, user_email, user_name, user_phone, service_mode, table_number, delivery_address, items (JSON), subtotal, delivery_fee, total, status, payment_method, payment_status, created_at.
6. **`reviews`** : ID, user_name, user_avatar, rating, comment, is_approved, reply, created_at.
7. **`reclamations`** : ID, order_id, user_name, user_email, user_phone, subject, description, image_url, status, admin_note, created_at.

---

## 💬 4. Synthèse Historique de la Conversation

### Étape 1 : Demande Initiale de l'Utilisateur
- **Demande** : Créer une application mobile Flutter identique au site web de restauration "Le Crispy / Malek" dans le dossier `C:\Users\amani\Desktop\malek\mobileapp`, avec base de données **Supabase** et environnement **VS Code**.
- **Analyse du projet Web existant** (`C:\Users\amani\Desktop\malek\website`) : Inspection des fonctionnalités, thèmes, traductions i18n, structure Prisma/PostgreSQL, cartes de produits, chatbot IA et checkout.

### Étape 2 : Plan d'Implémentation & Validation
- Rédaction du plan d'implémentation détaillé (`implementation_plan.md`) couvrant la création du projet Flutter, le paramétrage de la palette de couleurs, le système multilingue, l'intégration Supabase et toutes les vues.
- Validation explicite par l'utilisateur.

### Étape 3 : Développement de l'Application Mobile Flutter
- Création du projet via `flutter create --org com.lecrispy mobileapp`.
- Configuration des dépendances dans `pubspec.yaml` (`supabase_flutter`, `provider`, `google_fonts`, `lucide_icons`, `shared_preferences`, `intl`, `url_launcher`, `http`).
- Génération du script SQL d'initialisation Supabase `supabase_schema.sql` dans le dossier mobile.
- Développement de tous les composants & écrans dans `lib/` :
  - `lib/config/` (`theme.dart`, `supabase_config.dart`)
  - `lib/models/` (`category.dart`, `menu_item.dart`, `order.dart`, `review.dart`, `user_profile.dart`)
  - `lib/providers/` (`theme_provider.dart`, `language_provider.dart`, `cart_provider.dart`, `auth_provider.dart`, `menu_provider.dart`, `order_provider.dart`)
  - `lib/services/` (`supabase_service.dart`, `ai_chatbot_service.dart`)
  - `lib/widgets/` (`luxury_header.dart`, `luxury_footer.dart`, `product_card.dart`, `product_detail_dialog.dart`, `nutrition_fact_card.dart`, `ai_chatbot_widget.dart`)
  - `lib/views/` (`welcome_screen.dart`, `home_screen.dart`, `menu_screen.dart`, `healthy_screen.dart`, `reviews_screen.dart`, `login_screen.dart`, `register_screen.dart`, `profile_screen.dart`, `dashboard_screen.dart`, `checkout_modal.dart`, `qr_scanner_dialog.dart`)
  - `lib/main.dart`
- Analyse et correction de tous les types et règles linter via `flutter analyze`.

### Étape 4 : Diagnostic & Résolution du Problème de Lancement
- **Incident signalé par l'utilisateur** : Message d'erreur `Out of memory` / `Espace insuffisant sur le disque` lors du lancement de `flutter run -d edge`.
- **Diagnostic** : Le disque système `C:` disposait de seulement 50 Mo de disponible, ce qui bloquait le compilateur Dart.
- **Résolution** :
  - Nettoyage des dossiers temporaires du système, libérant près de **2 Go d'espace libre**.
  - Retrait de la dépendance lourde `mobile_scanner` au profit du composant QR dialog optimisé.
  - Exécution réussie de `flutter run -d edge`.
- **Résultat** : L'application mobile Flutter est lancée et active dans le navigateur Edge avec rechargement à chaud (Hot Restart).

---

## 🚀 5. Commandes Utiles pour Tester l'App Mobile

1. **Lancer sur Edge (Web)** :
   ```bash
   cd C:\Users\amani\Desktop\malek\mobileapp
   flutter run -d edge
   ```
2. **Lancer sur Windows Desktop** :
   ```bash
   cd C:\Users\amani\Desktop\malek\mobileapp
   flutter run -d windows
   ```
