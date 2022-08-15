import 'dart:async';

import 'package:fisk/business_logic/blocs/authentication/authentication_bloc.dart';
import 'package:fisk/data/models/login/loginResponse/login_response.dart';
import 'package:fisk/data/models/user/user_model.dart';
import 'package:fisk/data/repositories/user/user_repository.dart';
import 'package:fisk/data/services/auth_service.dart';

enum AuthenticationStatus { unknown, authenticated, unauthenticated }

class AuthenticationRepository {
  final _controller = StreamController<AuthenticationStatus>();
  final _authService = AuthService();
  final _userRepository = UserRepository();

  Stream<AuthenticationStatus> get status async* {
    //await Future<void>.delayed(const Duration(seconds: 1));
    yield AuthenticationStatus.unknown;
    yield* _controller.stream;
  }

  Future<void> logIn({
    required String email,
    required String password,
  }) async {
    final response = await _authService.signin(email: email, password: password);
    if (response.status == 200) {
      //print(response.token);
      _userRepository.setUser(response.token);
      _controller.add(AuthenticationStatus.authenticated);
    }
  }

  void logOut() {
    _controller.add(AuthenticationStatus.unauthenticated);
  }

  void dispose() => _controller.close();
}
