import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const translations = {
  English: {
    registerTitle: "Register",
    namePlaceholder: "Full Name",
    emailPlaceholder: "Email Address",
    passwordPlaceholder: "Password",
    dueDatePlaceholder: "Select Due Date",
    languagePreferencePlaceholder: "Preferred Language",
    registerButton: "Create Account",
    toggleToSpanish: "Español",
    allFieldsError: "All fields are required.",
    success: "User registered successfully!",
    error: "Error",
  },
  Español: {
    registerTitle: "Registro",
    namePlaceholder: "Nombre Completo",
    emailPlaceholder: "Correo Electrónico",
    passwordPlaceholder: "Contraseña",
    dueDatePlaceholder: "Seleccionar Fecha de Parto",
    languagePreferencePlaceholder: "Idioma Preferido",
    registerButton: "Crear Cuenta",
    toggleToSpanish: "English",
    allFieldsError: "Todos los campos son obligatorios.",
    success: "¡Usuario registrado con éxito!",
    error: "Error",
  },
};

const Registration = ({ navigation }) => {
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [languagePreference, setLanguagePreference] = useState("");
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const t = translations[language];

  const handleRegister = async () => {
    if (!name || !email || !password || !dueDate || !languagePreference) {
      Alert.alert(t.error, t.allFieldsError);
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
      <Text
        style={styles.languageToggle}
        onPress={() =>
          setLanguage(language === "English" ? "Español" : "English")
        }
      >
        {t.toggleToSpanish}
      </Text>

      <Text style={styles.title}>{t.registerTitle}</Text>

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

      {/* Due Date Picker */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={dueDate ? styles.selectedDate : styles.placeholderText}>
          {dueDate ? dueDate.toDateString() : t.dueDatePlaceholder}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDueDate(selectedDate);
            }
          }}
        />
      )}

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

      {/* Register Button */}
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
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    justifyContent: "center",
    marginBottom: 15,
  },
  selectedDate: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
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
