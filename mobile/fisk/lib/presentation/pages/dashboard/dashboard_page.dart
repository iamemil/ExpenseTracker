import 'package:fisk/data/models/receipts/receiptsResponse/receipts_response.dart';
import 'package:fisk/data/models/totalStatistics/totalStatisticsResponse/total_statistics_response.dart';
import 'package:fisk/data/services/receipt_service.dart';
import 'package:fisk/data/services/statistics_service.dart';
import 'package:fisk/presentation/pages/receipt_details/receipt_details_page.dart';
import 'package:fisk/presentation/pages/receipts/receipts_page.dart';
import 'package:flutter/material.dart';
import 'package:fisk/presentation/pages/dashboard/widgets/short_stats/short_stats.dart';
import 'package:fisk/presentation/widgets/expense_chart/expense_chart.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../business_logic/blocs/authentication/authentication_bloc.dart';
import '../../../utils/constants/constants.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {

  @override
  Widget build(BuildContext context) {
    double deviceWidth = MediaQuery.of(context).size.width;

    final userToken = context.select(
      (AuthenticationBloc bloc) => bloc.state.user.token,
    );

    Future<TotalStatisticsResponse> totalStatistics =
        StatisticsService().getTotalStatistics(userToken);
    Future<ReceiptsResponse> lastReceipts =
    ReceiptService().getReceipts(5,userToken);

    return Scaffold(
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: EdgeInsets.only(left: 10, bottom: 10),
                child: Text(
                  'Quick statistics',
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  minHeight: deviceWidth * 0.10,
                  maxHeight: deviceWidth * 0.4,
                ),
                child: FutureBuilder<TotalStatisticsResponse>(
                  future: totalStatistics,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return ListView(
                        physics: const BouncingScrollPhysics(),
                        shrinkWrap: true,
                        scrollDirection: Axis.horizontal,
                        children: [
                          ShortStats(
                            name: 'Total Spent',
                            value: "${snapshot.data!.data.totalSpent} ₼",
                            bottomText: "All time",
                          ),
                          ShortStats(
                            name: 'Top Category',
                            value: snapshot.data!.data.topCategories.first.name,
                            bottomText:
                            "Total Spent: ${snapshot.data!.data.topCategories.first.amount} ₼",
                          ),
                          ShortStats(
                            name: 'Top Merchant',
                            value: snapshot.data!.data.topStores.first.name,
                            bottomText:
                            "Total ${snapshot.data!.data.topStores.first.amount} ₼",
                          ),
                        ],
                      );
                    } else {
                      return const CircularProgressIndicator();
                    }
                  },
                ),
              ),
            ),
            const Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: EdgeInsets.only(left: 10),
                child: Text(
                  'Expense chart',
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
                ),
              ),
            ),
            const LineChartSample1(),
            const Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: EdgeInsets.only(left: 10),
                child: Text(
                  'Last receipts',
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
                ),
              ),
            ),
            FutureBuilder<ReceiptsResponse>(
              future: lastReceipts,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Column(
                    mainAxisSize: MainAxisSize.min,
                    children: snapshot.data!.data.map((e){
                      return Card(
                        child: InkWell(
                          onTap: () {
                            //Navigator.pushNamed(context, Routes.receiptDetails);
                            Navigator.of(context).push(ReceiptDetailsPage.route());
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
                  return const CircularProgressIndicator();
                }
              },
            ),
            InkWell(
              onTap: () {
                //Navigator.pushNamed(context, Routes.receipts);
                Navigator.of(context).push(ReceiptsPage.route());
              },
              child: const Align(
                alignment: Alignment.center,
                child: Padding(
                  padding: EdgeInsets.only(top: 20, bottom: 40),
                  child: Text(
                    'Show all',
                    style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
                  ),
                ),
              ),
            ),
            Text('Token: $userToken',style: const TextStyle(fontSize: 10),)
          ],
        ),
      ),
    );
  }
}
