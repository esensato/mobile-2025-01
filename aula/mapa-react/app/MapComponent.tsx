import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, MapPressEvent, Marker, UrlTile } from 'react-native-maps';
import * as Notifications from 'expo-notifications';

export default function MapComponent(props: any) {

    const [marcadores, setMarcadores] = useState([
        { key: "m2", coord: { latitude: -23.6, longitude: -46.64433318786136 }, title: "M2", description: "Marcador 2" },
        { key: "m1", coord: { latitude: -23.586931331827458, longitude: -46.64433318786136 }, title: "M1", description: "Marcador 1" },
    ])

    const enviarNotificacao = async () => {

        const perm = await Notifications.getPermissionsAsync();

        console.log(perm);

        if (perm.status === 'denied') {
            await Notifications.requestPermissionsAsync();
        }

    }
    return (
        <View style={styles.container}>
            <MapView
                onPress={
                    (aqui: MapPressEvent) => {
                        console.log(aqui.nativeEvent.coordinate)
                        const novoMarcador = [...marcadores, {
                            key: "m2_" + marcadores.length + 1,
                            coord: aqui.nativeEvent.coordinate,
                            title: "Novo",
                            description: "Novo Marcador"
                        },
                        ];

                        setMarcadores(novoMarcador);
                    }
                }
                style={styles.map}
                initialRegion={{
                    latitude: -23.586931331827458,
                    longitude: -46.64433318786136,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>

                <UrlTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={23} />

                {marcadores.map((item: any, idx: number) => (
                    <Marker
                        key={idx}
                        coordinate={item.coord}
                        title={item.title}
                        //image={require('../assets/images/coin.png')}
                        description={item.description} />
                ))}

            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});