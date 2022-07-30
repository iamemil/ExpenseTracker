import 'package:fisk/assets/fonts/iconsax.dart';
import 'package:fisk/presentation/pages/dashboard/dashboard_page.dart';
import 'package:flutter/material.dart';
import 'package:convex_bottom_bar/convex_bottom_bar.dart';
import '../receipts/receipts_page.dart';
class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int selectedPage = 0;
  final _pageNo = [DashboardPage(), ReceiptsPage(),DashboardPage()];
  @override
  Widget build(BuildContext context) {
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
      body: _pageNo[selectedPage],
      bottomNavigationBar: ConvexAppBar(
        items: [
          TabItem(icon: Iconsax.home, title: 'Home'),
          TabItem(icon: Iconsax.scan_barcode, title: 'New'),
          TabItem(icon: Iconsax.graph, title: 'Stats'),
        ],
        initialActiveIndex: selectedPage,
        backgroundColor: Colors.white,
        color: Colors.teal.withOpacity(0.6),
        activeColor: Colors.teal,
        style: TabStyle.fixedCircle,
        onTap: (int index){
          setState(() {
            selectedPage = index;
          });
        },
      ),
    );
  }
}
