class ReviewModel {
  final String id;
  final String userName;
  final String? userAvatar;
  final int rating;
  final String comment;
  final bool isApproved;
  final String? reply;
  final DateTime createdAt;

  ReviewModel({
    required this.id,
    required this.userName,
    this.userAvatar,
    required this.rating,
    required this.comment,
    this.isApproved = true,
    this.reply,
    required this.createdAt,
  });

  factory ReviewModel.fromJson(Map<String, dynamic> json) {
    return ReviewModel(
      id: json['id'] ?? '',
      userName: json['user_name'] ?? json['userName'] ?? 'Client Le Crispy',
      userAvatar: json['user_avatar'] ?? json['userAvatar'],
      rating: json['rating'] ?? 5,
      comment: json['comment'] ?? '',
      isApproved: json['is_approved'] ?? json['isApproved'] ?? true,
      reply: json['reply'],
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'])
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_name': userName,
      'user_avatar': userAvatar,
      'rating': rating,
      'comment': comment,
      'is_approved': isApproved,
      'reply': reply,
      'created_at': createdAt.toIso8601String(),
    };
  }
}
