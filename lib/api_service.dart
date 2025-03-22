import 'dart:developer';

import 'package:dev_dsgnr/app_constants.dart';
import 'package:dev_dsgnr/user_data_model.dart';
import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio = Dio();
  final String baseUrl = AppConstants.api; // Replace with your API URL

  Future<UserData?> fetchUserData() async {
    try {
      Response response = await _dio.get(baseUrl);
      if (response.statusCode == 200) {
        return UserData.fromJson(response.data);
      } else {
        log("Error: ${response.statusMessage}");
        return null;
      }
    } catch (e) {
      log("Exception: $e");
      return null;
    }
  }
}
