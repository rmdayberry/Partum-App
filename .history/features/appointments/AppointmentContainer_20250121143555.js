import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  Linking,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { UserContext } from "../../contexts/UserContext";
import { fetchNextAppointment } from "../../api/api";
import * as Calendar from "expo-calendar";

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

const AppointmentContainer = () => {
  const { userId, languagePreference } = useContext(UserContext);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const t =
    appointmentTranslations[languagePreference] ||
    appointmentTranslations.English;

  useEffect(() => {
    const loadNextAppointment = async () => {
      try {
        const appointment = await fetchNextAppointment(userId);
        setNextAppointment(appointment);
      } catch (error) {
        console.error("Error fetching next appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadNextAppointment();
    }
  }, [userId]);

  const handleGetDirections = () => {
    if (nextAppointment?.location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        nextAppointment.location
      )}`;
      Linking.openURL(url).catch(() => alert(t.getDirections));
    }
  };

  const handleCallReschedule = () => {
    const phoneNumber = "tel:651-758-9500";
    Linking.openURL(phoneNumber).catch(() => alert(t.callToReschedule));
  };

  const handleAddToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", t.addToCalendar);
        return;
      }

      const defaultCalendarSource =
        Platform.OS === "ios"
          ? await Calendar.getDefaultCalendarAsync()
          : { isLocalAccount: true, name: "Default" };

      await Calendar.createEventAsync(
        defaultCalendarSource.id || defaultCalendarSource.name,
        {
          title: nextAppointment.title || "Appointment",
          startDate: new Date(
            nextAppointment.date + "T" + nextAppointment.time
          ),
          endDate: new Date(
            new Date(
              nextAppointment.date + "T" + nextAppointment.time
            ).getTime() +
              60 * 60 * 1000
          ),
          location: nextAppointment.location,
          notes: nextAppointment.notes || "",
        }
      );

      Alert.alert("Success", t.addToCalendar);
    } catch (error) {
      console.error("Error adding to calendar:", error.message);
      Alert.alert("Error", t.addToCalendar);
    }
  };

  const getAppointmentCountdown = (appointmentDate) => {
    const now = new Date();
    const appointment = new Date(appointmentDate);
    const differenceInMs = appointment - now;

    if (differenceInMs <= 0) return t.noAppointments;
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return days > 0
      ? `${days} day${days > 1 ? "s" : ""} and ${hours} hour${
          hours !== 1 ? "s" : ""
        }`
      : `${hours} hour${hours !== 1 ? "s" : ""}`;
  };

  if (loading) {
    return <Text>{t.loading}</Text>;
  }

  if (!nextAppointment) {
    return <Text style={styles.noAppointmentText}>{t.noAppointments}</Text>;
  }

  const formattedDate = new Date(nextAppointment.date).toLocaleDateString(
    languagePreference === "Español" ? "es-ES" : "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );
  const formattedTime = nextAppointment.time;
  const countdown = getAppointmentCountdown(nextAppointment.date);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {nextAppointment ? t.upcomingAppointment : t.noAppointments}
      </Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.countdown}>{countdown}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
        <View style={styles.locationContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/locationIcon.png")}
          />
          <Text style={styles.clinicName}>{nextAppointment.location}</Text>
        </View>
        <Text style={styles.notes}>{nextAppointment.notes || t.noNotes}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={styles.button} onPress={handleAddToCalendar}>
          <Image
            style={styles.iconSmall}
            source={require("../../assets/calendarIcon.png")}
          />
          <Text style={styles.buttonText}>{t.addToCalendar}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleGetDirections}>
          <Image
            style={styles.iconSmall}
            source={require("../../assets/navigationIcon.png")}
          />
          <Text style={styles.buttonText}>{t.getDirections}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleCallReschedule}>
          <Image
            style={styles.iconSmall}
            source={require("../../assets/phone.png")}
          />
          <Text style={styles.buttonText}>{t.callToReschedule}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
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
  countdown: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  clinicName: {
    fontSize: 14,
    color: "#555555",
    marginLeft: 8,
  },
  notes: {
    fontSize: 12,
    color: "#777777",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 18,
  },
  actionsContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#6A5ACD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: "80%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconSmall: {
    width: 18,
    height: 18,
    tintColor: "#ffffff",
  },
  noAppointmentText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888888",
  },
});

export default AppointmentContainer;
