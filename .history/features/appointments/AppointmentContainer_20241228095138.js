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
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  // Countdown text
  countdownContainer: {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#4A4A4A",
    marginBottom: 12,
  },
  inText: {
    color: "#6A5ACD",
    fontWeight: "700",
  },
  // Directions button
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6A5ACD",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    width: "80%",
  },
  directionsButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigationIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#FFFFFF",
  },
  directionsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  // Clinic location
  clinicLocation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    width: "100%",
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#6A5ACD",
  },
  clinicName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A",
    textDecorationLine: "underline",
  },
  // Appointment date and time
  aptDateTime: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 12,
  },
});

export default AppointmentContainer;
