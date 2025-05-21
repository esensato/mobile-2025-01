import 'package:black_jack/splash_screen.dart';
import 'package:black_jack/tela_principal.dart';
import 'package:flutter/material.dart';

class BlackJackApp extends StatelessWidget {

  const BlackJackApp({super.key});

  @override
  Widget build(BuildContext context) {

    return const MaterialApp(
        title: 'Simple Black Jack',
        home: TelaPrincipal()
    );
  }
}