import 'dart:async';

import '../../models/receipts/receiptResponse/receipt_response.dart';
import '../../models/receipts/receiptsResponse/receipts_response.dart';
import '../../models/storeTag/storeTagResponse/store_tag_response.dart';
import '../../services/store_tag_service.dart';
import '../user/user_repository.dart';

class StoreTagRepository {
  final UserRepository _userRepository = UserRepository();
  final StoreTagService _storeTagService = StoreTagService();


  Future<StoreTagResponse> getStoreTags(bool withPublicTags) async {
    String? userToken = await _userRepository.getUserToken();
    return _storeTagService.getStoreTags(withPublicTags,userToken ?? "-");
  }

}