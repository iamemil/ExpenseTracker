import 'dart:async';

import 'package:fisk/data/services/receipt_service.dart';
import '../../models/receipts/receiptResponse/receipt_response.dart';
import '../../models/receipts/receiptsResponse/receipts_response.dart';

class ReceiptRepository {
  final ReceiptService _receiptService = ReceiptService();
  final String _userToken;

  ReceiptRepository(this._userToken);

  Future<ReceiptResponse> getReceipt(String originalReceiptId){
    return _receiptService.getReceipt(originalReceiptId,_userToken);
  }

  Future<ReceiptsResponse> getReceipts(int limit){
    return _receiptService.getReceipts(limit,_userToken);
  }
  Future<ReceiptsResponse> getAllReceipts(){
    return _receiptService.getAllReceipts(_userToken);
  }
}