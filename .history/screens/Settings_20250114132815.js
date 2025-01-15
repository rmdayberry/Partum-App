import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../contexts/UserContext";

// Example base URL or endpoint
const API_BASE_URL = "http://localhost:5002";

const translations = {
  English: {
    pageTitle: "Settings",
    subtitle: "Manage your preferences and account.",
    nameLabel: "Name",
    dueDateLabel: "Due Date",
    languageLabel: "Language Preference",
    editBtn: "Edit",
    cancelBtn: "Cancel",
    saveBtn: "Save",
    deleteAccount: "Delete Account",
    deleteConfirmTitle: "Delete Account?",
    deleteConfirmMessage:
      "Are you sure you want to permanently delete your account?",
    logout: "Logout",
    logoutMessage: "You have been logged out.",
    logoutErrorTitle: "Error",
    logoutErrorMsg: "An error occurred while logging out.",
    errorOccured: "An error occurred. Please try again later.",
    successUpdate: "Your settings have been updated!",
    feedbackBtn: "Help Improve the App",
  },
  Español: {
    pageTitle: "Configuraciones",
    subtitle: "Administra tus preferencias y cuenta.",
    nameLabel: "Nombre",
    dueDateLabel: "Fecha de Parto",
    languageLabel: "Preferencia de Idioma",
    editBtn: "Editar",
    cancelBtn: "Cancelar",
    saveBtn: "Guardar",
    deleteAccount: "Eliminar Cuenta",
    deleteConfirmTitle: "¿Eliminar Cuenta?",
    deleteConfirmMessage:
      "¿Estás seguro de eliminar tu cuenta permanentemente?",
    logout: "Cerrar sesión",
    logoutMessage: "Has cerrado sesión.",
    logoutErrorTitle: "Error",
    logoutErrorMsg: "Ocurrió un error al cerrar sesión.",
    errorOccured: "Ocurrió un error. Por favor, inténtalo de nuevo.",
    successUpdate: "¡Tus configuraciones han sido actualizadas!",
    feedbackBtn: "Ayuda a Mejorar la App",
  },
};

const Settings = ({ navigation }) => {
  const {
    userId,
    setUserId,
    languagePreference: ctxLanguage,
    setLanguagePreference,
  } = useContext(UserContext);

  // Local UI state
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [localLang, setLocalLang] = useState(ctxLanguage || "English");
  const [editing, setEditing] = useState(false);

  const t = translations[localLang] || translations.English;

  // --- Load user info on mount ---
  useEffect(() => {
    const loadUserInfo = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user info.");
        const userData = await response.json();

        setName(userData.name || "");
        // Format or parse your dueDate as needed. Example: "2025-04-04"
        if (userData.dueDate) {
          const isoDate = userData.dueDate.split("T")[0]; // e.g. "2025-04-04"
          setDueDate(isoDate);
        }
        setLocalLang(userData.languagePreference || "English");
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    };

    loadUserInfo();
  }, [userId]);

  // --- Toggle Edit Mode ---
  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    // Optionally re-load from context or server if you want to discard changes.
  };

  // --- Save updated info ---
  const handleSave = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dueDate,
          languagePreference: localLang,
        }),
      });
      if (!response.ok) throw new Error("Failed to update user info.");

      // Reflect changes in context if language changed
      setLanguagePreference(localLang);

      Alert.alert(t.pageTitle, t.successUpdate);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert(t.pageTitle, t.errorOccured);
    }
  };

  // --- Delete Account ---
  const handleDeleteAccount = async () => {
    if (!userId) return;
    Alert.alert(t.deleteConfirmTitle, t.deleteConfirmMessage, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: t.deleteAccount,
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete account.");

            // Clear local storage
            await AsyncStorage.multiRemove([
              "authToken",
              "refreshToken",
              "userId",
              "languagePreference",
            ]);

            // Reset context
            setUserId(null);
            setLanguagePreference("English");

            // Possibly navigate to login
            navigation.navigate("Login");
          } catch (error) {
            console.error("Error deleting account:", error);
            Alert.alert(t.pageTitle, t.errorOccured);
          }
        },
      },
    ]);
  };

  // --- Logout ---
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "authToken",
        "refreshToken",
        "userId",
        "languagePreference",
      ]);
      setUserId(null);

      Alert.alert(t.logout, t.logoutMessage);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t.logoutErrorTitle, t.logoutErrorMsg);
    }
  };

  // --- Navigate to Feedback Screen ---
  const goToFeedback = () => {
    navigation.navigate("Feedback"); // Make sure you have a "Feedback" route set up
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{t.pageTitle}</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>

        {/* Display fields */}
        <View style={styles.section}>
          <Text style={styles.label}>{t.nameLabel}</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.textValue}>{name || "—"}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.dueDateLabel}</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="YYYY-MM-DD"
            />
          ) : (
            <Text style={styles.textValue}>{dueDate || "—"}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.languageLabel}</Text>
          {editing ? (
            <DropDownPicker
              open={langOpen}
              value={localLang}
              items={[
                { label: "English", value: "English" },
                { label: "Español", value: "Español" },
              ]}
              setOpen={setLangOpen}
              setValue={setLocalLang}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          ) : (
            <Text style={styles.textValue}>{localLang}</Text>
          )}
        </View>

        {/* Edit / Save / Cancel Buttons */}
        {!editing ? (
          <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
            <Text style={styles.editBtnText}>{t.editBtn}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editButtonsRow}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{t.saveBtn}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>{t.cancelBtn}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Delete Account */}
        <TouchableOpacity
          style={styles.deleteAccountBtn}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteAccountText}>{t.deleteAccount}</Text>
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>{t.logout}</Text>
        </TouchableOpacity>

        {/* Navigate to Feedback */}
        <TouchableOpacity style={styles.feedbackBtn} onPress={goToFeedback}>
          <Text style={styles.feedbackBtnText}>{t.feedbackBtn}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 30,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#F9FAFF",
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontWeight: "600",
  },
  textValue: {
    fontSize: 16,
    color: "#555",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 15,
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 0,
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  editBtn: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  editBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#6A5ACD",
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#aaa",
    marginLeft: 10,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  deleteAccountBtn: {
    backgroundColor: "#ff726f",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  deleteAccountText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#888",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  feedbackBtn: {
    backgroundColor: "#4F46E5",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  feedbackBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
