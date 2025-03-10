import 'package:flutter/material.dart';

class BrutalistContact extends StatelessWidget {
  const BrutalistContact({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      color: Colors.red, // Brutalist bold color
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'GET IN TOUCH',
            style: TextStyle(
              fontSize: 64,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          SizedBox(height: 40),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.white, width: 3),
            ),
            padding: EdgeInsets.all(20),
            child: TextField(
              style: TextStyle(color: Colors.white, fontSize: 20),
              decoration: InputDecoration(
                hintText: 'YOUR EMAIL',
                hintStyle: TextStyle(
                  color: Colors.white.withOpacity(0.7),
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                border: InputBorder.none,
              ),
            ),
          ),
          SizedBox(height: 20),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.white, width: 3),
            ),
            padding: EdgeInsets.all(20),
            child: TextField(
              style: TextStyle(color: Colors.white, fontSize: 20),
              maxLines: 5,
              decoration: InputDecoration(
                hintText: 'YOUR MESSAGE',
                hintStyle: TextStyle(
                  color: Colors.white.withOpacity(0.7),
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                border: InputBorder.none,
              ),
            ),
          ),
          SizedBox(height: 20),
          Container(
            width: 200,
            height: 60,
            color: Colors.white,
            child: Center(
              child: Text(
                'SEND',
                style: TextStyle(
                  color: Colors.red,
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
