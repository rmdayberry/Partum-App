import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { UserContext } from "../../contexts/UserContext";

const AddAppointmentForm = ({ onAppointmentAdded }) => {
  const { languagePreference } = useContext(UserContext);

  const [form, setForm] = useState({
    clinicName: "",
    location: "",
    notes: "",
  });

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const labels = {
    clinicName:
      languagePreference === "English" ? "Clinic Name" : "Nombre de la Clínica",
    location: languagePreference === "English" ? "Location" : "Ubicación",
    notes: languagePreference === "English" ? "Notes" : "Notas",
    submit:
      languagePreference === "English" ? "Add Appointment" : "Agregar Cita",
    pickDate: languagePreference === "English" ? "Pick a Date" : "Elegir Fecha",
    pickTime: languagePreference === "English" ? "Pick a Time" : "Elegir Hora",
  };

  const handleSubmit = async () => {
    const appointmentData = {
      ...form,
      date: date.toISOString(),
      time: time.toLocaleTimeString(),
    };

    if (!form.clinicName || !form.location) {
      Alert.alert(
        languagePreference === "English" ? "Error" : "Error",
        languagePreference === "English"
          ? "All fields are required except notes."
          : "Todos los campos son obligatorios excepto las notas."
      );
      return;
    }

    try {
      // Assume onAppointmentAdded calls the API
      onAppointmentAdded(appointmentData);
      Alert.alert(
        languagePreference === "English" ? "Success" : "Éxito",
        languagePreference === "English"
          ? "Appointment added successfully."
          : "Cita agregada exitosamente."
      );
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
      {/* Date Picker */}
      <Button
        title={`${labels.pickDate}: ${date.toDateString()}`}
        onPress={() => setShowDatePicker(true)}
      />
      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        mode="date"
        onConfirm={(selectedDate) => {
          setShowDatePicker(false);
          setDate(selectedDate);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      {/* Time Picker */}
      <Button
        title={`${labels.pickTime}: ${time.toLocaleTimeString()}`}
        onPress={() => setShowTimePicker(true)}
      />
      <DatePicker
        modal
        open={showTimePicker}
        date={time}
        mode="time"
        onConfirm={(selectedTime) => {
          setShowTimePicker(false);
          setTime(selectedTime);
        }}
        onCancel={() => setShowTimePicker(false)}
      />

      {/* Other Inputs */}
      <Text style={styles.label}>{labels.clinicName}</Text>
      <TextInput
        style={styles.input}
        value={form.clinicName}
        onChangeText={(text) => setForm({ ...form, clinicName: text })}
      />

      <Text style={styles.label}>{labels.location}</Text>
      <TextInput
        style={styles.input}
        value={form.location}
        onChangeText={(text) => setForm({ ...form, location: text })}
      />

      <Text style={styles.label}>{labels.notes}</Text>
      <TextInput
        style={styles.input}
        value={form.notes}
        onChangeText={(text) => setForm({ ...form, notes: text })}
      />

      <Button title={labels.submit} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
});

export default AddAppointmentForm;
