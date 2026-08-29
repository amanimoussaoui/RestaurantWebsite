import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/language_provider.dart';
import '../../providers/order_provider.dart';
import '../../widgets/ai_chatbot_widget.dart';
import '../../widgets/luxury_header.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final orderProvider = Provider.of<OrderProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);

    final orders = orderProvider.orders;

    return Scaffold(
      appBar: LuxuryHeader(title: langProvider.translate('navDashboard')),
      floatingActionButton: const AiChatbotWidget(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Banner Admin / Suivi Live
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.darkCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.goldPrimary),
              ),
              child: Row(
                children: [
                  const Icon(LucideIcons.clock, color: AppTheme.goldPrimary, size: 28),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          authProvider.isAdmin ? 'Tableau de Bord Administration' : 'Suivi Live de vos Commandes',
                          style: const TextStyle(
                            color: AppTheme.goldPrimary,
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        Text(
                          authProvider.isAdmin ? 'Gestion directe des commandes en cuisine' : 'Statut en temps réel de votre préparation',
                          style: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            Text(
              'Historique & Commandes en Cours (${orders.length})',
              style: const TextStyle(color: AppTheme.textLight, fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 12),

            if (orders.isEmpty)
              const Center(
                child: Padding(
                  padding: EdgeInsets.symmetric(vertical: 40),
                  child: Text('Aucune commande enregistrée pour le moment.', style: TextStyle(color: AppTheme.textMuted)),
                ),
              )
            else
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: orders.length,
                itemBuilder: (context, index) {
                  final ord = orders[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'N° ${ord.id.substring(0, 8)}...',
                                style: const TextStyle(color: AppTheme.goldPrimary, fontWeight: FontWeight.bold, fontSize: 14),
                              ),
                              _statusChip(ord.status, langProvider),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Mode: ${ord.serviceMode == "sur_place" ? "Sur Place (" + (ord.tableNumber ?? "Table") + ")" : ord.serviceMode}',
                            style: const TextStyle(color: AppTheme.textLight, fontSize: 13),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Client: ${ord.userName} (${ord.userPhone})',
                            style: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
                          ),
                          const Divider(color: AppTheme.borderGold, height: 16),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                '${ord.items.length} articles',
                                style: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
                              ),
                              Text(
                                '${ord.total.toStringAsFixed(2)} DT',
                                style: const TextStyle(color: AppTheme.goldBright, fontWeight: FontWeight.bold, fontSize: 16),
                              ),
                            ],
                          ),

                          // Admin Actions to Update Status
                          if (authProvider.isAdmin) ...[
                            const SizedBox(height: 12),
                            SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                children: [
                                  _statusBtn(context, orderProvider, ord.id, 'preparing', 'En prép.'),
                                  const SizedBox(width: 6),
                                  _statusBtn(context, orderProvider, ord.id, 'ready', 'Prête'),
                                  const SizedBox(width: 6),
                                  _statusBtn(context, orderProvider, ord.id, 'delivered', 'Livrée'),
                                  const SizedBox(width: 6),
                                  _statusBtn(context, orderProvider, ord.id, 'cancelled', 'Annuler'),
                                ],
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  );
                },
              ),
          ],
        ),
      ),
    );
  }

  Widget _statusChip(String status, LanguageProvider langProvider) {
    Color color = AppTheme.goldPrimary;
    String label = status;

    switch (status) {
      case 'pending':
        color = const Color(0xFFFF9800);
        label = langProvider.translate('pendingStatus');
        break;
      case 'preparing':
        color = const Color(0xFF2196F3);
        label = langProvider.translate('preparingStatus');
        break;
      case 'ready':
        color = const Color(0xFF9C27B0);
        label = langProvider.translate('readyStatus');
        break;
      case 'delivered':
        color = const Color(0xFF4CAF50);
        label = langProvider.translate('deliveredStatus');
        break;
      case 'cancelled':
        color = AppTheme.spicyRed;
        label = langProvider.translate('cancelledStatus');
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color),
      ),
      child: Text(
        label,
        style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 11),
      ),
    );
  }

  Widget _statusBtn(BuildContext context, OrderProvider provider, String orderId, String targetStatus, String label) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        minimumSize: Size.zero,
      ),
      onPressed: () => provider.updateOrderStatus(orderId, targetStatus),
      child: Text(label, style: const TextStyle(fontSize: 10)),
    );
  }
}
