import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";

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
  },
};

const ResourceSection = () => {
  const navigation = useNavigation();
  const { languagePreference } = useContext(UserContext);

  const t =
    resourceTranslations[languagePreference] || resourceTranslations.English;

  const renderResource = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.route)}
    >
      <Image source={item.icon} style={styles.image} />
      <Text style={styles.title}>{t[item.titleKey]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {languagePreference === "Español" ? "Recursos" : "Resources"}
      </Text>
      <FlatList
        data={resources}
        renderItem={renderResource}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  listContainer: {
    paddingVertical: 10,
  },
  card: {
    width: 150,
    height: 125,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignSelf: "center",
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ResourceSection;
