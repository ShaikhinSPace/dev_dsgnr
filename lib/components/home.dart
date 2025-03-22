import 'package:dev_dsgnr/bloc/user_profile_bloc.dart';
import 'package:dev_dsgnr/components/about.dart';
import 'package:dev_dsgnr/components/fade_in.dart';
import 'package:dev_dsgnr/components/footer.dart';
import 'package:dev_dsgnr/components/header.dart';
import 'package:dev_dsgnr/components/hero_section.dart';
import 'package:dev_dsgnr/components/projects.dart';
import 'package:dev_dsgnr/user_data_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    context.read<UserBloc>().add(FetchUserData());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Positioned.fill(
              child: GridPaper(
                interval: 100,
                divisions: 3,
                color: Color.fromARGB(255, 2, 2, 220),
              ),
            ),
            BlocBuilder<UserBloc, UserState>(
              builder: (context, state) {
                if (state is UserInitial) {
                  return Center(child: CircularProgressIndicator());
                } else if (state is UserLoading) {
                  return Center(child: Text('Error loading user profile'));
                } else if (state is UserLoaded) {
                  UserData userProfile = state.userData;
                  return Column(
                    children: [
                      Padding(
                        padding: EdgeInsets.all(10),
                        child: Stack(
                          children: [
                            // Moves GridPaper to the background
                            Column(
                              children: [
                                BrutalistHeader(),
                                SwissHeroSection(
                                  header1:
                                      userProfile
                                          .fields
                                          ?.header1
                                          ?.stringValue ??
                                      '',
                                  header2:
                                      userProfile
                                          .fields
                                          ?.header2
                                          ?.stringValue ??
                                      '',
                                  header3:
                                      userProfile
                                          .fields
                                          ?.header3
                                          ?.stringValue ??
                                      '',
                                ),
                                FadeInSection(
                                  keyValue: 'About',
                                  child: SwissAboutSection(),
                                ),
                                FadeInSection(
                                  keyValue: 'projects',
                                  child: GlassmorphicProjects(),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      SwissFooter(),
                    ],
                  );
                } else {
                  return Container();
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
