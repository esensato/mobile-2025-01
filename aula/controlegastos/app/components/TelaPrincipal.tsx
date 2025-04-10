import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Modal, Text, Pressable } from "react-native";
import InclusaoGasto from "./InclusaoGasto";
// import ListaGasto from "./ListaGasto";
import ListaGastoDragDrop from "./ListaGastoDragDrop";
import iniciar, { inserir, listar } from "./BancoDados";
import axios from 'axios';

export default function TelaPrincipal(props: any) {

  let gastosIniciais: any[] = [];

  const listaGastoRest = async () => {
    const ret = await axios.get("https://controle-gastos.glitch.me/")
    console.log("Gastos backend", ret.data);
  }

  useEffect(() => {
    iniciar();
    addGasto(listar());
    listaGastoRest();


  }, []);

  // let listaGasto = ["Item 1", "Item 2", "Item 3", "Item 4"];
  let [listaGasto, addGasto] = useState(gastosIniciais);
  let [totalGasto, setTotalGasto] = useState(0);
  let [exibirModal, setExibirModal] = useState(false);

  const incluirGasto = (descricaoGasto: string, valorGasto: string) => {

    const ret = inserir(descricaoGasto, parseFloat(valorGasto));
    console.log(ret);

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

  return <KeyboardAvoidingView style={estilos.painel} behavior="height">

    <InclusaoGasto callback={incluirGasto} syncCallback={() => {

      listaGasto.forEach(async (gasto) => {

        console.log('Enviando: ', { descricao: gasto.descricao, valor: gasto.valor });
        try {
          const ret = await axios.post('https://controle-gastos.glitch.me/', { descricao: gasto.descricao, valor: gasto.valor })
          console.log(ret);
        } catch (e) {
          console.log('Erro ', e);
        }

      });

    }} total={totalGasto} />
    <ListaGastoDragDrop listaGasto={listaGasto}
      callback={(itens: any) => addGasto(itens)}
      detalheCallback={(gasto: any) => props.navigation.navigate("Detalhe", gasto)} />

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

