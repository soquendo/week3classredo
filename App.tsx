import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationConfig, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';

export type StackParamList = {
  Home: undefined;
  Details: {itemId: number; otherParam?: string };
  Modal: undefined;
  Extra: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;
type DetailsScreenNavigationProp = StackNavigationProp<StackParamList, "Details">;
type DetailsScreenRouteProp = RouteProp<StackParamList, "Details">;
type ModalScreenNavigationProp = StackNavigationProp<StackParamList, "Modal">;
type ExtraScreenNavigationProp = StackNavigationProp<StackParamList, "Modal">;

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true, headerTintColor: "#8B0000"}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerTitle: "Details Screen", headerTitleStyle: { color: 'blue'} }} />
        <Stack.Screen name="Modal" component={ModalScreen} options={{presentation: "modal"}}/>
        <Stack.Screen name="Extra" component={ExtraScreen} options={{ headerShown: true, headerTitle: "Extra Screen", headerTitleStyle: { color: 'blue'} }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details", {itemId: 123, otherParam: 'test'})} />
      <Button title="Go to Modal" onPress={() => navigation.navigate("Modal")} />
      <Button title="Go to Extra" onPress={() => navigation.navigate("Extra")} />

    </View>
  )
}

export function ExtraScreen() {
  const navigation = useNavigation<ExtraScreenNavigationProp>();

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Extra Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details", {itemId: 123, otherParam: 'test'})} />
      <Button title="Go to Modal" onPress={() => navigation.navigate("Modal")} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />

    </View>
  )
}

export function DetailsScreen() {
  const {params} = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Details Screen</Text>
      <Text>itemId: {params.itemId}</Text>
      <Text>otherParam: {params.otherParam}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export function ModalScreen() {
  const navigation = useNavigation<ModalScreenNavigationProp>();

  const closeAndNavigate = () => {
		const unsubscribe = navigation.addListener("transitionEnd", () => {
			navigation.navigate("Details", { itemId: 123, otherParam: 'test' });
			unsubscribe();
		});

		navigation.dispatch(StackActions.pop(1));
	};

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Modal Screen</Text>
      <Button title="Go to details" onPress={closeAndNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
