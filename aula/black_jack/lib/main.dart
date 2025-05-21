
import 'package:black_jack/blackjackapp.dart';
import 'package:flutter/material.dart';

void main() {

  // carregar a aplicação Flutter
  runApp(BlackJackApp());

}

class ContadorApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    // MaterialApp -> Center -> Text
    return  MaterialApp(
        title: 'Simple Black Jack',
        home: ContadorStatefull()
    );
  }

}

class ContadorStatefull extends StatefulWidget {

  @override
  State<ContadorStatefull> createState() => ContadorState();

}

class ContadorState extends State<ContadorStatefull> {

  var estilo = const TextStyle(fontSize: 30, backgroundColor: Color.fromARGB(100, 10, 20, 30));

  var contador1 = 1;

  var contador2 = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Blackjack"),),
      body: Center(child: Text("Valor atual: $contador1 / $contador2",
        style: estilo,),),
      floatingActionButton: IconButton(iconSize: 30, onPressed: (){

        // desenha novamente a tela com os novos valores de variavel
        setState(() {
          contador1++;
          contador2--;
        });

        print("$contador1");

      }, icon: const Icon(Icons.accessibility)),
    );
  }

}