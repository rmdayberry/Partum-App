import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const translations = {
  English: {
    title: "Settings",
    language: "Language Preference",
    accountSettings: "Account Settings",
    name: "Name",
    email: "Email",
    dueDate: "Due Date",
    edit: "Edit",
    logout: "Logout",
    logoutMessage: "You have been logged out.",
    error: "Error",
    errorMessage: "An error occurred while logging out.",
  },
  Español: {
    title: "Configuraciones",
    language: "Preferencia de Idioma",
    accountSettings: "Configuración de Cuenta",
    name: "Nombre",
    email: "Correo Electrónico",
    dueDate: "Fecha de Parto",
    edit: "Editar",
    logout: "Cerrar sesión",
    logoutMessage: "Has cerrado sesión.",
    error: "Error",
    errorMessage: "Ocurrió un error al cerrar sesión.",
  },
};

const Settings = ({ navigation }) => {
  const { setUserId, languagePreference, setLanguagePreference } =
    useContext(UserContext);
  const [userData, setUserData] = useState({
    name: "Jane Doe", // Replace with fetched user data
    email: "jane.doe@example.com", // Replace with fetched user data
    dueDate: "2025-03-15", // Replace with fetched user data
  });

  const t = translations[languagePreference || "English"];

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUserId(null);
      Alert.alert(t.logout, t.logoutMessage);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t.error, t.errorMessage);
    }
  };

  const handleLanguageChange = (index, value) => {
    setLanguagePreference(value);
  };

  const handleEditAccount = () => {
    navigation.navigate("EditAccount", { userData, setUserData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>

      {/* Language Preference */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t.language}</Text>
        <ModalDropdown
          options={["English", "Español"]}
          defaultValue={languagePreference}
          onSelect={handleLanguageChange}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownMenu}
          dropdownTextStyle={styles.dropdownMenuText}
        />
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t.accountSettings}</Text>
        <View style={styles.accountDetails}>
          <Text style={styles.accountText}>
            {t.name}: <Text style={styles.accountValue}>{userData.name}</Text>
          </Text>
          <Text style={styles.accountText}>
            {t.email}: <Text style={styles.accountValue}>{userData.email}</Text>
          </Text>
          <Text style={styles.accountText}>
            {t.dueDate}:{" "}
            <Text style={styles.accountValue}>{userData.dueDate}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditAccount}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t.logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 10,
  },
  accountDetails: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  accountText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  accountValue: {
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFA500",
    borderRadius: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    width: 200,
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownMenu: {
    width: 200,
    borderRadius: 8,
  },
  dropdownMenuText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Settings;
