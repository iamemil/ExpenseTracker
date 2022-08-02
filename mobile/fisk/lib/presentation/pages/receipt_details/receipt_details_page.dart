import 'package:flutter/material.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
class ReceiptDetailsPage extends StatefulWidget {
  const ReceiptDetailsPage({Key? key}) : super(key: key);

  @override
  State<ReceiptDetailsPage> createState() => _ReceiptDetailsPageState();
}

class _ReceiptDetailsPageState extends State<ReceiptDetailsPage> {

  final List<String> receiptCategories = [
    'Food&Drink',
    'Shopping',
    'Entertainment',
  ];
  String? selectedCategory = "Food&Drink";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        leadingWidth: 0,
        title: const Text(
          'Receipt Details',
          style: TextStyle(color: Colors.black),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Card(
              elevation: 3.0,
              margin: const EdgeInsets.only(left: 10,right: 10,bottom: 10),
              child: Column(mainAxisSize: MainAxisSize.min, children: const <Widget>[
                ListTile(
                  title: Text(
                    "Merchant name",
                    style: TextStyle(fontSize: 12),
                  ),
                  subtitle: Text(
                    "STARBUCKS COFFEE",
                    style: TextStyle(fontSize: 14,fontWeight: FontWeight.w500, color: Colors.black),
                  ),
                ),
                ListTile(
                  title: Text(
                    "Merchant address",
                    style: TextStyle(fontSize: 12),
                  ),
                  subtitle: Text(
                    "AZ1072 BAKI ŞƏHƏRİ NƏRİMANOV RAYONU FƏTƏLİXAN XOYSKİ PR. ev.830-835-Cİ MƏHƏLLƏ",
                    style: TextStyle(fontSize: 14,fontWeight: FontWeight.w500, color: Colors.black),
                  ),
                ),
                ListTile(
                  title: Text(
                    "Merchant tax number",
                    style: TextStyle(fontSize: 12),
                  ),
                  subtitle: Text(
                    "1701513331-15001",
                    style: TextStyle(fontSize: 14,fontWeight: FontWeight.w500, color: Colors.black),
                  ),
                ),
                ]),
              ),
            Card(
              elevation: 3.0,
              margin: const EdgeInsets.only(left: 10,right: 10,bottom: 10),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const <Widget>[
                    Expanded(
                      child:ListTile(
                        title: Text(
                          "Latte Grande",
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                        ),
                        subtitle: Text(
                          "Price: 7.20 ₼",
                          style: TextStyle(fontSize: 10),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "1.000",
                        style: TextStyle(fontSize: 12),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "7.20 ₼",
                        style: TextStyle(fontSize: 12,fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const <Widget>[
                    Expanded(
                      child:ListTile(
                        title: Text(
                          "Americano Tall",
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                        ),
                        subtitle: Text(
                          "Price: 5.70 ₼",
                          style: TextStyle(fontSize: 10),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "1.000",
                        style: TextStyle(fontSize: 12),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "5.70 ₼",
                        style: TextStyle(fontSize: 12,fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const <Widget>[
                    Expanded(
                      child:ListTile(
                        title: Text(
                          "Tiramisu",
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                        ),
                        subtitle: Text(
                          "Price: 6.00 ₼",
                          style: TextStyle(fontSize: 10),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "1.000",
                        style: TextStyle(fontSize: 12),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "6.00 ₼",
                        style: TextStyle(fontSize: 12,fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
              ]),
            ),
            Card(
              elevation: 3.0,
              margin: const EdgeInsets.only(left: 10,right: 10,bottom: 10),
              shape: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(15),
                  borderSide: const BorderSide(color: Colors.white)),
              child: Column(mainAxisSize: MainAxisSize.min, children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: <Widget>[
                    Expanded(
                      child:ListTile(
                        title: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: Colors.tealAccent.withOpacity(0.6),
                          ),
                          alignment: Alignment.center,
                          padding: const EdgeInsets.all(10),
                          child: Text(
                            "Total: 18.90 ₼",
                            style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                color: Colors.teal[900]),
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child:ListTile(
                        title: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: Colors.tealAccent.withOpacity(0.6),
                          ),
                          alignment: Alignment.center,
                          padding: const EdgeInsets.all(10),
                          child: DropdownButtonHideUnderline(
                            child: DropdownButton2(
                              hint: Text(
                                'Select category',
                                style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w500,
                                    color: Colors.teal[900]),
                              ),
                              items: receiptCategories
                                  .map((item) =>
                                  DropdownMenuItem<String>(
                                    value: item,
                                    child: Text(
                                      item,
                                      style: const TextStyle(
                                        fontSize: 16,
                                      ),
                                    ),
                                  ))
                                  .toList(),
                              value: selectedCategory,
                              onChanged: (value) {
                                setState(() {
                                  selectedCategory = value as String;
                                });
                              },
                              buttonHeight: 20,
                              buttonWidth: 140,
                              itemHeight: 40,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ]),
            ),
          ],
        ),
      ),
    );
  }
}
