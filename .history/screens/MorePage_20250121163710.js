import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import ResourceGrid from "../features/resources/ResourceGrid";

const resources = [
  {
    id: "2",
    titleKey: "communityResources",
    icon: require("../assets/CommunityResources.png"),
    route: "CommunityResources",
  },
  {
    id: "5",
    titleKey: "symptomChecker",
    icon: require("../../assets/SymptomChecker.png"),
    route: "SymptomChecker",
  },
  {
    id: "6",
    titleKey: "getSupport",
    icon: require("../../assets/GetSupport.png"),
    route: "GetSupport",
  },
  {
    id: "4",
    titleKey: "settings",
    icon: require("../../assets/Settings.png"),
    route: "Settings",
  },
];

const resourceTranslations = {
  English: {
    communityResources: "Community Resources",
    settings: "Settings",
    symptomChecker: "Symptom Checker",
    getSupport: "Get Support",
  },
  Español: {
    communityResources: "Recursos Comunitarios",
    settings: "Configuraciones",
    symptomChecker: "Revisión de Síntomas",
    getSupport: "Obtener Ayuda",
  },
};

const MorePage = ({ navigation }) => {
  const { languagePreference } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {languagePreference === "Español" ? "Más opciones" : "More Options"}
      </Text>
      <ResourceGrid
        resources={resources}
        translations={resourceTranslations}
        languagePreference={languagePreference}
        onNavigate={(route) => navigation.navigate(route)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default MorePage;
