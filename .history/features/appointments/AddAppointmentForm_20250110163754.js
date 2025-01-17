import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
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

  const handleDateConfirm = (selectedDate) => {
    setDate((prevDate) => {
      const updatedDate = new Date(prevDate);
      updatedDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      return updatedDate;
    });
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    setDate((prevDate) => {
      const updatedDate = new Date(prevDate);
      updatedDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      return updatedDate;
    });
    setTimePickerVisibility(false);
  };

  const handleSubmit = async () => {
    const appointmentData = {
      ...form,
      date: date.toISOString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      onAppointmentAdded(appointmentData);
      Alert.alert("Success", "Appointment added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add appointment. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{labels.pickTime}</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setTimePickerVisibility(true)}
          >
            <Text style={styles.dateText}>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={() => setTimePickerVisibility(false)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{labels.notes}</Text>
          <TextInput
            style={[styles.textarea, { height: 100 }]}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
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
