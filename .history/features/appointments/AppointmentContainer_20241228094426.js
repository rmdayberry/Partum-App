import React from "react";
import { Text, StyleSheet, Pressable, View, Linking } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

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
      {/* Countdown Section */}
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>
          In <Text style={styles.highlight}>2</Text> Days
        </Text>
        <Pressable onPress={() => handleNavigate("CommunityResources1")}>
          <Text style={styles.link}>Need a ride?</Text>
        </Pressable>
      </View>

      {/* Appointment Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.dateTime}>Wednesday, Nov 15 at 10:00 AM</Text>
        <View style={styles.locationContainer}>
          <Image
            style={styles.icon}
            source={require("../assets/locationIcon.png")}
          />
          <Text style={styles.clinicName}>Riverland Community Health</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Pressable
          style={[styles.button, styles.notesButton]}
          onPress={() => handleNavigate("AppointmentNotes")}
          accessibilityLabel="Appointment Notes"
        >
          <Image
            style={styles.iconSmall}
            source={require("../assets/notesIcon.png")}
          />
          <Text style={styles.buttonText}>Notes</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.directionsButton]}
          onPress={handleGetDirections}
          accessibilityLabel="Get Directions"
        >
          <Image
            style={styles.iconSmall}
            source={require("../assets/navigationIcon.png")}
          />
          <Text style={styles.buttonText}>Directions</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginVertical: 10,
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
    color: "#6200EE",
  },
  link: {
    fontSize: 14,
    color: "#007BFF",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  detailsContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  dateTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clinicName: {
    fontSize: 14,
    color: "#555",
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  notesButton: {
    backgroundColor: "#E0E0E0",
    flex: 1,
    marginHorizontal: 5,
  },
  directionsButton: {
    backgroundColor: "#6200EE",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
  },
  icon: {
    width: 18,
    height: 18,
  },
  iconSmall: {
    width: 16,
    height: 16,
  },
});
