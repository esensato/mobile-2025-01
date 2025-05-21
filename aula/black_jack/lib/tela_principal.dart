import 'package:black_jack/splash_screen.dart';
import 'package:black_jack/tela_cadastro.dart';
import 'package:black_jack/tela_mesa_jogo.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class TelaPrincipal extends StatefulWidget {

  const TelaPrincipal({super.key});

  @override
  State<StatefulWidget> createState() => _TelaPrincipalState();

}

class _TelaPrincipalState extends State<TelaPrincipal> {

  Widget? telaExibida;

  _TelaPrincipalState() {

    telaExibida = BlackJackSplash(onTimeout: () => exibirTelaCadastro());

  }

  void exibirTelaCadastro() {

    setState(() {
      telaExibida = TelaCadastro(iniciarJogoOnClick: (nome) {

        final uri = Uri.https('simple-black-jack.glitch.me', 'pontos/$nome');

        print(uri);

        http.get(uri,
            headers: <String, String> {'Content-Type' : 'application/json', 'Accept' : 'application/json'})
            .then((resposta) {
        if (resposta.statusCode == 404) {

          final url = Uri.https('simple-black-jack.glitch.me', 'novo');
          final Map<String, String> header = {'Content-Type' : 'application/json',
            'Accept' : 'application/json'};
          final body = '{"username":"$nome"}';
            // requisição http é assíncrona
          http.post(url, headers: header, body: body).then((resp) {

            print(resp);

            exibirTelaMesa(nome: nome);

          });

        } else {
          exibirTelaMesa(nome: nome);
        }


        });


      });
    });

  }

  void exibirTelaMesa({String nome = ''}) {

    setState(() {
      telaExibida = TelaMesaJogo(nome: nome);
    });

  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(body: telaExibida);
  }

}