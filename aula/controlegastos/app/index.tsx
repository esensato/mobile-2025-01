import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, FlatList, Image } from "react-native";

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


  // let listaGasto = ["Item 1", "Item 2", "Item 3", "Item 4"];
  let [listaGasto, addGasto] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  let [descricaoGasto, setDescricaoGasto] = useState("");

  return <KeyboardAvoidingView style={estilos.painel}>

    <View style={estilos.cadastro}>
      <View>
        <TextInput style={estilos.caixatexto}
          placeholder="Descrição do Gasto"
          onChangeText={(conteudo) => setDescricaoGasto(conteudo)}
          value={descricaoGasto}
        />
      </View>
      <View>
        <Button title="Incluir Gasto" onPress={() => {
          addGasto([...listaGasto, descricaoGasto]);
          setDescricaoGasto("");
        }} />
      </View>
    </View>

    <View style={estilos.lista}>
      <FlatList data={listaGasto}
        keyExtractor={idx => idx}
        renderItem={({ item, index }) => {
          // caso seja par
          return <View style={estilos.itemLista}>
            <Image style={{ padding: 5 }} source={require('../assets/images/coin.png')} />
            <Text style={{ marginLeft: 10 }} key={index}>{index}-{item}</Text>
          </View>
        }} />
    </View>

  </KeyboardAvoidingView >

}

const estilos = StyleSheet.create({
  painel: {
    margin: 50,
    flex: 1
  },
  cadastro: {
    flex: 1,
    justifyContent: "space-between"
  },
  lista: {
    marginTop: 20,
    flex: 6
  },
  caixatexto: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  corpo: {
    flex: 5,
    borderWidth: 2
  },
  itemLista: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "yellow",
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

