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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Appointments</Text>
      <View style={styles.detailsContainer}>
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
    backgroundColor: "#ffffff", // White background for better contrast
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Elevation for Android shadow
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    width: "100%",
    justifyContent: "center",
  },
  clinicName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginLeft: 8,
  },
  notes: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
  actionsContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noAppointmentText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#555", // Subtle color for the icon
  },
});

export default AppointmentContainer;
