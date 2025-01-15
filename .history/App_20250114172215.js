import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UserContext } from "./contexts/UserContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Dashboard from "./screens/Dashboard";
import Appointments from "./screens/Appointments";
import MorePage from "./screens/MorePage";
import Registration from "./screens/Registration";
import Login from "./screens/Login";
import Education from "./screens/Education";
import CommunityResources from "./screens/CommunityResources";
import GetSupport from "./screens/GetSupport";
import Settings from "./screens/Settings";
import SymptomChecker from "./screens/SymptomChecker";
import FeedbackScreen from "./screens/FeedbackScreen";

import WellnessGuide from "./screens/WellnessGuide";
import FirstTrimester from "./screens/WellnessGuideTrims/FirstTrimesterWG";
import SecondTrimester from "./screens/WellnessGuideTrims/SecondTrimesterWG";
import ThirdTrimester from "./screens/WellnessGuideTrims/ThirdTrimesterWG";
import Postpartum from "./screens/WellnessGuideTrims/PostpartumWG";

import { Color } from "./GlobalStyles";

// -------------- Stack + Tabs -------------- //
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1) Dedicated stack for Dashboard stuff
const DashboardStack = ({ userId }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard">
      {() => <Dashboard userId={userId} />}
    </Stack.Screen>

    <Stack.Screen name="CommunityResources" component={CommunityResources} />
    <Stack.Screen name="Education" component={Education} />
    <Stack.Screen name="SymptomChecker" component={SymptomChecker} />
    <Stack.Screen name="GetSupport" component={GetSupport} />
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

// 2) Dedicated stack for Wellness (the “Learn” tab)
const WellnessStack = createNativeStackNavigator();
function WellnessFlow() {
  return (
    <WellnessStack.Navigator>
      <WellnessStack.Screen
        name="WellnessGuide"
        component={WellnessGuide}
        options={{ headerShown: false }}
      />
      <WellnessStack.Screen
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
      <WellnessStack.Screen
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
      <WellnessStack.Screen
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
      <WellnessStack.Screen
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
      {/* If you want CommunityResources, SymptomChecker, etc. in this flow:
       <WellnessStack.Screen name="CommunityResources" component={CommunityResources} />
       ... etc.
      */}
    </WellnessStack.Navigator>
  );
}

// 3) The Appointments stack
const AppointmentsStack = createNativeStackNavigator();
function AppointmentsFlow() {
  return (
    <AppointmentsStack.Navigator screenOptions={{ headerShown: false }}>
      <AppointmentsStack.Screen
        name="AppointmentsHome"
        component={Appointments}
      />
    </AppointmentsStack.Navigator>
  );
}

// 4) The More stack
const MoreStack = createNativeStackNavigator();
function MoreFlow() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreHome" component={MorePage} />
      <MoreStack.Screen name="Settings" component={Settings} />
      <MoreStack.Screen name="SymptomChecker" component={SymptomChecker} />
      <MoreStack.Screen name="GetSupport" component={GetSupport} />
      <MoreStack.Screen name="Feedback" component={FeedbackScreen} />
    </MoreStack.Navigator>
  );
}

// 5) The Bottom Tabs combining the sub-stacks
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
    <Tab.Screen name="Appointments" component={AppointmentsFlow} />
    <Tab.Screen name="Learn" component={WellnessFlow} />
    <Tab.Screen name="More" component={MoreFlow} />
  </Tab.Navigator>
);

// ---------------------------------------------------------
const StackRoot = createNativeStackNavigator();

const fetchFonts = async () => {
  try {
    await Font.loadAsync({
      ArimoRegular: require("./assets/fonts/Arimo-Regular.ttf"),
    });
  } catch (error) {
    console.warn("Font loading error:", error);
  }
};

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
          <StackRoot.Navigator screenOptions={{ headerShown: false }}>
            {userId ? (
              <StackRoot.Screen name="MainTabs">
                {() => <BottomTabs userId={userId} />}
              </StackRoot.Screen>
            ) : (
              <>
                <StackRoot.Screen name="Login" component={Login} />
                <StackRoot.Screen
                  name="Registration"
                  component={Registration}
                />
              </>
            )}
          </StackRoot.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
