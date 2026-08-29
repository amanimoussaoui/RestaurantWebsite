class Category {
  final String id;
  final String nameFr;
  final String nameAr;
  final String nameEn;
  final String icon;

  Category({
    required this.id,
    required this.nameFr,
    required this.nameAr,
    required this.nameEn,
    required this.icon,
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

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'] ?? '',
      nameFr: json['name_fr'] ?? json['nameFr'] ?? '',
      nameAr: json['name_ar'] ?? json['nameAr'] ?? '',
      nameEn: json['name_en'] ?? json['nameEn'] ?? '',
      icon: json['icon'] ?? 'Utensils',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name_fr': nameFr,
      'name_ar': nameAr,
      'name_en': nameEn,
      'icon': icon,
    };
  }
}
