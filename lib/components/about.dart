import 'package:dev_dsgnr/components/circle.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SwissAboutSection extends StatelessWidget {
  const SwissAboutSection({Key? key}) : super(key: key);

  static const double _mobileBreakpoint = 600;

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isLargeScreen = screenWidth > _mobileBreakpoint;

    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // WHO AM I Card
          Card(
            elevation: 0,
            color: const Color.fromARGB(255, 250, 250, 250),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'About',
                    style: GoogleFonts.notoSans(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.1,
                    child: Divider(
                      color: Color.fromARGB(255, 2, 2, 220),
                      thickness: 5,
                    ),
                  ),
                  SizedBox(height: 20),
                  isLargeScreen
                      ? Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 2,
                            child: _buildTextSection(
                              title: 'WHO AM I',
                              content:
                                  'I am a passionate Flutter developer with a keen eye for design and a love for creating seamless user experiences. My journey in tech has been driven by curiosity and a desire to innovate.',
                            ),
                          ),

                          Expanded(child: CircleWidget()),
                        ],
                      )
                      : _buildTextSection(
                        title: 'WHO AM I',
                        content:
                            'I am a passionate Flutter developer with a keen eye for design and a love for creating seamless user experiences. My journey in tech has been driven by curiosity and a desire to innovate.',
                      ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 20),

          // APPROACH Card
          Card(
            color: const Color.fromARGB(255, 250, 250, 250),
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Approach',
                    style: GoogleFonts.notoSans(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.1,
                    child: Divider(
                      color: Color.fromARGB(255, 2, 2, 220),
                      thickness: 5,
                    ),
                  ),
                  SizedBox(height: 20),
                  Row(
                    children: [
                      CircleWidget(),
                      const SizedBox(width: 20),
                      _buildTextSection(title: '', content: 'This is a Test'),
                    ],
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 20),

          // EXPERTISE Card
          Card(
            elevation: 4,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: _buildExpertiseSection(),
            ),
          ),
        ],
      ),
    );
  }

  /// Builds a section with title and content
  Widget _buildTextSection({required String title, required String content}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          overflow: TextOverflow.fade,
          maxLines: 1,
          title,
          style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Text(content, style: const TextStyle(fontSize: 20, height: 1.5)),
      ],
    );
  }

  /// Builds the expertise section with a list of skills.
  Widget _buildExpertiseSection() {
    final skills = [
      'FLUTTER',
      'DART',
      'BLOC STATE MANAGEMENT',
      'MOBILE DEVELOPMENT',
      'CROSS-PLATFORM DEVELOPMENT',
      'UI/UX DESIGN',
      'RESTful API',
      'FIREBASE',
      'SECURE STORAGE',
      'ENCRYPTION',
      'PERFORMANCE OPTIMIZATION',
      'ANIMATIONS',
      'CODE REVIEW',
      'DEBUGGING',
      'TESTING',
      'VERSION CONTROL',
      'AGILE METHODOLOGIES',
      'CLEAN ARCHITECTURE',
      'SOLID PRINCIPLES',
      'MULTI-THREADING',
      'MEMORY MANAGEMENT',
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'EXPERTISE',
          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children:
              skills
                  .map(
                    (skill) => Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 15,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        skill,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  )
                  .toList(),
        ),
      ],
    );
  }
}
