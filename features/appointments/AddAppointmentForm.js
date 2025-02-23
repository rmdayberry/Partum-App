import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../../contexts/UserContext";
import { addAppointment } from "../../api/api";

const AddAppointmentForm = ({ onAppointmentAdded }) => {
  const { languagePreference } = useContext(UserContext);

  // Form State
  const [form, setForm] = useState({
    title: "",
    location: "Riverland Clinic", // Default location
    notes: "",
  });

  // Date & Time State
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(""); // Store selected time separately
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [locations, setLocations] = useState([
    { label: "Riverland Clinic", value: "Riverland Clinic" },
  ]);

  // Labels based on Language
  const labels = {
    title: languagePreference === "English" ? "Title" : "Título",
    location: languagePreference === "English" ? "Location" : "Ubicación",
    notes: languagePreference === "English" ? "Notes" : "Notas",
    submit:
      languagePreference === "English" ? "Add Appointment" : "Agregar Cita",
    pickDate: languagePreference === "English" ? "Pick a Date" : "Elegir Fecha",
    pickTime: languagePreference === "English" ? "Pick a Time" : "Elegir Hora",
  };

  // Date Picker Handlers
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (selectedDate) => {
    setDate(new Date(selectedDate));
    hideDatePicker();
  };

  // Time Picker Handlers
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleTimeConfirm = (selectedTime) => {
    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Ensures AM/PM format
    });
    setTime(formattedTime);
    hideTimePicker();
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    if (!form.title || !form.location || !time) {
      Alert.alert("Error", "Title, location, and time are required.");
      return;
    }

    const appointmentData = {
      title: form.title,
      location: form.location,
      date: date.toISOString(),
      time,
      notes: form.notes,
    };

    try {
      const newAppointment = await addAppointment(appointmentData);
      onAppointmentAdded(newAppointment);
      Alert.alert("Success", "Appointment added successfully!");
    } catch (error) {
      console.error("Error adding appointment:", error.message);
      Alert.alert("Error", "Failed to add appointment. Please try again.");
    }
  };

  // Format for display
  const formattedDate = date.toDateString();

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

      {/* Date Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>{labels.pickDate}</Text>
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            style={styles.webInput}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={showDatePicker}
            >
              <Text style={styles.dateText}>{formattedDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
          </>
        )}
      </View>

      {/* Time Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>{labels.pickTime}</Text>
        {Platform.OS === "web" ? (
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={styles.webInput}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={showTimePicker}
            >
              <Text style={styles.dateText}>{time || "Select Time"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
          </>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{labels.location}</Text>
        <DropDownPicker
          open={isDropdownOpen}
          value={form.location}
          items={locations}
          setOpen={setDropdownOpen}
          setValue={(value) => setForm({ ...form, location: value })}
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
          multiline
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
  webInput: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
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
