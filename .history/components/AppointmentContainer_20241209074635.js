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
      <View style={[styles.frame, styles.frameFlexBox]}>
        <Text style={styles.countdownContainer}>
          <Text style={styles.countdownContainer2}>
            <Text style={styles.in}>
              <Text style={styles.in2}>In</Text>
            </Text>
            <Text style={[styles.text, styles.textTypo]}>
              <Text style={styles.in}>{` `}</Text>
              <Text style={styles.text2}>{`2 `}</Text>
            </Text>
            <Text style={styles.days}>Days</Text>
          </Text>
        </Text>
        <View style={[styles.frame1, styles.frameLayout]}>
          <Pressable onPress={() => navigation.navigate("CommunityResources1")}>
            <Text style={styles.needARide}>Need a ride?</Text>
          </Pressable>
          <View style={[styles.frame2, styles.frameLayout]}>
            <Image
              style={styles.screenshot20241108At322}
              contentFit="cover"
              source={require("../assets/calendarIcon.png")}
            />
            <View style={styles.apptNotesBtn}>
              <Text style={[styles.appointmentNotes, styles.textTypo]}>
                Appointment Notes
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.frame3}>
        <Text style={styles.aptDateTime}>Wednesday, Nov 15 at 10:00 AM</Text>
        <View style={styles.clinicLocation}>
          <Image
            style={styles.locationIcon}
            contentFit="cover"
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
  countdownContainer: {
    fontFamily: FontFamily.arial,
    fontSize: FontSize.size_lg,
    display: "flex",
    width: 87,
    textAlign: "center",
    alignItems: "center",
  },
  appointmentContainer: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.graysWhite,
    borderStyle: "solid",
    borderColor: Color.colorGray_100,
    borderWidth: 1,
    paddingLeft: Padding.p_mini,
    paddingTop: Padding.p_smi,
    paddingRight: Padding.p_mid,
    paddingBottom: Padding.p_smi,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    alignSelf: "stretch",
  },
});
export default AppointmentContainer;
