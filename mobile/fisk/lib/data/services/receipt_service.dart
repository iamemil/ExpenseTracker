import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:fisk/data/models/receipts/receiptsResponse/receipts_response.dart';
import 'package:fisk/data/models/totalStatistics/totalStatisticsResponse/total_statistics_response.dart';
import 'package:fisk/data/services/BaseApi.dart';

class ReceiptService{

    Future<ReceiptsResponse> getReceipts(int limit,String userToken) async {
        Dio dio = new Dio();
        dio.options.headers["Authorization"] = userToken;
        var params =  {
            "limit": limit,
        };
        var response = await dio.post("${BaseApi.productionURL}/Receipts/GetReceipts",data:jsonEncode(params));
        final responseJson = jsonDecode(response.toString());
        //print(responseJson);
        return ReceiptsResponse.fromJson(responseJson);
    }
}

