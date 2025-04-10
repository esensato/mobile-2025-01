import { NavigationIndependentTree } from "@react-navigation/native";
import TelaPrincipal from "./components/TelaPrincipal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetalheGasto from "./components/DetalheGasto";

const Stack = createNativeStackNavigator();

export default function Index() {

  return <NavigationIndependentTree>
    <Stack.Navigator>
      <Stack.Screen name="Principal" component={TelaPrincipal} />
      <Stack.Screen name="Detalhe" component={DetalheGasto} />
    </Stack.Navigator>
  </NavigationIndependentTree>

}