import 'package:flutter/material.dart';

class SwissAboutSection extends StatelessWidget {
  const SwissAboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;

    return Container(
      padding: EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      color: Colors.white,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'ABOUT',
            style: TextStyle(fontSize: 64, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 40),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (screenWidth > 600) ...[
                Expanded(
                  flex: 1,
                  child: Container(
                    height: 400,
                    color: Colors.black,
                    child: Center(
                      child: Text(
                        '01',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 120,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 20),
              ],
              Expanded(
                flex: screenWidth > 600 ? 2 : 1,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'APPROACH',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 20),
                    Text(
                      'I create digital experiences that combine form and function. My work is guided by minimalist principles, focusing on what matters most: the user experience.',
                      style: TextStyle(fontSize: 20, height: 1.5),
                    ),
                    SizedBox(height: 40),
                    Container(
                      width: double.infinity,
                      height: 2,
                      color: Colors.black,
                    ),
                    SizedBox(height: 40),
                    Text(
                      'EXPERTISE',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 20),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children:
                          [
                                'UI/UX DESIGN',
                                'FLUTTER',
                                'DART',
                                'REACT NATIVE',
                                'MOBILE DEVELOPMENT',
                                'WEB DESIGN',
                              ]
                              .map(
                                (skill) => Container(
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 15,
                                    vertical: 8,
                                  ),
                                  color: Colors.black,
                                  child: Text(
                                    skill,
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              )
                              .toList(),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
