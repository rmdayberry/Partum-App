const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Dashboard from "./screens/Dashboard";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./GlobalStyle/FontFamily/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./GlobalStyles/FontFamily/Roboto-Medium.ttf"),
    "Montserrat-Regular": require("./GlobalStyles/FontFamily/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./GlobalStyles/FontFamily/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./GlobalStyles/FontFamily/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./GlobalStyles/FontFamily/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="NotesMain"
              component={NotesMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SymptomChecker"
              component={SymptomChecker}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Education1"
              component={Education}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Appointments1"
              component={Appointments}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SupportContact"
              component={SupportContact}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewNotesOverlay1"
              component={ViewNotesOverlay}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CommunityResources1"
              component={CommunityResources}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Wellness"
              component={Wellness}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LaborPrep"
              component={LaborPrep}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PastNote"
              component={PastNote}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotesMainPastFocus"
              component={NotesMainPastFocus}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotesMainBookmarkedFocusArticles"
              component={NotesMainBookmarkedFocusArticles}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NoteIndividual"
              component={NoteIndividual}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MorePage"
              component={MorePage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;