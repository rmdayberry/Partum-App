import * as React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  Padding,
  Gap,
} from "../GlobalStyles";

const AppointmentContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.appointmentContainer}>
      {/* Countdown Section */}
      <View style={[styles.frame, styles.frameFlexBox]}>
        <Text style={styles.countdownContainer}>
          In <Text style={styles.textTypo}>X</Text>
        </Text>
        <View style={[styles.frame1, styles.frameLayout]}>
          <Pressable
            onPress={() => navigation.navigate("Community Resources1")}
          >
            <Text style={styles.needARide}>Need a ride?</Text>
          </Pressable>
          <View style={[styles.frame2, styles.frameLayout]}>
            <Text style={[styles.appointmentNotes, styles.textTypo]}>
              Appointment Notes
            </Text>
          </View>
        </View>
      </View>

      {/* Appointment Details Section */}
      <View style={styles.frame3}>
        <Text style={styles.appointmentDate}>
          Wednesday, Nov 15 at 10:00 AM
        </Text>
        <View style={styles.clinicLocation}>
          <Image
            style={styles.locationIcon}
            source={require("../assets/locationIcon.png")}
          />
          <Text style={styles.clinicName}>Riverland Community Health</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    fontWeight: "700",
    fontFamily: FontFamily.arial,
  },
  frameLayout: {
    width: 71,
    overflow: "hidden",
  },
});
export default AppointmentContainer;
