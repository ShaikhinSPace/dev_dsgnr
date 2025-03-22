import 'package:dev_dsgnr/api_service.dart';
import 'package:dev_dsgnr/bloc/user_profile_bloc.dart';
import 'package:dev_dsgnr/components/home.dart' show HomePage;
import 'package:dev_dsgnr/firebase_options.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (context) => UserBloc(ApiService()), // Inject API service
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          fontFamily: 'Helvetica', // Swiss design typically uses Helvetica
          scaffoldBackgroundColor: Colors.white,
          colorScheme: ColorScheme.light(
            primary: Colors.black,
            secondary: Colors.red,
          ),
        ),
        home: HomePage(),
      ),
    );
  }
}
