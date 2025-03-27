// criar um componente para mostrar um item na lista de gastos
// no props passar os parametros index (posicao do item na lista)
// item (gasto a ser exibido)
// icone (imagem a ser exibida junto ao item da lista)

import { Image, StyleSheet, Text, View } from "react-native"

// Ex: <ItemLista index="0" item="Gasto  10" icone={require('../assets/coin.png')}/>
const ItemLista = (props: any) => {

    return <View style={estilos.itemLista}>
        <Image style={{ padding: 5 }} source={props.icone} />
        <Text style={{ marginLeft: 10 }} key={props.index}>{props.index}-{props.item}</Text>
    </View>
}

const estilos = StyleSheet.create({
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
    }
})

export default ItemLista;