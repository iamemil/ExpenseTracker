import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:fisk/data/models/totalStatistics/totalStatisticsResponse/total_statistics_response.dart';
import 'package:fisk/data/services/BaseApi.dart';

class StatisticsService{

    Future<TotalStatisticsResponse> getTotalStatistics(String userToken) async {
        Dio dio = new Dio();
        dio.options.headers["Authorization"] = userToken;
        var response = await dio.post("${BaseApi.productionURL}/Statistics/GetTotalStatistics");
        final responseJson = jsonDecode(response.toString());
        //print(responseJson);
        return TotalStatisticsResponse.fromJson(responseJson);
    }
}

