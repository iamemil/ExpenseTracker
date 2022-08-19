import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:fisk/data/models/storeTag/storeTagResponse/store_tag_response.dart';
import 'package:fisk/data/services/BaseApi.dart';

class StoreTagService{

    Future<StoreTagResponse> getStoreTags(bool withPublicTags,String userToken) async {
        Dio dio = Dio();
        dio.options.headers["Authorization"] = userToken;
        var params =  {
            "withPublicTags": withPublicTags,
        };
        var response = await dio.post("${BaseApi.productionURL}/StoreTags/GetStoreTags",data:jsonEncode(params));
        final responseJson = jsonDecode(response.toString());
        //print(responseJson);
        return StoreTagResponse.fromJson(responseJson);
    }
}

