import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/language_provider.dart';
import 'register_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController(text: 'client@lecrispy.com');
  final _passwordController = TextEditingController(text: 'password123');

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text(langProvider.translate('loginTitle'))),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Center(
                child: Icon(LucideIcons.crown, color: AppTheme.goldPrimary, size: 50),
              ),
              const SizedBox(height: 16),
              Center(
                child: Text(
                  langProvider.translate('loginTitle'),
                  style: const TextStyle(
                    color: AppTheme.goldPrimary,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 30),

              // Email
              TextField(
                controller: _emailController,
                style: const TextStyle(color: AppTheme.textLight),
                decoration: InputDecoration(
                  labelText: langProvider.translate('emailLabel'),
                  prefixIcon: const Icon(LucideIcons.mail, color: AppTheme.goldPrimary),
                  filled: true,
                  fillColor: AppTheme.darkCard,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
              const SizedBox(height: 16),

              // Password
              TextField(
                controller: _passwordController,
                obscureText: true,
                style: const TextStyle(color: AppTheme.textLight),
                decoration: InputDecoration(
                  labelText: langProvider.translate('passwordLabel'),
                  prefixIcon: const Icon(LucideIcons.lock, color: AppTheme.goldPrimary),
                  filled: true,
                  fillColor: AppTheme.darkCard,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: authProvider.isLoading
                      ? null
                      : () async {
                          final success = await authProvider.login(
                            _emailController.text,
                            _passwordController.text,
                          );
                          if (success && mounted) {
                            Navigator.of(context).pop();
                          }
                        },
                  child: authProvider.isLoading
                      ? const CircularProgressIndicator(color: AppTheme.darkBg)
                      : Text(langProvider.translate('loginBtn')),
                ),
              ),
              const SizedBox(height: 16),

              Center(
                child: TextButton(
                  child: Text(
                    langProvider.translate('registerTitle'),
                    style: const TextStyle(color: AppTheme.goldPrimary),
                  ),
                  onPressed: () {
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(builder: (_) => const RegisterScreen()),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
