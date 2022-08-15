import 'dart:convert';

TotalStatisticsResponse totalStatisticsResponseFromJson(String str) => TotalStatisticsResponse.fromJson(json.decode(str));

String totalStatisticsResponseToJson(TotalStatisticsResponse data) => json.encode(data.toJson());

class TotalStatisticsResponse {
  TotalStatisticsResponse({
    required this.status,
    required this.data,
  });

  int status;
  Data data;

  factory TotalStatisticsResponse.fromJson(Map<String, dynamic> json) => TotalStatisticsResponse(
    status: json["status"],
    data: Data.fromJson(json["data"]),
  );

  Map<String, dynamic> toJson() => {
    "status": status,
    "data": data.toJson(),
  };
}

class Data {
  Data({
    required this.totalSpent,
    required this.topCategories,
    required this.topStores,
  });

  double totalSpent;
  List<Top> topCategories;
  List<Top> topStores;

  factory Data.fromJson(Map<String, dynamic> json) => Data(
    totalSpent: json["totalSpent"].toDouble(),
    topCategories: List<Top>.from(json["topCategories"].map((x) => Top.fromJson(x))),
    topStores: List<Top>.from(json["topStores"].map((x) => Top.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "totalSpent": totalSpent,
    "topCategories": List<dynamic>.from(topCategories.map((x) => x.toJson())),
    "topStores": List<dynamic>.from(topStores.map((x) => x.toJson())),
  };
}

class Top {
  Top({
    required this.name,
    required this.amount,
  });

  String name;
  double amount;

  factory Top.fromJson(Map<String, dynamic> json) => Top(
    name: json["Name"],
    amount: json["Amount"].toDouble(),
  );

  Map<String, dynamic> toJson() => {
    "Name": name,
    "Amount": amount,
  };
}
