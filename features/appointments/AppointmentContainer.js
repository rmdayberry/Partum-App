import React from "react";
import { Text, StyleSheet, Pressable, View, Linking } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";

const AppointmentContainer = () => {
  const navigation = useNavigation();

  const CLINIC_ADDRESS = "1026 7th St W, St Paul, MN 55102";

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      CLINIC_ADDRESS
    )}`;
    Linking.openURL(url).catch(() => alert("Error opening maps"));
  };

  const handleNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* Header*/}
      <Text style={styles.header}>Upcoming Appointments</Text>
      {/* Countdown Section */}
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>
          In <Text style={styles.highlight}>2</Text> Days
        </Text>
      </View>

      {/* Appointment Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>Wednesday, Nov 15</Text>
        <Text style={styles.time}>at 10:00 AM</Text>
        <View style={styles.locationContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/locationIcon.png")}
          />
          <Text style={styles.clinicName}>Riverland Community Health</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Pressable
          style={styles.button}
          onPress={handleGetDirections}
          accessibilityLabel="Get Directions"
        >
          <Image
            style={styles.iconSmall}
            source={require("../../assets/navigationIcon.png")}
          />
          <Text style={styles.buttonText}>Directions</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => handleNavigate("CommunityResources1")}>
        <Text style={styles.link}>Need a ride?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa", // Subtle light gray
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
    marginVertical: 10,
    alignSelf: "stretch",
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
  countdownContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  countdownText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  highlight: {
    color: "#6A5ACD",
  },
  link: {
    fontSize: 12,
    color: "#696969",
    textDecorationLine: "underline",
    marginTop: 12,
    textAlign: "center",
  },
  detailsContainer: {
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  clinicName: {
    fontSize: 12,
    color: "#555",
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6A5ACD",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2, // For Android
  },
  buttonText: {
    fontSize: 10,
    color: "#fff",
    marginLeft: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconSmall: {
    width: 12,
    height: 12,
    tintColor: "#fff",
  },
});

export default AppointmentContainer;
