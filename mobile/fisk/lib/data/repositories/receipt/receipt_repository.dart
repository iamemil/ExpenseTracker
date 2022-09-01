import 'dart:async';
import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:fisk/data/services/receipt_service.dart';
import '../../models/receipts/receiptResponse/receipt_response.dart';
import '../../models/receipts/receiptsResponse/receipts_response.dart';
import '../user/user_repository.dart';

class ReceiptRepository {
  final UserRepository _userRepository = UserRepository();
  final ReceiptService _receiptService = ReceiptService();


  Future<ReceiptResponse> getReceipt(String originalReceiptId) async {
    String? userToken = await _userRepository.getUserToken();
    return _receiptService.getReceipt(originalReceiptId,userToken ?? "-");
  }

  Future<ReceiptsResponse> getReceipts(int limit) async {
    String? userToken = await _userRepository.getUserToken();
    return _receiptService.getReceipts(limit,userToken??"-");
  }
  Future<ReceiptsResponse> getAllReceipts() async {
    String? userToken = await _userRepository.getUserToken();
    return _receiptService.getAllReceipts(userToken??"-");
  }

  Future<Response> update(String Id, List<ReceiptItem> receiptItems, int tagId, String totalSum) async {
    String? userToken = await _userRepository.getUserToken();
    return _receiptService.updateReceipt(userToken??"-",Id,jsonEncode(receiptItems),tagId,totalSum);
  }
}