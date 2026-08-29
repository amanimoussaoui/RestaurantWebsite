import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/supabase_config.dart';
import '../models/category.dart';
import '../models/menu_item.dart';
import '../models/order.dart';
import '../models/review.dart';

class SupabaseService {
  static SupabaseClient? get client {
    if (SupabaseConfig.isConfigured) {
      try {
        return Supabase.instance.client;
      } catch (_) {
        return null;
      }
    }
    return null;
  }

  static Future<List<Category>> fetchCategories() async {
    final sb = client;
    if (sb != null) {
      try {
        final response = await sb.from('categories').select();
        return (response as List).map((c) => Category.fromJson(c)).toList();
      } catch (e) {
        print('Supabase fetchCategories fallback: $e');
      }
    }
    return mockCategories;
  }

  static Future<List<MenuItem>> fetchMenuItems() async {
    final sb = client;
    if (sb != null) {
      try {
        final response = await sb.from('menu_items').select();
        return (response as List).map((m) => MenuItem.fromJson(m)).toList();
      } catch (e) {
        print('Supabase fetchMenuItems fallback: $e');
      }
    }
    return mockMenuItems;
  }

  static Future<List<ReviewModel>> fetchReviews() async {
    final sb = client;
    if (sb != null) {
      try {
        final response = await sb.from('reviews').select().order('created_at', ascending: false);
        return (response as List).map((r) => ReviewModel.fromJson(r)).toList();
      } catch (e) {
        print('Supabase fetchReviews fallback: $e');
      }
    }
    return mockReviews;
  }

  static Future<bool> submitReview(ReviewModel review) async {
    final sb = client;
    if (sb != null) {
      try {
        await sb.from('reviews').insert(review.toJson());
        return true;
      } catch (e) {
        print('Supabase submitReview error: $e');
      }
    }
    mockReviews.insert(0, review);
    return true;
  }

  static Future<bool> createOrder(OrderModel order) async {
    final sb = client;
    if (sb != null) {
      try {
        await sb.from('orders').insert(order.toJson());
        return true;
      } catch (e) {
        print('Supabase createOrder error: $e');
      }
    }
    mockOrders.insert(0, order);
    return true;
  }

  // --- MOCK FALLBACK DATA ---
  static final List<Category> mockCategories = [
    Category(id: 'krousty', nameFr: 'Krousty Bowls', nameAr: 'كروستي بول', nameEn: 'Krousty Bowls', icon: 'Crown'),
    Category(id: 'texmex', nameFr: 'Tex Mex & Snacking', nameAr: 'تكس مكس', nameEn: 'Tex Mex', icon: 'Flame'),
    Category(id: 'assiettes', nameFr: 'Les Assiettes', nameAr: 'الأطباق', nameEn: 'Platters', icon: 'UtensilsCrossed'),
    Category(id: 'salades', nameFr: 'Nos Salades', nameAr: 'سلطات', nameEn: 'Salads', icon: 'HeartPulse'),
    Category(id: 'pates', nameFr: 'Nos Pâtes', nameAr: 'معكرونة', nameEn: 'Pasta', icon: 'Sparkles'),
    Category(id: 'gratins', nameFr: 'Nos Gratins', nameAr: 'غراتان', nameEn: 'Gratins', icon: 'Layers'),
    Category(id: 'burgers', nameFr: 'Burgers & Tacos', nameAr: 'برجر وتاكوس', nameEn: 'Burgers & Tacos', icon: 'Crown'),
    Category(id: 'drinks', nameFr: 'Nos Boissons', nameAr: 'مشروبات', nameEn: 'Drinks', icon: 'Wine'),
    Category(id: 'desserts', nameFr: 'Nos Desserts', nameAr: 'حلويات', nameEn: 'Desserts', icon: 'Cake'),
  ];

  static final List<MenuItem> mockMenuItems = [
    MenuItem(
      id: 'krousty-tenders',
      nameFr: 'Krousty Tenders',
      nameAr: 'كروستي تندر',
      nameEn: 'Krousty Tenders',
      descFr: 'Riz parfumé, tenders de poulet croustillants, oignons frits, sauce maison, sauce chili thaï.',
      descAr: 'أرز معطر، تندر دجاج مقرمش، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.',
      descEn: 'Fragrant rice, crispy chicken tenders, fried onions, house sauce, thai chili sauce.',
      price: 10.90,
      category: 'krousty',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 1,
      isHealthy: false,
      isPopular: true,
      isNew: true,
      preparationTimeMinutes: 12,
      calories: 650,
      protein: 32.0,
      carbs: 70.0,
      fat: 18.0,
      dietTags: ['High Protein'],
    ),
    MenuItem(
      id: 'krousty-kebab',
      nameFr: 'Krousty Kebab',
      nameAr: 'كروستي كباب',
      nameEn: 'Krousty Kebab',
      descFr: 'Riz parfumé, viande kebab grillée, oignons frits, sauce maison, sauce chili thaï.',
      descAr: 'أرز معطر، لحم كباب مشوي، بصل مقلي، صوص المنزل، صوص تشيلي تايلاندي.',
      descEn: 'Fragrant rice, grilled kebab meat, fried onions, house sauce, thai chili sauce.',
      price: 10.90,
      category: 'krousty',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 1,
      isHealthy: false,
      isPopular: true,
      preparationTimeMinutes: 12,
      calories: 680,
      protein: 30.0,
      carbs: 68.0,
      fat: 22.0,
      dietTags: ['High Protein'],
    ),
    MenuItem(
      id: 'wings-kfc-5',
      nameFr: 'Wings Type KFC (x5)',
      nameAr: 'أجنحة دجاج KFC (5 قطع)',
      nameEn: 'KFC Style Wings (5pcs)',
      descFr: '5 ailerons de poulet mariné panure épicée façon KFC.',
      descAr: '5 قطع أجنحة دجاج متبلة مقرمشة.',
      descEn: '5 crispy spiced marinated chicken wings.',
      price: 5.90,
      category: 'texmex',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 2,
      isHealthy: false,
      isPopular: true,
      preparationTimeMinutes: 8,
      calories: 420,
      protein: 26.0,
      carbs: 18.0,
      fat: 22.0,
    ),
    MenuItem(
      id: 'salade-poulet-grille',
      nameFr: 'Salade Poulet Grillé Fit',
      nameAr: 'سلطة دجاج مشوي صحية',
      nameEn: 'Grilled Chicken Fit Salad',
      descFr: 'Blanc de poulet grillé aux herbes, mélange de jeunes pousses, tomates cerises, concombres, maïs et vinaigrette allégée.',
      descAr: 'صدر دجاج مشوي بالأعشاب، خضار مشكلة، طماطم كرزية، خيار، ذرة وصلصة لايت.',
      descEn: 'Grilled herb chicken breast, mixed greens, cherry tomatoes, cucumbers, corn and light dressing.',
      price: 9.50,
      category: 'salades',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 0,
      isHealthy: true,
      isPopular: true,
      isNew: true,
      preparationTimeMinutes: 10,
      calories: 380,
      protein: 42.0,
      carbs: 15.0,
      fat: 10.0,
      dietTags: ['Healthy', 'High Protein', 'Low Carb', 'Keto'],
    ),
    MenuItem(
      id: 'burger-black-truffle',
      nameFr: 'Black Truffle Gourmet Burger',
      nameAr: 'برجر الترفاس الأسود الفاخر',
      nameEn: 'Black Truffle Gourmet Burger',
      descFr: 'Steak haché Wagyu 180g, cheddar affiné, sauce mayonnaise truffée, oignons confits, bun brioché artisanal.',
      descAr: 'شريحة واغيو 180غ، جبن شيدر معتق، صوص الكمأة البيضاء، بصل مكرمل، خبز بريوش.',
      descEn: '180g Wagyu beef patty, aged cheddar, truffle mayo, caramelized onions, artisan brioche bun.',
      price: 14.90,
      category: 'burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 0,
      isHealthy: false,
      isPopular: true,
      isNew: true,
      preparationTimeMinutes: 15,
      calories: 820,
      protein: 45.0,
      carbs: 50.0,
      fat: 42.0,
      dietTags: ['Popular'],
    ),
    MenuItem(
      id: 'pizza-crispy-special',
      nameFr: 'Pizza Le Crispy Royale',
      nameAr: 'بيتزا كريسبي رويال',
      nameEn: 'Le Crispy Royale Pizza',
      descFr: 'Sauce tomate bio, mozzarella di bufala, tenders poulet épicé, champignons frais, sauce gruyère maison.',
      descAr: 'صلصة طماطم عضوية، موزاريلا بوفالا، تندر دجاج حار، فطر طازج، صوص غرويير.',
      descEn: 'Organic tomato sauce, bufala mozzarella, spicy chicken tenders, fresh mushrooms, house gruyere sauce.',
      price: 12.50,
      category: 'burgers',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      spiceLevel: 1,
      isHealthy: false,
      isPopular: true,
      preparationTimeMinutes: 15,
      calories: 950,
      protein: 38.0,
      carbs: 90.0,
      fat: 36.0,
      dietTags: ['Popular'],
    ),
  ];

  static final List<ReviewModel> mockReviews = [
    ReviewModel(
      id: 'rev-1',
      userName: 'Amine K.',
      rating: 5,
      comment: 'Le meilleur Krousty de la région ! Le poulet est ultra croustillant et la sauce chili est incroyable.',
      createdAt: DateTime.now().subtract(const Duration(days: 1)),
    ),
    ReviewModel(
      id: 'rev-2',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Option Healthy parfaite pour ma diète sport. La salade poulet est ultra fraîche et super bien servie.',
      createdAt: DateTime.now().subtract(const Duration(days: 3)),
    ),
    ReviewModel(
      id: 'rev-3',
      userName: 'Youssef B.',
      rating: 5,
      comment: 'Service rapide, viande de super qualité. Le burger à la truffe est un pur chef d\'œuvre !',
      createdAt: DateTime.now().subtract(const Duration(days: 5)),
    ),
  ];

  static final List<OrderModel> mockOrders = [];
}
