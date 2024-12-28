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
            source={require("../../assets/navigationIcon.png")}
          />
          <Text style={styles.buttonText}>Directions</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appointmentContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  // Countdown text
  countdownContainer: {
    fontFamily: "Arial",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  inText: {
    color: "#6A5ACD",
    fontWeight: "600",
  },
  // Notes button
  appNotesBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    maxWidth: 200,
  },
  notesButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  notesIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  appointmentNotes: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  // Directions button
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  directionsButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigationIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  directionsButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  // Clinic location
  clinicLocation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    width: "100%",
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  clinicName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textDecorationLine: "underline",
  },
  // Appointment date and time
  aptDateTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 8,
  },
});

export default AppointmentContainer;
