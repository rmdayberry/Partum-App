import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
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
      title: form.title,
      location: form.location,
      date: date.toISOString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      notes: form.notes,
    };

    try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (!authToken) {
        Alert.alert("Error", "You must be logged in to add an appointment.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5002/appointments",
        appointmentData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const newAppointment = response.data.appointment;

      // Update the parent state with the new appointment
      onAppointmentAdded(newAppointment);

      Alert.alert("Success", "Appointment added successfully!");
    } catch (error) {
      console.error("Error adding appointment:", error.message);
      Alert.alert("Error", "Failed to add appointment. Please try again.");
    }
  };

  const formattedDate = date.toDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{labels.submit}</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{labels.title}</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          placeholder={labels.title}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{labels.pickDate}</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{labels.pickTime}</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showTimePicker}>
          <Text style={styles.dateText}>{formattedTime}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>

      <View style={styles.formGroup}>
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
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{labels.notes}</Text>
        <TextInput
          style={styles.textarea}
          value={form.notes}
          onChangeText={(text) => setForm({ ...form, notes: text })}
          placeholder={labels.notes}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{labels.submit}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    zIndex: 500,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AddAppointmentForm;
