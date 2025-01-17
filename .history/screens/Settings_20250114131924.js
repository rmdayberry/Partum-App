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
}

export default Settings;
