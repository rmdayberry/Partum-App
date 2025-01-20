const Stack = createNativeStackNavigator();
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardHome" component={Dashboard} />
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

const BottomTabs = () => {
  const navigation = useNavigation();
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

        // Return the icon component
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007Aff", // Active icon color
      tabBarInactiveTintColor: "gray", // Inactive icon color
      tabBarStyle: { backgroundColor: "#fff" },
    })}
  >
    <Tab.Screen
      name="Home"
      component={DashboardStack}
      options={{
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            onPress={() => {
              // Ensure navigation resets to DashboardHome
              const navigation = props.navigation;
              navigation.navigate("Home", {
                screen: "DashboardHome",
              });
            }}
          />
        ),
      }}
    />
    <Tab.Screen name="Appointments" component={AppointmentsStack} />
    <Tab.Screen name="Learn" component={EducationStack} />
    <Tab.Screen name="More" component={MoreStack} />
  </Tab.Navigator>
);

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
    // Show nothing while fonts are being loaded
    return null;
  }

  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default App;
