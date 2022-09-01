import 'package:fisk/assets/fonts/iconsax.dart';
import 'package:fisk/business_logic/blocs/authentication/authentication_bloc.dart';
import 'package:fisk/data/repositories/authentication/authentication_repository.dart';
import 'package:fisk/data/repositories/user/user_repository.dart';
import 'package:fisk/presentation/pages/dashboard/dashboard_page.dart';
import 'package:flutter/material.dart';
import 'package:convex_bottom_bar/convex_bottom_bar.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../new_scan/new_scan.dart';
class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const HomePage());
  }
}

class _HomePageState extends State<HomePage> {
  int selectedPage = 0;
  @override
  Widget build(BuildContext context) {

    const pageNo = [DashboardPage(), NewScanPage(),DashboardPage()];
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
            onPressed: () => BlocProvider.of<AuthenticationBloc>(context)
                .add(AuthenticationLogoutRequested()),
          ),
        ],
      ),
      body: pageNo[selectedPage],
      bottomNavigationBar: ConvexAppBar(
        items: [
          TabItem(icon: selectedPage==0?Iconsax.home1:Iconsax.home, title: 'Home'),
          TabItem(
              icon: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: selectedPage==1?Colors.teal:Colors.teal.withOpacity(0.6),
                ),
                child: const Icon(Iconsax.scan_barcode, color: Colors.white, size: 40),
              )),
          TabItem(icon: selectedPage==2?Iconsax.graph5:Iconsax.graph, title: 'Stats'),
        ],
        initialActiveIndex: selectedPage,
        backgroundColor: Colors.white,
        color: Colors.teal.withOpacity(0.4),
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
