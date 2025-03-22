import 'dart:async';
import 'package:flutter/material.dart';

import 'package:dev_dsgnr/components/project_card.dart';

class GlassmorphicProjects extends StatefulWidget {
  GlassmorphicProjects({super.key});

  @override
  _GlassmorphicProjectsState createState() => _GlassmorphicProjectsState();
}

class _GlassmorphicProjectsState extends State<GlassmorphicProjects> {
  final PageController _pageController = PageController(initialPage: 0);
  int _currentPage = 0;
  late Timer _timer;

  final List<Project> projects = [
    Project(
      title: 'Nagarik App',
      tags: ['UI/UX', 'Flutter', 'Dart'],
      image:
          'https://play-lh.googleusercontent.com/1gNXZUgpsrlAPiS8PaIBy5tpycv-rJdeJuapuJN0d2WiGAFhzoexPKE5qTprLRMn9ptX=w240-h480-rw',
    ),
    Project(
      title: 'Ambition Guru',
      tags: ['React Native', 'Firebase'],
      image:
          'https://play-lh.googleusercontent.com/yXzH6YlTpH_aXHTETtmgduoA7k0itJ1QIdy0K9Vjv2Tv1PwV1xwOanc8WCkBF4lASg',
    ),
    Project(
      title: 'KMC Metropolitan Application',
      tags: ['Flutter', 'UI Design'],
      image:
          'https://play-lh.googleusercontent.com/R-035m6UVghnUhuIYzt2s-Fni7Mq54UZDiIAgFxd3Id6Fj376GKM-IzMmGxVFBLEJQ=w600-h300-pc0xffffff-pd',
    ),
    Project(
      title: 'Budhanilkantta Municipality Application',
      tags: ['Flutter', 'UI Design'],
      image:
          'https://play-lh.googleusercontent.com/GfvBmNFuusZE9h153_gBvKQ0AwQ_fXGJ1lfCJ1j9JTArd-GsgIhOzJEzI-Hm7uMJAXg=w240-h480-rw',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _startAutoSlide();
  }

  void _startAutoSlide() {
    _timer = Timer.periodic(Duration(seconds: 3), (timer) {
      if (_currentPage < projects.length - 1) {
        _currentPage++;
      } else {
        _currentPage = 0;
      }
      _pageController.animateToPage(
        _currentPage,
        duration: Duration(milliseconds: 600),
        curve: Curves.easeInOut,
      );
    });
  }

  void _nextSlide() {
    _timer.cancel();
    if (_currentPage < projects.length - 1) {
      _currentPage++;
    } else {
      _currentPage = 0;
    }
    _pageController.animateToPage(
      _currentPage,
      duration: Duration(milliseconds: 600),
      curve: Curves.easeInOut,
    );
    _startAutoSlide();
  }

  void _prevSlide() {
    _timer.cancel();
    if (_currentPage > 0) {
      _currentPage--;
    } else {
      _currentPage = projects.length - 1;
    }
    _pageController.animateToPage(
      _currentPage,
      duration: Duration(milliseconds: 600),
      curve: Curves.easeInOut,
    );
    _startAutoSlide();
  }

  @override
  void dispose() {
    _timer.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'PROJECTS',
            style: TextStyle(
              fontSize: 64,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 40),
          // Use a container with a fixed height for the carousel area
          Container(
            height:
                250, // Adjust the height of the container to make cards smaller
            child: PageView.builder(
              controller: _pageController,
              itemCount: projects.length,
              onPageChanged: (index) {
                setState(() {
                  _currentPage = index;
                });
              },
              // Show the previous and next card by adjusting the viewportFraction
              itemBuilder: (context, index) {
                return Transform.scale(
                  scale:
                      index == _currentPage ? 1 : 0.9, // Scale the current card
                  child: GlassmorphicProjectCard(project: projects[index]),
                );
              },
            ),
          ),
          const SizedBox(height: 20),
          // Navigation buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: _prevSlide,
                style: ElevatedButton.styleFrom(
                  shape: CircleBorder(),
                  padding: EdgeInsets.all(16),
                  backgroundColor: Colors.white.withOpacity(0.2),
                ),
                child: Icon(Icons.arrow_back, color: Colors.white),
              ),
              const SizedBox(width: 20),
              ElevatedButton(
                onPressed: _nextSlide,
                style: ElevatedButton.styleFrom(
                  shape: CircleBorder(),
                  padding: EdgeInsets.all(16),
                  backgroundColor: Colors.white.withOpacity(0.2),
                ),
                child: Icon(Icons.arrow_forward, color: Colors.white),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class Project {
  final String title;
  final List<String> tags;
  final String image;
  Project({required this.title, required this.tags, required this.image});
}
