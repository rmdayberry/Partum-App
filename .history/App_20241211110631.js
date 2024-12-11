const Stack = createNativeStackNavigator();
import * as React from "react";
import {View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-reanimated";
import Dashboard from "./screens/Dashboard";
import WellnessGuide from "./screens/WellnessGuide";
import CommunityResources from "./screens/CommunityResources";
import Settings from "./screens/Settings";
import SymptomChecker from "./screens/SymptomChecker";
import GetSupport from "./screens/GetSupport";
import Appointments from "./screens/Appointments";
import Education from "./screens/Education";
import MorePage from "./screens/MorePage";
import SplashScreenComponent from "./screens/SplashScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Assign icons based on route name
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

          //Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007Aff", // Active icon color
        tabBarInactiveTintColor: "gray", //Inactive icon color
        tabBarStyle: { backgroundColor: "#fff" },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Appointments" component={Appointments} />
      <Tab.Screen name="Learn" component={Education} />
      <Tab.Screen name="More" component={MorePage} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadResources = async () => {
      try {
        // Prevent splash screen from hiding automatically
        await SplashScreen.preventAutoHideAsync();

        // Load fonts/other async tasks
        await fetchFonts();
        setFontsLoaded(true);

        // Hide splash screen after loading
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn(error);
      }
    };

    loadResources();
  }, []);

  if (!fontsLoaded) {
    //show nothing while fonts are being loaded
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
        <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
        <Stack.Screen name="WellnessGuide" options={{ headerShown: false }}>
          {() => (
            <View style={{ flex: 1 }}>
              <WellnessGuide />
              <BottomTabs />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="CommunityResources"
          component={CommunityResources}
        />
        <Stack.Screen name="Education" component={Education} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="SymptomChecker" component={SymptomChecker} />
        <Stack.Screen name="GetSupport" component={GetSupport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
