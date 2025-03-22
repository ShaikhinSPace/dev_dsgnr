import 'package:dev_dsgnr/components/projects.dart';
import 'package:flutter/material.dart';

class GlassmorphicProjectCard extends StatelessWidget {
  final Project project;

  const GlassmorphicProjectCard({super.key, required this.project});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: Container(
        // Use a dark gradient that complements the black background
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Colors.white.withOpacity(0.2)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: Image.network(project.image, fit: BoxFit.scaleDown),
            ),
            Container(
              padding: const EdgeInsets.all(12),
              // Slightly dark overlay for the details section
              color: Colors.black.withOpacity(0.3),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    project.title,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Wrap(
                    spacing: 8,
                    children:
                        project.tags.map((tag) {
                          return Chip(
                            label: Text(
                              tag,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 12,
                              ),
                            ),
                            backgroundColor: const Color.fromARGB(
                              255,
                              0,
                              57,
                              103,
                            ),
                          );
                        }).toList(),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
