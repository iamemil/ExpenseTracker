import 'dart:async';

import 'package:uuid/uuid.dart';
import '../../models/user/user_model.dart';

class UserRepository {
  User? _user;

  Future<User?> getUser() async {
    if (_user != null) return _user;
    return Future.delayed(
      const Duration(milliseconds: 300),
          () => _user = User(const Uuid().v4()),
    );
  }
}