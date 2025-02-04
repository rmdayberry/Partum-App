import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
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
    notifications: "Notifications",
    accountSettings: "Account Settings",
    name: "Name",
    dueDate: "Due Date",
    deleteAccount: "Delete Account",
    deleteAccountMessage: "Are you sure you want to delete your account?",
    logout: "Logout",
    logoutMessage: "You have been logged out.",
    save: "Save Changes",
    delete: "Delete",
  },
  Español: {
    title: "Configuraciones",
    language: "Preferencia de Idioma",
    notifications: "Notificaciones",
    accountSettings: "Configuración de Cuenta",
    name: "Nombre",
    dueDate: "Fecha de Parto",
    deleteAccount: "Eliminar Cuenta",
    deleteAccountMessage: "¿Estás seguro de que quieres eliminar tu cuenta?",
    logout: "Cerrar sesión",
    logoutMessage: "Has cerrado sesión.",
    save: "Guardar Cambios",
    delete: "Eliminar",
  },
};

const Settings = ({ navigation }) => {
  const { setUserId, languagePreference, setLanguagePreference } =
    useContext(UserContext);

  const t = translations[languagePreference || "English"];

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [name, setName] = useState(""); // Replace with fetched user data
  const [dueDate, setDueDate] = useState(""); // Replace with fetched user data

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUserId(null);
      Alert.alert(t.logout, t.logoutMessage);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t.deleteAccount,
      t.deleteAccountMessage,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: t.delete,
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
    // Add functionality to save changes (e.g., send to API)
    Alert.alert("Success", "Your changes have been saved.");
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>

      {/* Language Preference */}
      <View style={styles.settingOption}>
        <Text style={styles.optionText}>{t.language}</Text>
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
      <Text style={styles.sectionHeader}>{t.accountSettings}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t.name}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={t.name}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t.dueDate}</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="YYYY-MM-DD"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>{t.save}</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.deleteButtonText}>{t.deleteAccount}</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t.logout}</Text>
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
    paddingRight: 30,
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
    backgroundColor: "#F9FAFF",
    padding: 20,
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#6A5ACD",
  },
  inputContainer: {
    marginBottom: 15,
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  saveButton: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
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
    marginTop: 20,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFA500",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
