import 'package:flutter_test/flutter_test.dart';
import 'package:mobileapp/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const LeCrispyApp());
    expect(find.text('LE CRISPY'), findsWidgets);
  });
}
