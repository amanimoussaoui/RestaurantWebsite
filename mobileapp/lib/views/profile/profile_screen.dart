import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../models/user_profile.dart';
import '../../providers/auth_provider.dart';
import '../../providers/language_provider.dart';
import '../../widgets/ai_chatbot_widget.dart';
import '../../widgets/luxury_header.dart';
import '../auth/login_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final user = authProvider.currentUser;

    return Scaffold(
      appBar: LuxuryHeader(title: langProvider.translate('profileTitle')),
      floatingActionButton: const AiChatbotWidget(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: user == null
            ? _buildLoggedOutView(context, langProvider)
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // User Badge Card
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: AppTheme.darkCard,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppTheme.goldPrimary),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: AppTheme.goldPrimary.withOpacity(0.2),
                          child: const Icon(LucideIcons.user, color: AppTheme.goldPrimary, size: 30),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                user.name,
                                style: const TextStyle(
                                  color: AppTheme.goldPrimary,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                user.email,
                                style: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                              ),
                              const SizedBox(height: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(
                                  color: AppTheme.goldPrimary,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text(
                                  '★ Membre Le Crispy Club',
                                  style: TextStyle(
                                    color: AppTheme.darkBg,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Saved Addresses Section
                  Text(
                    langProvider.translate('savedAddresses'),
                    style: const TextStyle(color: AppTheme.textLight, fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  const SizedBox(height: 12),

                  if (user.addresses.isEmpty)
                    const Text('Aucune adresse enregistrée.', style: TextStyle(color: AppTheme.textMuted))
                  else
                    ...user.addresses.map((addr) => Card(
                          margin: const EdgeInsets.only(bottom: 10),
                          child: ListTile(
                            leading: const Icon(LucideIcons.mapPin, color: AppTheme.goldPrimary),
                            title: Text(addr.title, style: const TextStyle(color: AppTheme.goldBright, fontWeight: FontWeight.bold)),
                            subtitle: Text('${addr.street}, ${addr.city} ${addr.zipCode}', style: const TextStyle(color: AppTheme.textMuted)),
                            trailing: addr.isDefault
                                ? const Chip(
                                    label: Text('Par défaut', style: TextStyle(fontSize: 10, color: AppTheme.darkBg)),
                                    backgroundColor: AppTheme.goldPrimary,
                                  )
                                : null,
                          ),
                        )),

                  const SizedBox(height: 16),
                  OutlinedButton.icon(
                    icon: const Icon(LucideIcons.plus, color: AppTheme.goldPrimary),
                    label: Text(langProvider.translate('addAddress'), style: const TextStyle(color: AppTheme.goldPrimary)),
                    style: OutlinedButton.styleFrom(side: const BorderSide(color: AppTheme.goldPrimary)),
                    onPressed: () {
                      _showAddAddressDialog(context, authProvider);
                    },
                  ),
                  const SizedBox(height: 30),

                  // Logout Button
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton.icon(
                      icon: const Icon(LucideIcons.logOut),
                      label: Text(langProvider.translate('logout')),
                      style: ElevatedButton.styleFrom(backgroundColor: AppTheme.spicyRed, foregroundColor: Colors.white),
                      onPressed: () => authProvider.logout(),
                    ),
                  ),
                ],
              ),
      ),
    );
  }

  Widget _buildLoggedOutView(BuildContext context, LanguageProvider langProvider) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const SizedBox(height: 40),
        const Icon(LucideIcons.userX, color: AppTheme.goldPrimary, size: 60),
        const SizedBox(height: 16),
        const Text(
          'Connectez-vous pour accéder à votre profil et adresses enregistrées.',
          textAlign: TextAlign.center,
          style: TextStyle(color: AppTheme.textMuted, fontSize: 14),
        ),
        const SizedBox(height: 24),
        SizedBox(
          width: double.infinity,
          height: 50,
          child: ElevatedButton(
            child: Text(langProvider.translate('loginTitle')),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (_) => const LoginScreen()));
            },
          ),
        ),
      ],
    );
  }

  void _showAddAddressDialog(BuildContext context, AuthProvider auth) {
    final titleCtrl = TextEditingController();
    final streetCtrl = TextEditingController();
    final cityCtrl = TextEditingController(text: 'Dormans');
    final zipCtrl = TextEditingController(text: '51700');

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppTheme.darkCard,
        title: const Text('Ajouter une adresse', style: TextStyle(color: AppTheme.goldPrimary)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Titre (ex: Domicile)')),
            TextField(controller: streetCtrl, decoration: const InputDecoration(labelText: 'Rue / Adresse')),
            TextField(controller: cityCtrl, decoration: const InputDecoration(labelText: 'Ville')),
            TextField(controller: zipCtrl, decoration: const InputDecoration(labelText: 'Code Postal')),
          ],
        ),
        actions: [
          TextButton(
            child: const Text('Annuler', style: TextStyle(color: AppTheme.textMuted)),
            onPressed: () => Navigator.of(ctx).pop(),
          ),
          ElevatedButton(
            child: const Text('Enregistrer'),
            onPressed: () {
              if (streetCtrl.text.isNotEmpty) {
                auth.addAddress(AddressModel(
                  id: 'addr-${DateTime.now().millisecondsSinceEpoch}',
                  title: titleCtrl.text.isEmpty ? 'Autre' : titleCtrl.text,
                  street: streetCtrl.text,
                  city: cityCtrl.text,
                  zipCode: zipCtrl.text,
                  phone: auth.currentUser?.phone ?? '',
                ));
                Navigator.of(ctx).pop();
              }
            },
          ),
        ],
      ),
    );
  }
}
