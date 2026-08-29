class MenuItem {
  final String id;
  final String nameFr;
  final String nameAr;
  final String nameEn;
  final String descFr;
  final String descAr;
  final String descEn;
  final double price;
  final String category;
  final String image;
  final int spiceLevel;
  final bool isHealthy;
  final bool isPopular;
  final bool isNew;
  final int preparationTimeMinutes;
  final int? calories;
  final double? protein;
  final double? carbs;
  final double? fat;
  final List<String> dietTags;

  MenuItem({
    required this.id,
    required this.nameFr,
    required this.nameAr,
    required this.nameEn,
    required this.descFr,
    required this.descAr,
    required this.descEn,
    required this.price,
    required this.category,
    required this.image,
    this.spiceLevel = 0,
    this.isHealthy = false,
    this.isPopular = false,
    this.isNew = false,
    this.preparationTimeMinutes = 10,
    this.calories,
    this.protein,
    this.carbs,
    this.fat,
    this.dietTags = const [],
  });

  String name(String languageCode) {
    switch (languageCode) {
      case 'ar':
        return nameAr;
      case 'en':
        return nameEn;
      case 'fr':
      default:
        return nameFr;
    }
  }

  String description(String languageCode) {
    switch (languageCode) {
      case 'ar':
        return descAr;
      case 'en':
        return descEn;
      case 'fr':
      default:
        return descFr;
    }
  }

  factory MenuItem.fromJson(Map<String, dynamic> json) {
    List<String> tags = [];
    if (json['diet_tags'] != null) {
      tags = List<String>.from(json['diet_tags']);
    } else if (json['dietTags'] != null) {
      tags = List<String>.from(json['dietTags']);
    }

    return MenuItem(
      id: json['id'] ?? '',
      nameFr: json['name_fr'] ?? json['nameFr'] ?? '',
      nameAr: json['name_ar'] ?? json['nameAr'] ?? '',
      nameEn: json['name_en'] ?? json['nameEn'] ?? '',
      descFr: json['desc_fr'] ?? json['descFr'] ?? '',
      descAr: json['desc_ar'] ?? json['descAr'] ?? '',
      descEn: json['desc_en'] ?? json['descEn'] ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      category: json['category'] ?? '',
      image: json['image'] ?? '',
      spiceLevel: json['spice_level'] ?? json['spiceLevel'] ?? 0,
      isHealthy: json['is_healthy'] ?? json['isHealthy'] ?? false,
      isPopular: json['is_popular'] ?? json['isPopular'] ?? false,
      isNew: json['is_new'] ?? json['isNew'] ?? false,
      preparationTimeMinutes: json['preparation_time_minutes'] ?? json['preparationTimeMinutes'] ?? 10,
      calories: json['calories'],
      protein: (json['protein'] as num?)?.toDouble(),
      carbs: (json['carbs'] as num?)?.toDouble(),
      fat: (json['fat'] as num?)?.toDouble(),
      dietTags: tags,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name_fr': nameFr,
      'name_ar': nameAr,
      'name_en': nameEn,
      'desc_fr': descFr,
      'desc_ar': descAr,
      'desc_en': descEn,
      'price': price,
      'category': category,
      'image': image,
      'spice_level': spiceLevel,
      'is_healthy': isHealthy,
      'is_popular': isPopular,
      'is_new': isNew,
      'preparation_time_minutes': preparationTimeMinutes,
      'calories': calories,
      'protein': protein,
      'carbs': carbs,
      'fat': fat,
      'diet_tags': dietTags,
    };
  }
}
