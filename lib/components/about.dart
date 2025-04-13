import 'package:dev_dsgnr/components/circle.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class SwissAboutSection extends StatefulWidget {
  const SwissAboutSection({super.key});

  static const double _mobileBreakpoint = 600;

  @override
  State<SwissAboutSection> createState() => _SwissAboutSectionState();
}

class _SwissAboutSectionState extends State<SwissAboutSection> {

  Widget buildWhoAmICard(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isLargeScreen = screenWidth > SwissAboutSection._mobileBreakpoint;

    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // WHO AM I Card
          Card(
            elevation: 0,
            color: Theme.of(context).cardColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'About',
                    style: GoogleFonts.notoSans(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.1,
                    child: Divider(
                      color: Theme.of(context).primaryColor,
                      thickness: 5,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (isLargeScreen)
                        const Expanded(child: CircleWidget()),
                      Expanded(
                        flex: 2,
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              _buildSectionTitle('Who Am I',
                                  icon: FontAwesomeIcons.user),
                              const SizedBox(height: 10),
                              _buildTextContent(
                                  'I am a passionate Flutter developer with a keen eye for design and a love for creating seamless user experiences. My journey in tech has been driven by curiosity and a desire to innovate.'),
                            ],
                          ),
                        ),
                      ),
                      if (!isLargeScreen)
                        const Expanded(
                          child: Align(
                            alignment: Alignment.center,
                            child: CircleWidget(),
                          ),
                        ),
                    ],
                  ),
                ],
                            ),
                          ),
            ),
        ]
          ),
        
      );
  
  }

  Widget _buildSectionTitle(String title, {IconData? icon}) {
    return Row(
      children: [
        if (icon != null)
          Icon(
            icon,
            size: 24,
            color: Theme.of(context).primaryColor,
          ),
        const SizedBox(width: 10),
        Text(
          title,
          style: GoogleFonts.notoSans(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Theme.of(context).primaryColor,
          ),
        ),
      ],
    );
  }

  Widget _buildTextContent(String content) {
    return Text(
      content,
      style: GoogleFonts.lato(
        fontSize: 16,
        height: 1.6,
        color: Theme.of(context).textTheme.bodyLarge?.color,
      ),
    );
  }

  Widget _buildApproachCard(BuildContext context) {
    return Card(
      color: Theme.of(context).cardColor,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionTitle('Approach', icon: FontAwesomeIcons.route),
            const SizedBox(height: 10),
            _buildTextContent(
                'My approach to projects is detail-oriented and user-focused. I believe in creating solutions that are not only functional but also intuitive and enjoyable to use.'),
            const SizedBox(height: 20),
            const CircleWidget(),
          ],
        ),
      ),
    );
  }

  Widget _buildExpertiseCard(BuildContext context) {
    final skills = [
      {'name': 'FLUTTER', 'icon': FontAwesomeIcons.mobile},
      {'name': 'DART', 'icon': FontAwesomeIcons.code},
      {'name': 'BLoC', 'icon': FontAwesomeIcons.layerGroup},
      {'name': 'Firebase', 'icon': FontAwesomeIcons.fire},
      {'name': 'REST APIs', 'icon': FontAwesomeIcons.link},
      {'name': 'UI/UX Design', 'icon': FontAwesomeIcons.rulerCombined},
      {'name': 'Performance', 'icon': FontAwesomeIcons.gaugeHigh},
      {'name': 'Testing', 'icon': FontAwesomeIcons.vial},
      {'name': 'Version Control (Git)', 'icon': FontAwesomeIcons.git},
    ];

    return Card(
      elevation: 0,
      color: Theme.of(context).cardColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionTitle('Expertise', icon: FontAwesomeIcons.screwdriverWrench),
            const SizedBox(height: 20),
            Wrap(
              spacing: 15,
              runSpacing: 15,
              children: skills.map((skill) {
                return _buildSkillChip(skill['name'] as String, skill['icon'] as IconData);
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillChip(String skill, IconData icon) {
    return Chip(
      avatar: Icon(
        icon,
        size: 18,
        color: Theme.of(context).primaryColor,
      ),
      label: Text(
        skill,
        style: GoogleFonts.lato(
          color: Theme.of(context).textTheme.bodyLarge?.color,
          fontWeight: FontWeight.bold,
        ),
      ),
      backgroundColor: Theme.of(context).hoverColor,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          buildWhoAmICard(context),
          const SizedBox(height: 20),
          _buildApproachCard(context),
          const SizedBox(height: 20),
          _buildExpertiseCard(context),
        ],
      ),
    );
  }
}
