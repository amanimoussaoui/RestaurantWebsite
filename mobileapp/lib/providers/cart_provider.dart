import 'package:flutter/material.dart';
import '../models/menu_item.dart';
import '../models/order.dart';
import '../models/user_profile.dart';

class CartProvider extends ChangeNotifier {
  final List<CartItem> _items = [];
  String _serviceMode = 'sur_place'; // 'sur_place', 'a_emporter', 'livraison'
  String _tableNumber = '';
  AddressModel? _deliveryAddress;
  String _paymentMethod = 'cash'; // 'cash', 'stripe'

  List<CartItem> get items => _items;
  String get serviceMode => _serviceMode;
  String get tableNumber => _tableNumber;
  AddressModel? get deliveryAddress => _deliveryAddress;
  String get paymentMethod => _paymentMethod;

  int get totalItemCount => _items.fold(0, (sum, i) => sum + i.quantity);

  double get subtotal => _items.fold(0.0, (sum, i) => sum + i.totalPrice);

  double get deliveryFee => _serviceMode == 'livraison' ? 3.50 : 0.0;

  double get total => subtotal + deliveryFee;

  void setServiceMode(String mode) {
    _serviceMode = mode;
    notifyListeners();
  }

  void setTableNumber(String table) {
    _tableNumber = table;
    notifyListeners();
  }

  void setDeliveryAddress(AddressModel address) {
    _deliveryAddress = address;
    notifyListeners();
  }

  void setPaymentMethod(String method) {
    _paymentMethod = method;
    notifyListeners();
  }

  void addToCart(MenuItem item, {int quantity = 1, String instructions = ''}) {
    final existingIndex = _items.indexWhere((i) => i.item.id == item.id);
    if (existingIndex >= 0) {
      _items[existingIndex].quantity += quantity;
      if (instructions.isNotEmpty) {
        _items[existingIndex].specialInstructions = instructions;
      }
    } else {
      _items.add(CartItem(
        item: item,
        quantity: quantity,
        specialInstructions: instructions,
      ));
    }
    notifyListeners();
  }

  void updateQuantity(String itemId, int delta) {
    final index = _items.indexWhere((i) => i.item.id == itemId);
    if (index >= 0) {
      _items[index].quantity += delta;
      if (_items[index].quantity <= 0) {
        _items.removeAt(index);
      }
      notifyListeners();
    }
  }

  void removeFromCart(String itemId) {
    _items.removeWhere((i) => i.item.id == itemId);
    notifyListeners();
  }

  void clearCart() {
    _items.clear();
    _tableNumber = '';
    notifyListeners();
  }
}
