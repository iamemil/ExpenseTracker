import 'package:flutter/material.dart';
import 'package:fisk/presentation/pages/home/widgets/short_stats/short_stats.dart';
import 'package:fisk/presentation/widgets/expense_chart/expense_chart.dart';

import '../../../utils/constants/constants.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    double deviceWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        leadingWidth: 0,
        title: const Text(
          'Fisk',
          style: TextStyle(color: Colors.black),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        actions: <Widget>[
          IconButton(
            icon: const Icon(Icons.person_outline_rounded),
            color: Colors.black,
            tooltip: 'My Account',
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('This is a snackbar')));
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
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
                child: Container(
                  color: Colors.tealAccent.withOpacity(0.3),
                  child: ListView(
                    physics: const ClampingScrollPhysics(),
                    shrinkWrap: true,
                    scrollDirection: Axis.horizontal,
                    children: const [
                      ShortStats(
                        name: 'Total Spent',
                        value: '484.65 ₼',
                        bottomText: 'All time',
                      ),
                      ShortStats(
                        name: 'Top Category',
                        value: 'Shopping',
                        bottomText: 'Total Spent: 352.78 ₼',
                      ),
                      ShortStats(
                        name: 'Top Merchant',
                        value: 'MARKET GÜNƏŞLİ',
                        bottomText: 'Total: 169.97 ₼',
                      ),
                    ],
                  ),
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
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const <Widget>[
                  Expanded(
                    child:ListTile(
                      title: Text(
                        "MCDONALD'S RESTORAN GƏNCLİK MALL",
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
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
            Card(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const <Widget>[
                  Expanded(
                    child:ListTile(
                      title: Text(
                        "MCDONALD'S RESTORAN GƏNCLİK MALL",
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
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
            Card(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const <Widget>[
                  Expanded(
                    child:ListTile(
                      title: Text(
                        "MCDONALD'S RESTORAN GƏNCLİK MALL",
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
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
        InkWell(
          onTap: () {
            Navigator.pushNamed(context,Routes.receipts);
          },
          child: const Align(
            alignment: Alignment.center,
            child: Padding(
              padding: EdgeInsets.only(top: 10, bottom: 10),
              child: Text(
                'Show all',
                style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
              ),
            ),
          ),
        )
          ],
        ),
      ),
    );
  }
}
