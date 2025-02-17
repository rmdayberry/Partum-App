import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../contexts/UserContext";

/** 
TODO:
configure these endpoints to suit backend setup.
 *  1) PATCH /users/:userId (for updating name, dueDate,      languagePreference)
 *  2) DELETE /users/:userId (account deletion)
 *  3) POST /feedback (store user feedback)
**/

const API_BASE_URL = "http://localhost:5002";

const translations = {
  English: {
    pageTitle: "Settings",
    subtitle: "Manage your preferences and account.",
    nameLabel: "Name",
    dueDateLabel: "Due Date (YYYY-MM-DD)",
    languageLabel: "Language Preference",
    updateInfo: "Save Changes",
    feedbackTitle: "Help Us Improve",
    feedbackPlaceholder: "Share your thoughts or suggestions...",
    submitFeedback: "Submit Feedback",
    deleteAccount: "Delete Account",
    deleteConfirmTitle: "Delete Account?",
    deleteConfirmMessage:
      "Are you sure you want to permanently delete your account?",
    logout: "Logout",
    logoutMessage: "You have been logged out.",
    logoutErrorTitle: "Error",
    logoutErrorMsg: "An error occurred while logging out.",
    successUpdate: "Your settings have been updated!",
    successFeedback: "Thank you for your feedback!",
    errorOccured: "An error occurred. Please try again later.",
  },
  Español: {
    pageTitle: "Configuraciones",
    subtitle: "Administra tus preferencias y cuenta.",
    nameLabel: "Nombre",
    dueDateLabel: "Fecha de parto (AAAA-MM-DD)",
    languageLabel: "Preferencia de idioma",
    updateInfo: "Guardar Cambios",
    feedbackTitle: "Ayúdanos a mejorar",
    feedbackPlaceholder: "Comparte tus comentarios o sugerencias...",
    submitFeedback: "Enviar Comentarios",
    deleteAccount: "Eliminar Cuenta",
    deleteConfirmTitle: "¿Eliminar Cuenta?",
    deleteConfirmMessage:
      "¿Estás seguro que deseas eliminar tu cuenta permanentemente?",
    logout: "Cerrar sesión",
    logoutMessage: "Has cerrado sesión.",
    logoutErrorTitle: "Error",
    logoutErrorMsg: "Ocurrió un error al cerrar sesión.",
    successUpdate: "¡Tus cambios han sido guardados!",
    successFeedback: "¡Gracias por tus comentarios!",
    errorOccured: "Ocurrió un error. Por favor, inténtalo de nuevo.",
  },
};

const Settings = ({ navigation }) => {
  const { userId, setUserId, languagePreference, setLanguagePreference } =
    useContext(UserContext);

  //Local state for user info
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);
  const [localLang, setLocalLang] = useState(languagePreference || "English");

  //Feedback state
  const [feedback, setFeedback] = useState("");

  const t = translations[localLang] || translations.English;

  //---Load user info from user context
  useEffect(() => {
    const loadUserInfo = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user info.");
        const userData = await response.json();

        setName(userData.name || "");
        setDueDate(
          userData.dueDate
            ? userData.dueDate.split("T")[0] // E.g. 2025-04-04T00:00:00.000Z
            : ""
        );
        setLocalLang(userData.languagePreference || "English");
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    };
    loadUserInfo();
  }, [userId]);

  // Update name/dueDate/languagePreference in DB
  const handleUpdateInfo = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PATCH", // or PUT, depending on your backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dueDate,
          languagePreference: localLang,
        }),
      });
      if (!response.ok) throw new Error("Failed to update user info.");

      // If success, also update local context
      setLanguagePreference(localLang);
      Alert.alert(t.pageTitle, t.successUpdate);
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert(t.pageTitle, t.errorOccured);
    }
  };

  // --- Handle feedback submission ---
  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return;
    try {
      // Example: POST feedback to server
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          message: feedback,
          // add additional fields if needed
        }),
      });
      if (!response.ok) throw new Error("Failed to send feedback.");

      Alert.alert(t.pageTitle, t.successFeedback);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert(t.pageTitle, t.errorOccured);
    }
  };

  // --- Delete account from DB ---
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
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("refreshToken");
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("languagePreference");

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

  // Logout logic
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
      Alert.alert(t.logoutErrorTitle, t.logoutErrorMsg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{t.pageTitle}</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>

        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{t.nameLabel}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
        </View>

        {/* Due Date Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{t.dueDateLabel}</Text>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
          />
        </View>

        {/* Language Preference */}
        <Text style={styles.label}>{t.languageLabel}</Text>
        <DropDownPicker
          open={open}
          value={localLang}
          items={[
            { label: "English", value: "English" },
            { label: "Español", value: "Español" },
          ]}
          setOpen={setOpen}
          setValue={setLocalLang}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        {/* Save changes */}
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateInfo}>
          <Text style={styles.saveButtonText}>{t.updateInfo}</Text>
        </TouchableOpacity>

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>{t.feedbackTitle}</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder={t.feedbackPlaceholder}
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
          />
          <TouchableOpacity
            style={styles.submitFeedbackBtn}
            onPress={handleSubmitFeedback}
          >
            <Text style={styles.submitFeedbackText}>{t.submitFeedback}</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Account */}
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteAccountText}>{t.deleteAccount}</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>{t.logout}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;
