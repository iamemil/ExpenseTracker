// To parse this JSON data, do
//
//     final receiptResponse = receiptResponseFromJson(jsonString);

import 'dart:convert';

ReceiptResponse receiptResponseFromJson(String str) => ReceiptResponse.fromJson(json.decode(str));

String receiptResponseToJson(ReceiptResponse data) => json.encode(data.toJson());

class ReceiptResponse {
  ReceiptResponse({
    required this.status,
    required this.receiptData,
  });

  int status;
  List<ReceiptDatum> receiptData;

  factory ReceiptResponse.fromJson(Map<String, dynamic> json) => ReceiptResponse(
    status: json["status"],
    receiptData: List<ReceiptDatum>.from(json["receiptData"].map((x) => ReceiptDatum.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "status": status,
    "receiptData": List<dynamic>.from(receiptData.map((x) => x.toJson())),
  };
}

class ReceiptDatum {
  ReceiptDatum({
    required this.storeName,
    required this.storeAddress,
    required this.storeTaxNumber,
    required this.originalReceiptId,
    required this.purchaseDate,
    required  this.creationDate,
    required this.totalSum,
    required this.storeTagId,
    required this.receiptItems,
  });

  String storeName;
  String storeAddress;
  String storeTaxNumber;
  String originalReceiptId;
  String purchaseDate;
  String creationDate;
  double totalSum;
  int storeTagId;
  List<ReceiptItem> receiptItems;

  factory ReceiptDatum.fromJson(Map<String, dynamic> json) => ReceiptDatum(
    storeName: json["storeName"],
    storeAddress: json["storeAddress"],
    storeTaxNumber: json["storeTaxNumber"],
    originalReceiptId: json["OriginalReceiptId"],
    purchaseDate: json["PurchaseDate"],
    creationDate: json["CreationDate"],
    totalSum: json["TotalSum"].toDouble(),
    storeTagId: json["StoreTagId"],
    receiptItems: List<ReceiptItem>.from(json["receiptItems"].map((x) => ReceiptItem.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "storeName": storeName,
    "storeAddress": storeAddress,
    "storeTaxNumber": storeTaxNumber,
    "OriginalReceiptId": originalReceiptId,
    "PurchaseDate": purchaseDate,
    "CreationDate": creationDate,
    "TotalSum": totalSum,
    "StoreTagId": storeTagId,
    "receiptItems": List<dynamic>.from(receiptItems.map((x) => x.toJson())),
  };
}

class ReceiptItem {
  ReceiptItem({
    required this.itemCode,
    required this.itemName,
    required this.itemQuantity,
    required this.itemPrice,
    required this.itemSum,
  });

  String itemCode;
  String itemName;
  double itemQuantity;
  double itemPrice;
  double itemSum;

  factory ReceiptItem.fromJson(Map<String, dynamic> json) => ReceiptItem(
    itemCode: json["itemCode"],
    itemName: json["itemName"],
    itemQuantity: json["itemQuantity"],
    itemPrice: json["itemPrice"].toDouble(),
    itemSum: json["itemSum"].toDouble(),
  );


  Map<String, dynamic> toJson() => {
    "itemCode": itemCode,
    "itemName": itemName,
    "itemQuantity": itemQuantity,
    "itemPrice": itemPrice,
    "itemSum": itemSum,
  };
}
