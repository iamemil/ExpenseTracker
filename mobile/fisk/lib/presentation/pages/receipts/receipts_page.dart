import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../business_logic/blocs/authentication/authentication_bloc.dart';
import '../../../data/models/receipts/receiptsResponse/receipts_response.dart';
import '../../../data/services/receipt_service.dart';
import '../../../utils/constants/constants.dart';
import '../receipt_details/receipt_details_page.dart';
class ReceiptsPage extends StatefulWidget {
  const ReceiptsPage({Key? key}) : super(key: key);

  @override
  State<ReceiptsPage> createState() => _ReceiptsPageState();
  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const ReceiptsPage());
  }
}

class _ReceiptsPageState extends State<ReceiptsPage> {

  @override
  Widget build(BuildContext context) {

    final userToken = context.select(
          (AuthenticationBloc bloc) => bloc.state.user.token,
    );
    Future<ReceiptsResponse> lastReceipts =
    ReceiptService().getAllReceipts(userToken);

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        leadingWidth: 0,
        title: const Text(
          'My receipts',
          style: TextStyle(color: Colors.black),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: FutureBuilder<ReceiptsResponse>(
          future: lastReceipts,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Column(
                mainAxisSize: MainAxisSize.min,
                  children: snapshot.data!.data.map((e){
                    return Card(
                      child: InkWell(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => ReceiptDetailsPage(originalReceiptId: e.originalReceiptId),
                            ),
                          );
                        },
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            Expanded(
                              child: ListTile(
                                title: Text(
                                  e.storeName,
                                  style: const TextStyle(
                                      fontSize: 12, fontWeight: FontWeight.bold),
                                ),
                                subtitle: Text(
                                  DateTime.fromMillisecondsSinceEpoch(int.parse(e.purchaseDate.replaceAll("/Date(", "").replaceAll(")/", ""))).subtract(const Duration(hours:9)).toString(),
                                  style: const TextStyle(fontSize: 10),
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(right: 10),
                              child: Text(
                                "${e.totalSum} ₼",
                                style: const TextStyle(fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                  ).toList());
            } else {
              return const Center(child: CircularProgressIndicator());
            }
          },
        ),
      ),
    );
  }
}
