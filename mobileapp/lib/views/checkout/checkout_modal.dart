import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../models/order.dart';
import '../../providers/auth_provider.dart';
import '../../providers/cart_provider.dart';
import '../../providers/language_provider.dart';
import '../../providers/order_provider.dart';

class CheckoutModal extends StatefulWidget {
  const CheckoutModal({super.key});

  @override
  State<CheckoutModal> createState() => _CheckoutModalState();
}

class _CheckoutModalState extends State<CheckoutModal> {
  final TextEditingController tableController = TextEditingController();

  @override
  void initState() {
    super.initState();
    final cart = Provider.of<CartProvider>(context, listen: false);
    tableController.text = cart.tableNumber;
  }

  @override
  void dispose() {
    tableController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final cart = Provider.of<CartProvider>(context);
    final auth = Provider.of<AuthProvider>(context);
    final orderProvider = Provider.of<OrderProvider>(context);

    return Container(
      padding: EdgeInsets.only(
        left: 20,
        right: 20,
        top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
      ),
      decoration: const BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Title
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  langProvider.translate('checkoutBtn'),
                  style: const TextStyle(
                    color: AppTheme.goldPrimary,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                IconButton(
                  icon: const Icon(LucideIcons.x, color: AppTheme.textMuted),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Service Mode Selector Chips
            Text(
              langProvider.translate('selectServiceMode'),
              style: const TextStyle(color: AppTheme.textLight, fontWeight: FontWeight.bold, fontSize: 14),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                _modeChip(context, 'sur_place', langProvider.translate('surPlace'), LucideIcons.utensils),
                const SizedBox(width: 8),
                _modeChip(context, 'a_emporter', langProvider.translate('aEmporter'), LucideIcons.shoppingBag),
                const SizedBox(width: 8),
                _modeChip(context, 'livraison', langProvider.translate('livraison'), LucideIcons.bike),
              ],
            ),
            const SizedBox(height: 16),

            // Specific Service Inputs
            if (cart.serviceMode == 'sur_place') ...[
              TextField(
                controller: tableController,
                style: const TextStyle(color: AppTheme.textLight),
                decoration: InputDecoration(
                  labelText: langProvider.translate('tableNumberLabel'),
                  labelStyle: const TextStyle(color: AppTheme.goldPrimary),
                  hintText: langProvider.translate('tablePlaceholder'),
                  hintStyle: const TextStyle(color: AppTheme.textMuted),
                  filled: true,
                  fillColor: AppTheme.darkBg,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: const BorderSide(color: AppTheme.borderGold),
                  ),
                ),
                onChanged: (val) => cart.setTableNumber(val),
              ),
              const SizedBox(height: 16),
            ],

            // Summary
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.darkBg,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppTheme.borderGold),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(langProvider.translate('subtotal'), style: const TextStyle(color: AppTheme.textMuted)),
                      Text('${cart.subtotal.toStringAsFixed(2)} DT', style: const TextStyle(color: AppTheme.textLight)),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(langProvider.translate('deliveryFee'), style: const TextStyle(color: AppTheme.textMuted)),
                      Text('${cart.deliveryFee.toStringAsFixed(2)} DT', style: const TextStyle(color: AppTheme.textLight)),
                    ],
                  ),
                  const Divider(color: AppTheme.borderGold, height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        langProvider.translate('total'),
                        style: const TextStyle(color: AppTheme.goldBright, fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      Text(
                        '${cart.total.toStringAsFixed(2)} DT',
                        style: const TextStyle(color: AppTheme.goldBright, fontWeight: FontWeight.bold, fontSize: 18),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Pay & Submit Button
            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton.icon(
                icon: const Icon(LucideIcons.checkCircle2),
                label: Text(
                  langProvider.translate('payNow'),
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                onPressed: () async {
                  if (cart.serviceMode == 'sur_place' && cart.tableNumber.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Veuillez spécifier un numéro de table pour la commande Sur Place.'),
                        backgroundColor: AppTheme.spicyRed,
                      ),
                    );
                    return;
                  }

                  final user = auth.currentUser;
                  final newOrder = OrderModel(
                    id: 'ORD-${DateTime.now().millisecondsSinceEpoch}',
                    userEmail: user?.email ?? 'client@lecrispy.com',
                    userName: user?.name ?? 'Client Le Crispy',
                    userPhone: user?.phone ?? '09 56 07 00 91',
                    serviceMode: cart.serviceMode,
                    tableNumber: cart.tableNumber,
                    items: List.from(cart.items),
                    subtotal: cart.subtotal,
                    deliveryFee: cart.deliveryFee,
                    total: cart.total,
                    status: 'pending',
                    createdAt: DateTime.now(),
                  );

                  await orderProvider.createOrder(newOrder);
                  cart.clearCart();
                  Navigator.of(context).pop();

                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(langProvider.translate('orderConfirmed')),
                      backgroundColor: AppTheme.goldPrimary,
                      duration: const Duration(seconds: 3),
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

  Widget _modeChip(BuildContext context, String mode, String label, IconData icon) {
    final cart = Provider.of<CartProvider>(context);
    final isSelected = cart.serviceMode == mode;

    return Expanded(
      child: InkWell(
        onTap: () => cart.setServiceMode(mode),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? AppTheme.goldPrimary : AppTheme.darkBg,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: AppTheme.goldPrimary),
          ),
          child: Column(
            children: [
              Icon(icon, color: isSelected ? AppTheme.darkBg : AppTheme.goldPrimary, size: 20),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(
                  color: isSelected ? AppTheme.darkBg : AppTheme.textLight,
                  fontWeight: FontWeight.bold,
                  fontSize: 11,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
