import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../config/theme.dart';
import '../../providers/language_provider.dart';
import '../../providers/menu_provider.dart';
import '../../widgets/ai_chatbot_widget.dart';
import '../../widgets/luxury_header.dart';
import '../../widgets/product_card.dart';

class MenuScreen extends StatelessWidget {
  const MenuScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final menuProvider = Provider.of<MenuProvider>(context);
    final lang = langProvider.currentLanguage;

    final filteredItems = menuProvider.getFilteredMenuItems(lang);

    return Scaffold(
      appBar: LuxuryHeader(title: langProvider.translate('menuTitle')),
      floatingActionButton: const AiChatbotWidget(),
      body: Column(
        children: [
          // Header Search Bar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              style: const TextStyle(color: AppTheme.textLight),
              decoration: InputDecoration(
                hintText: langProvider.translate('searchPlaceholder'),
                hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                prefixIcon: const Icon(LucideIcons.search, color: AppTheme.goldPrimary, size: 20),
                filled: true,
                fillColor: AppTheme.darkCard,
                contentPadding: const EdgeInsets.symmetric(vertical: 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: AppTheme.borderGold),
                ),
              ),
              onChanged: (val) => menuProvider.setSearchQuery(val),
            ),
          ),

          // Categories Filter Chips Horizontal Scroll
          SizedBox(
            height: 40,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _categoryChip(
                  context,
                  id: 'all',
                  label: langProvider.translate('allCategories'),
                ),
                ...menuProvider.categories.map((c) => _categoryChip(
                      context,
                      id: c.id,
                      label: c.name(lang),
                    )),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Menu Items Grid
          Expanded(
            child: menuProvider.isLoading
                ? const Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary))
                : filteredItems.isEmpty
                    ? Center(
                        child: Text(
                          'Aucun plat trouvé dans cette catégorie.',
                          style: TextStyle(color: AppTheme.textMuted),
                        ),
                      )
                    : GridView.builder(
                        padding: const EdgeInsets.all(16),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.68,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                        ),
                        itemCount: filteredItems.length,
                        itemBuilder: (context, index) {
                          return ProductCard(item: filteredItems[index]);
                        },
                      ),
          ),
        ],
      ),
    );
  }

  Widget _categoryChip(BuildContext context, {required String id, required String label}) {
    final menuProvider = Provider.of<MenuProvider>(context);
    final isSelected = menuProvider.selectedCategory == id;

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        selected: isSelected,
        label: Text(
          label,
          style: TextStyle(
            color: isSelected ? AppTheme.darkBg : AppTheme.textLight,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            fontSize: 12,
          ),
        ),
        backgroundColor: AppTheme.darkCard,
        selectedColor: AppTheme.goldPrimary,
        checkmarkColor: AppTheme.darkBg,
        side: const BorderSide(color: AppTheme.goldPrimary),
        onSelected: (_) => menuProvider.setCategory(id),
      ),
    );
  }
}
