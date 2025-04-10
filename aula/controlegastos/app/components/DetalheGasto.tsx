import { StyleSheet, View, KeyboardAvoidingView, Modal, Text, Pressable } from "react-native";

export default function DetalheGasto(props: any) {

  return <KeyboardAvoidingView style={estilos.painel} behavior="height">

    <Text style={estilos.texto}>Descrição: {props.route.params.descricao}</Text>
    <Text style={estilos.texto}>Valor: R$ {props.route.params.valor}</Text>

  </KeyboardAvoidingView >

}

const estilos = StyleSheet.create({
  painel: {
    margin: 50,
    flex: 1
  },
  texto: {
    padding: 10,
    fontSize: 20
  }
});

