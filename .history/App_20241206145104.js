const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;