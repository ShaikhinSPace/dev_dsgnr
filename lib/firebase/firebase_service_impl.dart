import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dev_dsgnr/firebase/firebase_service.dart';

class FirestoreServiceImpl implements FirestoreService {
  final FirebaseFirestore firestore;

  // Constructor with dependency injection for FirebaseFirestore
  FirestoreServiceImpl({required this.firestore});

  @override
  Future<Map<String, dynamic>> getDocumentData(String documentId) async {
    try {
      DocumentSnapshot docSnapshot =
          await firestore
              .collection('Content') // Replace with your collection name
              .doc(documentId)
              .get();

      if (docSnapshot.exists) {
        return docSnapshot.data() as Map<String, dynamic>;
      } else {
        throw Exception('Document not found');
      }
    } catch (e) {
      throw Exception('Error fetching data: $e');
    }
  }

  @override
  Future<List<Map<String, dynamic>>> getAllDocuments() async {
    try {
      QuerySnapshot querySnapshot =
          await firestore
              .collection('Content') // Replace with your collection name
              .get();

      return querySnapshot.docs
          .map((doc) => doc.data() as Map<String, dynamic>)
          .toList();
    } catch (e) {
      throw Exception('Error fetching documents: $e');
    }
  }
}
