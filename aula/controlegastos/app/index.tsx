import { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Modal, Text, Pressable } from "react-native";
import InclusaoGasto from "./components/InclusaoGasto";
import ListaGasto from "./components/ListaGasto";
import ListaGastoDragDrop from "./components/ListaGastoDragDrop";

export default function Index() {

  let gastosIniciais = [
    { descricao: "Gasto 1", valor: 100 },
    { descricao: "Gasto 2", valor: 200 }
  ];

  // let listaGasto = ["Item 1", "Item 2", "Item 3", "Item 4"];
  let [listaGasto, addGasto] = useState(gastosIniciais);
  let [totalGasto, setTotalGasto] = useState(0);
  let [exibirModal, setExibirModal] = useState(false);

  const incluirGasto = (descricaoGasto: string, valorGasto: string) => {
    let novoGasto = { descricao: descricaoGasto, valor: parseFloat(valorGasto) };
    addGasto([...listaGasto, novoGasto]);
    let novoTotal: number = totalGasto;
    novoTotal += parseFloat(valorGasto);
    setTotalGasto(novoTotal);
    if (novoTotal > 1000) {
      setExibirModal(true);
    }
  }

  //       <ListaGasto listaGasto={listaGasto} icone={require('../assets/images/coin.png')} />

  return <KeyboardAvoidingView style={estilos.painel}>

    <InclusaoGasto callback={incluirGasto} total={totalGasto} />
    <ListaGastoDragDrop listaGasto={listaGasto} callback={(itens: any) => addGasto(itens)} />

    <Modal visible={exibirModal} transparent={true}>
      <View style={estilos.centeredView}>
        <View style={estilos.modalView}>
          <Text>Modal</Text>
          <Pressable
            style={[estilos.button, estilos.buttonClose]}
            onPress={() => setExibirModal(false)}>
            <Text>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>

  </KeyboardAvoidingView >

}

const estilos = StyleSheet.create({
  painel: {
    margin: 50,
    flex: 1,
    justifyContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    borderColor: 'red'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  }

});

