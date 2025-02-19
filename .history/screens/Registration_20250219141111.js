import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const translations = {
  English: {
    registerTitle: "Register",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    dueDatePlaceholder: "Due Date (YYYY-MM-DD)",
    languagePreferencePlaceholder: "Language Preference",
    registerButton: "Register",
    toggleToSpanish: "Español",
    allFieldsError: "All fields are required.",
    dateFormatError: "Due Date must be in the format YYYY-MM-DD.",
    success: "User registered successfully!",
    error: "Error",
  },
  Español: {
    registerTitle: "Registro",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    dueDatePlaceholder: "Fecha de parto (AAAA-MM-DD)",
    languagePreferencePlaceholder: "Preferencia de idioma",
    registerButton: "Registrar",
    toggleToSpanish: "English",
    allFieldsError: "Todos los campos son obligatorios.",
    dateFormatError: "La Fecha de Parto debe estar en el formato AAAA-MM-DD.",
    success: "¡Usuario registrado con éxito!",
    error: "Error",
  },
};

const Registration = ({ navigation }) => {
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");
  const [open, setOpen] = useState(false);

  const t = translations[language];

  const handleRegister = async () => {
    if (!name || !email || !password || !dueDate || !languagePreference) {
      Alert.alert(t.error, t.allFieldsError);
      return;
    }

    // Validate due date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dueDate)) {
      Alert.alert(t.error, t.dateFormatError);
      return;
    }

    try {
      const response = await fetch(
        "https://partum-app.onrender.com/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            dueDate,
            languagePreference,
          }),
        }
      );

      if (response.ok) {
        Alert.alert(language === "English" ? "Success" : "Éxito", t.success);
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        Alert.alert(t.error, errorData.message || "Server error.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(t.error, "Server error.");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* Language toggle */}
      <Text
        style={styles.languageToggle}
        onPress={() =>
          setLanguage(language === "English" ? "Español" : "English")
        }
      >
        {language === "English" ? t.toggleToSpanish : t.toggleToSpanish}
      </Text>

      {/* Header */}
      <Text style={styles.title}>{t.registerTitle}</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder={t.namePlaceholder}
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder={t.emailPlaceholder}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder={t.passwordPlaceholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Due Date Input */}
      <TextInput
        style={styles.input}
        placeholder={t.dueDatePlaceholder}
        value={dueDate}
        onChangeText={setDueDate}
      />

      {/* Language Preference Dropdown */}
      <DropDownPicker
        open={open}
        value={languagePreference}
        items={[
          { label: "English", value: "English" },
          { label: "Español", value: "Español" },
        ]}
        setOpen={setOpen}
        setValue={setLanguagePreference}
        placeholder={t.languagePreferencePlaceholder}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Register Button (Custom Touchable for styling) */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>{t.registerButton}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
    padding: 20,
    justifyContent: "center",
  },
  languageToggle: {
    alignSelf: "flex-end",
    marginBottom: 10,
    fontSize: 16,
    color: "#6A5ACD",
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4F46E5",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 8,
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  registerButton: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Registration;
