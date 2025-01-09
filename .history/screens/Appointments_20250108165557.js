import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import {
  fetchAppointments,
  addAppointment,
  deleteAppointment,
} from "../api/api";

const Appointments = () => {
  const { userId } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch appointments on mount
  useEffect(() => {
    if (!userId) return;
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments(userId);
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };
    loadAppointments();
  }, [userId]);

  // Handle adding a new appointment
  const handleAddAppointment = async () => {
    if (!title || !date || !time) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const newAppointment = { title, date, time };
      await addAppointment({ ...newAppointment, userId });
      setAppointments((prev) => [...prev, newAppointment]);
      setTitle("");
      setDate("");
      setTime("");
      Alert.alert("Success", "Appointment added successfully!");
    } catch (error) {
      console.error("Error adding appointment:", error.message);
      Alert.alert("Error", "Failed to add appointment.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting an appointment
  const handleDeleteAppointment = async (id) => {
    setLoading(true);
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((item) => item.id !== id));
      Alert.alert("Success", "Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
      Alert.alert("Error", "Failed to delete appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointments</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Time (HH:MM)"
          value={time}
          onChangeText={setTime}
        />
        <Button
          title={loading ? "Adding..." : "Add Appointment"}
          onPress={handleAddAppointment}
        />
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>
              {item.date} at {item.time}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteAppointment(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  appointmentItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#FF4D4D",
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default Appointments;
