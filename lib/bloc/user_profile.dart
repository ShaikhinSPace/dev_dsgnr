// user_profile.dart
class UserProfile {
  final String header1;
  final String header2;
  final String header3;
  final String approach;
  final List<String> expertise;
  final List<FooterItem> footer;
  final List<Project> projects;

  UserProfile({
    required this.header1,
    required this.header2,
    required this.header3,
    required this.approach,
    required this.expertise,
    required this.footer,
    required this.projects,
  });

  factory UserProfile.fromFirestore(Map<String, dynamic> data) {
    // Handle expertise array
    List<String> expertiseList = [];
    if (data['expertise'] != null && data['expertise']['arrayValue'] != null) {
      final values = data['expertise']['arrayValue']['values'] as List<dynamic>;
      expertiseList =
          values.map((item) => item['stringValue'] as String).toList();
    }

    // Handle footer array
    List<FooterItem> footerList = [];
    if (data['footer'] != null && data['footer']['arrayValue'] != null) {
      final values = data['footer']['arrayValue']['values'] as List<dynamic>;
      footerList =
          values.map((item) {
            final fields = item['mapValue']['fields'];
            // Determine which social media type this is
            if (fields.containsKey('instagram')) {
              return FooterItem(
                type: 'instagram',
                link: fields['instagram']['stringValue'],
              );
            } else if (fields.containsKey('gitlab')) {
              return FooterItem(
                type: 'gitlab',
                link: fields['gitlab']['stringValue'],
              );
            } else if (fields.containsKey('linkedin')) {
              return FooterItem(
                type: 'linkedin',
                link: fields['linkedin']['stringValue'],
              );
            }
            return FooterItem(type: 'unknown', link: '');
          }).toList();
    }

    // Handle projects array
    List<Project> projectsList = [];
    if (data['projects'] != null && data['projects']['arrayValue'] != null) {
      final values = data['projects']['arrayValue']['values'] as List<dynamic>;
      projectsList =
          values.map((item) {
            final fields = item['mapValue']['fields'];
            return Project(
              title: fields['title']['stringValue'],
              link: fields['link']['stringValue'],
              description: fields['description']['stringValue'],
            );
          }).toList();
    }

    return UserProfile(
      header1: data['header_1']['stringValue'],
      header2: data['header_2']['stringValue'],
      header3: data['header_3']['stringValue'],
      approach: data['approach']['stringValue'],
      expertise: expertiseList,
      footer: footerList,
      projects: projectsList,
    );
  }
}

class FooterItem {
  final String type;
  final String link;

  FooterItem({required this.type, required this.link});
}

class Project {
  final String title;
  final String link;
  final String description;

  Project({required this.title, required this.link, required this.description});
}
