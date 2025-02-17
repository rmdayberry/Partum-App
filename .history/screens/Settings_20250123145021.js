import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";

const translations = {
  English: {
    title: "Settings",
    language: "Language Preference",
    accountSettings: "Account Settings",
    name: "Name",
    dueDate: "Due Date",
    deleteAccount: "Delete Account",
    deleteAccountMessage: "Are you sure you want to delete your account?",
    logout: "Logout",
    saveChanges: "Save Changes",
  },
  Español: {
    title: "Configuraciones",
    language: "Preferencia de Idioma",
    accountSettings: "Configuración de Cuenta",
    name: "Nombre",
    dueDate: "Fecha de Parto",
    deleteAccount: "Eliminar Cuenta",
    deleteAccountMessage: "¿Estás seguro de que quieres eliminar tu cuenta?",
    logout: "Cerrar sesión",
    saveChanges: "Guardar Cambios",
  },
};

const Settings = ({ navigation }) => {
  const { setUserId, languagePreference, setLanguagePreference } =
    useContext(UserContext);

  const t = translations[languagePreference || "English"];
  const [name, setName] = useState(""); // Replace with fetched user data
  const [dueDate, setDueDate] = useState(""); // Replace with fetched user data

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUserId(null);
      Alert.alert(t.logout, "You have been logged out.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t.deleteAccount,
      t.deleteAccountMessage,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setUserId(null);
              Alert.alert(t.deleteAccount, "Your account has been deleted.");
              navigation.navigate("Login");
            } catch (error) {
              console.error("Delete account error:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSaveChanges = () => {
    Alert.alert("Success", "Your changes have been saved.");
    // Add save logic here (e.g., API call)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>

      {/* Language Preference */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t.language}</Text>
        <RNPickerSelect
          onValueChange={(value) => setLanguagePreference(value)}
          items={[
            { label: "English", value: "English" },
            { label: "Español", value: "Español" },
          ]}
          style={pickerSelectStyles}
          value={languagePreference}
        />
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t.accountSettings}</Text>

        <Text style={styles.label}>{t.name}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={t.name}
        />

        <Text style={styles.label}>{t.dueDate}</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>{t.saveChanges}</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.deleteButtonText}>{t.deleteAccount}</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>{t.logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    color: "#333",
    backgroundColor: "#FFF",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    color: "#333",
    backgroundColor: "#FFF",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
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
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFA500",
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
