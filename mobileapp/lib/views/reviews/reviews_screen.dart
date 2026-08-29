import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../models/review.dart';
import '../../providers/language_provider.dart';
import '../../services/supabase_service.dart';
import '../../widgets/ai_chatbot_widget.dart';
import '../../widgets/luxury_header.dart';

class ReviewsScreen extends StatefulWidget {
  const ReviewsScreen({super.key});

  @override
  State<ReviewsScreen> createState() => _ReviewsScreenState();
}

class _ReviewsScreenState extends State<ReviewsScreen> {
  List<ReviewModel> _reviews = [];
  bool _isLoading = true;

  final _nameController = TextEditingController();
  final _commentController = TextEditingController();
  int _selectedRating = 5;

  @override
  void initState() {
    super.initState();
    _loadReviews();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _commentController.dispose();
    super.dispose();
  }

  void _loadReviews() async {
    final list = await SupabaseService.fetchReviews();
    if (mounted) {
      setState(() {
        _reviews = list;
        _isLoading = false;
      });
    }
  }

  void _submitReview() async {
    final name = _nameController.text.trim();
    final comment = _commentController.text.trim();
    if (name.isEmpty || comment.isEmpty) return;

    final newRev = ReviewModel(
      id: 'rev-${DateTime.now().millisecondsSinceEpoch}',
      userName: name,
      rating: _selectedRating,
      comment: comment,
      createdAt: DateTime.now(),
    );

    await SupabaseService.submitReview(newRev);

    _nameController.clear();
    _commentController.clear();

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Merci pour votre avis !'),
        backgroundColor: AppTheme.goldPrimary,
      ),
    );

    _loadReviews();
  }

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);

    return Scaffold(
      appBar: LuxuryHeader(title: langProvider.translate('reviewsTitle')),
      floatingActionButton: const AiChatbotWidget(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Score Header Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppTheme.darkCard,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.goldPrimary),
                ),
                child: Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          '4.9 / 5.0',
                          style: TextStyle(
                            color: AppTheme.goldBright,
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Row(
                          children: List.generate(
                            5,
                            (index) => const Icon(LucideIcons.star, color: AppTheme.goldBright, size: 18),
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Basé sur +128 avis vérifiés',
                          style: TextStyle(color: AppTheme.textMuted, fontSize: 12),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Add Review Form
              Text(
                langProvider.translate('addReview'),
                style: const TextStyle(color: AppTheme.goldPrimary, fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.darkCard,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppTheme.borderGold),
                ),
                child: Column(
                  children: [
                    TextField(
                      controller: _nameController,
                      style: const TextStyle(color: AppTheme.textLight),
                      decoration: InputDecoration(
                        hintText: 'Votre Nom / Pseudo',
                        hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                        filled: true,
                        fillColor: AppTheme.darkBg,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Rating Star Picker
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(5, (index) {
                        final star = index + 1;
                        return IconButton(
                          icon: Icon(
                            LucideIcons.star,
                            color: star <= _selectedRating ? AppTheme.goldBright : AppTheme.textMuted,
                            size: 28,
                          ),
                          onPressed: () => setState(() => _selectedRating = star),
                        );
                      }),
                    ),
                    const SizedBox(height: 10),
                    TextField(
                      controller: _commentController,
                      maxLines: 3,
                      style: const TextStyle(color: AppTheme.textLight),
                      decoration: InputDecoration(
                        hintText: 'Votre expérience chez Le Crispy...',
                        hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                        filled: true,
                        fillColor: AppTheme.darkBg,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: _submitReview,
                        child: const Text('Publier l\'avis'),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Reviews Feed
              Text(
                'Avis récents des gastronomes',
                style: const TextStyle(color: AppTheme.textLight, fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 12),

              if (_isLoading)
                const Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary))
              else
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: _reviews.length,
                  itemBuilder: (context, index) {
                    final rev = _reviews[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: Padding(
                        padding: const EdgeInsets.all(14),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  rev.userName,
                                  style: const TextStyle(
                                    color: AppTheme.goldPrimary,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                                Row(
                                  children: List.generate(
                                    rev.rating,
                                    (_) => const Icon(LucideIcons.star, color: AppTheme.goldBright, size: 14),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              rev.comment,
                              style: const TextStyle(color: AppTheme.textLight, fontSize: 13, height: 1.3),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }
}
