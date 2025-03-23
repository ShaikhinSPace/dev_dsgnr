import 'package:flutter/material.dart';
import 'package:dev_dsgnr/components/project_card.dart';

class GlassmorphicProjects extends StatelessWidget {
  GlassmorphicProjects({Key? key}) : super(key: key);

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
      title: 'National Path Labs',
      tags: ['Flutter', 'UI Design'],
      image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3j6JWcqUSFhja_rqKnlUrVfKfb8PucOJJA&s',
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
    Project(
      title: 'CPN UML App',
      tags: ['Flutter', 'UI Design'],
      image:
          'https://play-lh.googleusercontent.com/0sLxEus620mEaNx72asMxDxWZBqeFfsa1fiuDe3wpV4NvTzJbDwCxLfeUhe2P7HjybA',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8),
      color: Colors.black,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Rotated header text on the left
          RotatedBox(
            quarterTurns: 3,
            child: const Text(
              'PROJECTS',
              style: TextStyle(
                fontSize: 64,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                letterSpacing: 2,
              ),
            ),
          ),
          const SizedBox(width: 20), // Horizontal spacing
          // Wrap the GridView with Expanded to provide finite width
          Expanded(
            child: SizedBox(
              height: 400, // Fixed heigrrht for the GridView
              child: GridView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: projects.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 1, // Two rows in the grid
                  childAspectRatio: 1.2,
                  crossAxisSpacing: 20,
                  mainAxisSpacing: 20,
                ),
                itemBuilder: (context, index) {
                  return GlassmorphicProjectCard(project: projects[index]);
                },
              ),
            ),
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
