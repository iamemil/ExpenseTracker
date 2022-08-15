import 'package:fisk/data/models/totalStatistics/totalStatisticsResponse/total_statistics_response.dart';
import 'package:fisk/data/services/statistics_service.dart';
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
            Card(
              child: InkWell(
                onTap: () {
                  Navigator.pushNamed(context, Routes.receiptDetails);
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const <Widget>[
                    Expanded(
                      child: ListTile(
                        title: Text(
                          "MCDONALD'S RESTORAN GƏNCLİK MALL",
                          style: TextStyle(
                              fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                          "11.08.2021 20:11:14",
                          style: TextStyle(fontSize: 10),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "32.78 ₼",
                        style: TextStyle(fontSize: 12),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Card(
              child: InkWell(
                onTap: () {
                  Navigator.pushNamed(context, Routes.receiptDetails);
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const <Widget>[
                    Expanded(
                      child: ListTile(
                        title: Text(
                          "MCDONALD'S RESTORAN GƏNCLİK MALL",
                          style: TextStyle(
                              fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                          "11.08.2021 20:11:14",
                          style: TextStyle(fontSize: 10),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "32.78 ₼",
                        style: TextStyle(fontSize: 12),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Card(
              child: InkWell(
                onTap: () {
                  Navigator.pushNamed(context, Routes.receiptDetails);
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const <Widget>[
                    Expanded(
                      child: ListTile(
                        title: Text(
                          "MCDONALD'S RESTORAN GƏNCLİK MALL",
                          style: TextStyle(
                              fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                          "11.08.2021 20:11:14",
                          style: TextStyle(fontSize: 10),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        "32.78 ₼",
                        style: TextStyle(fontSize: 12),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            InkWell(
              onTap: () {
                Navigator.pushNamed(context, Routes.receipts);
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
            Text('Token: $userToken')
          ],
        ),
      ),
    );
  }
}
