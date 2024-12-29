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
import FirstTrimester from "./screens/WellnessGuideTrims/FirstTrimesterWG";
import SecondTrimester from "./screens/WellnessGuideTrims/SecondTrimesterWG";
import ThirdTrimester from "./screens/WellnessGuideTrims/ThirdTrimesterWG";
import Postpartum from "./screens/WellnessGuideTrims/PostpartumWG";
import { Color } from "./GlobalStyles";
import "react-native-gesture-handler";
import { enableLayoutAnimations } from "react-native-reanimated";

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
    <Stack.Screen name="Dashboard">
      {() => <Dashboard userId={userId} />}
    </Stack.Screen>
    <Stack.Screen name="WellnessGuide" component={WellnessGuide} />
    <Stack.Screen
      name="FirstTrimesterWG"
      component={FirstTrimester}
      options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: Color.nEW,
        },
        headerTintColor: "#000",
        headerBackTitle: "1st Trimester",
        shadowOpacity: 0,
        elevation: 0,
      }}
    />
    <Stack.Screen
      name="SecondTrimesterWG"
      component={SecondTrimester}
      options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: Color.nEW,
        },
        headerTintColor: "#000",
        headerBackTitle: "2nd Trimester",
        shadowOpacity: 0,
        elevation: 0,
      }}
    />
    <Stack.Screen
      name="ThirdTrimesterWG"
      component={ThirdTrimester}
      options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: Color.nEW,
        },
        headerTintColor: "#000",
        headerBackTitle: "3rd Trimester",
        shadowOpacity: 0,
        elevation: 0,
      }}
    />
    <Stack.Screen
      name="PostpartumWG"
      component={Postpartum}
      options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: Color.nEW,
        },
        headerTintColor: "#000",
        headerBackTitle: "Postpartum",
        shadowOpacity: 0,
        elevation: 0,
      }}
    />
    <Stack.Screen name="CommunityResources" component={CommunityResources} />
    <Stack.Screen name="Education" component={Education} />
    <Stack.Screen name="SymptomChecker" component={SymptomChecker} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="GetSupport" component={GetSupport} />
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
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [languagePreference, setLanguagePreference] = React.useState("English");

  React.useEffect(() => {
    const loadResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();

        // Retrieve stored userId and languagePreference
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedLanguagePreference = await AsyncStorage.getItem(
          "languagePreference"
        );
        console.log("Stored User ID:", storedUserId);

        if (storedUserId) setUserId(storedUserId);
        if (storedLanguagePreference)
          setLanguagePreference(storedLanguagePreference);

        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("Error loading resources:", error);
      }
    };
    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null; // Show nothing while fonts are being loaded
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              <Stack.Screen name="MainTabs">
                {() => <BottomTabs userId={userId} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registration" component={Registration} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
