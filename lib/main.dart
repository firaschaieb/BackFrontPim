import 'package:flutter/material.dart';
import 'package:online_course/signin_signup/update.dart';
import 'screens/root_app.dart';
import 'theme/color.dart';
import 'signin_signup/login.dart';
import 'signin_signup/signup.dart';
import 'screens/track.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Online Course App',
      theme: ThemeData(
        primaryColor: primary,
      ),
      //home: RootApp(),
      routes: {
        "/": (BuildContext context) {
          return const Login();
        },
        "/home": (BuildContext context) {
          return const RootApp();
        },
        "/Signup": (BuildContext context) {
          return const Signup();
        },
        "/Track": (BuildContext context) {
          return const Track();
        },

      },
    );
  }

}