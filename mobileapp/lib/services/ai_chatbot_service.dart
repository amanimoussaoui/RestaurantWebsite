import '../models/menu_item.dart';
import '../services/supabase_service.dart';

class ChatMessage {
  final String text;
  final bool isUser;
  final List<MenuItem>? suggestedItems;

  ChatMessage({
    required this.text,
    required this.isUser,
    this.suggestedItems,
  });
}

class AiChatbotService {
  static Future<ChatMessage> processMessage(String prompt, String lang) async {
    final lower = prompt.toLowerCase();
    final items = await SupabaseService.fetchMenuItems();

    List<MenuItem> recommendations = [];
    String responseText = '';

    if (lower.contains('healthy') || lower.contains('sport') || lower.contains('protéine') || lower.contains('بروتين') || lower.contains('صحي')) {
      recommendations = items.where((i) => i.isHealthy || (i.protein ?? 0) >= 30).toList();
      responseText = lang == 'ar'
          ? 'إليك أطباقنا الصحية والغنية بالبروتين الممتازة للرياضة والياقة البدنية:'
          : lang == 'en'
              ? 'Here are our healthy and high-protein dishes perfect for fitness & sports:'
              : 'Voici nos plats healthy et riches en protéines, parfaits pour votre diète sportive :';
    } else if (lower.contains('épicé') || lower.contains('piquant') || lower.contains('حار') || lower.contains('spicy')) {
      recommendations = items.where((i) => i.spiceLevel > 0).toList();
      responseText = lang == 'ar'
          ? 'إذا كنت تحب النكهات الحارة والقوية، أنصحك بشدة بهذه الأطباق:'
          : lang == 'en'
              ? 'If you love bold spicy flavors, I highly recommend these items:'
              : 'Si vous aimez les saveurs relevées et épicées, je vous conseille vivement :';
    } else if (lower.contains('burger') || lower.contains('برجر')) {
      recommendations = items.where((i) => i.category == 'burgers').toList();
      responseText = lang == 'ar'
          ? 'أفضل برجر حرفي بمكونات فاخرة ولحم معتق:'
          : lang == 'en'
              ? 'Our top artisan burgers made with premium 28-day aged beef:'
              : 'Nos burgers signature composés de boeuf Wagyu et buns artisanaux :';
    } else {
      recommendations = items.where((i) => i.isPopular).take(3).toList();
      responseText = lang == 'ar'
          ? 'بناءً على طلبك، إليك أفضل الأطباق والأكثر مبيعاً في مطعم كريسبي:'
          : lang == 'en'
              ? 'Based on your request, here are Chef Le Crispy\'s top recommendations:'
              : 'Selon votre envie, voici les meilleures recommandations du Chef Le Crispy :';
    }

    if (recommendations.isEmpty) {
      recommendations = items.take(2).toList();
    }

    return ChatMessage(
      text: responseText,
      isUser: false,
      suggestedItems: recommendations,
    );
  }
}
