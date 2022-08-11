import 'data/repositories/authentication/authentication_repository.dart';
import 'package:flutter/widgets.dart';
import 'app.dart';
import 'data/repositories/user/user_repository.dart';

void main() {
  runApp(App(
    authenticationRepository: AuthenticationRepository(),
    userRepository: UserRepository(),
  ));
}