import 'package:fisk/data/models/storeTag/storeTagResponse/store_tag_response.dart';
import 'package:fisk/data/repositories/store_tag/store_tag_repository.dart';
import 'package:fisk/data/services/receipt_service.dart';
import 'package:flutter/material.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:number_inc_dec/number_inc_dec.dart';
import '../../../assets/fonts/iconsax.dart';
import '../../../business_logic/blocs/authentication/authentication_bloc.dart';
import '../../../data/models/receipts/receiptResponse/receipt_response.dart';
import '../../../data/repositories/receipt/receipt_repository.dart';
class ReceiptDetailsPage extends StatefulWidget {
  const ReceiptDetailsPage({Key? key,required this.originalReceiptId}) : super(key: key);

  final String originalReceiptId;
  @override
  State<ReceiptDetailsPage> createState() => _ReceiptDetailsPageState();

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const ReceiptDetailsPage(originalReceiptId: '',));
  }
}

class _ReceiptDetailsPageState extends State<ReceiptDetailsPage> {


  @override
  Widget build(BuildContext context) {

    final userToken = context.select(
          (AuthenticationBloc bloc) => bloc.state.user.token,
    );

    final ReceiptRepository receiptRepo = ReceiptRepository(userToken);
    final StoreTagRepository storeTagRepo = StoreTagRepository(userToken);
    Future<ReceiptResponse> receiptData = receiptRepo.getReceipt(widget.originalReceiptId);
    Future<StoreTagResponse> storeTags = storeTagRepo.getStoreTags(true);

    int? selectedCategoryId;

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
              child: Column(mainAxisSize: MainAxisSize.min, children: <Widget>[
                ListTile(
                  title: const Text(
                    "Merchant name",
                    style: TextStyle(fontSize: 12),
                  ),
                  subtitle: FutureBuilder<ReceiptResponse>(
                    future: receiptData,
                    builder: (context, snapshot){
                      if(snapshot.hasData){
                        return Text(
                          snapshot.data!.receiptData[0].storeName,
                          style: const TextStyle(fontSize: 12,fontWeight: FontWeight.w500, color: Colors.black),
                        );
                      }else{
                        return const Center(child: CircularProgressIndicator());
                      }
                    },
                  ),
                ),
                ListTile(
                  title: const Text(
                    "Merchant address",
                    style: TextStyle(fontSize: 12),
                  ),
                  subtitle: FutureBuilder<ReceiptResponse>(
                    future: receiptData,
                    builder: (context, snapshot){
                      if(snapshot.hasData){
                        return Text(
                          snapshot.data!.receiptData[0].storeAddress,
                          style: const TextStyle(fontSize: 12,fontWeight: FontWeight.w500, color: Colors.black),
                        );
                      }else{
                        return const Center(child: CircularProgressIndicator());
                      }
                    },
                  ),
                ),
                ListTile(
                  title: const Text(
                    "Merchant tax number",
                    style: TextStyle(fontSize: 12),
                  ),
                  subtitle: FutureBuilder<ReceiptResponse>(
                    future: receiptData,
                    builder: (context, snapshot){
                      if(snapshot.hasData){
                        return Text(
                          snapshot.data!.receiptData[0].storeTaxNumber,
                          style: const TextStyle(fontSize: 12,fontWeight: FontWeight.w500, color: Colors.black),
                        );
                      }else{
                        return const Center(child: CircularProgressIndicator());
                      }
                    },
                  ),
                ),
              ]),
            ),
            Card(
              elevation: 3.0,
              margin: const EdgeInsets.only(left: 10,right: 10,bottom: 10),
              child: FutureBuilder<ReceiptResponse>(
                future: receiptData,
                builder: (context, snapshot){
                  if(snapshot.hasData){
                    return Column(
                        mainAxisSize: MainAxisSize.min,
                        children: snapshot.data!.receiptData[0].receiptItems.map((e){
                          return Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              Expanded(
                                child:ListTile(
                                  title: Text(
                                    e.itemName,
                                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
                                  ),
                                  subtitle: Text(
                                    "Price: ${e.itemPrice} ₼",
                                    style: const TextStyle(fontSize: 8),
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
                                    incDecFactor: 0.001,
                                    initialValue: e.itemQuantity,
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
                              Padding(
                                padding: const EdgeInsets.only(right: 10),
                                child: Text(
                                  "${e.itemSum} ₼",
                                  style: const TextStyle(fontSize: 11,fontWeight: FontWeight.w500),
                                ),
                              ),
                            ],
                          );
                        }).toList());
                  }else{
                    return const Center(child: CircularProgressIndicator());
                  }
                },
              ),
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
                          child: FutureBuilder<ReceiptResponse>(
                            future: receiptData,
                            builder: (context, snapshot){
                              if(snapshot.hasData){
                                return Text(
                                  "Total: ${snapshot.data!.receiptData[0].totalSum} ₼",
                                  style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.teal[900]),
                                );
                              }else{
                                return const Center(child: CircularProgressIndicator());
                              }
                            },
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
                          child: FutureBuilder<ReceiptResponse>(
                            future: receiptData,
                            builder: (context,receiptSnapshot) {
                              if(receiptSnapshot.hasData){
                                return FutureBuilder<StoreTagResponse>(
                                    future: storeTags,
                                    builder: (context,snapshot) {
                                      if(snapshot.hasData){
                                        return DropdownButtonHideUnderline(
                                          child: DropdownButton2(
                                            hint: Text(
                                              'Select category',
                                              style: TextStyle(
                                                  fontSize: 14,
                                                  fontWeight: FontWeight.w500,
                                                  color: Colors.teal[900]),
                                            ),
                                            items: snapshot.data!.data.map((e) =>
                                                DropdownMenuItem<int>(
                                                  value: e.id,
                                                  child: Text(
                                                    e.name,
                                                    style: TextStyle(
                                                        fontSize: 14,
                                                        fontWeight: FontWeight.w500,
                                                        color: Colors.teal[900]
                                                    ),
                                                  ),
                                                )).toList(),
                                            value: snapshot.data!.data.firstWhere((element) => element.id==receiptSnapshot.data!.receiptData[0].storeTagId).id,
                                            onChanged: (value) {
                                              setState(() {
                                                selectedCategoryId = value as int;
                                              });
                                            },
                                            buttonHeight: 20,
                                            buttonWidth: double.infinity,
                                            itemHeight: 40,
                                          ),
                                        );
                                      }else {
                                        return const Center(
                                          child: Text("Error. Try again"),
                                        );
                                      }
                                    }
                                );
                              }else{
                                return const Center(
                                  child: CircularProgressIndicator());

                              }
                            }
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
