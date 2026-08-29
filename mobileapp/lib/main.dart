import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:lucide_icons/lucide_icons.dart';

import 'config/supabase_config.dart';
import 'config/theme.dart';
import 'providers/auth_provider.dart';
import 'providers/cart_provider.dart';
import 'providers/language_provider.dart';
import 'providers/menu_provider.dart';
import 'providers/order_provider.dart';
import 'providers/theme_provider.dart';
import 'views/checkout/checkout_modal.dart';
import 'views/dashboard/dashboard_screen.dart';
import 'views/healthy/healthy_screen.dart';
import 'views/home/home_screen.dart';
import 'views/menu/menu_screen.dart';
import 'views/profile/profile_screen.dart';
import 'views/reviews/reviews_screen.dart';
import 'views/welcome/welcome_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (SupabaseConfig.isConfigured) {
    try {
      await Supabase.initialize(
        url: SupabaseConfig.url,
        anonKey: SupabaseConfig.anonKey,
      );
    } catch (e) {
      debugPrint('Supabase init notice: $e');
    }
  }

  runApp(const LeCrispyApp());
}

class LeCrispyApp extends StatelessWidget {
  const LeCrispyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => LanguageProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => CartProvider()),
        ChangeNotifierProvider(create: (_) => MenuProvider()),
        ChangeNotifierProvider(create: (_) => OrderProvider()),
      ],
      child: Consumer2<ThemeProvider, LanguageProvider>(
        builder: (context, themeProvider, langProvider, child) {
          return MaterialApp(
            title: 'Le Crispy',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.lightThemeData,
            darkTheme: AppTheme.darkThemeData,
            themeMode: themeProvider.themeMode,
            home: const WelcomeScreen(),
          );
        },
      ),
    );
  }
}

class MainTabNavigator extends StatefulWidget {
  final int initialTab;

  const MainTabNavigator({super.key, this.initialTab = 0});

  @override
  State<MainTabNavigator> createState() => _MainTabNavigatorState();
}

class _MainTabNavigatorState extends State<MainTabNavigator> {
  late int _currentIndex;

  final List<Widget> _screens = const [
    HomeScreen(),
    MenuScreen(),
    HealthyScreen(),
    ReviewsScreen(),
    DashboardScreen(),
    ProfileScreen(),
  ];

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialTab;
  }

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);

    return Scaffold(
      endDrawer: _buildCartDrawer(context, langProvider, cartProvider),
      body: Directionality(
        textDirection: langProvider.isRTL ? TextDirection.rtl : TextDirection.ltr,
        child: IndexedStack(
          index: _currentIndex,
          children: _screens,
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: AppTheme.goldPrimary,
        unselectedItemColor: AppTheme.textMuted,
        backgroundColor: AppTheme.darkCard,
        type: BottomNavigationBarType.fixed,
        selectedFontSize: 11,
        unselectedFontSize: 10,
        onTap: (index) => setState(() => _currentIndex = index),
        items: [
          BottomNavigationBarItem(
            icon: const Icon(LucideIcons.home),
            label: langProvider.translate('navHome'),
          ),
          BottomNavigationBarItem(
            icon: const Icon(LucideIcons.utensils),
            label: langProvider.translate('navMenu'),
          ),
          BottomNavigationBarItem(
            icon: const Icon(LucideIcons.heartPulse),
            label: langProvider.translate('navHealthy'),
          ),
          BottomNavigationBarItem(
            icon: const Icon(LucideIcons.star),
            label: langProvider.translate('navReviews'),
          ),
          BottomNavigationBarItem(
            icon: const Icon(LucideIcons.clock),
            label: langProvider.translate('navDashboard'),
          ),
          BottomNavigationBarItem(
            icon: const Icon(LucideIcons.user),
            label: langProvider.translate('navProfile'),
          ),
        ],
      ),
    );
  }

  Widget _buildCartDrawer(BuildContext context, LanguageProvider langProvider, CartProvider cartProvider) {
    final lang = langProvider.currentLanguage;

    return Drawer(
      backgroundColor: AppTheme.darkCard,
      child: SafeArea(
        child: Column(
          children: [
            // Drawer Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: AppTheme.darkBg,
                border: Border(bottom: BorderSide(color: AppTheme.borderGold)),
              ),
              child: Row(
                children: [
                  const Icon(LucideIcons.shoppingBag, color: AppTheme.goldPrimary),
                  const SizedBox(width: 10),
                  Text(
                    langProvider.translate('cartTitle'),
                    style: const TextStyle(
                      color: AppTheme.goldPrimary,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),

            // Cart Items List
            Expanded(
              child: cartProvider.items.isEmpty
                  ? Center(
                      child: Text(
                        langProvider.translate('cartEmpty'),
                        style: const TextStyle(color: AppTheme.textMuted),
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(12),
                      itemCount: cartProvider.items.length,
                      itemBuilder: (context, index) {
                        final item = cartProvider.items[index];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 10),
                          child: Padding(
                            padding: const EdgeInsets.all(10),
                            child: Row(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(8),
                                  child: Image.network(
                                    item.item.image,
                                    width: 50,
                                    height: 50,
                                    fit: BoxFit.cover,
                                    errorBuilder: (_, __, ___) => Container(color: AppTheme.darkBg, width: 50, height: 50),
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        item.item.name(lang),
                                        style: const TextStyle(color: AppTheme.textLight, fontWeight: FontWeight.bold, fontSize: 13),
                                      ),
                                      Text(
                                        '${item.totalPrice.toStringAsFixed(2)} DT',
                                        style: const TextStyle(color: AppTheme.goldBright, fontSize: 12),
                                      ),
                                    ],
                                  ),
                                ),
                                Row(
                                  children: [
                                    IconButton(
                                      icon: const Icon(LucideIcons.minus, size: 14, color: AppTheme.goldPrimary),
                                      onPressed: () => cartProvider.updateQuantity(item.item.id, -1),
                                    ),
                                    Text('${item.quantity}', style: const TextStyle(color: AppTheme.textLight)),
                                    IconButton(
                                      icon: const Icon(LucideIcons.plus, size: 14, color: AppTheme.goldPrimary),
                                      onPressed: () => cartProvider.updateQuantity(item.item.id, 1),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),

            // Cart Summary Footer
            if (cartProvider.items.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: const BoxDecoration(
                  color: AppTheme.darkBg,
                  border: Border(top: BorderSide(color: AppTheme.borderGold)),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(langProvider.translate('subtotal'), style: const TextStyle(color: AppTheme.textMuted)),
                        Text('${cartProvider.subtotal.toStringAsFixed(2)} DT', style: const TextStyle(color: AppTheme.goldBright, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        child: Text(langProvider.translate('checkoutBtn')),
                        onPressed: () {
                          Navigator.of(context).pop();
                          showModalBottomSheet(
                            context: context,
                            isScrollControlled: true,
                            backgroundColor: Colors.transparent,
                            builder: (_) => const CheckoutModal(),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
