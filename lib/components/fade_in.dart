import 'package:flutter/material.dart';
import 'package:visibility_detector/visibility_detector.dart';

class FadeInSection extends StatefulWidget {
  final Widget child;
  final String keyValue;

  const FadeInSection({super.key, required this.child, required this.keyValue});

  @override
  _FadeInSectionState createState() => _FadeInSectionState();
}

class _FadeInSectionState extends State<FadeInSection>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 600),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(_controller);
  }

  @override
  Widget build(BuildContext context) {
    return VisibilityDetector(
      key: Key(widget.keyValue),
      onVisibilityChanged: (info) {
        if (info.visibleFraction > 0.1) {
          _controller.forward();
        }
      },
      child: FadeTransition(opacity: _animation, child: widget.child),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
