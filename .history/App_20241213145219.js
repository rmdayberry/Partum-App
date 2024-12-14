import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UserContext } from "./contexts/UserContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "./screens/Dashboard";
import WellnessGuide from "./screens/WellnessGuide";
import CommunityResources from "./screens/CommunityResources";
import Settings from "./screens/Settings";
import SymptomChecker from "./screens/SymptomChecker";
import GetSupport from "./screens/GetSupport";
import Appointments from "./screens/Appointments";
import Education from "./screens/Education";
import MorePage from "./screens/MorePage";
import Registration from "./screens/Registration";
import Login from "./screens/Login";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const fetchFonts = async () => {
  try {
    await Font.loadAsync({
      ArimoRegular: require("./assets/fonts/Arimo-Regular.ttf"),
    });
  } catch (error) {
    console.warn("Font loading error:", error);
  }
};

const DashboardStack = ({ userId }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardHome">
      {() => <Dashboard userId={userId} />}
    </Stack.Screen>
    <Stack.Screen name="WellnessGuide" component={WellnessGuide} />
    <Stack.Screen name="CommunityResources" component={CommunityResources} />
  </Stack.Navigator>
);

const AppointmentsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AppointmentsHome" component={Appointments} />
  </Stack.Navigator>
);

const EducationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="EducationHome" component={Education} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MoreHome" component={MorePage} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="SymptomChecker" component={SymptomChecker} />
    <Stack.Screen name="GetSupport" component={GetSupport} />
  </Stack.Navigator>
);

const BottomTabs = ({ userId }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Appointments") {
          iconName = focused ? "calendar" : "calendar-outline";
        } else if (route.name === "Learn") {
          iconName = focused ? "book" : "book-outline";
        } else if (route.name === "More") {
          iconName = focused
            ? "ellipsis-horizontal"
            : "ellipsis-horizontal-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007Aff",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "#fff" },
    })}
  >
    <Tab.Screen name="Home">
      {() => <DashboardStack userId={userId} />}
    </Tab.Screen>

    <Tab.Screen name="Appointments" component={AppointmentsStack} />
    <Tab.Screen name="Learn" component={EducationStack} />
    <Tab.Screen name="More" component={MoreStack} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={() => <Text>Login Screen</Text>}
        />
        <Stack.Screen
          name="MainTabs"
          component={() => <Text>Main Tabs Screen</Text>}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
