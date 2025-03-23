import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SwissHeroSection extends StatelessWidget {
  final String? header1;
  final String? header2;
  final String? header3;
  const SwissHeroSection({super.key, this.header1, this.header2, this.header3});

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double fontSize = screenWidth > 600 ? 80 : 48;

    return Row(
      children: [
        Container(
          color: Colors.transparent,
          padding: EdgeInsets.symmetric(vertical: 100, horizontal: 20),
          child: Column(
            crossAxisAlignment:
                CrossAxisAlignment.start, // Left-aligned text for Swiss design
            children: [
              Text(
                header1 ?? 'Null',
                style: GoogleFonts.libreCaslonDisplay(
                  // Replace 'Lato' with your preferred font
                  fontSize: fontSize,
                  fontWeight: FontWeight.bold,
                  height: 0.9,
                  color: Colors.black,
                ),
              ),
              Text(
                header2 ?? 'Null',
                style: GoogleFonts.adamina(
                  fontSize: fontSize,
                  fontWeight: FontWeight.bold,
                  height: 0.9,
                  color: Color.fromARGB(255, 2, 2, 220),
                ),
              ),
              Row(
                children: [
                  Text(
                    header3 ?? 'Null',
                    style: GoogleFonts.libreCaslonDisplay(
                      // Replace 'Lato' with your preferred font
                      fontSize: fontSize,
                      fontWeight: FontWeight.bold,
                      height: 0.9,
                      color: Colors.black,
                    ),
                  ),
                  Text(
                    '*',
                    style: GoogleFonts.libreCaslonDisplay(
                      // Replace 'Lato' with your preferred font
                      fontSize: fontSize,
                      fontWeight: FontWeight.bold,
                      height: 0.9,
                      color: Color.fromARGB(255, 2, 2, 220),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 40),
              Container(
                width:
                    screenWidth > 600 ? screenWidth * 0.5 : screenWidth * 0.8,
                child: Text(
                  'Mobile app developer and designer creating intuitive, innovative, and impactful digital solutions.',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.normal),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
