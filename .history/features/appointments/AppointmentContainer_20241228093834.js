import React from "react";
import { Text, StyleSheet, Pressable, View, Linking } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

const AppointmentContainer = () => {
  const navigation = useNavigation();

  const CLINIC_ADDRESS = "1026 7th St W, St Paul, MN 55102";
  const OPEN_URL_ERROR = "Error opening maps";

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      CLINIC_ADDRESS
    )}`;
    Linking.openURL(url).catch(() => alert(OPEN_URL_ERROR));
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
            source={require("../../assets/locationIcon.png")}
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
            source={require("../../assets/notesIcon.png")}
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginVertical: 10,
    alignItems: "center",
  },
  countdownContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  countdownText: {
    fontSize: 16,
    fontWeight: "bold",
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
    marginBottom: 10,
    alignItems: "center",
  },
  dateTime: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
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
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  notesButton: {
    backgroundColor: "#E0E0E0",
  },
  directionsButton: {
    backgroundColor: "#6200EE",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
  },
  icon: {
    width: 16,
    height: 16,
  },
  iconSmall: {
    width: 14,
    height: 14,
  },
});

export default AppointmentContainer;
