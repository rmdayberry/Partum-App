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
export default Settings;
