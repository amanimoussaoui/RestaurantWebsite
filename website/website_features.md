# 📜 Documentation des Fonctionnalités du Site Web "Le Crispy / Malek"

Ce document récapitule l'ensemble des fonctionnalités, de la structure des pages, du design, de l'assistant IA et de l'architecture de la base de données du **Site Web "Le Crispy / Malek"**.

---

## 🎨 1. Identité Visuelle & Thème "Luxury Gourmet"

- **Palette de Couleurs** :
  - **Fond Principal** : Vert Émeraude Sombre (`#0D1F14`).
  - **Cartes & Surfaces** : Vert Forêt Sombre (`#14261A`).
  - **Accents & Boutons** : Or Gourmet (`#C9A24A`), Or Lumineux (`#E0B84A`) et Rouge Épicé (`#B3452C`).
  - **Textes** : Crème Blanche (`#F5F1E8`) et Gris Crème (`#C9C4B8`).
- **Support Multilingue (i18n)** :
  - **Français (FR)**, **Arabe (AR)** avec gestion automatique du RTL (*Right-to-Left*), et **Anglais (EN)**.
- **Bascule de Thème** : Mode Sombre Luxe (par défaut) et Mode Clair.

---

## 🌐 2. Structure des Pages & Routes du Site Web

### 1. Page de Bienvenue (Landing / Welcome) — `/`
- **Vidéo d'arrière-plan immersive** (`video1.mp4`) avec filtre d'assombrissement pour la lisibilité.
- **Médaillon central animé** avec logo "Le Crispy" et effet de pulsation doré.
- **Sélecteur de langue rapide** (FR / AR / EN) et bascule de thème (Sun/Moon) dans l'en-tête.
- **Titre & Accroche** : *"Haute Gastronomie & Fast Food Gourmet 5 Étoiles"*.
- **Boutons d'action** :
  - *"Explorer Le Crispy"* ➔ Redirige vers `/home`.
  - *"Voir le Menu Direct"* ➔ Redirige vers `/menu`.

---

### 2. Page d'Accueil Principale (Home) — `/home`
- **En-tête (Header)** :
  - Logo "Le Crispy", navigation principale, sélecteur de langue, bouton de thème et icône de panier avec badge de quantité.
- **Section Héro (Hero)** :
  - Titre principal, slogan et bouton d'action *"Scanner la table"* qui ouvre un **Scanner de QR Code intégré**.
- **Section "Nos Atouts" (`AtoutsSection`)** :
  - Mise en avant des piliers du restaurant : Gastronomie 5 Étoiles, Ingrédients Frais, Service Rapide & Livraison Haute Précision.
- **Section "Spécialités Gourmet" (`SpecialtiesSection`)** :
  - Présentation des catégories phares (Burgers Gourmet, Pizzas Artisanales, Sandwiches, Desserts).
- **Section Vidéo de Préparation (`PreparationVideoSection`)** :
  - Coulisses de la préparation des plats en cuisine par le Chef.
- **Footer** :
  - Liens rapides, horaires d'ouverture, coordonnées et réseaux sociaux.

---

### 3. Page du Menu & Catalogue — `/menu`
- **Barre de recherche en temps réel** pour filtrer par nom ou description de plat.
- **Filtrage par Catégories** : *Burgers Gourmet*, *Sandwiches*, *Pizzas Artisanales*, *Boissons*, *Desserts*.
- **Filtres par Badges Diététiques** :
  - 🥗 *Healthy* (Plats équilibrés).
  - 🔥 *Populaire* (Plats stars du chef).
  - 🌶️ *Niveau d'épices* (De 0 à 3).
  - ✨ *Nouveau* (Nouveautés de la carte).
- **Cartes de plats interactives** :
  - Affichage de l'image, du prix en DT, des calories et du temps de préparation.
  - Bouton d'ajout rapide au panier.
  - Clic sur la carte pour ouvrir la **Fiche Détaillée du Plat** (`ProductDetailModal`) avec informations nutritionnelles complètes (Protéines, Glucides, Lipides, Calories) et champ d'instructions spéciales.

---

### 4. Espace Healthy & Fitness Gym — `/healthy`
- **Page dédiée à la nutrition sportive et à la gastronomie équilibrée**.
- **Panneau de filtres interactifs par Macronutriments** :
  - **Calories Max** (Curseur de 300 à 900 kcal).
  - **Protéines Min** (Curseur de 0 à 60 g).
  - **Glucides Max** (Curseur de 10 à 100 g).
- **Boutons de filtres par Régimes Alimentaires** :
  - *Tous*, *Riche en Protéines*, *Kéto / Low Carb*, *Diabétique*, *Pauvre en graisses*, *Végétarien*, *Sans Gluten*.
- **Cartes Nutritionnelles (`NutritionFactCard`)** :
  - Affichage clair des macronutriments (Prot, Carbs, Fat) et ajout direct au panier.

---

### 5. Page des Avis Clients & Évaluations — `/reviews`
- **En-tête de Score** : Note globale du restaurant (**4.9 / 5.0 ★**) basée sur +128 avis vérifiés.
- **Modal & Formulaire de Publication d'Avis** :
  - Saisie du nom / pseudo.
  - Sélection de la note par étoiles (1 à 5 étoiles).
  - Rédaction du commentaire.
  - Enregistrement immédiat dans la base de données.
- **Flux des Avis Clients** :
  - Affichage des commentaires des clients avec étoiles et dates.

---

### 6. Authentification Utilisateur — `/login` & `/register`
- **Page de Connexion (`/login`)** :
  - Formulaire de connexion par Email et Mot de passe.
  - Récupération de la session utilisateur.
- **Page d'Inscription (`/register`)** :
  - Inscription des nouveaux membres (Nom, Email, Téléphone, Mot de passe).
  - Création du compte utilisateur dans la base de données.

---

### 7. Profil Client & Adresses — `/profile`
- **Espace Personnel** : Affichage des informations du client et du badge *Membre Le Crispy Club*.
- **Gestion des Adresses de Livraison** :
  - Ajout et modification d'adresses (Titre, Rue, Ville, Code postal, Téléphone, Adresse par défaut).
- **Déconnexion** : Fermeture de session sécurisée.

---

### 8. Tableau de Bord & Suivi des Commandes — `/dashboard` & `/admin`
- **Suivi en temps réel de l'état des commandes** :
  - ⏳ `pending` (En attente de confirmation).
  - 🍳 `preparing` (En cours de préparation en cuisine).
  - 🔔 `ready` (Commande prête).
  - ✅ `delivered` (Commande livrée / servie).
  - ❌ `cancelled` (Commande annulée).
- **Interface d'administration** : Gestion des plats du menu et suivi des ventes.

---

## 🛒 3. Système de Panier & Checkout (`StripeCheckoutModal`)

- **Choix du Mode de Dégustation** :
  - 🍽️ **Sur place** : Champ obligatoire pour spécifier le **Numéro de Table** (ex: *Table 04*).
  - 🛍️ **À emporter**.
  - 🛵 **Livraison à domicile** : Formulaire d'adresse de livraison et calcul automatique des frais de livraison.
- **Modes de Paiement** :
  - 💵 **Espèces** (Paiement à la livraison ou à la caisse sur place).
  - 💳 **Carte Bancaire / Stripe** (Paiement sécurisé en ligne).
- **Calculs en temps réel** : Sous-total, Frais de livraison, Total général et récapitulatif des articles.

---

## 🤖 4. Assistant IA Concierge Culinaire (`AiChatbotWidget`)

- **Widget Flottant Interactif** en bas à droite de l'écran avec indicateur de présence en ligne.
- **Recommandations Intelligentes du Chef** :
  - Analyse des demandes de l'utilisateur (ex: *"Je veux un plat Healthy < 500 kcal"*, *"Le meilleur burger à la truffe"*, *"Quelque chose d'épicé"*).
  - Réponses personnalisées avec suggestion de plats du menu.
- **Ajout au Panier Directement depuis le Chat** : Bouton d'ajout d'article intégré dans chaque suggestion de l'IA.

---

## 🗄️ 5. Base de Données & Schéma PostgreSQL (`schema.prisma`)

Le site web s'appuie sur les tables PostgreSQL suivantes :

1. **`users`** : Stocke les utilisateurs (ID, email, nom, téléphone, avatar, rôle `customer`|`admin`, langue préférée).
2. **`addresses`** : Stocke les adresses de livraison (User ID, titre, rue, ville, code postal, téléphone, adresse par défaut).
3. **`categories`** : Stocke les catégories de plats (ID, nom Fr, nom Ar, nom En, icône).
4. **`menu_items`** : Stocke les articles du menu (ID, noms Fr/Ar/En, descriptions Fr/Ar/En, prix, catégorie, image, niveau d'épices, isHealthy, isPopular, isNew, temps de préparation, calories, protéines, glucides, lipides, tags diététiques).
5. **`orders`** : Stocke les commandes (ID, email client, nom, téléphone, mode de service, numéro de table, adresse de livraison, articles au format JSON, sous-total, frais de livraison, total, statut, mode de paiement, statut de paiement).
6. **`reclamations`** : Stocke les réclamations clients (ID, ID commande, nom, email, téléphone, sujet, description, URL image, statut `new`|`in_progress`|`resolved`, note admin).
7. **`reviews`** : Stocke les avis clients (ID, nom client, avatar, note 1-5, commentaire, statut d'approbation, réponse admin).

---

## 📄 Résumé Technique
- **Framework Web** : Next.js 16 (App Router, Turbopack, React 19, TypeScript).
- **Style & Animations** : Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Paiements & E-mails** : Stripe API, Nodemailer (Nodemailer SMTP Gmail).
- **Base de Données** : PostgreSQL via Prisma Client / Supabase.
