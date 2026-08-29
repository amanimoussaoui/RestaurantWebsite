import 'menu_item.dart';

class CartItem {
  final MenuItem item;
  int quantity;
  String specialInstructions;

  CartItem({
    required this.item,
    this.quantity = 1,
    this.specialInstructions = '',
  });

  double get totalPrice => item.price * quantity;

  Map<String, dynamic> toJson() {
    return {
      'item': item.toJson(),
      'quantity': quantity,
      'specialInstructions': specialInstructions,
    };
  }

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      item: MenuItem.fromJson(json['item']),
      quantity: json['quantity'] ?? 1,
      specialInstructions: json['specialInstructions'] ?? '',
    );
  }
}

class OrderModel {
  final String id;
  final String userEmail;
  final String userName;
  final String userPhone;
  final String serviceMode; // 'sur_place', 'a_emporter', 'livraison'
  final String? tableNumber;
  final Map<String, dynamic>? deliveryAddress;
  final List<CartItem> items;
  final double subtotal;
  final double deliveryFee;
  final double total;
  final String status; // 'pending', 'preparing', 'ready', 'delivered', 'cancelled'
  final String paymentMethod; // 'cash', 'stripe'
  final String paymentStatus;
  final DateTime createdAt;

  OrderModel({
    required this.id,
    required this.userEmail,
    required this.userName,
    required this.userPhone,
    required this.serviceMode,
    this.tableNumber,
    this.deliveryAddress,
    required this.items,
    required this.subtotal,
    required this.deliveryFee,
    required this.total,
    this.status = 'pending',
    this.paymentMethod = 'cash',
    this.paymentStatus = 'paid',
    required this.createdAt,
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) {
    List<CartItem> parsedItems = [];
    if (json['items'] != null) {
      if (json['items'] is List) {
        parsedItems = (json['items'] as List)
            .map((item) => CartItem.fromJson(item))
            .toList();
      }
    }

    return OrderModel(
      id: json['id'] ?? '',
      userEmail: json['user_email'] ?? json['userEmail'] ?? '',
      userName: json['user_name'] ?? json['userName'] ?? '',
      userPhone: json['user_phone'] ?? json['userPhone'] ?? '',
      serviceMode: json['service_mode'] ?? json['serviceMode'] ?? 'sur_place',
      tableNumber: json['table_number'] ?? json['tableNumber'],
      deliveryAddress: json['delivery_address'] ?? json['deliveryAddress'],
      items: parsedItems,
      subtotal: (json['subtotal'] as num?)?.toDouble() ?? 0.0,
      deliveryFee: (json['delivery_fee'] as num?)?.toDouble() ?? 0.0,
      total: (json['total'] as num?)?.toDouble() ?? 0.0,
      status: json['status'] ?? 'pending',
      paymentMethod: json['payment_method'] ?? json['paymentMethod'] ?? 'cash',
      paymentStatus: json['payment_status'] ?? json['paymentStatus'] ?? 'paid',
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'])
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_email': userEmail,
      'user_name': userName,
      'user_phone': userPhone,
      'service_mode': serviceMode,
      'table_number': tableNumber,
      'delivery_address': deliveryAddress,
      'items': items.map((i) => i.toJson()).toList(),
      'subtotal': subtotal,
      'delivery_fee': deliveryFee,
      'total': total,
      'status': status,
      'payment_method': paymentMethod,
      'payment_status': paymentStatus,
      'created_at': createdAt.toIso8601String(),
    };
  }
}
