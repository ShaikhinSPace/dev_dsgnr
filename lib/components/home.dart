import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dev_dsgnr/bloc/user_profile.dart';
import 'package:dev_dsgnr/bloc/user_profile_bloc.dart';
import 'package:dev_dsgnr/components/HERO_SECTION.DART';
import 'package:dev_dsgnr/components/about.dart';
import 'package:dev_dsgnr/components/fade_in.dart';
import 'package:dev_dsgnr/components/header.dart';
import 'package:dev_dsgnr/components/projects.dart';
import 'package:dev_dsgnr/firebase/firebase_service_impl.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
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
            BlocProvider(
              create:
                  (context) => UserProfileBloc(
                    firestoreService: FirestoreServiceImpl(
                      firestore: FirebaseFirestore.instance,
                    ),
                  )..add(FetchUserProfileEvent('o6tJbrT0hgxYd0GQ8baM')),
              child: BlocBuilder<UserProfileBloc, UserProfileState>(
                builder: (context, state) {
                  if (state is UserProfileLoading) {
                    return Center(child: CircularProgressIndicator());
                  } else if (state is UserProfileError) {
                    return Center(child: Text('Error loading user profile'));
                  } else if (state is UserProfileLoaded) {
                    UserProfile userProfile = state.userProfile;
                    return Padding(
                      padding: EdgeInsets.all(10),
                      child: Stack(
                        children: [
                          // Moves GridPaper to the background
                          Column(
                            children: [
                              BrutalistHeader(),
                              SwissHeroSection(
                                header1: userProfile.header1,
                                header2: userProfile.header2,
                                header3: userProfile.header3,
                              ),
                              FadeInSection(
                                keyValue: 'About',
                                child: SwissAboutSection(),
                              ),
                              FadeInSection(
                                keyValue: 'projects',
                                child: BrutalistProjects(),
                              ),
                            ],
                          ),
                        ],
                      ),
                    );
                  } else {
                    return Container();
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
