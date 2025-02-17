import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const translations = {
  English: {
    title: "Settings",
    language: "Language Preference",
    notifications: "Notifications",
    account: "Account Settings",
    logout: "Logout",
    logoutMessage: "You have been logged out.",
    error: "Error",
    errorMessage: "An error occurred while logging out.",
    toggleOn: "On",
    toggleOff: "Off",
  },
  Español: {
    title: "Configuraciones",
    language: "Preferencia de Idioma",
    notifications: "Notificaciones",
    account: "Configuración de Cuenta",
    logout: "Cerrar sesión",
    logoutMessage: "Has cerrado sesión.",
    error: "Error",
    errorMessage: "Ocurrió un error al cerrar sesión.",
    toggleOn: "Encendido",
    toggleOff: "Apagado",
  },
};

const Settings = ({ navigation }) => {
  const { setUserId, languagePreference, setLanguagePreference } =
    useContext(UserContext);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const t = translations[languagePreference || "English"];

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage and reset user context
      await AsyncStorage.clear();
      setUserId(null);
      Alert.alert(t.logout, t.logoutMessage);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t.error, t.errorMessage);
    }
  };

  const handleLanguageChange = () => {
    const newLanguage =
      languagePreference === "English" ? "Español" : "English";
    setLanguagePreference(newLanguage);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>

      {/* Language Preference */}
      <TouchableOpacity
        style={styles.settingOption}
        onPress={handleLanguageChange}
      >
        <Text style={styles.optionText}>{t.language}</Text>
        <Text style={styles.languageValue}>
          {languagePreference === "English" ? "English" : "Español"}
        </Text>
      </TouchableOpacity>

      {/* Notifications */}
      <View style={styles.settingOption}>
        <Text style={styles.optionText}>{t.notifications}</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#007AFF" : "#f4f3f4"}
        />
      </View>

      {/* Account Settings */}
      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => navigation.navigate("AccountSettings")}
      >
        <Text style={styles.optionText}>{t.account}</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 16,
    color: "#555",
  },
  languageValue: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  arrow: {
    fontSize: 18,
    color: "#555",
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFA500",
    borderRadius: 30,
    alignItems: "center",
  },
});

export default Settings;
