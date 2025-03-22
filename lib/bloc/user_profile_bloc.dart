import 'package:dev_dsgnr/api_service.dart';
import 'package:dev_dsgnr/user_data_model.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
part 'user_profile_event.dart';
part 'user_profile_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  final ApiService apiService;

  UserBloc(this.apiService) : super(UserInitial()) {
    on<FetchUserData>(_onFetchUserData);
  }

  Future<void> _onFetchUserData(
    FetchUserData event,
    Emitter<UserState> emit,
  ) async {
    emit(UserLoading());
    try {
      final userData = await apiService.fetchUserData();
      if (userData != null) {
        emit(UserLoaded(userData));
      } else {
        emit(UserError("Failed to load user data"));
      }
    } catch (e) {
      emit(UserError("An error occurred: $e"));
    }
  }
}
