import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

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
  },
  Español: {
    registerTitle: "Registro",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    dueDatePlaceholder: "Fecha de parto (AAAA-MM-DD)",
    languagePreferencePlaceholder: "Preferencia de idioma",
    registerButton: "Registrar",
    toggleToEnglish: "English",
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

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5002/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          dueDate,
          languagePreference,
        }),
      });

      if (response.ok) {
        Alert.alert(
          language === "English" ? "Success" : "Éxito",
          language === "English"
            ? "User registered successfully!"
            : "¡Usuario registrado con éxito!"
        );
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        Alert.alert(
          language === "English" ? "Error" : "Error",
          errorData.message || "Server error"
        );
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      Alert.alert(language === "English" ? "Error" : "Error", "Server error");
    }
  };

  const t = translations[language];

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* Language toggle */}
      <Text
        style={styles.languageToggle}
        onPress={() =>
          setLanguage(language === "English" ? "Español" : "English")
        }
      >
        {language === "English" ? t.toggleToSpanish : t.toggleToEnglish}
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
        style={styles.input} // Match input field styling
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Register Button */}
      <Button title={t.registerButton} onPress={handleRegister} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Color.nEW,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  languageToggle: {
    alignSelf: "flex-end",
    marginBottom: 10,
    fontSize: 16,
    color: "#007Aff",
  },
});

export default Registration;
