import 'package:dev_dsgnr/components/project_card.dart';
import 'package:flutter/material.dart';

class BrutalistProjects extends StatelessWidget {
  final projects = [
    Project(
      title: 'FINANCE APP',
      tags: ['UI/UX', 'Flutter', 'Dart'],
      image: 'assets/images/finance-app.jpg',
    ),
    Project(
      title: 'E-COMMERCE',
      tags: ['React Native', 'Firebase'],
      image: 'assets/images/finance-app.jpg', // Replace with actual image
    ),
    Project(
      title: 'SOCIAL MEDIA',
      tags: ['Flutter', 'UI Design'],
      image: 'assets/images/finance-app.jpg', // Replace with actual image
    ),
  ];

  BrutalistProjects({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      color: Colors.black, // Brutalist contrast
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'PROJECTS',
            style: TextStyle(
              fontSize: 64,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          SizedBox(height: 40),
          LayoutBuilder(
            builder: (context, constraints) {
              int crossAxisCount = constraints.maxWidth > 800 ? 2 : 1;
              return GridView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  childAspectRatio: 1.0, // Square layout for brutalism
                  crossAxisSpacing: 20,
                  mainAxisSpacing: 20,
                ),
                itemCount: projects.length,
                itemBuilder:
                    (context, index) =>
                        BrutalistProjectCard(project: projects[index]),
              );
            },
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
