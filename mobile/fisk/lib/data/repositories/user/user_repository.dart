import 'dart:async';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
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

  Future<String?> getUserToken() async {
    if(_user==null){
      var readData = await _localStorage.read(key: "USER_TOKEN");
      //print("User token:"+readData.toString());
      if(readData!=null){
        if(readData.isNotEmpty){
          return readData;
        }else{
          return "-";
        }
      }
    }else{
      return _user?.token;
    }
    return "-";
  }

  Future<void> setUser(String token) async {
    _user = User(token);
    await _localStorage.write(key: "USER_TOKEN", value: token);
  }
  Future<void> deleteUser() async {
    _user = User.empty;
    await _localStorage.delete(key: "USER_TOKEN");
  }
}