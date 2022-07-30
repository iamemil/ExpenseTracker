import 'package:flutter/material.dart';

class ShortStats extends StatefulWidget {
  const ShortStats({Key? key, required this.name, required this.value,required this.bottomText}) : super(key: key);
  final String name;
  final String value;
  final String bottomText;

  @override
  State<ShortStats> createState() => _ShortStatsState();
}

class _ShortStatsState extends State<ShortStats> {
  @override
  Widget build(BuildContext context) {
    double deviceWidth = MediaQuery.of(context).size.width;
    return SizedBox(
      width: deviceWidth * 0.4,
      child: Card(
        elevation: 3,
        margin: const EdgeInsets.all(10),
        shape: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(color: Colors.white)),
        child: Column(
          children: <Widget>[
            Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: const EdgeInsets.only(left: 10, top: 10),
                child: Text(
                  widget.name,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 12,
                    color: Colors.black87,
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: const EdgeInsets.only(left: 10, top: 10),
                child: Text(
                  widget.value,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.black87,
                  ),
                ),
              ),
            ),
            Spacer(),
            Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: const EdgeInsets.only(left: 10,bottom: 10),
                child: Text(
                  widget.bottomText,
                  style: const TextStyle(
                    fontWeight: FontWeight.normal,
                    fontSize: 12,
                    color: Colors.black54,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
