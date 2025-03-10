import 'dart:developer';

import 'package:dev_dsgnr/bloc/user_profile.dart';
import 'package:dev_dsgnr/firebase/firebase_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'user_profile_event.dart';
part 'user_profile_state.dart';

class UserProfileBloc extends Bloc<UserProfileEvent, UserProfileState> {
  final FirestoreService firestoreService;

  UserProfileBloc({required this.firestoreService})
    : super(UserProfileInitial()) {
    // Handle the fetch event
    on<FetchUserProfileEvent>(_onFetchUserProfile);
  }

  Future<void> _onFetchUserProfile(
    FetchUserProfileEvent event,
    Emitter<UserProfileState> emit,
  ) async {
    try {
      // First emit loading state
      emit(UserProfileLoading());

      log('Fetching user profile with ID: ${event.documentId}');

      // Fetch the user profile data from Firestore
      final documentData = await firestoreService.getDocumentData(
        event.documentId,
      );

      // Convert to user profile model
      final userProfile = UserProfile.fromFirestore(documentData);
      log('Successfully fetched user profile: $userProfile');

      emit(UserProfileLoaded(userProfile));
    } catch (e, stackTrace) {
      log('Error fetching user profile: $e');
      log(stackTrace.toString());
      emit(UserProfileError('Failed to fetch user profile: $e'));
    }
  }
}
