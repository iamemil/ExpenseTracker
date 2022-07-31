import 'package:flutter/material.dart';
import '../utils/constants/constants.dart';
import 'package:fisk/presentation/pages/login/login_page.dart';
import 'package:fisk/presentation/pages/home/home_page.dart';
import 'package:fisk/presentation/pages/receipts/receipts_page.dart';
import 'package:fisk/presentation/pages/receipt_details/receipt_details_page.dart';
class RouteGenerator {
  static Route<dynamic> onGenerateRoute(RouteSettings routeSettings) {
    switch (routeSettings.name) {
      case Routes.login:
        return MaterialPageRoute(
          builder: (_) => const LoginPage(),
        );
      case Routes.home:
        return MaterialPageRoute(
          builder: (_) => const HomePage(),
        );
      case Routes.receipts:
        return MaterialPageRoute(
          builder: (_) => const ReceiptsPage(),
        );
      case Routes.receiptDetails:
        return MaterialPageRoute(
          builder: (_) => const ReceiptDetailsPage(),
        );
      default:
        return MaterialPageRoute(
          builder: (_) => const LoginPage(),
        );
    }
  }
}