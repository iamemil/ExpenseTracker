import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:fisk/data/models/receipts/receiptResponse/receipt_response.dart';
import 'package:fisk/data/models/receipts/receiptsResponse/receipts_response.dart';
import 'package:fisk/data/models/totalStatistics/totalStatisticsResponse/total_statistics_response.dart';
import 'package:fisk/data/services/BaseApi.dart';

class ReceiptService{

    Future<ReceiptResponse> getReceipt(String originalReceiptId,String userToken) async {
        Dio dio = Dio();
        dio.options.headers["Authorization"] = userToken;
        var params =  {
            "originalReceiptId": originalReceiptId,
        };
        var response = await dio.post("${BaseApi.productionURL}/Receipts/GetReceipt",data:jsonEncode(params));
        final responseJson = jsonDecode(response.toString());
        //print(responseJson);
        return ReceiptResponse.fromJson(responseJson);
    }

    Future<ReceiptsResponse> getReceipts(int limit,String userToken) async {
        Dio dio = Dio();
        dio.options.headers["Authorization"] = userToken;
        var params =  {
            "limit": limit,
        };
        var response = await dio.post("${BaseApi.productionURL}/Receipts/GetReceipts",data:jsonEncode(params));
        final responseJson = jsonDecode(response.toString());
        //print(responseJson);
        return ReceiptsResponse.fromJson(responseJson);
    }
    Future<ReceiptsResponse> getAllReceipts(String userToken) async {
        Dio dio = Dio();
        dio.options.headers["Authorization"] = userToken;
        var response = await dio.post("${BaseApi.productionURL}/Receipts/GetReceipts");
        final responseJson = jsonDecode(response.toString());
        //print(responseJson);
        return ReceiptsResponse.fromJson(responseJson);
    }
}

