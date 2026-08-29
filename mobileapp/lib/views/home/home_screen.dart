import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../providers/language_provider.dart';
import '../../providers/menu_provider.dart';
import '../../widgets/ai_chatbot_widget.dart';
import '../../widgets/luxury_footer.dart';
import '../../widgets/luxury_header.dart';
import '../../widgets/product_card.dart';
import '../qr_scanner/qr_scanner_dialog.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final menuProvider = Provider.of<MenuProvider>(context);

    final popularItems = menuProvider.menuItems.where((i) => i.isPopular).toList();

    return Scaffold(
      appBar: const LuxuryHeader(title: 'LE CRISPY'),
      floatingActionButton: const AiChatbotWidget(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Section Banner
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 32),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    AppTheme.darkBg,
                    AppTheme.darkCard.withOpacity(0.9),
                  ],
                ),
                border: const Border(bottom: BorderSide(color: AppTheme.borderGold)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.goldPrimary.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppTheme.goldPrimary),
                        ),
                        child: Row(
                          children: [
                            const Icon(LucideIcons.sparkles, color: AppTheme.goldPrimary, size: 14),
                            const SizedBox(width: 6),
                            Text(
                              langProvider.translate('heroTitlePrefix'),
                              style: const TextStyle(
                                color: AppTheme.goldPrimary,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    langProvider.translate('heroTitleGold'),
                    style: const TextStyle(
                      color: AppTheme.goldPrimary,
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    langProvider.translate('heroSubtitle'),
                    style: const TextStyle(
                      color: AppTheme.textMuted,
                      fontSize: 14,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Hero Action Buttons
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          icon: const Icon(LucideIcons.shoppingBag, size: 18),
                          label: Text(
                            langProvider.translate('heroOrderCta'),
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                          onPressed: () {
                            // Switch to menu tab or scroll
                          },
                        ),
                      ),
                      const SizedBox(width: 10),
                      OutlinedButton.icon(
                        icon: const Icon(LucideIcons.qrCode, color: AppTheme.goldPrimary, size: 18),
                        label: Text(
                          langProvider.translate('heroBookTableCta'),
                          style: const TextStyle(color: AppTheme.goldPrimary, fontSize: 12),
                        ),
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: AppTheme.goldPrimary),
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                        ),
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (_) => const QRScannerDialog(),
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Nos Atouts Section (3 Pillars)
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'NOS ATOUTS PRESTIGE',
                    style: TextStyle(
                      color: AppTheme.goldPrimary,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                    ),
                  ),
                  const SizedBox(height: 12),
                  _atoutCard(
                    LucideIcons.truck,
                    langProvider.translate('atout1Title'),
                    langProvider.translate('atout1Desc'),
                  ),
                  const SizedBox(height: 10),
                  _atoutCard(
                    LucideIcons.flame,
                    langProvider.translate('atout2Title'),
                    langProvider.translate('atout2Desc'),
                  ),
                  const SizedBox(height: 10),
                  _atoutCard(
                    LucideIcons.chefHat,
                    langProvider.translate('atout3Title'),
                    langProvider.translate('atout3Desc'),
                  ),
                ],
              ),
            ),

            // Specialties Showcase
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'SPÉCIALITÉS STAR DU CHEF',
                    style: TextStyle(
                      color: AppTheme.goldPrimary,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Icon(LucideIcons.arrowRight, color: AppTheme.goldPrimary, size: 20),
                ],
              ),
            ),
            const SizedBox(height: 12),

            // Popular Items Horizontal List
            SizedBox(
              height: 280,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                itemCount: popularItems.length,
                itemBuilder: (context, index) {
                  return Container(
                    width: 240,
                    margin: const EdgeInsets.only(right: 14),
                    child: ProductCard(item: popularItems[index]),
                  );
                },
              ),
            ),

            const SizedBox(height: 24),
            const LuxuryFooter(),
          ],
        ),
      ),
    );
  }

  Widget _atoutCard(IconData icon, String title, String desc) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.borderGold),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.goldPrimary.withOpacity(0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: AppTheme.goldPrimary, size: 22),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: AppTheme.textLight,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  desc,
                  style: const TextStyle(color: AppTheme.textMuted, fontSize: 12, height: 1.3),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
