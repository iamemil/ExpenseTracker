import 'package:flutter/material.dart';
import '../utils/constants/constants.dart';
import 'package:fisk/presentation/pages/login/login_page.dart';
import 'package:fisk/presentation/pages/home/home_page.dart';

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
      default:
        return MaterialPageRoute(
          builder: (_) => const LoginPage(),
        );
    }
  }
}