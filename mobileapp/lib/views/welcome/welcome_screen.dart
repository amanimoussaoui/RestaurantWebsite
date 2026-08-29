import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../providers/language_provider.dart';
import '../../providers/theme_provider.dart';
import '../home/home_screen.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final themeProvider = Provider.of<ThemeProvider>(context);

    return Scaffold(
      backgroundColor: AppTheme.darkBg,
      body: Stack(
        children: [
          // Background Gradient Overlay
          Container(
            decoration: BoxDecoration(
              gradient: RadialGradient(
                center: Alignment.center,
                radius: 1.2,
                colors: [
                  AppTheme.goldPrimary.withOpacity(0.15),
                  AppTheme.darkBg,
                ],
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Row: Theme & Language controls
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      PopupMenuButton<String>(
                        icon: const Row(
                          children: [
                            Icon(LucideIcons.globe, color: AppTheme.goldPrimary, size: 20),
                            SizedBox(width: 6),
                            Text('FR / AR / EN', style: TextStyle(color: AppTheme.goldPrimary, fontSize: 12)),
                          ],
                        ),
                        onSelected: (code) => langProvider.setLanguage(code),
                        itemBuilder: (context) => [
                          const PopupMenuItem(value: 'fr', child: Text('🇫🇷 Français')),
                          const PopupMenuItem(value: 'ar', child: Text('🇹🇳 العربية')),
                          const PopupMenuItem(value: 'en', child: Text('🇬🇧 English')),
                        ],
                      ),
                      IconButton(
                        icon: Icon(
                          themeProvider.isDarkMode ? LucideIcons.sun : LucideIcons.moon,
                          color: AppTheme.goldPrimary,
                        ),
                        onPressed: () => themeProvider.toggleTheme(),
                      ),
                    ],
                  ),

                  // Center Logo Medallion with Gold Pulse Glow
                  Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(28),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppTheme.darkCard,
                          border: Border.all(color: AppTheme.goldPrimary, width: 3),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.goldPrimary.withOpacity(0.4),
                              blurRadius: 30,
                              spreadRadius: 8,
                            ),
                          ],
                        ),
                        child: const Icon(
                          LucideIcons.crown,
                          color: AppTheme.goldPrimary,
                          size: 64,
                        ),
                      ),
                      const SizedBox(height: 24),
                      Text(
                        'LE CRISPY',
                        style: TextStyle(
                          color: AppTheme.goldPrimary,
                          fontSize: 34,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 2,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'FAST-FOOD GOURMET & FINE DINING',
                        style: TextStyle(
                          color: AppTheme.goldBright.withOpacity(0.9),
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 1.5,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        langProvider.translate('welcomeTitle'),
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: AppTheme.textLight,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          height: 1.3,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        langProvider.translate('welcomeSubtitle'),
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: AppTheme.textMuted,
                          fontSize: 14,
                          height: 1.4,
                        ),
                      ),
                    ],
                  ),

                  // Action Buttons
                  Column(
                    children: [
                      SizedBox(
                        width: double.infinity,
                        height: 54,
                        child: ElevatedButton.icon(
                          icon: const Icon(LucideIcons.sparkles, color: AppTheme.darkBg),
                          label: Text(
                            langProvider.translate('welcomeExplore'),
                            style: const TextStyle(
                              color: AppTheme.darkBg,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          onPressed: () {
                            Navigator.of(context).pushReplacement(
                              MaterialPageRoute(builder: (_) => const MainTabNavigator()),
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextButton(
                        child: Text(
                          langProvider.translate('welcomeSkip'),
                          style: const TextStyle(
                            color: AppTheme.textMuted,
                            fontSize: 14,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                        onPressed: () {
                          Navigator.of(context).pushReplacement(
                            MaterialPageRoute(builder: (_) => const MainTabNavigator(initialTab: 1)),
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
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

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialTab;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          HomeScreen(),
          // Menu, Healthy, Reviews, Profile screens will be rendered in their tabs
        ],
      ),
    );
  }
}
