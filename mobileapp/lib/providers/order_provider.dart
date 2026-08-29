import 'package:flutter/material.dart';
import '../models/order.dart';
import '../services/supabase_service.dart';

class OrderProvider extends ChangeNotifier {
  List<OrderModel> _orders = [];
  bool _isLoading = false;

  List<OrderModel> get orders => _orders;
  bool get isLoading => _isLoading;

  OrderProvider() {
    _orders = List.from(SupabaseService.mockOrders);
  }

  Future<bool> createOrder(OrderModel newOrder) async {
    _isLoading = true;
    notifyListeners();

    final success = await SupabaseService.createOrder(newOrder);
    if (success) {
      _orders.insert(0, newOrder);
    }

    _isLoading = false;
    notifyListeners();
    return success;
  }

  void updateOrderStatus(String orderId, String newStatus) {
    final index = _orders.indexWhere((o) => o.id == orderId);
    if (index >= 0) {
      final old = _orders[index];
      _orders[index] = OrderModel(
        id: old.id,
        userEmail: old.userEmail,
        userName: old.userName,
        userPhone: old.userPhone,
        serviceMode: old.serviceMode,
        tableNumber: old.tableNumber,
        deliveryAddress: old.deliveryAddress,
        items: old.items,
        subtotal: old.subtotal,
        deliveryFee: old.deliveryFee,
        total: old.total,
        status: newStatus,
        paymentMethod: old.paymentMethod,
        paymentStatus: old.paymentStatus,
        createdAt: old.createdAt,
      );
      notifyListeners();
    }
  }
}
