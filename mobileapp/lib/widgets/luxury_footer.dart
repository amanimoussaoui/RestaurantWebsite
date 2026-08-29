import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../config/theme.dart';

class LuxuryFooter extends StatelessWidget {
  const LuxuryFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.darkCard,
        border: Border(top: BorderSide(color: AppTheme.goldPrimary.withOpacity(0.3))),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Promo Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [AppTheme.goldPrimary, AppTheme.goldBright],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Icon(LucideIcons.sparkles, color: AppTheme.darkBg, size: 20),
                SizedBox(width: 8),
                Text(
                  '2 PIZZAS ACHETÉES = 1 PIZZA OFFERTE',
                  style: TextStyle(
                    color: AppTheme.darkBg,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                    letterSpacing: 0.8,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Row(
            children: const [
              Icon(LucideIcons.crown, color: AppTheme.goldPrimary, size: 20),
              SizedBox(width: 8),
              Text(
                'LE CRISPY DORMANS',
                style: TextStyle(
                  color: AppTheme.goldPrimary,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  letterSpacing: 1.1,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Row(
            children: [
              Icon(LucideIcons.mapPin, color: AppTheme.textMuted, size: 16),
              SizedBox(width: 8),
              Expanded(
                child: Text(
                  '1 rue Jean de Dormans, 51700 Dormans',
                  style: TextStyle(color: AppTheme.textMuted, fontSize: 13),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Row(
            children: [
              Icon(LucideIcons.phoneCall, color: AppTheme.textMuted, size: 16),
              SizedBox(width: 8),
              Text(
                '09 56 07 00 91',
                style: TextStyle(color: AppTheme.textMuted, fontSize: 13),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Row(
            children: [
              Icon(LucideIcons.clock, color: AppTheme.textMuted, size: 16),
              SizedBox(width: 8),
              Text(
                'Ouvert 7j/7 de 11h00 à 23h00 Non Stop',
                style: TextStyle(color: AppTheme.textMuted, fontSize: 13),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(color: AppTheme.borderGold),
          const SizedBox(height: 8),
          const Center(
            child: Text(
              '© 2026 Le Crispy — Fine Fast-Food Gourmet',
              style: TextStyle(color: AppTheme.textMuted, fontSize: 11),
            ),
          ),
        ],
      ),
    );
  }
}
