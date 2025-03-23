import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class SwissFooter extends StatelessWidget {
  const SwissFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 40, horizontal: 20),
      color: Colors.black,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '© 2025 DEV/DSGNR',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          Row(
            children: [
              InkWell(
                onTap: () {
                  launchUrl(
                    Uri.parse('https://www.instagram.com/sxmeersh/'),
                    mode: LaunchMode.externalApplication,
                  );
                },
                child: Text(
                  'INSTAGRAM',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(width: 20),
              Text(
                'GITHUB',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(width: 20),
              Text(
                'LINKEDIN',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
