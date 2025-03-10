import 'package:dev_dsgnr/assetsource.dart';
import 'package:flutter/material.dart';

class BrutalistHeader extends StatelessWidget {
  const BrutalistHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Container(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
          color: Colors.transparent,
          child: SizedBox(height: 100, child: Image.asset(AssetSource().logo)),
        ),
        CircleAvatar(
          radius: 50,
          backgroundColor: Color.fromARGB(255, 2, 2, 220),
          child: Icon(Icons.person, color: Colors.white),
        ),
      ],
    );
  }
}
