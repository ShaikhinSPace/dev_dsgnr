import 'dart:convert';

class UserData {
  final String? name;
  final UserDataFields? fields;
  final DateTime? createTime;
  final DateTime? updateTime;

  UserData({this.name, this.fields, this.createTime, this.updateTime});

  factory UserData.fromRawJson(String str) =>
      UserData.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory UserData.fromJson(Map<String, dynamic> json) => UserData(
    name: json["name"],
    fields:
        json["fields"] == null ? null : UserDataFields.fromJson(json["fields"]),
    createTime:
        json["createTime"] == null ? null : DateTime.parse(json["createTime"]),
    updateTime:
        json["updateTime"] == null ? null : DateTime.parse(json["updateTime"]),
  );

  Map<String, dynamic> toJson() => {
    "name": name,
    "fields": fields?.toJson(),
    "createTime": createTime?.toIso8601String(),
    "updateTime": updateTime?.toIso8601String(),
  };
}

class UserDataFields {
  final Approach? header3;
  final Expertise? expertise;
  final Approach? header2;
  final Approach? header1;
  final Projects? projects;
  final Footer? footer;
  final Approach? approach;

  UserDataFields({
    this.header3,
    this.expertise,
    this.header2,
    this.header1,
    this.projects,
    this.footer,
    this.approach,
  });

  factory UserDataFields.fromRawJson(String str) =>
      UserDataFields.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory UserDataFields.fromJson(Map<String, dynamic> json) => UserDataFields(
    header3:
        json["header_3"] == null ? null : Approach.fromJson(json["header_3"]),
    expertise:
        json["expertise"] == null
            ? null
            : Expertise.fromJson(json["expertise"]),
    header2:
        json["header_2"] == null ? null : Approach.fromJson(json["header_2"]),
    header1:
        json["header_1"] == null ? null : Approach.fromJson(json["header_1"]),
    projects:
        json["projects"] == null ? null : Projects.fromJson(json["projects"]),
    footer: json["footer"] == null ? null : Footer.fromJson(json["footer"]),
    approach:
        json["approach"] == null ? null : Approach.fromJson(json["approach"]),
  );

  Map<String, dynamic> toJson() => {
    "header_3": header3?.toJson(),
    "expertise": expertise?.toJson(),
    "header_2": header2?.toJson(),
    "header_1": header1?.toJson(),
    "projects": projects?.toJson(),
    "footer": footer?.toJson(),
    "approach": approach?.toJson(),
  };
}

class Approach {
  final String? stringValue;

  Approach({this.stringValue});

  factory Approach.fromRawJson(String str) =>
      Approach.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Approach.fromJson(Map<String, dynamic> json) =>
      Approach(stringValue: json["stringValue"]);

  Map<String, dynamic> toJson() => {"stringValue": stringValue};
}

class Expertise {
  final ExpertiseArrayValue? arrayValue;

  Expertise({this.arrayValue});

  factory Expertise.fromRawJson(String str) =>
      Expertise.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Expertise.fromJson(Map<String, dynamic> json) => Expertise(
    arrayValue:
        json["arrayValue"] == null
            ? null
            : ExpertiseArrayValue.fromJson(json["arrayValue"]),
  );

  Map<String, dynamic> toJson() => {"arrayValue": arrayValue?.toJson()};
}

class ExpertiseArrayValue {
  final List<Approach>? values;

  ExpertiseArrayValue({this.values});

  factory ExpertiseArrayValue.fromRawJson(String str) =>
      ExpertiseArrayValue.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory ExpertiseArrayValue.fromJson(Map<String, dynamic> json) =>
      ExpertiseArrayValue(
        values:
            json["values"] == null
                ? []
                : List<Approach>.from(
                  json["values"]!.map((x) => Approach.fromJson(x)),
                ),
      );

  Map<String, dynamic> toJson() => {
    "values":
        values == null
            ? []
            : List<dynamic>.from(values!.map((x) => x.toJson())),
  };
}

class Footer {
  final FooterArrayValue? arrayValue;

  Footer({this.arrayValue});

  factory Footer.fromRawJson(String str) => Footer.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Footer.fromJson(Map<String, dynamic> json) => Footer(
    arrayValue:
        json["arrayValue"] == null
            ? null
            : FooterArrayValue.fromJson(json["arrayValue"]),
  );

  Map<String, dynamic> toJson() => {"arrayValue": arrayValue?.toJson()};
}

class FooterArrayValue {
  final List<PurpleValue>? values;

  FooterArrayValue({this.values});

  factory FooterArrayValue.fromRawJson(String str) =>
      FooterArrayValue.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory FooterArrayValue.fromJson(Map<String, dynamic> json) =>
      FooterArrayValue(
        values:
            json["values"] == null
                ? []
                : List<PurpleValue>.from(
                  json["values"]!.map((x) => PurpleValue.fromJson(x)),
                ),
      );

  Map<String, dynamic> toJson() => {
    "values":
        values == null
            ? []
            : List<dynamic>.from(values!.map((x) => x.toJson())),
  };
}

class PurpleValue {
  final PurpleMapValue? mapValue;

  PurpleValue({this.mapValue});

  factory PurpleValue.fromRawJson(String str) =>
      PurpleValue.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory PurpleValue.fromJson(Map<String, dynamic> json) => PurpleValue(
    mapValue:
        json["mapValue"] == null
            ? null
            : PurpleMapValue.fromJson(json["mapValue"]),
  );

  Map<String, dynamic> toJson() => {"mapValue": mapValue?.toJson()};
}

class PurpleMapValue {
  final PurpleFields? fields;

  PurpleMapValue({this.fields});

  factory PurpleMapValue.fromRawJson(String str) =>
      PurpleMapValue.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory PurpleMapValue.fromJson(Map<String, dynamic> json) => PurpleMapValue(
    fields:
        json["fields"] == null ? null : PurpleFields.fromJson(json["fields"]),
  );

  Map<String, dynamic> toJson() => {"fields": fields?.toJson()};
}

class PurpleFields {
  final Approach? instagram;
  final Approach? gitlab;
  final Approach? linkedin;

  PurpleFields({this.instagram, this.gitlab, this.linkedin});

  factory PurpleFields.fromRawJson(String str) =>
      PurpleFields.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory PurpleFields.fromJson(Map<String, dynamic> json) => PurpleFields(
    instagram:
        json["instagram"] == null ? null : Approach.fromJson(json["instagram"]),
    gitlab: json["gitlab"] == null ? null : Approach.fromJson(json["gitlab"]),
    linkedin:
        json["linkedin"] == null ? null : Approach.fromJson(json["linkedin"]),
  );

  Map<String, dynamic> toJson() => {
    "instagram": instagram?.toJson(),
    "gitlab": gitlab?.toJson(),
    "linkedin": linkedin?.toJson(),
  };
}

class Projects {
  final ProjectsArrayValue? arrayValue;

  Projects({this.arrayValue});

  factory Projects.fromRawJson(String str) =>
      Projects.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Projects.fromJson(Map<String, dynamic> json) => Projects(
    arrayValue:
        json["arrayValue"] == null
            ? null
            : ProjectsArrayValue.fromJson(json["arrayValue"]),
  );

  Map<String, dynamic> toJson() => {"arrayValue": arrayValue?.toJson()};
}

class ProjectsArrayValue {
  final List<FluffyValue>? values;

  ProjectsArrayValue({this.values});

  factory ProjectsArrayValue.fromRawJson(String str) =>
      ProjectsArrayValue.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory ProjectsArrayValue.fromJson(Map<String, dynamic> json) =>
      ProjectsArrayValue(
        values:
            json["values"] == null
                ? []
                : List<FluffyValue>.from(
                  json["values"]!.map((x) => FluffyValue.fromJson(x)),
                ),
      );

  Map<String, dynamic> toJson() => {
    "values":
        values == null
            ? []
            : List<dynamic>.from(values!.map((x) => x.toJson())),
  };
}

class FluffyValue {
  final FluffyMapValue? mapValue;

  FluffyValue({this.mapValue});

  factory FluffyValue.fromRawJson(String str) =>
      FluffyValue.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory FluffyValue.fromJson(Map<String, dynamic> json) => FluffyValue(
    mapValue:
        json["mapValue"] == null
            ? null
            : FluffyMapValue.fromJson(json["mapValue"]),
  );

  Map<String, dynamic> toJson() => {"mapValue": mapValue?.toJson()};
}

class FluffyMapValue {
  final FluffyFields? fields;

  FluffyMapValue({this.fields});

  factory FluffyMapValue.fromRawJson(String str) =>
      FluffyMapValue.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory FluffyMapValue.fromJson(Map<String, dynamic> json) => FluffyMapValue(
    fields:
        json["fields"] == null ? null : FluffyFields.fromJson(json["fields"]),
  );

  Map<String, dynamic> toJson() => {"fields": fields?.toJson()};
}

class FluffyFields {
  final Approach? title;
  final Approach? description;
  final Approach? link;

  FluffyFields({this.title, this.description, this.link});

  factory FluffyFields.fromRawJson(String str) =>
      FluffyFields.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory FluffyFields.fromJson(Map<String, dynamic> json) => FluffyFields(
    title: json["title"] == null ? null : Approach.fromJson(json["title"]),
    description:
        json["description"] == null
            ? null
            : Approach.fromJson(json["description"]),
    link: json["link"] == null ? null : Approach.fromJson(json["link"]),
  );

  Map<String, dynamic> toJson() => {
    "title": title?.toJson(),
    "description": description?.toJson(),
    "link": link?.toJson(),
  };
}
