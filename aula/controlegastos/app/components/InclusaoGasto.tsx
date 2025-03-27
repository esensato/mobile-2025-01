import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

// criar um componente para a inclusao do gasto
// passar o parametro callback (funcao a ser acionada quando o gasto for incluido)
const InclusaoGasto = (props: any) => {

    let [descricaoGasto, setDescricaoGasto] = useState("");
    let [valorGasto, setValorGasto] = useState("");

    const enviarGasto = () => {
        // chama de volta a funcao passada como parametro no props (callback)
        props.callback(descricaoGasto, valorGasto);
        setDescricaoGasto("");
        setValorGasto("");
    }

    return <View style={estilos.cadastro}>
        <View>
            <TextInput style={estilos.caixatexto}
                placeholder="Descrição do Gasto"
                onChangeText={(conteudo) => setDescricaoGasto(conteudo)}
                value={descricaoGasto}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TextInput style={estilos.caixatexto}
                    placeholder="Valor do Gasto"
                    onChangeText={(conteudo) => setValorGasto(conteudo)}
                    value={valorGasto}
                />
                <View style={{ height: 40 }}>
                    <Button title="Incluir Gasto" onPress={enviarGasto} />
                </View>
            </View>
            <Text>Total Gastos: R$ {props.total}</Text>

        </View>

    </View>
}

const estilos = StyleSheet.create({
    cadastro: {
        flex: 1,
        justifyContent: "space-between"
    },
    caixatexto: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5
    },
})

export default InclusaoGasto;