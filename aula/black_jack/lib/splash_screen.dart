import 'package:flutter/material.dart';

class BlackJackSplash extends StatelessWidget {

  final Function? onTimeout;

  const BlackJackSplash({super.key, this.onTimeout});

  @override
  Widget build(BuildContext context) {

    Future.delayed(const Duration(seconds: 5), () {
      onTimeout!();
    });

    return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Image.asset("assets/blackjack-logo.png")
            ],
          ),
        )
    );
  }

}