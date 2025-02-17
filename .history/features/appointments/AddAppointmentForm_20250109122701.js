import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { UserContext } from "../../contexts/UserContext";

const AddAppointmentForm = ({ onAppointmentAdded }) => {
  const { languagePreference } = useContext(UserContext);
  const [form, setForm] = useState({
    clinicName: "",
    location: "",
    notes: "",
  });

  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (selectedDate) => {
    setDate(
      (prev) =>
        new Date(selectedDate.setHours(prev.getHours(), prev.getMinutes()))
    );
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleTimeConfirm = (selectedTime) => {
    setDate(
      (prev) =>
        new Date(
          prev.setHours(selectedTime.getHours(), selectedTime.getMinutes())
        )
    );
    hideTimePicker();
  };

  const handleSubmit = async () => {
    const appointmentData = {
      ...form,
      date: date.toISOString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

  const formattedDate = date.toDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labels.pickDate}</Text>
      <Button title={formattedDate} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.label}>{labels.pickTime}</Text>
      <Button title={formattedTime} onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

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
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
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
