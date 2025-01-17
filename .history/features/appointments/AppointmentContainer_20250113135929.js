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

  const handleCallReschedule = () => {
    const phoneNumber = "tel:651-758-9500";
    Linking.openURL(phoneNumber).catch(() =>
      alert("Unable to open the phone dialer.")
    );
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
      <Text style={styles.header}>Upcoming Appointments</Text>
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
          <Image
            style={styles.iconSmall}
            source={require("../../assets/navigationIcon.png")}
          />
          <Text style={styles.buttonText}>Get Directions</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleCallReschedule}>
          <Image
            style={styles.iconSmall}
            source={require("../../assets/phone.png")}
          />
          <Text style={styles.buttonText}>Call to Reschedule</Text>
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
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    alignItems: "center",
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
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  clinicName: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  notes: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
  actionsContainer: {
    marginTop: 16,
    flexDirection: "column", // Changed from "row" to "column"
    alignItems: "center", // Center buttons horizontally
    gap: 12, // Add spacing between buttons
  },
  button: {
    backgroundColor: "#6A5ACD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2, // For Android
    width: "80%", // Optional: Make buttons consistent width
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconSmall: {
    width: 16,
    height: 16,
    tintColor: "#fff",
  },
  noAppointmentText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
});

export default AppointmentContainer;
