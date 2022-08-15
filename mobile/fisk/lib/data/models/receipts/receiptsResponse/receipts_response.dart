// To parse this JSON data, do
//
//     final receiptsResponse = receiptsResponseFromJson(jsonString);

import 'dart:convert';

ReceiptsResponse receiptsResponseFromJson(String str) => ReceiptsResponse.fromJson(json.decode(str));

String receiptsResponseToJson(ReceiptsResponse data) => json.encode(data.toJson());

class ReceiptsResponse {
  ReceiptsResponse({
    required this.status,
    required this.data,
  });

  int status;
  List<Receipt> data;

  factory ReceiptsResponse.fromJson(Map<String, dynamic> json) => ReceiptsResponse(
    status: json["status"],
    data: List<Receipt>.from(json["data"].map((x) => Receipt.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "status": status,
    "data": List<dynamic>.from(data.map((x) => x.toJson())),
  };
}

class Receipt {
  Receipt({
    required this.storeName,
    required this.originalReceiptId,
    required this.purchaseDate,
    required this.creationDate,
    required this.totalSum,
    required this.tagName,
  });

  String storeName;
  String originalReceiptId;
  String purchaseDate;
  String creationDate;
  double totalSum;
  String tagName;

  factory Receipt.fromJson(Map<String, dynamic> json) => Receipt(
    storeName: json["storeName"],
    originalReceiptId: json["OriginalReceiptId"],
    purchaseDate: json["PurchaseDate"],
    creationDate: json["CreationDate"],
    totalSum: json["TotalSum"].toDouble(),
    tagName: json["tagName"],
  );

  Map<String, dynamic> toJson() => {
    "storeName": storeName,
    "OriginalReceiptId": originalReceiptId,
    "PurchaseDate": purchaseDate,
    "CreationDate": creationDate,
    "TotalSum": totalSum,
    "tagName": tagName,
  };
}
