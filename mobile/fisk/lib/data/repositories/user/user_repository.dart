import 'dart:async';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:uuid/uuid.dart';
import '../../models/user/user_model.dart';

class UserRepository {
  User? _user;
  final _localStorage = const FlutterSecureStorage();

  Future<User?> getUser() async {
    if(_user==null){
      var readData = await _localStorage.read(key: "USER_TOKEN");
      //print("User token:"+readData.toString());
      if(readData!=null){
        if(readData.isNotEmpty){
          _user = User(readData);
          return _user;
        }else{
          return null;
        }
      }
    }else{
      return _user;
    }
    return null;
  }

  Future<void> setUser(String token) async {
    _user = User(token);
    await _localStorage.write(key: "USER_TOKEN", value: token);
  }
  Future<void> deleteUser() async {
    await _localStorage.delete(key: "USER_TOKEN");
  }
}