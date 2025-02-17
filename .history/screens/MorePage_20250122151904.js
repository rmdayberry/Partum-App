import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import ResourceGrid from "../features/resources/ResourceGrid";

const resources = [
  {
    id: "2",
    titleKey: "communityResources",
    subtitleKey: "communityResourcesSubtitle",
    icon: require("../assets/CommunityResources.png"),
    route: "CommunityResources",
  },
  {
    id: "5",
    titleKey: "symptomChecker",
    subtitleKey: "symptomCheckerSubtitle",
    icon: require("../assets/SymptomChecker.png"),
    route: "SymptomChecker",
  },
  {
    id: "6",
    titleKey: "getSupport",
    subtitleKey: "getSupportSubtitle",
    icon: require("../assets/GetSupport.png"),
    route: "GetSupport",
  },
  {
    id: "4",
    titleKey: "settings",
    subtitleKey: "settingsSubtitle",
    icon: require("../assets/Settings.png"),
    route: "Settings",
  },
];

const resourceTranslations = {
  English: {
    communityResources: "Community Resources",
    communityResourcesSubtitle:
      "Find transportation options, food banks, and healthcare support.",
    symptomChecker: "Symptom Checker",
    symptomCheckerSubtitle:
      "Check symptoms and learn more about health concerns.",
    getSupport: "Get Support",
    getSupportSubtitle:
      "Reach out to your clinic or discover helpful answers here.",
    settings: "Settings",
    settingsSubtitle: "Customize your experience.",
    logout: "Logout",
    logoutMessage: "You have been logged out.",
    error: "Error",
    errorMessage: "An error occurred while logging out.",
  },
  Español: {
    communityResources: "Recursos Comunitarios",
    communityResourcesSubtitle:
      "Encuentra opciones de transporte, bancos de alimentos y apoyo sanitario.",
    symptomChecker: "Revisión de Síntomas",
    symptomCheckerSubtitle:
      "Revisa síntomas y aprende más sobre preocupaciones de salud.",
    getSupport: "Obtener Ayuda",
    getSupportSubtitle:
      "Comunícate con tu clínica o descubre respuestas útiles aquí.",
    settings: "Configuraciones",
    settingsSubtitle: "Personaliza tu experiencia.",
    logout: "Cerrar sesión",
    logoutMessage: "Has cerrado sesión.",
    error: "Error",
    errorMessage: "Ocurrió un error al cerrar sesión.",
  },
};

const MorePage = ({ navigation }) => {
  const { setUserId, languagePreference } = useContext(UserContext);
  const t = resourceTranslations[languagePreference || "English"];

  const handleLogout = async () => {
    try {
      // Remove all stored tokens and user data
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("languagePreference");

      // Reset user context
      setUserId(null);

      // Show logout success message
      Alert.alert(t.logout, t.logoutMessage);

      // Redirect to Login page
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t.error, t.errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ResourceGrid
        resources={resources}
        translations={resourceTranslations}
        languagePreference={languagePreference}
        onNavigate={(route) => navigation.navigate(route)}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>{t.logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
    textAlign: "center",
    fontFamily: "Arial",
  },
  logoutButton: {
    width: "60%",
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#F36D35",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#F36D35",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MorePage;
