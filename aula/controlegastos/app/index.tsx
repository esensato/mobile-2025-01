import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {

  let mensagem = "Joao";
  let x = 10;
  //let total = 100;

  let [total, setTotal] = useState(100);
  let [destaque, setDestaque] = useState(estilos.linha);

  const getMensagem = () => "Bom dia";
  const somar = () => {
    setTotal(total++);
    console.log(total);
  }

  const zerar = () => {
    setTotal(0);
  }

  const aplicaDestaque = () => {
    if (destaque.backgroundColor === "white") {
      setDestaque(estilos.linhaDestaque);
    } else {
      setDestaque(estilos.linha);
    }

    console.log(destaque);
  }

  return <View style={estilos.painel}>
    <Text style={estilos.linha}>{getMensagem()} {mensagem} {mensagem} {x * 2}</Text>
    <Text style={destaque}>Linha 2</Text>
    <Text style={estilos.linha}>Total: {total}</Text>
    <View style={{ flexDirection: "row" }}>
      <Button title="Somar" onPress={somar} />
      <Button title="Zerar" onPress={zerar} />
      <Button title="Destaque" onPress={aplicaDestaque} />
    </View>

  </View>

}

const estilos = StyleSheet.create({
  painel: {
    margin: 50,
    borderWidth: 2,
    flex: 1
  },
  corpo: {
    flex: 5,
    borderWidth: 2
  },
  linha: {
    flex: 1,
    borderWidth: 2,
    fontSize: 20,
    backgroundColor: "white"
  },
  linhaDestaque: {
    flex: 1,
    borderWidth: 2,
    fontSize: 20,
    backgroundColor: "red"
  }

});

