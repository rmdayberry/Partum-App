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

const Appointments = () => {
  const { languagePreference } = useContext(UserContext);
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
    const loadAppointments = async () => {
      try {
        const appointmentsData = await fetchAppointments();
        setAppointments(appointmentsData || []);
      } catch (error) {
        if (error.message === "Token expired") {
          Alert.alert(
            "Session Expired",
            "Please log in again.",
            [
              {
                text: "OK",
                onPress: () => {
                  // Log out or redirect to login
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          console.error("Error fetching appointments:", error.message);
          Alert.alert("Error", "Failed to fetch appointments.");
        }
      }
    };

    loadAppointments(); // Fetch appointments on component mount
  }, []);

  const handleAppointmentAdded = async () => {
    try {
      const updatedAppointments = await fetchAppointments();
      setAppointments(updatedAppointments); // Replace with the latest data
      setShowForm(false);
    } catch (error) {
      console.error("Error refreshing appointments:", error);
      Alert.alert("Error", "Failed to refresh appointments.");
    }
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.cardTitle}>
        {languagePreference === "English" ? "Title:" : "Título:"}{" "}
        <Text style={styles.cardTitleHighlight}>
          {item.title || "No title"}
        </Text>
      </Text>
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
          <FlatList
            data={appointments}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderAppointmentItem}
            ListEmptyComponent={
              <Text style={styles.noAppointments}>{labels.noAppointments}</Text>
            }
            contentContainerStyle={styles.listContainer}
          />
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
    backgroundColor: "#F4F5FB", // Matches your Dashboard background
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A5ACD", // Same accent color as in Dashboard
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
    // Subtle shadow to match Dashboard style
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
  addButton: {
    backgroundColor: "#6A5ACD",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 10,
    // Additional shadow or styling if desired
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Appointments;
