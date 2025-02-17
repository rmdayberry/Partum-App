import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../../contexts/UserContext";

const AddAppointmentForm = ({ onAppointmentAdded }) => {
  const { languagePreference } = useContext(UserContext);
  const [form, setForm] = useState({
    title: "",
    location: "Riverland Clinic", // Default value
    notes: "",
  });

  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [locations, setLocations] = useState([
    { label: "Riverland Clinic", value: "Riverland Clinic" },
  ]);

  const labels = {
    title: languagePreference === "English" ? "Title" : "Título",
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

    if (!form.title || !form.location) {
      Alert.alert(
        languagePreference === "English" ? "Error" : "Error",
        languagePreference === "English"
          ? "Title and location are required."
          : "El título y la ubicación son obligatorios."
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
      <Text style={styles.label}>{labels.title}</Text>
      <TextInput
        style={styles.input}
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
        placeholder={labels.title}
      />

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

      <Text style={styles.label}>{labels.location}</Text>
      <DropDownPicker
        open={isDropdownOpen}
        value={form.location}
        items={locations}
        setOpen={setDropdownOpen}
        setValue={(value) => setForm({ ...form, location: value() })}
        setItems={setLocations}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        dropDownContainerStyle={styles.dropdownMenu}
      />

      <Text style={styles.label}>{labels.notes}</Text>
      <TextInput
        style={styles.input}
        value={form.notes}
        onChangeText={(text) => setForm({ ...form, notes: text })}
        placeholder={labels.notes}
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default AddAppointmentForm;
