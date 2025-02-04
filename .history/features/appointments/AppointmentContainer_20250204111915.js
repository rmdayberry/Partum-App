import React, { useEffect, useState, useContext, useCallback } from "react";
import { Text, StyleSheet, View, Linking, Alert } from "react-native";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { UserContext } from "../../contexts/UserContext";
import { fetchNextAppointment } from "../../api/api";
import * as Calendar from "expo-calendar";

const AppointmentContainer = () => {
  const { userId, languagePreference } = useContext(UserContext);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const appointmentTranslations = {
    English: {
      loading: "Loading...",
      upcomingAppointment: "Upcoming Appointment",
      noAppointments: "No upcoming appointments",
      noNotes: "No notes available",
      addToCalendar: "Add to Calendar",
      getDirections: "Get Directions",
      callToReschedule: "Call to Reschedule",
    },
    Español: {
      loading: "Cargando...",
      upcomingAppointment: "Próxima Cita",
      noAppointments: "No hay citas próximas",
      noNotes: "No hay notas disponibles",
      addToCalendar: "Agregar al calendario",
      getDirections: "Obtener direcciones",
      callToReschedule: "Llamar para reprogramar",
    },
  };

  const t =
    appointmentTranslations[languagePreference] ||
    appointmentTranslations.English;

  // Function to load the next appointment
  const loadNextAppointment = async () => {
    try {
      const appointment = await fetchNextAppointment(userId);
      setNextAppointment(appointment);
    } catch (error) {
      console.error("Error fetching next appointment:", error);
      setNextAppointment(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch when the component mounts
  useEffect(() => {
    if (userId) {
      loadNextAppointment();
    }
  }, [userId]);

  // 🔥 This ensures the next appointment updates when navigating back to the Dashboard
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        loadNextAppointment();
      }
    }, [userId])
  );

  if (loading) {
    return <Text>{t.loading}</Text>;
  }

  if (!nextAppointment) {
    return <Text style={styles.noAppointmentText}>{t.noAppointments}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t.upcomingAppointment}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>
          {new Date(nextAppointment.date).toLocaleDateString(
            languagePreference === "Español" ? "es-ES" : "en-US",
            { weekday: "long", month: "long", day: "numeric" }
          )}
        </Text>
        <Text style={styles.time}>{nextAppointment.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 12,
    textAlign: "center",
  },
  detailsContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
    marginBottom: 12,
  },
  noAppointmentText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888888",
  },
});

export default AppointmentContainer;
