import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../config/theme.dart';
import '../models/menu_item.dart';
import '../providers/cart_provider.dart';
import '../providers/language_provider.dart';
import 'product_detail_dialog.dart';

class ProductCard extends StatelessWidget {
  final MenuItem item;

  const ProductCard({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);
    final lang = langProvider.currentLanguage;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          showModalBottomSheet(
            context: context,
            isScrollControlled: true,
            backgroundColor: Colors.transparent,
            builder: (ctx) => ProductDetailDialog(item: item),
          );
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Product Image & Badges
            Stack(
              children: [
                AspectRatio(
                  aspectRatio: 16 / 10,
                  child: Image.network(
                    item.image,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) => Container(
                      color: AppTheme.darkSurface,
                      child: const Center(
                        child: Icon(LucideIcons.utensils, color: AppTheme.goldPrimary, size: 36),
                      ),
                    ),
                  ),
                ),
                // Badges (Healthy / Popular / New)
                Positioned(
                  top: 8,
                  left: 8,
                  child: Wrap(
                    spacing: 4,
                    children: [
                      if (item.isPopular)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppTheme.spicyRed,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Row(
                            children: [
                              Icon(LucideIcons.flame, color: Colors.white, size: 10),
                              SizedBox(width: 4),
                              Text('POPULAIRE', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                      if (item.isHealthy)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0xFF2E7D32),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Row(
                            children: [
                              Icon(LucideIcons.heartPulse, color: Colors.white, size: 10),
                              SizedBox(width: 4),
                              Text('HEALTHY', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
                // Price Tag Badge
                Positioned(
                  bottom: 8,
                  right: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppTheme.darkBg.withOpacity(0.9),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppTheme.goldPrimary, width: 1),
                    ),
                    child: Text(
                      '${item.price.toStringAsFixed(2)} DT',
                      style: const TextStyle(
                        color: AppTheme.goldBright,
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            // Info Body
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.name(lang),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: AppTheme.textLight,
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    item.description(lang),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: AppTheme.textMuted,
                      fontSize: 12,
                      height: 1.3,
                    ),
                  ),
                  const SizedBox(height: 10),
                  // Meta bar: Prep time & Spice level
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(LucideIcons.clock, size: 12, color: AppTheme.goldPrimary),
                          const SizedBox(width: 4),
                          Text(
                            '${item.preparationTimeMinutes} min',
                            style: const TextStyle(color: AppTheme.textMuted, fontSize: 11),
                          ),
                          if (item.calories != null) ...[
                            const SizedBox(width: 8),
                            const Icon(LucideIcons.zap, size: 12, color: AppTheme.goldPrimary),
                            const SizedBox(width: 2),
                            Text(
                              '${item.calories} kcal',
                              style: const TextStyle(color: AppTheme.textMuted, fontSize: 11),
                            ),
                          ],
                        ],
                      ),
                      // Add to Cart Button
                      InkWell(
                        onTap: () {
                          cartProvider.addToCart(item);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('${item.name(lang)} ${langProvider.translate("addToCart")}'),
                              duration: const Duration(seconds: 1),
                              backgroundColor: AppTheme.goldPrimary,
                            ),
                          );
                        },
                        child: Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: AppTheme.goldPrimary,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(LucideIcons.plus, color: AppTheme.darkBg, size: 16),
                        ),
                      ),
                    ],
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
