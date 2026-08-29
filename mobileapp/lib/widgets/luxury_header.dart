import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../config/theme.dart';
import '../providers/cart_provider.dart';
import '../providers/language_provider.dart';
import '../providers/theme_provider.dart';

class LuxuryHeader extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final bool showBack;

  const LuxuryHeader({
    super.key,
    required this.title,
    this.showBack = false,
  });

  @override
  Size get preferredSize => const Size.fromHeight(65);

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final langProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);

    return AppBar(
      automaticallyImplyLeading: false,
      backgroundColor: themeProvider.isDarkMode ? AppTheme.darkBg : AppTheme.lightBg,
      elevation: 2,
      surfaceTintColor: Colors.transparent,
      title: Row(
        children: [
          if (showBack)
            IconButton(
              icon: const Icon(LucideIcons.arrowLeft, size: 22),
              onPressed: () => Navigator.of(context).pop(),
            ),
          // Logo & Title
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppTheme.goldPrimary, width: 1.5),
            ),
            child: const Icon(LucideIcons.crown, color: AppTheme.goldPrimary, size: 18),
          ),
          const SizedBox(width: 8),
          Text(
            'LE CRISPY',
            style: TextStyle(
              color: AppTheme.goldPrimary,
              fontWeight: FontWeight.bold,
              fontSize: 18,
              letterSpacing: 1.2,
            ),
          ),
        ],
      ),
      actions: [
        // Theme Toggle
        IconButton(
          icon: Icon(
            themeProvider.isDarkMode ? LucideIcons.sun : LucideIcons.moon,
            size: 20,
            color: AppTheme.goldPrimary,
          ),
          onPressed: () => themeProvider.toggleTheme(),
        ),
        // Language Selector Popup
        PopupMenuButton<String>(
          icon: const Icon(LucideIcons.globe, size: 20, color: AppTheme.goldPrimary),
          onSelected: (code) => langProvider.setLanguage(code),
          itemBuilder: (context) => [
            const PopupMenuItem(value: 'fr', child: Text('🇫🇷 Français')),
            const PopupMenuItem(value: 'ar', child: Text('🇹🇳 العربية')),
            const PopupMenuItem(value: 'en', child: Text('🇬🇧 English')),
          ],
        ),
        // Cart Badge Icon
        Stack(
          children: [
            IconButton(
              icon: const Icon(LucideIcons.shoppingBag, size: 22, color: AppTheme.goldPrimary),
              onPressed: () {
                Scaffold.of(context).openEndDrawer();
              },
            ),
            if (cartProvider.totalItemCount > 0)
              Positioned(
                right: 6,
                top: 6,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: AppTheme.spicyRed,
                    shape: BoxShape.circle,
                  ),
                  constraints: const BoxConstraints(
                    minWidth: 18,
                    minHeight: 18,
                  ),
                  child: Text(
                    '${cartProvider.totalItemCount}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(width: 6),
      ],
    );
  }
}
