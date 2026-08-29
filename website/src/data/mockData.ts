import { MenuItem, Category, Review, Reclamation } from '@/types';

export const RESTAURANT_INFO = {
  name: 'LE CRISPY DORMANS',
  address: '1 rue Jean de Dormans, 51700 Dormans',
  phone: '09 56 07 00 91',
  hours: 'Ouvert 7j/7 de 11h00 à 23h00 Non Stop',
  promo: '2 PIZZAS ACHETÉES = 1 PIZZA OFFERTE',
  specialities: ['Kebab', 'Pizza', 'Burger', 'Tacos', 'Naan', 'Krousty', 'Assiettes', 'Gratins'],
  lat: 49.0762,
  lng: 3.6375
};

export const CATEGORIES: Category[] = [
  { id: 'krousty', name: { fr: 'Krousty Bowls', ar: 'كروستي بول', en: 'Krousty Bowls' }, icon: 'Crown' },
  { id: 'texmex', name: { fr: 'Tex Mex & Snacking', ar: 'تكس مكس', en: 'Tex Mex' }, icon: 'Flame' },
  { id: 'assiettes', name: { fr: 'Les Assiettes', ar: 'الأطباق', en: 'Platters' }, icon: 'UtensilsCrossed' },
  { id: 'salades', name: { fr: 'Nos Salades', ar: 'سلطات', en: 'Salads' }, icon: 'HeartPulse' },
  { id: 'pates', name: { fr: 'Nos Pâtes', ar: 'معكرونة', en: 'Pasta' }, icon: 'Sparkles' },
  { id: 'gratins', name: { fr: 'Nos Gratins', ar: 'غراتان', en: 'Gratins' }, icon: 'Layers' },
  { id: 'burgers', name: { fr: 'Burgers & Tacos', ar: 'برجر وتاكوس', en: 'Burgers & Tacos' }, icon: 'Crown' },
  { id: 'drinks', name: { fr: 'Nos Boissons', ar: 'مشروبات', en: 'Drinks' }, icon: 'Wine' },
  { id: 'desserts', name: { fr: 'Nos Desserts', ar: 'حلويات', en: 'Desserts' }, icon: 'Cake' }
];

export const MOCK_MENU: MenuItem[] = [
  // --- KROUSTY (10,90 €) ---
  {
    id: 'krousty-tenders',
    name: { fr: 'Krousty Tenders', ar: 'كروستي تندر', en: 'Krousty Tenders' },
    description: { fr: 'Riz parfumé, tenders de poulet croustillants, oignons frits, sauce maison, sauce chili thaï.', ar: 'أرز معطر، تندر دجاج مقرمش، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.', en: 'Fragrant rice, crispy chicken tenders, fried onions, house sauce, thai chili sauce.' },
    price: 10.90,
    category: 'krousty',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    isNew: true,
    preparationTimeMinutes: 12
  },
  {
    id: 'krousty-kebab',
    name: { fr: 'Krousty Kebab', ar: 'كروستي كباب', en: 'Krousty Kebab' },
    description: { fr: 'Riz parfumé, viande kebab grillée, oignons frits, sauce maison, sauce chili thaï.', ar: 'أرز معطر، لحم كباب مشوي، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.', en: 'Fragrant rice, grilled kebab meat, fried onions, house sauce, thai chili sauce.' },
    price: 10.90,
    category: 'krousty',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 12
  },
  {
    id: 'krousty-cordon-bleu',
    name: { fr: 'Krousty Cordon Bleu', ar: 'كروستي كوردون بلو', en: 'Krousty Cordon Bleu' },
    description: { fr: 'Riz parfumé, cordon bleu, oignons frits, sauce maison, sauce chili thaï.', ar: 'أرز معطر، كوردون بلو، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.', en: 'Fragrant rice, cordon bleu, fried onions, house sauce, thai chili sauce.' },
    price: 10.90,
    category: 'krousty',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 12
  },

  // --- TEX MEX ---
  {
    id: 'wings-kfc-5',
    name: { fr: 'Wings Type KFC (x5)', ar: 'أجنحة دجاج KFC (5 قطع)', en: 'KFC Style Wings (5pcs)' },
    description: { fr: '5 ailerons de poulet mariné panure épicée façon KFC.', ar: '5 قطع أجنحة دجاج متبلة مقرمشة.', en: '5 crispy spiced marinated chicken wings.' },
    price: 5.90,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 2,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 8
  },
  {
    id: 'wings-kfc-10',
    name: { fr: 'Wings Type KFC (x10)', ar: 'أجنحة دجاج KFC (10 قطع)', en: 'KFC Style Wings (10pcs)' },
    description: { fr: '10 ailerons de poulet mariné panure épicée façon KFC.', ar: '10 قطع أجنحة دجاج متبلة مقرمشة.', en: '10 crispy spiced marinated chicken wings.' },
    price: 10.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 2,
    isHealthy: false,
    preparationTimeMinutes: 10
  },
  {
    id: 'nuggets-5',
    name: { fr: 'Nuggets (x5)', ar: 'ناجتس دجاج (5 قطع)', en: 'Chicken Nuggets (5pcs)' },
    description: { fr: '5 boucher de nuggets de poulet doré.', ar: '5 قطع ناجتس دجاج ذهبي.', en: '5 golden chicken nuggets.' },
    price: 4.90,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 7
  },
  {
    id: 'nuggets-10',
    name: { fr: 'Nuggets (x10)', ar: 'ناجتس دجاج (10 قطع)', en: 'Chicken Nuggets (10pcs)' },
    description: { fr: '10 boucher de nuggets de poulet doré.', ar: '10 قطع ناجتس دجاج ذهبي.', en: '10 golden chicken nuggets.' },
    price: 9.20,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 8
  },
  {
    id: 'tenders-8',
    name: { fr: 'Tenders de Poulet (x8)', ar: 'تندر دجاج (8 قطع)', en: 'Chicken Tenders (8pcs)' },
    description: { fr: '8 filet de poulet panés ultra croustillants.', ar: '8 قطع تندر دجاج مقرمش.', en: '8 crispy chicken tender strips.' },
    price: 8.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 9
  },
  {
    id: 'jalapenos-10',
    name: { fr: 'Jalapeños Cheese (x10)', ar: 'هالبينو بالجبن (10 قطع)', en: 'Jalapeño Poppers (10pcs)' },
    description: { fr: '10 bouchées de piment Jalapeño farcies au fromage crémeux.', ar: '10 قطع فلفل هالبينو محشوة بالجبن.', en: '10 cream cheese stuffed jalapeño poppers.' },
    price: 8.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 3,
    isHealthy: false,
    preparationTimeMinutes: 8
  },
  {
    id: 'bouchees-camembert-8',
    name: { fr: 'Bouchées Camembert (x8)', ar: 'قطع كامامبير (8 قطع)', en: 'Camembert Bites (8pcs)' },
    description: { fr: '8 bouchées croustillantes au coeur de Camembert fondu.', ar: '8 قطع كامامبير مع جبن كامامبير ذائب.', en: '8 melted Camembert cheese bites.' },
    price: 8.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 7
  },
  {
    id: 'mozza-sticks-8',
    name: { fr: 'Mozza Sticks (x8)', ar: 'أصابع الموزاريلا (8 قطع)', en: 'Mozzarella Sticks (8pcs)' },
    description: { fr: '8 bâtonnets de mozzarella dorés et fondants.', ar: '8 أصابع موزاريلا ذهبية ذائبة.', en: '8 golden mozzarella cheese sticks.' },
    price: 8.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 7
  },
  {
    id: 'oignons-rings-10',
    name: { fr: 'Oignons Rings (x10)', ar: 'حلقات بصل (10 قطع)', en: 'Onion Rings (10pcs)' },
    description: { fr: '10 rondelles d\'oignons panées et frites.', ar: '10 حلقات بصل مقرمشة.', en: '10 crispy fried onion rings.' },
    price: 8.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 6
  },
  {
    id: 'calamars-fritti-10',
    name: { fr: 'Calamars Fritti (x10)', ar: 'كالاماري مقلي (10 قطع)', en: 'Fried Calamari Rings (10pcs)' },
    description: { fr: '10 anneaux de calamars frits dorés.', ar: '10 حلقات كالاماري مقلية.', en: '10 crispy fried calamari rings.' },
    price: 8.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 8
  },
  {
    id: 'frites-maison',
    name: { fr: 'Frites Fraîches', ar: 'بطاطس مقلية', en: 'Fresh French Fries' },
    description: { fr: 'Portion généreuse de frites dorées.', ar: 'وجبة بطاطس مقلية ذهبية.', en: 'Generous portion of crispy French fries.' },
    price: 4.00,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 5
  },
  {
    id: 'potatoes',
    name: { fr: 'Potatoes Épicées', ar: 'بطاطس متبلة', en: 'Seasoned Potato Wedges' },
    description: { fr: 'Quartiers de pommes de terre assaisonnés.', ar: 'شرائح بطاطس متبلة للأعشاب.', en: 'Crispy seasoned potato wedges.' },
    price: 4.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    preparationTimeMinutes: 6
  },

  // --- LES ASSIETTES (Accompagnements: salade, tomates, frites, riz parfumé) ---
  {
    id: 'assiette-kebab',
    name: { fr: 'Assiette Kebab', ar: 'طبق كباب', en: 'Kebab Platter' },
    description: { fr: 'Viande kebab grillée au tournebroche, salade verte, tomates fraîches, frites croustillantes et riz parfumé.', ar: 'لحم كباب مشوي، سلطة خضراء، طماطم، بطاطس مقلية وأرز معطر.', en: 'Spit-roasted kebab meat, green salad, tomatoes, crispy fries, and fragrant rice.' },
    price: 12.00,
    category: 'assiettes',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 12
  },
  {
    id: 'assiette-steak-hache',
    name: { fr: 'Assiette Steak Haché (2x 180g)', ar: 'طبق ستيك لحم مفروم', en: 'Double Beef Steak Platter' },
    description: { fr: '2 steaks hachés 180g grillés, salade, tomates, frites et riz parfumé.', ar: '2 ستيك لحم مفروم 180غ، سلطة، طماطم، بطاطس وأرز.', en: '2 grilled 180g beef steaks, salad, tomatoes, fries, and rice.' },
    price: 14.00,
    category: 'assiettes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 14
  },
  {
    id: 'assiette-merguez',
    name: { fr: 'Assiette Merguez (4x)', ar: 'طبق مرقاز (4 قطع)', en: 'Merguez Sausage Platter' },
    description: { fr: '4 merguez grillées aux épices, salade, tomates, frites et riz parfumé.', ar: '4 قطع مرقاز مشوية، سلطة، طماطم، بطاطس وأرز.', en: '4 grilled spicy merguez sausages, salad, tomatoes, fries, and rice.' },
    price: 12.00,
    category: 'assiettes',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 2,
    isHealthy: false,
    preparationTimeMinutes: 12
  },
  {
    id: 'assiette-chicken',
    name: { fr: 'Assiette Chicken (Curry, Tandoori ou Boursin)', ar: 'طبق دجاج متبل', en: 'Chicken Platter (Curry/Tandoori/Boursin)' },
    description: { fr: 'Morceaux de poulet préparés au choix (Curry, Tandoori ou Boursin), salade, tomates, frites et riz parfumé.', ar: 'قطع دجاج متبلة حسب الاختيار (كاري، تاندوري أو بورسان)، سلطة، طماطم، بطاطس وأرز.', en: 'Seasoned chicken (Curry, Tandoori or Boursin style), salad, tomatoes, fries, and rice.' },
    price: 12.00,
    category: 'assiettes',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 12
  },
  {
    id: 'assiette-mix',
    name: { fr: 'Assiette Mix Supreme (3 Viandes au choix)', ar: 'طبق مشكل 3 لحوم', en: 'Triple Meat Mixed Platter' },
    description: { fr: '3 viandes au choix (Kebab, Steak, Merguez, Chicken, Tenders), accompagnées de salade, tomates, frites et riz parfumé.', ar: '3 أنواع لحوم حسب الاختيار (كباب، ستيك، مرقاز، دجاج، تندر)، مع سلطة، طماطم، بطاطس وأرز.', en: '3 meats of your choice (Kebab, Steak, Merguez, Chicken, Tenders), served with salad, tomatoes, fries, and rice.' },
    price: 15.90,
    category: 'assiettes',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    isNew: true,
    preparationTimeMinutes: 15
  },

  // --- NOS SALADES ---
  {
    id: 'salade-nicoise',
    name: { fr: 'Salade Niçoise', ar: 'سلطة نيسواز', en: 'Niçoise Salad' },
    description: { fr: 'Salade verte croquante, tomates fraîches, thon entier, œuf dur, olives noires.', ar: 'سلطة خضراء، طماطم، تونة، بيض مسلوق، زيتون أسود.', en: 'Crispy green salad, fresh tomatoes, whole tuna, boiled egg, black olives.' },
    price: 7.50,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: true,
    dietTags: ['high_protein'],
    preparationTimeMinutes: 8
  },
  {
    id: 'salade-meldoise',
    name: { fr: 'Salade Méldoise', ar: 'سلطة ميلدواز', en: 'Méldoise Cheese Salad' },
    description: { fr: 'Salade verte, tomates fraîches, fromage de Brie fondant, chèvre chaud.', ar: 'سلطة خضراء، طماطم، جبن بري، جبن ماعز دافئ.', en: 'Green salad, fresh tomatoes, melted Brie cheese, warm goat cheese.' },
    price: 7.50,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: true,
    dietTags: ['vegetarian'],
    preparationTimeMinutes: 8
  },
  {
    id: 'salade-chef',
    name: { fr: 'Salade du Chef', ar: 'سلطة الشيف', en: 'Chef Special Salad' },
    description: { fr: 'Salade verte, tomates fraîches, dés de poulet grillé, fromage de chèvre.', ar: 'سلطة خضراء، طماطم، قطع دجاج مشوي، جبن ماعز.', en: 'Green salad, fresh tomatoes, grilled chicken strips, goat cheese.' },
    price: 7.50,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: true,
    isPopular: true,
    dietTags: ['high_protein'],
    preparationTimeMinutes: 8
  },
  {
    id: 'salade-savoyarde',
    name: { fr: 'Salade Savoyarde', ar: 'سلطة سافويار', en: 'Savoyarde Salad' },
    description: { fr: 'Salade verte, tomates, jambon de dinde, poulet, emmental râpé.', ar: 'سلطة خضراء، طماطم، لحم ديك رومي، دجاج، جبن امينتال.', en: 'Green salad, tomatoes, turkey ham, chicken, grated Emmental cheese.' },
    price: 7.50,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: true,
    preparationTimeMinutes: 8
  },
  {
    id: 'salade-norvegienne',
    name: { fr: 'Salade Norvégienne', ar: 'سلطة نرويجية بالسمك', en: 'Norwegian Salmon Salad' },
    description: { fr: 'Salade verte, tomates fraîches, lamelles de saumon fumé noble.', ar: 'سلطة خضراء، طماطم، شرائح سلمون مدخن فاخر.', en: 'Green salad, fresh tomatoes, premium smoked salmon strips.' },
    price: 7.50,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: true,
    isPopular: true,
    dietTags: ['keto', 'high_protein'],
    preparationTimeMinutes: 8
  },

  // --- NOS PÂTES (9,50 €) ---
  {
    id: 'pates-carbonara',
    name: { fr: 'Tagliatelle Carbonara', ar: 'تاغلياتيل كربنارا', en: 'Tagliatelle Carbonara' },
    description: { fr: 'Pâtes tagliatelles fraîches, crème onctueuse, lardons de dinde, jaune d\'œuf et parmesan.', ar: 'معكرونة تاغلياتيل طازجة، كريمة، بكون دجاج، صفار بيض وبارميزان.', en: 'Fresh tagliatelle pasta, creamy sauce, turkey bacon, egg yolk, and parmesan.' },
    price: 9.50,
    category: 'pates',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 10
  },
  {
    id: 'pates-bolognaise',
    name: { fr: 'Tagliatelle Bolognaise', ar: 'تاغلياتيل بولونيز', en: 'Tagliatelle Bolognese' },
    description: { fr: 'Tagliatelles, sauce tomate cuisinée à la viande hachée mijotée et herbes de Provence.', ar: 'معكرونة تاغلياتيل مع صوص طماطم ولحم مفروم طازج.', en: 'Tagliatelle with slow-cooked minced beef tomato ragù and herbs.' },
    price: 9.50,
    category: 'pates',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 10
  },
  {
    id: 'pates-3-fromages',
    name: { fr: 'Tagliatelle 3 Fromages', ar: 'تاغلياتيل 3 أجبان', en: 'Tagliatelle 3 Cheeses' },
    description: { fr: 'Tagliatelles à la sauce crémeuse au Gorgonzola, Mozzarella et Parmesan affiné.', ar: 'معكرونة تاغلياتيل مع صوص كريمة غورغونزولا، موزاريلا وبارميزان.', en: 'Tagliatelle pasta in a rich Gorgonzola, Mozzarella, and Parmesan cream sauce.' },
    price: 9.50,
    category: 'pates',
    image: 'https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 10
  },
  {
    id: 'pates-saumon',
    name: { fr: 'Tagliatelle Saumon', ar: 'تاغلياتيل بالسلمون', en: 'Tagliatelle Salmon' },
    description: { fr: 'Tagliatelles fraîches, dés de saumon fondant, crème citronnée et aneth.', ar: 'معكرونة تاغلياتيل مع قطع سلمون، كريمة بالليمون وشبت.', en: 'Fresh tagliatelle with tender salmon chunks, lemon cream sauce, and dill.' },
    price: 9.50,
    category: 'pates',
    image: 'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 11
  },
  {
    id: 'pates-poulet-champignon',
    name: { fr: 'Tagliatelle Poulet Champignon', ar: 'تاغلياتيل بالدجاج والفطر', en: 'Tagliatelle Chicken Mushroom' },
    description: { fr: 'Tagliatelles, émincé de poulet sauté, champignons de Paris frais et crème.', ar: 'معكرونة تاغلياتيل مع شرائح دجاج مشوي وفطر طازج وكريمة.', en: 'Tagliatelle with sautéed chicken strips, fresh mushrooms, and cream.' },
    price: 9.50,
    category: 'pates',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 10
  },

  // --- NOS GRATINS (9,90 €) ---
  {
    id: 'gratin-poulet',
    name: { fr: 'Gratin Poulet', ar: 'غراتان دجاج', en: 'Chicken Gratin' },
    description: { fr: 'Pennes dorées au four, poulet mariné, crème fraîche, gratiné au fromage mozzarella fondu.', ar: 'معكرونة بيني مخبوزة بالفرن مع دجاج متبل وكريمة وموزاريلا ذائبة.', en: 'Baked penne pasta with marinated chicken, fresh cream, and melted mozzarella.' },
    price: 9.90,
    category: 'gratins',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 12
  },
  {
    id: 'gratin-viande-hachee',
    name: { fr: 'Gratin Viande Hachée', ar: 'غراتان لحم مفروم', en: 'Minced Beef Gratin' },
    description: { fr: 'Gratin de pennes à la viande hachée assaisonnée, sauce tomate crémeuse et mozzarella.', ar: 'غراتان معكرونة باللحم المفروم وصوص طماطم وموزاريلا.', en: 'Baked penne gratin with seasoned beef, tomato cream sauce, and mozzarella.' },
    price: 9.90,
    category: 'gratins',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 12
  },
  {
    id: 'gratin-lardon',
    name: { fr: 'Gratin Lardon', ar: 'غراتان لاردون دجاج', en: 'Bacon Gratin' },
    description: { fr: 'Gratin de pennes aux lardons de dinde dorés, sauce fromagère et emmental gratiné.', ar: 'غراتان معكرونة مع قطع بكون دجاج محمرة وصوص جبن.', en: 'Baked penne gratin with crispy turkey bacon, cheese sauce, and melted Emmental.' },
    price: 9.90,
    category: 'gratins',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 12
  },
  {
    id: 'gratin-saumon',
    name: { fr: 'Gratin Saumon', ar: 'غراتان سلمون', en: 'Salmon Gratin' },
    description: { fr: 'Gratin de pennes aux morceaux de saumon fondant, crème à l\'aneth et mozzarella dorée.', ar: 'غراتان معكرونة بالسلمون وكريمة وشبت وموزاريلا.', en: 'Baked penne gratin with tender salmon, dill cream sauce, and golden mozzarella.' },
    price: 9.90,
    category: 'gratins',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 12
  },

  // --- BURGERS & TACOS ---
  {
    id: 'burger-crispy-special',
    name: { fr: 'Le Crispy Burger Gourmet', ar: 'برجر كريسبي الخاص', en: 'Le Crispy Special Burger' },
    description: { fr: 'Steak haché façon bouchère 180g, cheddar fondu, bacon grillé, oignons frits, salade, sauce maison Le Crispy.', ar: 'لحم بقري فاخر 180غ، جبن شيدر، بكون، بصل مقرمش، سلطة وصوص كريسبي.', en: '180g butcher beef patty, melted cheddar, grilled bacon, fried onions, salad, house sauce.' },
    price: 8.90,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 10
  },

  // --- NOS BOISSONS ---
  {
    id: 'boisson-soda-33cl',
    name: { fr: 'Soda 33cl (au choix)', ar: 'مشروب غازي 33cl', en: 'Soda Can 33cl' },
    description: { fr: 'Coca-Cola, Coca-Cola Zéro, Fanta Orange, Sprite, Oasis, Tropico ou Schweppes 33cl.', ar: 'كوكاكولا، فانتا، سبرايت، أوايزس 33cl.', en: 'Coca-Cola, Fanta, Sprite, Oasis, Tropico 33cl.' },
    price: 1.90,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 1
  },
  {
    id: 'boisson-soda-15l',
    name: { fr: 'Bouteille Soda 1.5L (au choix)', ar: 'قارورة مشروب غازي 1.5L', en: 'Soda Bottle 1.5L' },
    description: { fr: 'Grande bouteille 1.5L Coca-Cola, Fanta ou Oasis.', ar: 'قارورة كبيرة 1.5 لتر كوكاكولا أو فانتا.', en: 'Large 1.5L bottle Coca-Cola, Fanta, or Oasis.' },
    price: 3.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 1
  },
  {
    id: 'boisson-oasis-2l',
    name: { fr: 'Oasis Tropical 2L', ar: 'أوايزس 2 لتر', en: 'Oasis Tropical 2L' },
    description: { fr: 'Grande bouteille Oasis Tropical 2 Litres.', ar: 'قارورة أوايزس 2 لتر.', en: 'Large 2 Liter bottle of Oasis Tropical fruit drink.' },
    price: 4.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 1
  },
  {
    id: 'boisson-eau-cristaline',
    name: { fr: 'Eau Cristaline 50cl', ar: 'ماء مائل كريستالين 50cl', en: 'Mineral Water 50cl' },
    description: { fr: 'Bouteille d\'eau minérale pure Cristaline 50cl.', ar: 'قارورة ماء معدني نقي 50cl.', en: 'Pure Cristaline mineral water 50cl.' },
    price: 1.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: true,
    preparationTimeMinutes: 1
  },

  // --- NOS DESSERTS ---
  {
    id: 'dessert-tiramisu-speculoos',
    name: { fr: 'Tiramisu Spéculoos Maison', ar: 'تيراميسو سبكولوس منزلي', en: 'Homemade Speculoos Tiramisu' },
    description: { fr: 'Tiramisu artisanal fait maison aux éclats de biscuits Spéculoos et crème mascarpone.', ar: 'تيراميسو منزلي الصنع مع بسكويت سبكولوس وكريمة ماسكاربوني.', en: 'Homemade artisanal tiramisu with crushed Speculoos cookies and mascarpone cream.' },
    price: 3.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 2
  },
  {
    id: 'dessert-brownie',
    name: { fr: 'Brownie au Chocolat', ar: 'براوني الشوكولاتة', en: 'Chocolate Fudge Brownie' },
    description: { fr: 'Fondant au chocolat intense et pépites de noisettes.', ar: 'براوني شوكولاتة مع قطع البندق.', en: 'Rich chocolate fudge brownie with hazelnut chunks.' },
    price: 3.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 2
  },
  {
    id: 'dessert-tarte-daim',
    name: { fr: 'Tarte Daim', ar: 'تارت دايم بالشوكولاتة', en: 'Daim Caramel Cake' },
    description: { fr: 'Part de tarte croquante aux éclats de caramel Daim et chocolat au lait.', ar: 'شريحة تارت الكراميل والشوكولاتة.', en: 'Crunchy Daim almond caramel and milk chocolate cake slice.' },
    price: 3.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 2
  },
  {
    id: 'dessert-moelleux-choco',
    name: { fr: 'Moelleux Choco Cœur Coulant', ar: 'كعكة الشوكولاتة الذائبة', en: 'Chocolate Lava Cake' },
    description: { fr: 'Moelleux au chocolat chaud avec cœur fondant au chocolat noir.', ar: 'كعكة شوكولاتة دافئة مع قلب ذائب.', en: 'Warm chocolate cake with a molten dark chocolate center.' },
    price: 3.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 3
  },
  {
    id: 'dessert-cheesecake-speculoos',
    name: { fr: 'Cheesecake Spéculoos Maison', ar: 'تشيز كيك سبكولوس', en: 'Homemade Speculoos Cheesecake' },
    description: { fr: 'Cheesecake crémeux fait maison nappé de coulis au spéculoos.', ar: 'تشيز كيك منزلي ناعم مع صوص سبكولوس.', en: 'Creamy homemade cheesecake topped with speculoos caramel drizzle.' },
    price: 3.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    isPopular: true,
    preparationTimeMinutes: 2
  },
  {
    id: 'haagen-dazs-100ml',
    name: { fr: 'Pot Häagen-Dazs 100ml', ar: 'آيس كريم هاجن داز 100ml', en: 'Häagen-Dazs Cup 100ml' },
    description: { fr: 'Petit pot 100ml parfum au choix (Macadamia, Vanilla, Cookie Cream).', ar: 'كوب آيس كريم هاجن داز 100مل.', en: '100ml ice cream cup (Macadamia Nut, Vanilla, Cookie Cream).' },
    price: 4.90,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 1
  },
  {
    id: 'haagen-dazs-500ml',
    name: { fr: 'Grand Pot Häagen-Dazs 500ml', ar: 'آيس كريم هاجن داز كبير 500ml', en: 'Häagen-Dazs Pint 500ml' },
    description: { fr: 'Grand pot 500ml à partager (Macadamia, Salted Caramel, Pralines).', ar: 'وعاء آيس كريم كبير 500مل للمشاركة.', en: 'Large 500ml ice cream pint to share.' },
    price: 8.90,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isHealthy: false,
    preparationTimeMinutes: 1
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Kahloul Slim',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Meilleurs kebabs et krousty de Dormans ! Le Krousty Tenders est incroyable.',
    date: '2026-08-10',
    isApproved: true,
    reply: 'Merci Slim ! Toute l\'équipe Le Crispy Dormans vous remercie.'
  },
  {
    id: 'rev-2',
    userName: 'Yasmine Triki',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Super offre 2 pizzas achetées = 1 offerte ! Les tagliatelles et tiramisu spéculoos sont excellents.',
    date: '2026-08-11',
    isApproved: true
  }
];

export const MOCK_RECLAMATIONS: Reclamation[] = [
  {
    id: 'rec-101',
    orderId: 'ORD-7780',
    userName: 'Mohamed Ali',
    userEmail: 'dali@example.com',
    userPhone: '09 56 07 00 91',
    subject: 'Demande de sauce supplémentaire',
    description: 'Demande d\'ajout de sauce chili thaï supplémentaire lors de la livraison à Dormans.',
    status: 'resolved',
    createdAt: '2026-08-12 14:15',
    adminNote: 'Sauce livrée.'
  }
];
