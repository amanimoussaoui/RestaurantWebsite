import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../providers/cart_provider.dart';
import '../../providers/language_provider.dart';

class QRScannerDialog extends StatelessWidget {
  const QRScannerDialog({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);

    return Dialog(
      backgroundColor: AppTheme.darkCard,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(color: AppTheme.goldPrimary),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(LucideIcons.qrCode, color: AppTheme.goldPrimary, size: 54),
            const SizedBox(height: 16),
            Text(
              langProvider.translate('qrScanModalTitle'),
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppTheme.goldBright,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              langProvider.translate('qrSubtitle'),
              textAlign: TextAlign.center,
              style: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
            ),
            const SizedBox(height: 24),

            // Scanner Animation Simulation Frame
            Container(
              width: 180,
              height: 180,
              decoration: BoxDecoration(
                color: AppTheme.darkBg,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.goldPrimary, width: 2),
              ),
              child: const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(LucideIcons.camera, color: AppTheme.goldPrimary, size: 40),
                  SizedBox(height: 8),
                  Text(
                    'Caméra prête...',
                    style: TextStyle(color: AppTheme.textMuted, fontSize: 12),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Quick Simulate Button Table 07
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                icon: const Icon(LucideIcons.utensilsCrossed),
                label: Text(langProvider.translate('qrScanSimulateBtn')),
                onPressed: () {
                  cartProvider.setServiceMode('sur_place');
                  cartProvider.setTableNumber('Table 07');
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Table N° 07 activée pour votre commande sur place !'),
                      backgroundColor: AppTheme.goldPrimary,
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
