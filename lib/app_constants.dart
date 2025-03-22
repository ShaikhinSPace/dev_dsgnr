class AppConstants {
  static const String baseUrl = 'https://firestore.googleapis.com/v1';
  static const String projectPath =
      '/projects/shaikh-in-space/databases/(default)/documents/Content';
  static const String documentId = 'o6tJbrT0hgxYd0GQ8baM';

  static String get api => '$baseUrl$projectPath/$documentId/';
}
