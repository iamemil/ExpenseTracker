import 'package:fisk/presentation/pages/home/widgets/short_stats.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
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
                padding: EdgeInsets.only(left: 10),
                child: Text(
                  'Quick statistics',
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
                ),
              ),
            ),
            SizedBox(
              height: 180.0,
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
            Card(
              child: ListTile(
                  title: Text('Motivation $int'),
                  subtitle: Text('this is a description of the motivation')),
            ),
            Card(
              child: ListTile(
                  title: Text('Motivation $int'),
                  subtitle: Text('this is a description of the motivation')),
            ),
          ],
        ),
      ),
    );
  }
}
