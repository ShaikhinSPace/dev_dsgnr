import 'package:flutter/material.dart';

class CircleWidget extends StatelessWidget {
  const CircleWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: CustomPaint(
        size: const Size(200, 200), // Set the size of the circle
        painter: CirclePainter(), // Use the custom painter
      ),
    );
  }
}

class CirclePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()..style = PaintingStyle.fill;

    double centerX = size.width / 2;
    double centerY = size.height / 2;
    double radius = size.width / 2;

    // Outer Circle (Blue)
    paint.color = Color.fromARGB(255, 2, 2, 220);
    canvas.drawCircle(Offset(centerX, centerY), radius, paint);

    // Middle Circle (White)
    paint.color = Colors.white;
    canvas.drawCircle(Offset(centerX, centerY), radius * 0.7, paint);

    // Inner Circle (Light Blue)
    paint.color = Color.fromARGB(255, 2, 2, 220);
    canvas.drawCircle(Offset(centerX, centerY), radius * 0.4, paint);

    // Center Circle (White)
    paint.color = Colors.white;
    canvas.drawCircle(Offset(centerX, centerY), radius * 0.2, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
