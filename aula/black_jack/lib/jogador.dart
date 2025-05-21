class Jogador {

  var nome = '';

  var _aposta = 0;

  get aposta => _aposta;

  set aposta (nova_aposta) {
    if (nova_aposta <= _pontos) {
      _aposta = nova_aposta;
    }
  }

  var _pontos = 100; // private
  get pontos => _pontos; // somente leitura

  set pontos (novoPonto) {
      _pontos = novoPonto;
  }
 // Jogador(var novo_nome) {
 //   this.nome = novo_nome;
 // }

  Jogador ({this.nome = 'Sem Nome'});

  @override
  String toString() {
    return '$nome - pontos: $pontos - aposta: $aposta';
  }
}