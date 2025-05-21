import 'dart:math';

import 'package:black_jack/Utils.dart';
import 'package:black_jack/jogador.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class TelaMesaJogo extends StatefulWidget {

  Jogador? jogador_humano;

   TelaMesaJogo({super.key, nome}){
    jogador_humano = Jogador(nome: nome);
  }

  @override
  State<TelaMesaJogo> createState() => _TelaMesaJogoState();
}

class _TelaMesaJogoState extends State<TelaMesaJogo> {

  // variaveis
  var imagemCarta;
  var versoCarta;
  var _esperar = true;
  var cartas;
  var aposta = TextEditingController();
  var cartaAtual = 0;
  var valorApostado = 0;
  var totalAcumulado = 0;

  @override
  void initState() {
    super.initState();

    aposta.text = "0";
    loadImagem(nome: 'card-deck.png').then((img){
      imagemCarta = img;

      loadImagem(nome: 'verso-carta.png').then((img){
        versoCarta = img;
        // carrega as cartas com a imagem do verso
        cartas = [versoCarta, versoCarta, versoCarta, versoCarta];
        setState(() {
          _esperar = false;
        });
      });
    });

  }

  Decoration getBoxDecoration() {

    return BoxDecoration(
      color: Colors.green,
      border: Border.all(
        color: Colors.black,
        width: 2.0,
      ),
    );

  }

  Widget getPlacar() {
    return Container(margin: const EdgeInsets.only(left: 12, right: 12),
    child: Row(children: [
      Expanded(flex: 2, child: Text('${widget.jogador_humano!.nome}')),
      Expanded(flex: 1, child: Text('${widget.jogador_humano!.pontos}'))
    ]),);


  }

  Widget getMesa() {

    if (!_esperar) {
      return Container(decoration: getBoxDecoration(),
        child: Row(children: [
          Expanded(child: Image.memory(cartas[0])),
          Expanded(child: Image.memory(cartas[1])),
          Expanded(child: Image.memory(cartas[2])),
          Expanded(child: Image.memory(cartas[3]))
        ]),);
    } else {
      return Text("Aguarde...");
    }

  }

  Widget getAposta() {
    return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          IconButton(
            icon: const Icon(Icons.remove),
            onPressed: (){
              valorApostado = valorApostado - 10;
              setState(() {
                aposta.text = '$valorApostado';
              });
            },
          ),
          SizedBox(
            width: 80,
            child: TextField(
              keyboardType: TextInputType.number,
              textAlign: TextAlign.center,
              readOnly: true,
              controller: aposta,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: (){
              // implementar: aumentar aposta
              valorApostado = valorApostado + 10;
              setState(() {
                aposta.text = '$valorApostado';
              });
            },
          )
        ]);
  }

  Widget getAcoes() {
    return Row(mainAxisAlignment: MainAxisAlignment.center,
      children: [
      ElevatedButton(onPressed: (){

        int idCarta = Random().nextInt(51);

        setState(() {

          // As = 1, 2 = 2, 3 = 3, ...
          final int valorCarta = idCarta - ((idCarta ~/ 13) * 13) + 1;
          totalAcumulado += valorCarta;

          print('Total acumulado = $totalAcumulado');

          cartas[cartaAtual] = getCarta(idCarta, imagemCarta);
          if (cartaAtual < 4) {
            cartaAtual++;
          }

          if (totalAcumulado == 21) {
            setState(() {
              widget.jogador_humano!.pontos = widget.jogador_humano!.pontos + (valorApostado * 2);
              valorApostado = 0;
              aposta.text = "0";

            });
          } else  if (totalAcumulado > 21) {
            setState(() {
              widget.jogador_humano!.pontos = widget.jogador_humano!.pontos - (valorApostado);
              valorApostado = 0;
              aposta.text = "0";
            });
          } else if (cartaAtual == 4){
            setState(() {
              widget.jogador_humano!.pontos = widget.jogador_humano!.pontos + (valorApostado * 2);
              valorApostado = 0;
              aposta.text = "0";
            });
          }

          final url = Uri.https('simple-black-jack.glitch.me', '/atualizar/${widget.jogador_humano!.nome}/${widget.jogador_humano!.pontos}');
          final Map<String, String> header = {'Content-Type' : 'application/json',
            'Accept' : 'application/json'};
          // requisição http é assíncrona
          http.put(url, headers: header).then((resp) {

            print(resp);

          });
        });

      }, child: const Text("Abrir Carta")),
        ElevatedButton(onPressed: (){

          setState(() {
            cartas = [versoCarta, versoCarta, versoCarta, versoCarta];
            cartaAtual = 0;
            valorApostado = 0;
            aposta.text = "0";
          });


        }, child: const Text("Desistir"))
    ],);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(title: const Text('Simple Black Jack')),
          body: Column(children: [
            Expanded(flex: 1, child: getPlacar()),
            Expanded(flex: 5, child: getMesa()),
            Expanded(flex: 2, child: getAposta()),
            Expanded(flex: 1, child: getAcoes()),
          ])
      ),
    );
  }

}