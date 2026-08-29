import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../providers/language_provider.dart';
import '../../providers/menu_provider.dart';
import '../../widgets/ai_chatbot_widget.dart';
import '../../widgets/luxury_header.dart';
import '../../widgets/nutrition_fact_card.dart';

class HealthyScreen extends StatelessWidget {
  const HealthyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final menuProvider = Provider.of<MenuProvider>(context);
    final lang = langProvider.currentLanguage;

    final healthyItems = menuProvider.getHealthyMenuItems(lang);

    return Scaffold(
      appBar: LuxuryHeader(title: langProvider.translate('healthyTitle')),
      floatingActionButton: const AiChatbotWidget(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Banner Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppTheme.darkCard, AppTheme.darkSurface],
                  ),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.goldPrimary),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(LucideIcons.heartPulse, color: AppTheme.goldPrimary, size: 24),
                        const SizedBox(width: 8),
                        Text(
                          langProvider.translate('healthyTitle'),
                          style: const TextStyle(
                            color: AppTheme.goldPrimary,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      langProvider.translate('healthySubtitle'),
                      style: const TextStyle(color: AppTheme.textMuted, fontSize: 13, height: 1.3),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Macro Filters Panel
              Text(
                'Filtres Macronutriments',
                style: const TextStyle(color: AppTheme.goldBright, fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 10),

              // Calories Slider
              _macroSlider(
                label: 'Calories max : ${menuProvider.maxCalories.round()} kcal',
                value: menuProvider.maxCalories,
                min: 300,
                max: 1000,
                onChanged: (val) => menuProvider.setHealthyFilters(calories: val),
              ),

              // Protein Slider
              _macroSlider(
                label: 'Protéines min : ${menuProvider.minProtein.round()} g',
                value: menuProvider.minProtein,
                min: 0,
                max: 60,
                onChanged: (val) => menuProvider.setHealthyFilters(protein: val),
              ),

              const SizedBox(height: 16),

              // Diet Filter Chips
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _dietChip(context, 'all', langProvider.translate('allDiets')),
                    _dietChip(context, 'High Protein', langProvider.translate('dietHighProtein')),
                    _dietChip(context, 'Keto', langProvider.translate('dietKeto')),
                    _dietChip(context, 'Healthy', 'Super Healthy'),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Healthy Product Cards List
              Text(
                'Plats Diététiques (${healthyItems.length})',
                style: const TextStyle(color: AppTheme.textLight, fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 12),

              if (healthyItems.isEmpty)
                const Center(
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: 40),
                    child: Text('Aucun plat ne correspond à vos filtres nutritionnels.'),
                  ),
                )
              else
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: healthyItems.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: NutritionFactCard(item: healthyItems[index]),
                    );
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _macroSlider({
    required String label,
    required double value,
    required double min,
    required double max,
    required ValueChanged<double> onChanged,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: AppTheme.textLight, fontSize: 13)),
        Slider(
          value: value,
          min: min,
          max: max,
          activeColor: AppTheme.goldPrimary,
          inactiveColor: AppTheme.darkBg,
          onChanged: onChanged,
        ),
      ],
    );
  }

  Widget _dietChip(BuildContext context, String diet, String label) {
    final menuProvider = Provider.of<MenuProvider>(context);
    final isSelected = menuProvider.selectedDiet == diet;

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        selected: isSelected,
        label: Text(
          label,
          style: TextStyle(
            color: isSelected ? AppTheme.darkBg : AppTheme.textLight,
            fontSize: 12,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
        backgroundColor: AppTheme.darkCard,
        selectedColor: AppTheme.goldPrimary,
        onSelected: (_) => menuProvider.setHealthyFilters(diet: diet),
      ),
    );
  }
}
