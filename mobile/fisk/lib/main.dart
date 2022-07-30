import 'package:flutter/material.dart';
import 'package:fisk/utils/constants/constants.dart';
import 'package:fisk/presentation/route_generator.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fisk',
      theme: ThemeData(
        primarySwatch: Colors.teal,
      ),
      initialRoute: Routes.login,
      onGenerateRoute: RouteGenerator.onGenerateRoute,
    );
  }
}