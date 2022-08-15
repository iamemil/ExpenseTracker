import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:fisk/data/models/login/loginResponse/login_response.dart';
import 'package:fisk/data/services/BaseApi.dart';

class AuthService{
    Future<LoginResponse> signin({required String email, required String password}) async {
        var params =  {
            "emailAddress": email,
            "Password": password,
        };
        var response = await Dio().post("${BaseApi.productionURL}/Account/SignIn",data:jsonEncode(params));
        //print(response);
        final responseJson = jsonDecode(response.toString());
        //print(LoginResponse.fromJson(responseJson).token);
        return LoginResponse.fromJson(responseJson);

    }
}

