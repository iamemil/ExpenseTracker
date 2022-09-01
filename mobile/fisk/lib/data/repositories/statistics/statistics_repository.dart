import 'dart:async';

import 'package:fisk/data/repositories/user/user_repository.dart';
import 'package:fisk/data/services/statistics_service.dart';
import '../../models/totalStatistics/totalStatisticsResponse/total_statistics_response.dart';

class StatisticsRepository {
  final UserRepository _userRepository = UserRepository();
  final StatisticsService _statisticsService = StatisticsService();

  Future<TotalStatisticsResponse> getTotalStatistics() async {
    String? userToken = await _userRepository.getUserToken();
    return _statisticsService.getTotalStatistics(userToken ?? "-");

  }

}