import 'package:flutter/material.dart';

class SwissAboutSection extends StatelessWidget {
  const SwissAboutSection({Key? key}) : super(key: key);

  static const double _mobileBreakpoint = 600;

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isLargeScreen = screenWidth > _mobileBreakpoint;

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
      color: Colors.white,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          const Text(
            'ABOUT',
            style: TextStyle(fontSize: 64, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 30),

          // WHO AM I Section
          isLargeScreen
              ? Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    flex: 1,
                    child: _buildImageSection(
                      height: 400,
                      imageUrl:
                          'https://files-eight-wine.vercel.app/avatar.webp',
                    ),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    flex: 2,
                    child: _buildTextSection(
                      title: 'WHO AM I',
                      content:
                          'I am a passionate Flutter developer with a keen eye for design and a love for creating seamless user experiences. My journey in tech has been driven by curiosity and a desire to innovate.',
                    ),
                  ),
                ],
              )
              : _buildTextSection(
                title: 'WHO AM I',
                content:
                    'I am a passionate Flutter developer with a keen eye for design and a love for creating seamless user experiences. My journey in tech has been driven by curiosity and a desire to innovate.',
                includeImage: true,
                imageUrl: 'https://files-eight-wine.vercel.app/avatar.webp',
              ),
          const Divider(thickness: 2, color: Colors.black, height: 40),

          // APPROACH Section
          isLargeScreen
              ? Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    flex: 2,
                    child: _buildTextSection(
                      title: 'APPROACH',
                      content:
                          'I create digital experiences that combine form and function. My work is guided by minimalist principles, focusing on what matters most: the user experience.',
                    ),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    flex: 1,
                    child: _buildNumberSection(number: '01', height: 400),
                  ),
                ],
              )
              : _buildTextSection(
                title: 'APPROACH',
                content:
                    'I create digital experiences that combine form and function. My work is guided by minimalist principles, focusing on what matters most: the user experience.',
                includeNumber: true,
                number: '01',
              ),
          const Divider(thickness: 2, color: Colors.black, height: 40),

          // EXPERTISE Section
          isLargeScreen
              ? Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    flex: 1,
                    child: _buildNumberSection(number: '02', height: 400),
                  ),
                  const SizedBox(width: 20),
                  Expanded(flex: 2, child: _buildExpertiseSection()),
                ],
              )
              : _buildExpertiseSection(number: '02'),
          const Divider(thickness: 2, color: Colors.black, height: 40),
        ],
      ),
    );
  }

  /// Builds a section with an optional image for mobile layouts.
  Widget _buildTextSection({
    required String title,
    required String content,
    bool includeImage = false,
    String? imageUrl,
    bool includeNumber = false,
    String? number,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (includeImage && imageUrl != null) ...[
          _buildImageSection(height: 200, imageUrl: imageUrl),
          const SizedBox(height: 20),
        ],
        Text(
          title,
          style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Text(content, style: const TextStyle(fontSize: 20, height: 1.5)),
        if (includeNumber && number != null) ...[
          const SizedBox(height: 20),
          Text(
            number,
            style: const TextStyle(
              fontSize: 120,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ],
      ],
    );
  }

  /// Builds a container with an image or avatar.
  Widget _buildImageSection({
    required double height,
    required String imageUrl,
  }) {
    return Container(
      height: height,
      color: Colors.black,
      child: Center(
        child: CircleAvatar(
          radius: height * 0.25,
          backgroundImage: NetworkImage(imageUrl),
        ),
      ),
    );
  }

  /// Builds a container with a large number.
  Widget _buildNumberSection({required String number, required double height}) {
    return Container(
      height: height,
      color: Colors.black,
      child: Center(
        child: Text(
          number,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 120,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  /// Builds the expertise section with a list of skills.
  Widget _buildExpertiseSection({String? number}) {
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
        if (number != null) ...[
          _buildNumberSection(number: number, height: 200),
          const SizedBox(height: 20),
        ],
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
                      color: Colors.black,
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
