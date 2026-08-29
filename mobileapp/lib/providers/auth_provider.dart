import 'package:flutter/material.dart';
import '../models/user_profile.dart';

class AuthProvider extends ChangeNotifier {
  UserProfile? _currentUser;
  bool _isLoading = false;

  UserProfile? get currentUser => _currentUser;
  bool get isAuthenticated => _currentUser != null;
  bool get isAdmin => _currentUser?.role == 'admin';
  bool get isLoading => _isLoading;

  AuthProvider() {
    // Default demo user profile
    _currentUser = UserProfile(
      id: 'demo-user-1',
      email: 'client@lecrispy.com',
      name: 'Amine K.',
      phone: '06 12 34 56 78',
      role: 'customer',
      addresses: [
        AddressModel(
          id: 'addr-1',
          title: 'Domicile',
          street: '15 Avenue des Champs Élysées',
          city: 'Paris',
          zipCode: '75008',
          phone: '06 12 34 56 78',
          isDefault: true,
        ),
      ],
    );
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 800));

    _currentUser = UserProfile(
      id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
      email: email,
      name: email.split('@').first,
      phone: '06 99 88 77 66',
      role: email.contains('admin') ? 'admin' : 'customer',
      addresses: [
        AddressModel(
          id: 'addr-1',
          title: 'Domicile',
          street: '1 Rue de Paris',
          city: 'Dormans',
          zipCode: '51700',
          phone: '06 99 88 77 66',
          isDefault: true,
        ),
      ],
    );

    _isLoading = false;
    notifyListeners();
    return true;
  }

  Future<bool> register(String name, String email, String phone, String password) async {
    _isLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 800));

    _currentUser = UserProfile(
      id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
      email: email,
      name: name,
      phone: phone,
      role: 'customer',
    );

    _isLoading = false;
    notifyListeners();
    return true;
  }

  void logout() {
    _currentUser = null;
    notifyListeners();
  }

  void addAddress(AddressModel address) {
    if (_currentUser != null) {
      final updatedAddresses = List<AddressModel>.from(_currentUser!.addresses)..add(address);
      _currentUser = UserProfile(
        id: _currentUser!.id,
        email: _currentUser!.email,
        name: _currentUser!.name,
        phone: _currentUser!.phone,
        avatarUrl: _currentUser!.avatarUrl,
        role: _currentUser!.role,
        preferredLanguage: _currentUser!.preferredLanguage,
        addresses: updatedAddresses,
      );
      notifyListeners();
    }
  }
}
