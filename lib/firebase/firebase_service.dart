abstract class FirestoreService {
  Future<Map<String, dynamic>> getDocumentData(String documentId);
  Future<List<Map<String, dynamic>>> getAllDocuments();
}
