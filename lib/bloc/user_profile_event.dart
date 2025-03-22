part of 'user_profile_bloc.dart';

abstract class UserEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class FetchUserData extends UserEvent {
  FetchUserData();

  @override
  List<Object?> get props => [];
}
