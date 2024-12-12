import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Color } from "../GlobalStyles";

const translations = {
  English: {
    registerTitle: "Register",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    dueDatePlaceholder: "Due Date (YYYY-MM-DD)",
    languagePreferencePlaceholder: "Select Language Preference",
    registerButton: "Register",
    toggleToSpanish: "Español",
  },
  Español: {
    registerTitle: "Registro",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    dueDatePlaceholder: "Fecha de parto (AAAA-MM-DD)",
    languagePreferencePlaceholder: "Seleccione preferencia de idioma",
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
      if (!name || !email || !password || !dueDate || !languagePreference) {
        Alert.alert(
          language === "English" ? "Error" : "Error",
          language === "English"
            ? "All fields are required."
            : "Todos los campos son obligatorios."
        );
        return;
      }

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={styles.toggleText}
        onPress={() =>
          setLanguage(language === "English" ? "Español" : "English")
        }
      >
        {language === "English"
          ? translations.English.toggleToSpanish
          : translations.Español.toggleToEnglish}
      </Text>

      <Text style={styles.title}> {t.registerTitle}</Text>

      <TextInput
        style={styles.input}
        placeholder={t.namePlaceholder}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder={t.emailPlaceholder}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder={t.passwordPlaceholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder={t.dueDatePlaceholder}
        value={dueDate}
        onChangeText={setDueDate}
      />

      <SelectList
        setSelected={setLanguagePreference}
        data={[
          { key: "English", value: "English" },
          { key: "Español", value: "Español" },
        ]}
        placeholder={t.languagePreferencePlaceholder}
        boxStyles={styles.input} // Match the input field styles
        dropdownTextStyles={styles.dropdownText} // Add dropdown text styles
      />

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
  dropdownText: {
    color: "#333",
  },
  toggleText: {
    alignSelf: "flex-end",
    fontSize: 16,
    color: "#007Aff",
    marginBottom: 10,
  },
});

export default Registration;
