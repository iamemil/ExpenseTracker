import 'package:flutter/material.dart';
class ReceiptsPage extends StatefulWidget {
  const ReceiptsPage({Key? key}) : super(key: key);

  @override
  State<ReceiptsPage> createState() => _ReceiptsPageState();
}

class _ReceiptsPageState extends State<ReceiptsPage> {
  @override
  Widget build(BuildContext context) {
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
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
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
          ],
        ),
      ),
    );
  }
}
