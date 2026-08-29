import 'package:flutter/material.dart';
import '../models/category.dart';
import '../models/menu_item.dart';
import '../services/supabase_service.dart';

class MenuProvider extends ChangeNotifier {
  List<Category> _categories = [];
  List<MenuItem> _menuItems = [];
  bool _isLoading = false;

  String _selectedCategory = 'all';
  String _searchQuery = '';
  
  // Healthy Filters
  double _maxCalories = 900;
  double _minProtein = 0;
  double _maxCarbs = 100;
  String _selectedDiet = 'all';

  List<Category> get categories => _categories;
  List<MenuItem> get menuItems => _menuItems;
  bool get isLoading => _isLoading;
  String get selectedCategory => _selectedCategory;
  String get searchQuery => _searchQuery;

  double get maxCalories => _maxCalories;
  double get minProtein => _minProtein;
  double get maxCarbs => _maxCarbs;
  String get selectedDiet => _selectedDiet;

  MenuProvider() {
    loadData();
  }

  Future<void> loadData() async {
    _isLoading = true;
    notifyListeners();

    _categories = await SupabaseService.fetchCategories();
    _menuItems = await SupabaseService.fetchMenuItems();

    _isLoading = false;
    notifyListeners();
  }

  void setCategory(String catId) {
    _selectedCategory = catId;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void setHealthyFilters({double? calories, double? protein, double? carbs, String? diet}) {
    if (calories != null) _maxCalories = calories;
    if (protein != null) _minProtein = protein;
    if (carbs != null) _maxCarbs = carbs;
    if (diet != null) _selectedDiet = diet;
    notifyListeners();
  }

  List<MenuItem> getFilteredMenuItems(String languageCode) {
    return _menuItems.where((item) {
      // Category filter
      if (_selectedCategory != 'all' && item.category != _selectedCategory) {
        return false;
      }
      // Search query filter
      if (_searchQuery.isNotEmpty) {
        final query = _searchQuery.toLowerCase();
        final nameMatches = item.name(languageCode).toLowerCase().contains(query);
        final descMatches = item.description(languageCode).toLowerCase().contains(query);
        if (!nameMatches && !descMatches) return false;
      }
      return true;
    }).toList();
  }

  List<MenuItem> getHealthyMenuItems(String languageCode) {
    return _menuItems.where((item) {
      if (item.calories != null && item.calories! > _maxCalories) return false;
      if (item.protein != null && item.protein! < _minProtein) return false;
      if (item.carbs != null && item.carbs! > _maxCarbs) return false;

      if (_selectedDiet != 'all') {
        if (_selectedDiet == 'High Protein' && (item.protein ?? 0) < 25) return false;
        if (_selectedDiet == 'Keto' && (item.carbs ?? 100) > 20) return false;
        if (_selectedDiet == 'Healthy' && !item.isHealthy) return false;
      }
      return true;
    }).toList();
  }
}
