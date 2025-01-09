import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import AddAppointmentForm from "../features/appointments/AddAppointmentForm";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const Appointments = () => {
  const { userId, languagePreference } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const labels = {
    title: languagePreference === "English" ? "Appointments" : "Citas",
    addAppointment:
      languagePreference === "English" ? "Add Appointment" : "Agregar Cita",
    noAppointments:
      languagePreference === "English"
        ? "No upcoming appointments."
        : "No hay citas próximas.",
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:5002/api/appointments",
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        Alert.alert(
          languagePreference === "English" ? "Error" : "Error",
          languagePreference === "English"
            ? "Failed to fetch appointments."
            : "No se pudieron obtener las citas."
        );
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentAdded = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
    setShowForm(false);
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.title}>
        {languagePreference === "English" ? "Title:" : "Título:"} {item.title}
      </Text>
      <Text>
        {languagePreference === "English" ? "Date:" : "Fecha:"} {item.date}
      </Text>
      <Text>
        {languagePreference === "English" ? "Time:" : "Hora:"} {item.time}
      </Text>
      <Text>
        {languagePreference === "English" ? "Location:" : "Ubicación:"}{" "}
        {item.location}
      </Text>
      {item.notes && (
        <Text>
          {languagePreference === "English" ? "Notes:" : "Notas:"} {item.notes}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{labels.title}</Text>
      {showForm ? (
        <AddAppointmentForm onAppointmentAdded={handleAppointmentAdded} />
      ) : (
        <>
          <FlatList
            data={appointments}
            keyExtractor={(item) => item._id}
            renderItem={renderAppointmentItem}
            ListEmptyComponent={
              <Text style={styles.noAppointments}>{labels.noAppointments}</Text>
            }
          />
          <Button
            title={labels.addAppointment}
            onPress={() => setShowForm(true)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  appointmentItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  noAppointments: {
    textAlign: "center",
    marginVertical: 16,
    color: "#999",
  },
});

export default Appointments;
