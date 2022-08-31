import 'package:fisk/data/models/storeTag/storeTagResponse/store_tag_response.dart';
import 'package:fisk/data/repositories/store_tag/store_tag_repository.dart';
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
  int? selectedCategoryId;
  List<ReceiptItem>? receiptItems;

  receiptListCallback(List<ReceiptItem> updatedList){
    setState(() {
      receiptItems = updatedList;
      print(receiptItems?.length);
      receiptItems?.forEach((element) {
        print(element.itemName+" "+element.itemQuantity.toString()+" "+element.itemPrice.toString());
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final userToken = context.select(
          (AuthenticationBloc bloc) => bloc.state.user.token,
    );
    final ReceiptRepository receiptRepo = ReceiptRepository(userToken);
    final StoreTagRepository storeTagRepo = StoreTagRepository(userToken);
    Future<ReceiptResponse> receiptData = receiptRepo.getReceipt(widget.originalReceiptId);
    Future<StoreTagResponse> storeTags = storeTagRepo.getStoreTags(true);
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
                          ReceiptItem receiptItem = ReceiptItem(itemCode: e.itemCode, itemName: e.itemName, itemQuantity: e.itemQuantity, itemPrice: e.itemPrice, itemSum: e.itemSum);
                          //receiptItems?.add(receiptItem);
                          //addToReceiptItems(receiptItem);
                          return ReceiptListItem(receiptListCallback: receiptListCallback,receiptItem: receiptItem,);
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
                                var initialCategoryId = receiptSnapshot.data!.receiptData[0].storeTagId;
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
                                            dropdownOverButton: true,
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
                                            value: selectedCategoryId ?? initialCategoryId,
                                            onChanged: (value) {
                                              //print(value);
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

class ReceiptListItem extends StatefulWidget {
  const ReceiptListItem({Key? key,required this.receiptListCallback,required this.receiptItem}) : super(key: key);


  final Function receiptListCallback;
  final ReceiptItem receiptItem;

  @override
  State<ReceiptListItem> createState() => _ReceiptListItemState();
}

class _ReceiptListItemState extends State<ReceiptListItem> {
  double _itemFinalSum = 0;
  List<ReceiptItem>? _receiptItems;

  void initiateList(ReceiptItem updatedItem){
    setState(() {
        _receiptItems = [...?_receiptItems,widget.receiptItem];
      //_receiptItems?.add(updatedItem);
    });
  }
  void updateList(ReceiptItem updatedItem){
    setState(() {
      _receiptItems![_receiptItems!.indexWhere((element) => element.itemCode==updatedItem.itemCode)] = updatedItem;
      print(_receiptItems?.length);
      /*_receiptItems?.forEach((element) {
        print(element.itemName+" "+element.itemQuantity.toString()+" "+element.itemPrice.toString());
      });
       */
      //widget.receiptListCallback(_receiptItems);
    });
  }
  @override
  Widget build(BuildContext context) {
    initiateList(widget.receiptItem);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        Expanded(
          child:ListTile(
            title: Text(
              widget.receiptItem.itemName,
              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
            ),
            subtitle: Text(
              "Price: ${widget.receiptItem.itemPrice} ₼",
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
              initialValue: widget.receiptItem.itemQuantity,
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
                setState(() {
                  _itemFinalSum = newlyIncrementedValue.toDouble() * widget.receiptItem.itemPrice;
                  widget.receiptItem.itemQuantity = newlyIncrementedValue.toDouble();
                  widget.receiptItem.itemSum=_itemFinalSum;
                  updateList(widget.receiptItem);
                });
              },
              onDecrement: (num newlyDecrementedValue) {
                setState(() {
                  _itemFinalSum = newlyDecrementedValue.toDouble() * widget.receiptItem.itemPrice;
                  widget.receiptItem.itemQuantity = newlyDecrementedValue.toDouble();
                  widget.receiptItem.itemSum=_itemFinalSum;
                  updateList(widget.receiptItem);
                });
              },
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 10),
          child: Text(
            "${_itemFinalSum==0 ? widget.receiptItem.itemPrice.toStringAsFixed(2) : _itemFinalSum.toStringAsFixed(2)} ₼",
            style: const TextStyle(fontSize: 11,fontWeight: FontWeight.w500),
          ),
        ),
      ],
    );
  }
}

