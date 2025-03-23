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
          child: SizedBox(
            height: 100,
            child: Image.network(
              'https://files-eight-wine.vercel.app/slogo.png',
            ),
          ),
        ),
      ],
    );
  }
}
