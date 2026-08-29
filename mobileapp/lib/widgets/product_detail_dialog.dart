import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../config/theme.dart';
import '../models/menu_item.dart';
import '../providers/cart_provider.dart';
import '../providers/language_provider.dart';

class ProductDetailDialog extends StatefulWidget {
  final MenuItem item;

  const ProductDetailDialog({super.key, required this.item});

  @override
  State<ProductDetailDialog> createState() => _ProductDetailDialogState();
}

class _ProductDetailDialogState extends State<ProductDetailDialog> {
  int quantity = 1;
  final TextEditingController instructionsController = TextEditingController();

  @override
  void dispose() {
    instructionsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);
    final lang = langProvider.currentLanguage;
    final item = widget.item;

    return Container(
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height * 0.88,
      ),
      decoration: const BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Top Drag Handle & Close Button
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: AppTheme.borderGold,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                IconButton(
                  icon: const Icon(LucideIcons.x, color: AppTheme.textMuted),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
            const SizedBox(height: 10),

            // Image
            ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: AspectRatio(
                aspectRatio: 16 / 9,
                child: Image.network(
                  item.image,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => Container(color: AppTheme.darkBg),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Title & Price
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    item.name(lang),
                    style: const TextStyle(
                      color: AppTheme.goldPrimary,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Text(
                  '${item.price.toStringAsFixed(2)} DT',
                  style: const TextStyle(
                    color: AppTheme.goldBright,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),

            // Description
            Text(
              item.description(lang),
              style: const TextStyle(color: AppTheme.textMuted, fontSize: 14, height: 1.4),
            ),
            const SizedBox(height: 16),

            // Nutrition Facts Grid
            if (item.calories != null || item.protein != null) ...[
              Text(
                langProvider.translate('nutritionFacts'),
                style: const TextStyle(
                  color: AppTheme.textLight,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.darkBg,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.borderGold),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _macroTile('Calories', '${item.calories ?? "-"} kcal', LucideIcons.zap),
                    _macroTile('Protéines', '${item.protein ?? "-"} g', LucideIcons.heartPulse),
                    _macroTile('Glucides', '${item.carbs ?? "-"} g', LucideIcons.wheat),
                    _macroTile('Lipides', '${item.fat ?? "-"} g', LucideIcons.flame),
                  ],
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Special Instructions Input
            TextField(
              controller: instructionsController,
              style: const TextStyle(color: AppTheme.textLight),
              decoration: InputDecoration(
                hintText: 'Instructions spéciales (ex: sans oignons, sauce à part)...',
                hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                filled: true,
                fillColor: AppTheme.darkBg,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppTheme.borderGold),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Quantity Control & Add Button
            Row(
              children: [
                // Quantity Selector
                Container(
                  decoration: BoxDecoration(
                    color: AppTheme.darkBg,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppTheme.borderGold),
                  ),
                  child: Row(
                    children: [
                      IconButton(
                        icon: const Icon(LucideIcons.minus, size: 16, color: AppTheme.goldPrimary),
                        onPressed: () {
                          if (quantity > 1) setState(() => quantity--);
                        },
                      ),
                      Text(
                        '$quantity',
                        style: const TextStyle(color: AppTheme.textLight, fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      IconButton(
                        icon: const Icon(LucideIcons.plus, size: 16, color: AppTheme.goldPrimary),
                        onPressed: () => setState(() => quantity++),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                // Add to Cart Button
                Expanded(
                  child: ElevatedButton.icon(
                    icon: const Icon(LucideIcons.shoppingBag),
                    label: Text(
                      '${langProvider.translate("addToCart")} • ${(item.price * quantity).toStringAsFixed(2)} DT',
                    ),
                    onPressed: () {
                      cartProvider.addToCart(
                        item,
                        quantity: quantity,
                        instructions: instructionsController.text,
                      );
                      Navigator.of(context).pop();
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('${item.name(lang)} ajouté au panier !'),
                          backgroundColor: AppTheme.goldPrimary,
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _macroTile(String label, String value, IconData icon) {
    return Column(
      children: [
        Icon(icon, color: AppTheme.goldPrimary, size: 18),
        const SizedBox(height: 4),
        Text(value, style: const TextStyle(color: AppTheme.goldBright, fontWeight: FontWeight.bold, fontSize: 13)),
        Text(label, style: const TextStyle(color: AppTheme.textMuted, fontSize: 10)),
      ],
    );
  }
}
