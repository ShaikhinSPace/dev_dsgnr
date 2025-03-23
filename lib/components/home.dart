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
    super.initState();
    // Fire off event after super.initState() for safety
    context.read<UserBloc>().add(FetchUserData());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Positioned.fill(
              child: Expanded(
                child: GridPaper(
                  interval: 100,
                  divisions: 3,
                  color: Colors.grey,
                ),
              ),
            ),

            BlocBuilder<UserBloc, UserState>(
              builder: (context, state) {
                if (state is UserInitial || state is UserLoading) {
                  return const Center(child: CircularProgressIndicator());
                } else if (state is UserLoaded) {
                  final UserData userProfile = state.userData;
                  return Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Stack(
                          children: [
                            // Background GridPaper is already added in the main Stack.
                            Column(
                              children: [
                                const BrutalistHeader(),
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
                                const FadeInSection(
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
                      const SwissFooter(),
                    ],
                  );
                } else {
                  // Optionally handle error state
                  return Center(
                    child: Text(
                      'Something went wrong.',
                      style: Theme.of(context).textTheme.headlineLarge,
                    ),
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
