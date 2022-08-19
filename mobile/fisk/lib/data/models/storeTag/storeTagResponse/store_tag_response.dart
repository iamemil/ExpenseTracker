// To parse this JSON data, do
//
//     final storeTagResponse = storeTagResponseFromJson(jsonString);

import 'dart:convert';

StoreTagResponse storeTagResponseFromJson(String str) => StoreTagResponse.fromJson(json.decode(str));

String storeTagResponseToJson(StoreTagResponse data) => json.encode(data.toJson());

class StoreTagResponse {
  StoreTagResponse({
    required this.status,
    required this.data,
  });

  int status;
  List<Datum> data;

  factory StoreTagResponse.fromJson(Map<String, dynamic> json) => StoreTagResponse(
    status: json["status"],
    data: List<Datum>.from(json["data"].map((x) => Datum.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "status": status,
    "data": List<dynamic>.from(data.map((x) => x.toJson())),
  };
}

class Datum {
  Datum({
    required this.id,
    required this.name,
    required this.isPublic,
    required this.creationDate,
  });

  int id;
  String name;
  bool isPublic;
  String creationDate;

  factory Datum.fromJson(Map<String, dynamic> json) => Datum(
    id: json["Id"],
    name: json["Name"],
    isPublic: json["isPublic"],
    creationDate: json["CreationDate"],
  );

  Map<String, dynamic> toJson() => {
    "Id": id,
    "Name": name,
    "isPublic": isPublic,
    "CreationDate": creationDate,
  };
}
