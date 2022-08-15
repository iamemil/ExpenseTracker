import 'package:flutter/material.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:number_inc_dec/number_inc_dec.dart';

import '../../../assets/fonts/iconsax.dart';
class ReceiptDetailsPage extends StatefulWidget {
  const ReceiptDetailsPage({Key? key}) : super(key: key);

  @override
  State<ReceiptDetailsPage> createState() => _ReceiptDetailsPageState();

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const ReceiptDetailsPage());
  }
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
                  children: <Widget>[
                    const Expanded(
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
                    Container(
                      width: 140,
                      height: 30,
                      child: Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: NumberInputWithIncrementDecrement(
                          controller: TextEditingController(),
                          style: const TextStyle(
                              fontSize: 10
                          ),
                          isInt: false,
                          fractionDigits: 3,
                          min: 0,
                          max: 9999,
                          incDecFactor: 0.10,
                          initialValue: 1,
                          incIcon: Iconsax.add,
                          decIcon: Iconsax.minus,
                          incIconSize: 27,
                          decIconSize: 27,
                          buttonArrangement: ButtonArrangement.incLeftDecRight,
                          widgetContainerDecoration: const BoxDecoration(
                              borderRadius: BorderRadius.zero
                          ),
                          incIconDecoration: const BoxDecoration(
                              color: Colors.transparent
                          ),
                          decIconDecoration: const BoxDecoration(
                              color: Colors.transparent
                          ),
                          onIncrement: (num newlyIncrementedValue) {
                            print('Newly incremented value is $newlyIncrementedValue');
                          },
                          onDecrement: (num newlyDecrementedValue) {
                            print('Newly decremented value is $newlyDecrementedValue');
                          },
                        ),
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "6.00 ₼",
                        style: TextStyle(fontSize: 12,fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    const Expanded(
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
                    Container(
                      width: 140,
                      height: 30,
                      child: Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: NumberInputWithIncrementDecrement(
                          controller: TextEditingController(),
                          style: const TextStyle(
                              fontSize: 10
                          ),
                          isInt: false,
                          fractionDigits: 3,
                          min: 0,
                          max: 9999,
                          incDecFactor: 0.10,
                          initialValue: 1,
                          incIcon: Iconsax.add,
                          decIcon: Iconsax.minus,
                          incIconSize: 27,
                          decIconSize: 27,
                          buttonArrangement: ButtonArrangement.incLeftDecRight,
                          widgetContainerDecoration: const BoxDecoration(
                              borderRadius: BorderRadius.zero
                          ),
                          incIconDecoration: const BoxDecoration(
                              color: Colors.transparent
                          ),
                          decIconDecoration: const BoxDecoration(
                              color: Colors.transparent
                          ),
                          onIncrement: (num newlyIncrementedValue) {
                            print('Newly incremented value is $newlyIncrementedValue');
                          },
                          onDecrement: (num newlyDecrementedValue) {
                            print('Newly decremented value is $newlyDecrementedValue');
                          },
                        ),
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "6.00 ₼",
                        style: TextStyle(fontSize: 12,fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    const Expanded(
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
                    Container(
                      width: 140,
                      height: 30,
                      child: Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: NumberInputWithIncrementDecrement(
                          controller: TextEditingController(),
                          style: const TextStyle(
                            fontSize: 10
                          ),
                          isInt: false,
                          fractionDigits: 3,
                          min: 0,
                          max: 9999,
                          incDecFactor: 0.10,
                          initialValue: 1,
                          incIcon: Iconsax.add,
                          decIcon: Iconsax.minus,
                          incIconSize: 27,
                          decIconSize: 27,
                          buttonArrangement: ButtonArrangement.incLeftDecRight,
                          widgetContainerDecoration: const BoxDecoration(
                              borderRadius: BorderRadius.zero
                          ),
                          incIconDecoration: const BoxDecoration(
                            color: Colors.transparent
                          ),
                          decIconDecoration: const BoxDecoration(
                              color: Colors.transparent
                          ),
                          onIncrement: (num newlyIncrementedValue) {
                            print('Newly incremented value is $newlyIncrementedValue');
                          },
                          onDecrement: (num newlyDecrementedValue) {
                            print('Newly decremented value is $newlyDecrementedValue');
                          },
                        ),
                      ),
                    ),
                    const Padding(
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
                                fontSize: 14,
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
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                    color: Colors.teal[900]),
                              ),
                              items: receiptCategories
                                  .map((item) =>
                                  DropdownMenuItem<String>(
                                    value: item,
                                    child: Text(
                                      item,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w500,
                                        color: Colors.teal[900]
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
                              buttonWidth: double.infinity,
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
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                  shape: const StadiumBorder(),
                  padding: const EdgeInsets.symmetric(horizontal: 25,vertical: 10)
              ),
              child: Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                children: const <Widget>[
                  Padding(
                    padding: EdgeInsets.only(right: 10),
                    child: Icon(Iconsax.refresh_circle),
                  ),
                  Text('Update Receipt')
                ],
              ),
              //child: const Text('Update Receipt'),

            ),
            OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(
                  primary: Colors.red,
                  shape: const StadiumBorder(),
                  padding: const EdgeInsets.symmetric(horizontal: 25,vertical: 10)
              ),
              child: Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                children: const <Widget>[
                  Padding(
                    padding: EdgeInsets.only(right: 10),
                    child: Icon(Iconsax.trash),
                  ),
                  Text('Delete')
                ],
              ),
              //child: const Text('Update Receipt'),
            ),
          ],
        ),
      ),
    );
  }
}
