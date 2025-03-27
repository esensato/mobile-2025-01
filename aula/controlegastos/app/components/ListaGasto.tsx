import { FlatList, StyleSheet, View } from "react-native";
import ItemLista from "./ItemLista";

// criar um componente com a estrutura da lista de gasto
// listaGasto (lista dos gastos a serem exibidos na lista)
const ListaGasto = (props: any) => {
    return <View style={estilos.lista}>
        <FlatList data={props.listaGasto}
            // idx = nro do item na lista, por exemplo, "Item 1" = idx = 0, etc...
            keyExtractor={idx => idx}
            // como cada item da lista sera "desenhado" na tela
            // item = item da lista "Item 1", etc...
            // vide componente ItemLista na pasta components
            renderItem={({ item, index }) => <ItemLista index={index} item={item} icone={props.icone} />} />
    </View>
}

const estilos = StyleSheet.create({
    lista: {
        marginTop: 20,
        flex: 6
    }
});
export default ListaGasto;