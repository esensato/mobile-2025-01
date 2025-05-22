import 'package:flutter/material.dart';

class TelaCadastro extends StatefulWidget {

  final Function? iniciarJogoOnClick;

  TelaCadastro({super.key,  this.iniciarJogoOnClick});

  @override
  State<TelaCadastro> createState() => _TelaCadastroState();

}

class _TelaCadastroState extends State<TelaCadastro> {

  var txtNome = TextEditingController();
  var txtValor = TextEditingController();
  var txtNumero = TextEditingController();
  var txtParImpar = TextEditingController();

  Widget getTextField(label, controller) {

    var txt = TextField(
        decoration:  InputDecoration(
          fillColor: const Color.fromARGB(255, 100, 100, 100),
          hintText: label,
          border: const OutlineInputBorder(),
          labelText: label,
        ),
        controller: controller);

    return Container(
      margin: const EdgeInsets.all(12),
      child: txt);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(title: const Text('Par ou Impar')),
          body: Column(children:[
            const SizedBox(height: 5.0),
            getTextField('Nome', txtNome),
            const SizedBox(height: 5.0),
            getTextField('Valor Aposta', txtValor),
            const SizedBox(height: 5.0),
            getTextField('Numero (0-5)', txtNumero),
            const SizedBox(height: 5.0),
            getTextField('2 - par / 1 - impar', txtParImpar),
          Flexible(child:           ListView.builder(
              itemBuilder: (context, id){
                return
                  Padding(padding: const EdgeInsets.all(2.0),
                      child:  ListTile(
                        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(6))),
                        key: Key(id.toString()),
                        tileColor: Colors.black12,
                        title: Text('Jogador 1'),
                        onTap: (){

                        },
                        trailing: const Icon(Icons.ads_click),
                      )
                  );
              },
              itemCount: 10,
              shrinkWrap: true,
              padding: const EdgeInsets.all(5.0)
          )
          )

          ])
      ),
    );

  }

}