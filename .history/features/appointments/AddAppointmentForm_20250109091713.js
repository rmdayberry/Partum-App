import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddAppointmentForm = ({ onAppointmentAdded }) => {
  const { languagePreference, userId } = useContext(UserContext);
  const [form, setForm] = useState({
    date: "",
    time: "",
    clinicName: "",
    location: "",
    notes: "",
  });

  const labels = {
    date: languagePreference === "English" ? "Date" : "Fecha",
    time: languagePreference === "English" ? "Time" : "Hora",
    clinicName:
      languagePreference === "English" ? "Clinic Name" : "Nombre de la Clínica",
    location: languagePreference === "English" ? "Location" : "Ubicación",
    notes: languagePreference === "English" ? "Notes" : "Notas",
    submit:
      languagePreference === "English" ? "Add Appointment" : "Agregar Cita",
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.date || !form.time || !form.clinicName || !form.location) {
      Alert.alert(
        languagePreference === "English" ? "Error" : "Error",
        languagePreference === "English"
          ? "All fields are required except notes."
          : "Todos los campos son obligatorios excepto las notas."
      );
      return;
    }

    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        Alert.alert(
          languagePreference === "English" ? "Error" : "Error",
          languagePreference === "English"
            ? "User not authenticated. Please log in."
            : "Usuario no autenticado. Por favor inicie sesión."
        );
        return;
      }

      const response = await fetch("http://your-ip-address:5002/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ ...form, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add appointment");
      }

      const newAppointment = await response.json();
      onAppointmentAdded(newAppointment);
      Alert.alert(
        languagePreference === "English" ? "Success" : "Éxito",
        languagePreference === "English"
          ? "Appointment added successfully."
          : "Cita agregada exitosamente."
      );
      setForm({ date: "", time: "", clinicName: "", location: "", notes: "" });
    } catch (error) {
      Alert.alert(
        languagePreference === "English" ? "Error" : "Error",
        languagePreference === "English"
          ? "Failed to add appointment."
          : "No se pudo agregar la cita."
      );
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(labels).map(
        (key) =>
          key !== "submit" && (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>{labels[key]}</Text>
              <TextInput
                style={styles.input}
                value={form[key]}
                onChangeText={(text) => handleInputChange(key, text)}
                placeholder={labels[key]}
              />
            </View>
          )
      )}
      <Button title={labels.submit} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth
