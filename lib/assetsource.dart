class AssetSource {
  static const String _basePath = 'assets/';

  // Singleton pattern (optional, remove if multiple instances are needed)
  static final AssetSource _instance = AssetSource._internal();
  factory AssetSource() => _instance;

  AssetSource._internal();

  String get logo => 'slogo.png';

  String getAsset(String fileName) => '$_basePath$fileName';
}
