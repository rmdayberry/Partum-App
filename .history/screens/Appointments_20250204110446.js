import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddAppointmentForm from "../features/appointments/AddAppointmentForm";
import { UserContext } from "../contexts/UserContext";
import { fetchAppointments } from "../api/api";
import { MaterialIcons } from "@expo/vector-icons";

const Appointments = () => {
  const { languagePreference } = useContext(UserContext);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const labels = {
    title: languagePreference === "English" ? "Appointments" : "Citas",
    addAppointment:
      languagePreference === "English" ? "Add Appointment" : "Agregar Cita",
    noAppointments:
      languagePreference === "English"
        ? "No upcoming appointments."
        : "No hay citas próximas.",
    pastAppointments:
      languagePreference === "English" ? "Past Appointments" : "Citas Pasadas",
    upcomingAppointments:
      languagePreference === "English"
        ? "Upcoming Appointments"
        : "Citas Próximas",
  };

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        const appointmentsData = await fetchAppointments();
        const now = new Date();

        const upcoming = appointmentsData.filter(
          (appt) => new Date(appt.date) >= now
        );
        const past = appointmentsData
          .filter((appt) => new Date(appt.date) < now)
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort past appointments descending

        setUpcomingAppointments(upcoming);
        setPastAppointments(past);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch appointments.");
      }
      setLoading(false);
    };

    loadAppointments();
  }, []);

  const handleAppointmentAdded = async () => {
    try {
      const updatedAppointments = await fetchAppointments();
      const now = new Date();

      const upcoming = updatedAppointments.filter(
        (appt) => new Date(appt.date) >= now
      );
      const past = updatedAppointments
        .filter((appt) => new Date(appt.date) < now)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
      setShowForm(false);
    } catch (error) {
      console.error("Error refreshing appointments:", error);
      Alert.alert("Error", "Failed to refresh appointments.");
    }
  };

  const handleDelete = async (appointmentId) => {
    Alert.alert(
      "Delete Appointment",
      "Are you sure you want to delete this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAppointment(appointmentId);
              setUpcomingAppointments((prev) =>
                prev.filter((appt) => appt._id !== appointmentId)
              );
              setPastAppointments((prev) =>
                prev.filter((appt) => appt._id !== appointmentId)
              );
              Alert.alert("Success", "Appointment deleted.");
            } catch (error) {
              console.error("Error deleting appointment:", error);
              Alert.alert("Error", "Failed to delete appointment.");
            }
          },
        },
      ]
    );
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {languagePreference === "English" ? "Title:" : "Título:"}{" "}
          <Text style={styles.cardTitleHighlight}>
            {item.title || "No title"}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>
          {languagePreference === "English" ? "Date:" : "Fecha:"}{" "}
        </Text>
        <Text style={styles.cardValue}>
          {item.date ? new Date(item.date).toLocaleDateString() : "No date"}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>
          {languagePreference === "English" ? "Time:" : "Hora:"}{" "}
        </Text>
        <Text style={styles.cardValue}>{item.time || "No time"}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>
          {languagePreference === "English" ? "Location:" : "Ubicación:"}{" "}
        </Text>
        <Text style={styles.cardValue}>{item.location || "No location"}</Text>
      </View>
      {item.notes && (
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>
            {languagePreference === "English" ? "Notes:" : "Notas:"}{" "}
          </Text>
          <Text style={styles.cardValue}>{item.notes}</Text>
        </View>
      )}
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{labels.title}</Text>
      {showForm ? (
        <AddAppointmentForm onAppointmentAdded={handleAppointmentAdded} />
      ) : (
        <>
          {loading ? (
            <Text style={styles.loadingText}>
              {languagePreference === "English"
                ? "Loading appointments..."
                : "Cargando citas..."}
            </Text>
          ) : (
            <>
              {/* Upcoming Appointments */}
              <Text style={styles.sectionTitle}>
                {labels.upcomingAppointments}
              </Text>
              <FlatList
                data={upcomingAppointments}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderAppointmentItem}
                ListEmptyComponent={
                  <Text style={styles.noAppointments}>
                    {labels.noAppointments}
                  </Text>
                }
                contentContainerStyle={styles.listContainer}
              />

              {/* Past Appointments */}
              {pastAppointments.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>
                    {labels.pastAppointments}
                  </Text>
                  <FlatList
                    data={pastAppointments}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderAppointmentItem}
                    contentContainerStyle={styles.listContainer}
                  />
                </>
              )}
            </>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}
          >
            <Text style={styles.addButtonText}>{labels.addAppointment}</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FB",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A5ACD",
    textAlign: "center",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },
  cardTitleHighlight: {
    color: "#6A5ACD",
    fontWeight: "bold",
  },
  cardRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  cardValue: {
    fontSize: 14,
    color: "#333",
  },
  noAppointments: {
    textAlign: "center",
    marginVertical: 20,
    color: "#888",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
  },
  addButton: {
    backgroundColor: "#6A5ACD",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginVertical: 20,
  },
});

export default Appointments;
