import { Language } from '@/types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    // Brand
    brandName: "Le Crispy",
    brandSubtitle: "Fast Food Gourmet & Fine Dining",
    
    // Nav
    navHome: "Accueil",
    navMenu: "Le Menu",
    navHealthy: "Healthy & Gym",
    navReviews: "Avis & Témoignages",
    navProfile: "Mon Profil",
    navAdmin: "Administration",
    
    // Welcome Splash
    welcomeTitle: "Une Expérience Gastronomique Fast-Food Incroyable",
    welcomeSubtitle: "La fusion entre le prestige de la haute cuisine et la gourmandise du burger.",
    welcomeExplore: "Découvrir la Carte",
    welcomeSkip: "Accéder directement",
    
    // Home Hero
    heroTitlePrefix: "Le Fast-Food",
    heroTitleGold: "Haute Couture",
    heroSubtitle: "Saveurs d'exception, ingrédients biologiques d'origine contrôlée, viandes maturées et dorure d'art culinaire.",
    heroOrderCta: "Commander Maintenant",
    heroBookTableCta: "Réserver / Scan QR Table",
    
    // Home Features (Atouts)
    atout1Title: "Livraison Haute Précision",
    atout1Desc: "Livré en boîte isotherme dorée sous 30 minutes avec température optimale garantie.",
    atout2Title: "Viandes Maturées 28 Jours",
    atout2Desc: "Boeuf Wagyu et Black Angus d'exception, grillé à la flamme sur pierre de lave.",
    atout3Title: "Fait Maison & Bio",
    atout3Desc: "Pains briochés pétris quotidiennement par nos maîtres boulangers, sauces signature sans additifs.",
    
    // QR Code Section
    qrTitle: "Menu Numérique & Scan à Table",
    qrSubtitle: "Vous êtes installé à table ? Scannez le QR Code sur votre table pour passer commande directement.",
    qrScanBtn: "Scanner un QR Code",
    qrScanModalTitle: "Scanner le QR Code de votre Table",
    qrScanSimulateBtn: "Simuler la Table N° 07",
    
    // Menu Page
    menuTitle: "Notre Carte Prestige",
    menuSubtitle: "Tous nos plats sont préparés à la minute par notre brigade avec des produits d'exception.",
    allCategories: "Toutes les Catégories",
    searchPlaceholder: "Rechercher un plat, un ingrédient...",
    addToCart: "Ajouter au Panier",
    prepTime: "Temps de prép.",
    mins: "min",
    spiceLevel: "Intensité épicée",
    
    // Healthy Page
    healthyTitle: "Espace Healthy, Gym & Diététique",
    healthySubtitle: "Des compositions calculées avec précision pour les athlètes, les régimes kéto, diabétiques et pauvres en glucides.",
    caloricRange: "Plage Calorique",
    maxCalories: "Calories max",
    dietType: "Régime Spécifique",
    allDiets: "Tous les régimes",
    dietKeto: "Kéto / Low Carb",
    dietHighProtein: "Riche en Protéines",
    dietDiabetic: "Adapté Diabétique (Low Sugar)",
    dietLowFat: "Faible en Gras",
    dietVegetarian: "Végétarien",
    dietGlutenFree: "Sans Gluten",
    nutritionFacts: "Valeurs Nutritionnelles",
    protein: "Protéines",
    carbs: "Glucides",
    fat: "Lipides",
    sugar: "Sucres",
    sodium: "Sodium",
    
    // Service Modes
    surPlace: "Sur Place",
    aEmporter: "À Emporter",
    livraison: "Livraison",
    selectServiceMode: "Choisissez votre mode de service",
    tableNumberLabel: "Numéro de votre Table",
    tablePlaceholder: "Ex: Table 04",
    pickupTimeLabel: "Heure de retrait souhaitée",
    deliveryAddressLabel: "Adresse de livraison",
    
    // Cart & Checkout
    cartTitle: "Votre Panier Prestige",
    cartEmpty: "Votre panier est actuellement vide.",
    subtotal: "Sous-total",
    deliveryFee: "Frais de livraison",
    total: "Total",
    checkoutBtn: "Procéder au Paiement",
    stripeTitle: "Paiement Sécurisé Stripe",
    cardHolder: "Titulaire de la carte",
    cardNumber: "Numéro de carte",
    expiryDate: "Expiration",
    cvc: "CVC",
    payNow: "Payer",
    processingPayment: "Traitement sécurisé en cours...",
    orderConfirmed: "Commande Confirmée !",
    orderSummary: "Récapitulatif de commande",
    
    // Reviews & Reclamations
    reviewsTitle: "Avis Clients & Expérience",
    addReview: "Laisser un Avis",
    reclamationTitle: "Centre de Réclamation Client",
    reclamationBtn: "Déposer une Réclamation",
    orderIdLabel: "Numéro de commande",
    claimSubject: "Objet du problème",
    claimDesc: "Description détaillée",
    sendClaim: "Envoyer la réclamation",
    
    // AI Chatbot
    chatHeaderTitle: "Chef IA — Concierge Culinaire",
    chatHeaderStatus: "En ligne • Conseils personnalisés",
    chatPlaceholder: "Posez votre question culinaire...",
    chatWelcomeMsg: "Bonjour ! Je suis votre Concierge IA. Que souhaitez-vous déguster aujourd'hui ? (Ex: un plat épicé et riche en protéines à moins de 600 kcal)",
    
    // User Profile
    profileTitle: "Mon Compte Prestige",
    personalInfo: "Informations Personnelles",
    savedAddresses: "Adresses de Livraison",
    orderHistory: "Historique des Commandes",
    addAddress: "Ajouter une Adresse",
    defaultAddress: "Par défaut",
    loginTitle: "Connexion Compte Client",
    registerTitle: "Créer un Compte",
    emailLabel: "Adresse Email",
    passwordLabel: "Mot de Passe",
    nameLabel: "Nom Complet",
    phoneLabel: "Numéro de Téléphone",
    loginBtn: "Se Connecter",
    registerBtn: "S'inscrire",
    forgotPassword: "Mot de passe oublié ?",
    
    // Admin
    adminDashboardTitle: "Tableau de Bord Administration",
    adminOrders: "Commandes Live",
    adminProducts: "Gestion du Menu",
    adminReclamations: "Réclamations",
    adminReviews: "Modération Avis",
    adminStats: "Statistiques Ventes",
    totalRevenue: "Chiffre d'Affaires du Jour",
    activeOrders: "Commandes Actives",
    pendingStatus: "En attente",
    preparingStatus: "En préparation",
    readyStatus: "Prête",
    deliveredStatus: "Livrée",
    cancelledStatus: "Annulée",
    actions: "Actions",
    
    // Theme & Lang
    darkTheme: "Mode Sombre",
    lightTheme: "Mode Clair",
    language: "Langue"
  },
  ar: {
    // Brand
    brandName: "Le Crispy",
    brandSubtitle: "مطعم الوجبات السريعة المقرمشة والفاخرة",
    
    // Nav
    navHome: "الرئيسية",
    navMenu: "القائمة",
    navHealthy: "صحي ورياضة",
    navReviews: "الآراء والتقييمات",
    navProfile: "حسابي",
    navAdmin: "الإدارة",
    
    // Welcome Splash
    welcomeTitle: "تجربة طعام فاخر لا تُنسى",
    welcomeSubtitle: "الاندماج بين فخامة الطهي الرفيع ولذة البرجر الحرفي.",
    welcomeExplore: "استكشف القائمة",
    welcomeSkip: "الدخول المباشر",
    
    // Home Hero
    heroTitlePrefix: "الوجبات السريعة",
    heroTitleGold: "الراقية والفاخرة",
    heroSubtitle: "نكهات استثنائية، مكونات عضوية موثوقة، لحوم معتقة ولمسات ذهبية فاخرة.",
    heroOrderCta: "اطلب الآن",
    heroBookTableCta: "حجز / مسح QR الطاولة",
    
    // Home Features
    atout1Title: "توصيل عالي الدقة",
    atout1Desc: "يتم التوصيل في صناديق حرارية ذهبية خلال 30 دقيقة مع ضمان الحرارة المثالية.",
    atout2Title: "لحوم معتقة 28 يوماً",
    atout2Desc: "لحم واغيو وبلاك أنجوس فاخر، مشوي على الفحم وحجر البركان.",
    atout3Title: "محضر يدوياً وعضوي",
    atout3Desc: "خبز بريوش طازج يومياً من خُبزائنا الحرفيين، وصلصات خاصة بدون إضافة مواد حافظة.",
    
    // QR Code Section
    qrTitle: "القائمة الرقمية والمسح من الطاولة",
    qrSubtitle: "هل أنت في الطاولة الآن؟ امسح رمز QR الموجود على الطاولة للطلب مباشرة.",
    qrScanBtn: "مسح رمز QR",
    qrScanModalTitle: "مسح رمز QR للطاولة",
    qrScanSimulateBtn: "محاكاة الطاولة رقم 07",
    
    // Menu Page
    menuTitle: "قائمتنا الفاخرة",
    menuSubtitle: "جميع أطباقنا تُحضر فورياً بأيدي طهاتنا من مكونات نادرة.",
    allCategories: "جميع الفئات",
    searchPlaceholder: "ابحث عن طبق أو مكون...",
    addToCart: "إضافة إلى السلة",
    prepTime: "وقت التحضير",
    mins: "دقيقة",
    spiceLevel: "درجة الحرارة",
    
    // Healthy Page
    healthyTitle: "قسم الصحة والرياضة والنظام الغذائي",
    healthySubtitle: "تركيبات محسوبة بدقة للرياضيين، متبعي نظام الكيتو، ومرضى السكري والوجبات منخفضة الكاربوهيدرات.",
    caloricRange: "نطاق السعرات الحرارية",
    maxCalories: "أقصى سعرات",
    dietType: "نوع الحمية",
    allDiets: "جميع الحميات",
    dietKeto: "كيتو / منخفض الكارب",
    dietHighProtein: "غني بالبروتين",
    dietDiabetic: "مناسب لمرضى السكري",
    dietLowFat: "قليل الدهون",
    dietVegetarian: "نباتي",
    dietGlutenFree: "خالي من الجلوتين",
    nutritionFacts: "القيمة الغذائية",
    protein: "بروتين",
    carbs: "كاربوهيدرات",
    fat: "دهون",
    sugar: "سكريات",
    sodium: "صوديوم",
    
    // Service Modes
    surPlace: "في المطعم (على الطاولة)",
    aEmporter: "سفري / استلام",
    livraison: "توصيل للمنزل",
    selectServiceMode: "اختر طريقة الخدمة",
    tableNumberLabel: "رقم الطاولة",
    tablePlaceholder: "مثال: طاولة 04",
    pickupTimeLabel: "وقت الاستلام المفضل",
    deliveryAddressLabel: "عنوان التوصيل",
    
    // Cart & Checkout
    cartTitle: "سلة المشتريات الفاخرة",
    cartEmpty: "سلة المشتريات فارغة حالياً.",
    subtotal: "المجموع الفرعي",
    deliveryFee: "رسوم التوصيل",
    total: "الإجمالي",
    checkoutBtn: "المتابعة إلى الدفع",
    stripeTitle: "الدفع الآمن عبر Stripe",
    cardHolder: "اسم حامل البطاقة",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvc: "الرمز السري",
    payNow: "أدفع الآن",
    processingPayment: "جاري المعالجة الآمنة...",
    orderConfirmed: "تم تأكيد طلبك بنجاح!",
    orderSummary: "ملخص الطلب",
    
    // Reviews & Reclamations
    reviewsTitle: "آراء العملاء والتجارب",
    addReview: "إضافة تقييم",
    reclamationTitle: "مركز شكاوى العملاء",
    reclamationBtn: "تقديم شكوى",
    orderIdLabel: "رقم الطلب",
    claimSubject: "عنوان المشكلة",
    claimDesc: "الوصف التفصيلي",
    sendClaim: "إرسال الشكوى",
    
    // AI Chatbot
    chatHeaderTitle: "المساعد الذكي — المستشار الغذائي",
    chatHeaderStatus: "متصل • نصائح مخصصة",
    chatPlaceholder: "اكتب استفسارك عن الأطباق...",
    chatWelcomeMsg: "مرحباً بك! أنا مستشارك الذكي. ماذا تحب أن تتناول اليوم؟ (مثال: طبق حار وغني بالبروتين وأقل من 600 سعرة)",
    
    // User Profile
    profileTitle: "حسابي الفاخر",
    personalInfo: "المعلومات الشخصية",
    savedAddresses: "عناوين التوصيل المسجلة",
    orderHistory: "سجل الطلبات",
    addAddress: "إضافة عنوان جديد",
    defaultAddress: "العنوان الافتراضي",
    loginTitle: "تسجيل الدخول",
    registerTitle: "إنشاء حساب جديد",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    nameLabel: "الاسم الكامل",
    phoneLabel: "رقم الهاتف",
    loginBtn: "دخول",
    registerBtn: "تسجيل",
    forgotPassword: "نسيت كلمة المرور؟",
    
    // Admin
    adminDashboardTitle: "لوحة تحكم الإدارة",
    adminOrders: "الطلبات المباشرة",
    adminProducts: "إدارة القائمة",
    adminReclamations: "الشكاوى",
    adminReviews: "مراجعة التقييمات",
    adminStats: "إحصائيات المبيعات",
    totalRevenue: "مبيعات اليوم",
    activeOrders: "الطلبات النشطة",
    pendingStatus: "قيد الانتظار",
    preparingStatus: "قيد التحضير",
    readyStatus: "جاهز",
    deliveredStatus: "تم التسليم",
    cancelledStatus: "ملغي",
    actions: "إجراءات",
    
    // Theme & Lang
    darkTheme: "الوضع الداكن",
    lightTheme: "الوضع المضيء",
    language: "اللغة"
  },
  en: {
    // Brand
    brandName: "Le Crispy",
    brandSubtitle: "Gourmet Fast Food & Fine Dining",
    
    // Nav
    navHome: "Home",
    navMenu: "Menu",
    navHealthy: "Healthy & Gym",
    navReviews: "Reviews",
    navProfile: "My Profile",
    navAdmin: "Admin",
    
    // Welcome Splash
    welcomeTitle: "An Incredible Fine-Dining Fast Food Experience",
    welcomeSubtitle: "The fusion between haute cuisine prestige and gourmet burger craftsmanship.",
    welcomeExplore: "Explore Menu",
    welcomeSkip: "Skip to Home",
    
    // Home Hero
    heroTitlePrefix: "The Fast-Food",
    heroTitleGold: "Haute Couture",
    heroSubtitle: "Exceptional flavors, organic certified ingredients, dry-aged meats, and artisanal 24k gold leaf finish.",
    heroOrderCta: "Order Now",
    heroBookTableCta: "Table Reservation / Scan QR",
    
    // Home Features
    atout1Title: "High Precision Delivery",
    atout1Desc: "Delivered in thermic gold containers within 30 minutes with thermal control.",
    atout2Title: "28-Day Dry-Aged Meats",
    atout2Desc: "Wagyu & Black Angus beef flame-grilled over volcanic stone lava.",
    atout3Title: "Handcrafted & Organic",
    atout3Desc: "Fresh brioche buns kneaded daily by our master bakers, custom organic sauces.",
    
    // QR Code Section
    qrTitle: "Digital Menu & Table Scan",
    qrSubtitle: "Seated at a table? Scan the QR code placed on your table to order instantly.",
    qrScanBtn: "Scan QR Code",
    qrScanModalTitle: "Scan Your Table QR Code",
    qrScanSimulateBtn: "Simulate Table #07",
    
    // Menu Page
    menuTitle: "Our Prestige Menu",
    menuSubtitle: "Every dish is cooked to order by our kitchen brigade using rare ingredients.",
    allCategories: "All Categories",
    searchPlaceholder: "Search dish, ingredient...",
    addToCart: "Add to Cart",
    prepTime: "Prep time",
    mins: "min",
    spiceLevel: "Spice level",
    
    // Healthy Page
    healthyTitle: "Healthy, Gym & Nutrition Lounge",
    healthySubtitle: "Precision-calculated macros for athletes, keto diets, diabetics, and low-carb meal plans.",
    caloricRange: "Calorie Range",
    maxCalories: "Max calories",
    dietType: "Dietary Preference",
    allDiets: "All Diets",
    dietKeto: "Keto / Low Carb",
    dietHighProtein: "High Protein",
    dietDiabetic: "Diabetic Friendly",
    dietLowFat: "Low Fat",
    dietVegetarian: "Vegetarian",
    dietGlutenFree: "Gluten Free",
    nutritionFacts: "Nutrition Facts",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    sugar: "Sugar",
    sodium: "Sodium",
    
    // Service Modes
    surPlace: "Dine In",
    aEmporter: "Takeaway",
    livraison: "Home Delivery",
    selectServiceMode: "Select your service mode",
    tableNumberLabel: "Table Number",
    tablePlaceholder: "E.g. Table 04",
    pickupTimeLabel: "Preferred pickup time",
    deliveryAddressLabel: "Delivery address",
    
    // Cart & Checkout
    cartTitle: "Your Prestige Cart",
    cartEmpty: "Your shopping cart is currently empty.",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    total: "Total",
    checkoutBtn: "Proceed to Checkout",
    stripeTitle: "Secure Stripe Payment",
    cardHolder: "Cardholder Name",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvc: "CVC",
    payNow: "Pay Now",
    processingPayment: "Processing secure payment...",
    orderConfirmed: "Order Confirmed!",
    orderSummary: "Order Summary",
    
    // Reviews & Reclamations
    reviewsTitle: "Customer Reviews & Stories",
    addReview: "Write a Review",
    reclamationTitle: "Customer Support & Claims",
    reclamationBtn: "File a Claim",
    orderIdLabel: "Order Number",
    claimSubject: "Issue Subject",
    claimDesc: "Detailed Description",
    sendClaim: "Submit Claim",
    
    // AI Chatbot
    chatHeaderTitle: "AI Culinary Concierge",
    chatHeaderStatus: "Online • Personal Assistant",
    chatPlaceholder: "Ask anything about our menu...",
    chatWelcomeMsg: "Welcome! I am your AI Concierge. What would you like to enjoy today? (E.g., a spicy high-protein meal under 600 kcal)",
    
    // User Profile
    profileTitle: "My Prestige Account",
    personalInfo: "Personal Details",
    savedAddresses: "Delivery Addresses",
    orderHistory: "Order History",
    addAddress: "Add New Address",
    defaultAddress: "Default",
    loginTitle: "Customer Login",
    registerTitle: "Create an Account",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    nameLabel: "Full Name",
    phoneLabel: "Phone Number",
    loginBtn: "Sign In",
    registerBtn: "Register",
    forgotPassword: "Forgot password?",
    
    // Admin
    adminDashboardTitle: "Admin Command Center",
    adminOrders: "Live Orders",
    adminProducts: "Menu Manager",
    adminReclamations: "Claims Resolution",
    adminReviews: "Reviews Moderation",
    adminStats: "Sales Analytics",
    totalRevenue: "Today's Revenue",
    activeOrders: "Active Orders",
    pendingStatus: "Pending",
    preparingStatus: "Preparing",
    readyStatus: "Ready",
    deliveredStatus: "Delivered",
    cancelledStatus: "Cancelled",
    actions: "Actions",
    
    // Theme & Lang
    darkTheme: "Dark Mode",
    lightTheme: "Light Mode",
    language: "Language"
  }
};
