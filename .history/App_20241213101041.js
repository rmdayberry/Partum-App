import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "./contexts/UserContext";
import Dashboard from "./screens/Dashboard";
import Appointments from "./screens/Appointments";
import Education from "./screens/Education";
import MorePage from "./screens/MorePage";
import Registration from "./screens/Registration";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs for Home
const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = focused ? "home" : "home-outline";
        else if (route.name === "Appointments")
          iconName = focused ? "calendar" : "calendar-outline";
        else if (route.name === "Learn")
          iconName = focused ? "book" : "book-outline";
        else if (route.name === "More")
          iconName = focused
            ? "ellipsis-horizontal"
            : "ellipsis-horizontal-outline";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007Aff",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={Dashboard} />
    <Tab.Screen name="Appointments" component={Appointments} />
    <Tab.Screen name="Learn" component={Education} />
    <Tab.Screen name="More" component={MorePage} />
  </Tab.Navigator>
);

const App = () => {
  const [userId, setUserId] = useState(null);
  const [languagePreference, setLanguagePreference] = useState("English");

  useEffect(() => {
    const loadUser = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedLanguage = await AsyncStorage.getItem("languagePreference");
      if (storedUserId) setUserId(storedUserId);
      if (storedLanguage) setLanguagePreference(storedLanguage);
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        languagePreference,
        setLanguagePreference,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userId ? (
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              initialParams={{ userId }}
            />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registration" component={Registration} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
