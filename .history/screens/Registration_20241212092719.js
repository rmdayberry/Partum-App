import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const translations = {
  English: {
    registerTitle: "Register",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    dueDatePlaceholder: "Due Date (YYYY-MM-DD)",
    languagePreferencePlaceholder: "Language Preference (English/Español)",
    registerButton: "Register",
    toggleToSpanish: "Español",
  },
  Español: {
    registerTitle: "Registro",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    dueDatePlaceholder: "Fecha de parto (AAAA-MM-DD)",
    languagePreferencePlaceholder: "Preferencia de idioma (Inglés/Español)",
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

  const handleRegister = async () => {
    try {
      // Backend API Call (Placeholder)
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
        navigation.navigate("Login"); // Redirect to Login or Dashboard
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

  const t = translations[language]; // Access translations based on selected language

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Language toggle */}
      <TouchableOpacity
        onPress={() =>
          setLanguage(language === "English" ? "Español" : "English")
        }
        style={styles.languageToggle}
      >
        <Text style={styles.languageText}>
          {language === "English"
            ? translations.English.toggleToSpanish
            : translations.Español.toggleToEnglish}
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.title}> {t.registerTitle}</Text>

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
      {/* Language Preference */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={languagePreference}
          onValueChange={(itemValue) => setLanguagePreference(itemValue)}
        >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Español" value="Español" />
        </Picker>
      </View>

      {/* Register Button */}
      <Button title={t.registerButton} onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  languageToggle: {
    alignSelf: "flex-end",
    marginBottom: 10,
    padding: 5,
  },
  languageText: {
    fontSize: 16,
    color: "#007Aff",
  },
});

export default Registration;
