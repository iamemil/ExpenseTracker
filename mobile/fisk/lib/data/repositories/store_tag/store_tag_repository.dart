import 'dart:async';

import '../../models/receipts/receiptResponse/receipt_response.dart';
import '../../models/receipts/receiptsResponse/receipts_response.dart';
import '../../models/storeTag/storeTagResponse/store_tag_response.dart';
import '../../services/store_tag_service.dart';

class StoreTagRepository {
  final StoreTagService _storeTagService = StoreTagService();
  final String _userToken;

  StoreTagRepository(this._userToken);

  Future<StoreTagResponse> getStoreTags(bool withPublicTags){
    return _storeTagService.getStoreTags(withPublicTags,_userToken);
  }

}