class AddressModel {
  final String id;
  final String title;
  final String street;
  final String city;
  final String zipCode;
  final String phone;
  final bool isDefault;

  AddressModel({
    required this.id,
    required this.title,
    required this.street,
    required this.city,
    required this.zipCode,
    required this.phone,
    this.isDefault = false,
  });

  factory AddressModel.fromJson(Map<String, dynamic> json) {
    return AddressModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      street: json['street'] ?? '',
      city: json['city'] ?? '',
      zipCode: json['zip_code'] ?? json['zipCode'] ?? '',
      phone: json['phone'] ?? '',
      isDefault: json['is_default'] ?? json['isDefault'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'street': street,
      'city': city,
      'zip_code': zipCode,
      'phone': phone,
      'is_default': isDefault,
    };
  }
}

class UserProfile {
  final String id;
  final String email;
  final String name;
  final String? phone;
  final String? avatarUrl;
  final String role; // 'customer', 'admin'
  final String preferredLanguage;
  final List<AddressModel> addresses;

  UserProfile({
    required this.id,
    required this.email,
    required this.name,
    this.phone,
    this.avatarUrl,
    this.role = 'customer',
    this.preferredLanguage = 'fr',
    this.addresses = const [],
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    List<AddressModel> parsedAddresses = [];
    if (json['addresses'] != null && json['addresses'] is List) {
      parsedAddresses = (json['addresses'] as List)
          .map((a) => AddressModel.fromJson(a))
          .toList();
    }

    return UserProfile(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      name: json['name'] ?? 'Client Le Crispy',
      phone: json['phone'],
      avatarUrl: json['avatar_url'] ?? json['avatarUrl'],
      role: json['role'] ?? 'customer',
      preferredLanguage: json['preferred_language'] ?? json['preferredLanguage'] ?? 'fr',
      addresses: parsedAddresses,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'phone': phone,
      'avatar_url': avatarUrl,
      'role': role,
      'preferred_language': preferredLanguage,
      'addresses': addresses.map((a) => a.toJson()).toList(),
    };
  }
}
