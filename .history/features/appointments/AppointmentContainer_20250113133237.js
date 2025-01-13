import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, Pressable, View, Linking } from "react-native";
import { Image } from "expo-image";
import { UserContext } from "../../contexts/UserContext";
import { fetchNextAppointment } from "../../api/api";

const AppointmentContainer = () => {
  const { userId } = useContext(UserContext); // Get userId from context
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

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
      Linking.openURL(url).catch(() => alert("Error opening maps"));
    }
  };
  const getAppointmentCountdown = (appointmentDate) => {
    const now = new Date();
    const appointment = new Date(appointmentDate);
    const differenceInMs = appointment - now;

    if (differenceInMs <= 0) return "Appointment time has passed.";
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
    return <Text>Loading...</Text>;
  }

  if (!nextAppointment) {
    return (
      <Text style={styles.noAppointmentText}>No upcoming appointments</Text>
    );
  }

  const formattedDate = new Date(nextAppointment.date).toLocaleDateString(
    "en-US",
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
      <Text style={styles.header}>Upcoming Appointment</Text>
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
        <Text style={styles.notes}>
          {nextAppointment.notes || "No notes available"}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={styles.button} onPress={handleGetDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    alignItems: "center", // Center content horizontally
    marginBottom: 16,
  },
  countdown: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center", // Align icon and text in a row
    justifyContent: "center", // Center within the container
  },
  clinicName: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
    textAlign: "center",
  },
  notes: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
  actionsContainer: {
    marginTop: 16,
    alignItems: "center", // Center the button horizontally
  },
  button: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  noAppointmentText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
});

export default AppointmentContainer;
