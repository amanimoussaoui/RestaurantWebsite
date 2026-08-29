import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../config/theme.dart';
import '../providers/cart_provider.dart';
import '../providers/language_provider.dart';
import '../services/ai_chatbot_service.dart';

class AiChatbotWidget extends StatefulWidget {
  const AiChatbotWidget({super.key});

  @override
  State<AiChatbotWidget> createState() => _AiChatbotWidgetState();
}

class _AiChatbotWidgetState extends State<AiChatbotWidget> {
  final List<ChatMessage> _messages = [];
  final TextEditingController _controller = TextEditingController();
  bool _isTyping = false;

  @override
  void initState() {
    super.initState();
    _messages.add(
      ChatMessage(
        text: 'Bonjour ! Je suis votre Concierge IA Le Crispy. Que souhaitez-vous déguster aujourd\'hui ? (Ex: un plat healthy épicé, le meilleur burger, etc.)',
        isUser: false,
      ),
    );
  }

  void _sendMessage() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;

    final langProvider = Provider.of<LanguageProvider>(context, listen: false);
    _controller.clear();

    setState(() {
      _messages.add(ChatMessage(text: text, isUser: true));
      _isTyping = true;
    });

    final aiResponse = await AiChatbotService.processMessage(text, langProvider.currentLanguage);

    if (mounted) {
      setState(() {
        _isTyping = false;
        _messages.add(aiResponse);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);
    final lang = langProvider.currentLanguage;

    return FloatingActionButton(
      backgroundColor: AppTheme.goldPrimary,
      child: const Icon(LucideIcons.bot, color: AppTheme.darkBg, size: 26),
      onPressed: () {
        showModalBottomSheet(
          context: context,
          isScrollControlled: true,
          backgroundColor: Colors.transparent,
          builder: (ctx) => Container(
            height: MediaQuery.of(context).size.height * 0.85,
            decoration: const BoxDecoration(
              color: AppTheme.darkCard,
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
            ),
            child: Column(
              children: [
                // Chat Header
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppTheme.darkBg,
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                    border: Border(bottom: BorderSide(color: AppTheme.goldPrimary.withOpacity(0.3))),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppTheme.goldPrimary.withOpacity(0.2),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(LucideIcons.bot, color: AppTheme.goldPrimary, size: 24),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              langProvider.translate('chatHeaderTitle'),
                              style: const TextStyle(
                                color: AppTheme.goldPrimary,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              langProvider.translate('chatHeaderStatus'),
                              style: const TextStyle(color: Color(0xFF4CAF50), fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(LucideIcons.x, color: AppTheme.textMuted),
                        onPressed: () => Navigator.of(context).pop(),
                      ),
                    ],
                  ),
                ),

                // Chat Messages List
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      final msg = _messages[index];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 16),
                        child: Column(
                          crossAxisAlignment:
                              msg.isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: const EdgeInsets.all(14),
                              decoration: BoxDecoration(
                                color: msg.isUser ? AppTheme.goldPrimary : AppTheme.darkBg,
                                borderRadius: BorderRadius.circular(16),
                                border: msg.isUser
                                    ? null
                                    : Border.all(color: AppTheme.borderGold),
                              ),
                              child: Text(
                                msg.text,
                                style: TextStyle(
                                  color: msg.isUser ? AppTheme.darkBg : AppTheme.textLight,
                                  fontSize: 14,
                                  height: 1.4,
                                ),
                              ),
                            ),
                            // Suggested Items Cards
                            if (msg.suggestedItems != null && msg.suggestedItems!.isNotEmpty)
                              Container(
                                height: 160,
                                margin: const EdgeInsets.only(top: 10),
                                child: ListView.builder(
                                  scrollDirection: Axis.horizontal,
                                  itemCount: msg.suggestedItems!.length,
                                  itemBuilder: (context, i) {
                                    final item = msg.suggestedItems![i];
                                    return Container(
                                      width: 200,
                                      margin: const EdgeInsets.only(right: 10),
                                      padding: const EdgeInsets.all(10),
                                      decoration: BoxDecoration(
                                        color: AppTheme.darkBg,
                                        borderRadius: BorderRadius.circular(12),
                                        border: Border.all(color: AppTheme.goldPrimary),
                                      ),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            item.name(lang),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: const TextStyle(
                                              color: AppTheme.goldBright,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 13,
                                            ),
                                          ),
                                          const SizedBox(height: 4),
                                          Text(
                                            '${item.price.toStringAsFixed(2)} DT',
                                            style: const TextStyle(
                                                color: AppTheme.textLight,
                                                fontSize: 12,
                                                fontWeight: FontWeight.w600),
                                          ),
                                          const Spacer(),
                                          ElevatedButton.icon(
                                            icon: const Icon(LucideIcons.plus, size: 14),
                                            label: Text(
                                              langProvider.translate('addToCart'),
                                              style: const TextStyle(fontSize: 11),
                                            ),
                                            style: ElevatedButton.styleFrom(
                                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                            ),
                                            onPressed: () {
                                              cartProvider.addToCart(item);
                                              ScaffoldMessenger.of(context).showSnackBar(
                                                SnackBar(
                                                  content: Text('${item.name(lang)} ajouté !'),
                                                  backgroundColor: AppTheme.goldPrimary,
                                                ),
                                              );
                                            },
                                          ),
                                        ],
                                      ),
                                    );
                                  },
                                ),
                              ),
                          ],
                        ),
                      );
                    },
                  ),
                ),

                if (_isTyping)
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: CircularProgressIndicator(color: AppTheme.goldPrimary),
                  ),

                // Input Bar
                Container(
                  padding: EdgeInsets.only(
                    left: 16,
                    right: 16,
                    top: 12,
                    bottom: MediaQuery.of(context).viewInsets.bottom + 12,
                  ),
                  decoration: BoxDecoration(
                    color: AppTheme.darkBg,
                    border: Border(top: BorderSide(color: AppTheme.borderGold)),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _controller,
                          style: const TextStyle(color: AppTheme.textLight),
                          decoration: InputDecoration(
                            hintText: langProvider.translate('chatPlaceholder'),
                            hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                            border: InputBorder.none,
                          ),
                          onSubmitted: (_) => _sendMessage(),
                        ),
                      ),
                      IconButton(
                        icon: const Icon(LucideIcons.send, color: AppTheme.goldPrimary),
                        onPressed: _sendMessage,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
