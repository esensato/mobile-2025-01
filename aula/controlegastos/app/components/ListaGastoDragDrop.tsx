import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DragList from 'react-native-draglist';

const ListaGastoDragDrop = (props: any) => {

    const renderItem = (info: any) => {
        const { item, onDragStart, onDragEnd } = info;

        return (
            <TouchableOpacity
                style={{ padding: 10, marginBottom: 5, backgroundColor: "#CACA" }}
                key={item.descricao}
                onPressIn={onDragStart}
                onPressOut={onDragEnd}
                onLongPress={() => props.detalheCallback(item)}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 8 }}>{item.descricao}</Text>
                    <Text style={{ flex: 2 }}>R$ {item.valor}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const onReordered = async (fromIndex: number, toIndex: number) => {

        console.log(fromIndex, toIndex)
        const copy = [...props.listaGasto]; // Don't modify react data in-place
        const removed = copy.splice(fromIndex, 1);

        copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
        props.callback(copy);
    }

    return <View style={estilos.lista}>
        <DragList
            data={props.listaGasto}
            keyExtractor={(item: any) => item.descricao}
            onReordered={onReordered}
            renderItem={renderItem}
        />
    </View>

}

const estilos = StyleSheet.create({
    lista: {
        marginTop: 20,
        flex: 4
    }
});

export default ListaGastoDragDrop;