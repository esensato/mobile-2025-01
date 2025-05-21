import 'package:flutter/material.dart';

class TelaCadastro extends StatefulWidget {

  final Function? iniciarJogoOnClick;

  TelaCadastro({super.key,  this.iniciarJogoOnClick});

  @override
  State<TelaCadastro> createState() => _TelaCadastroState();

}

class _TelaCadastroState extends State<TelaCadastro> {

  var txtNome = TextEditingController();

  Widget getTextField() {

    var txt = TextField(
        decoration: const InputDecoration(
          fillColor: Color.fromARGB(255, 100, 100, 100),
          hintText: 'Informar o nome',
          border: OutlineInputBorder(),
          labelText: 'Informe o seu nome',
        ),
        controller: txtNome);

    return Container(
      margin: const EdgeInsets.all(12),
      child: txt);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(title: const Text('Simple Black Jack')),
          body: Column(children:[
            Image.asset("assets/blackjack-logo.png", width: 128, height: 128),
            const SizedBox(height: 20.0),
            getTextField(),
            const SizedBox(height: 20.0),
          ElevatedButton(onPressed: (){
            widget.iniciarJogoOnClick!(txtNome.text);
          }, child: const Text("Jogar!"))])
      ),
    );

  }

}