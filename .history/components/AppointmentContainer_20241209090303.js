import * as React from "react";
import { Text, StyleSheet, Pressable, View, Linking } from "react-native";
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

  const handleGetDirections = () => {
    const riverlandClinicAddress = "1026 7th St W, St Paul, MN 55102";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      riverlandClinicAddress
    )}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening maps", err)
    );
  };

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
      {/* Get Directions Button */}
      <Pressable style={styles.directionsButton} onPress={handleGetDirections}>
        <View style={styles.directionsButtonContent}>
          <Image
            source={require("../assets/navigationIcon.png")}
            style={styles.navigationIcon}
          />
          <Text style={styles.directionsButtonText}>Get Directions</Text>
        </View>
      </Pressable>
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
  in2: {
    fontFamily: FontFamily.arial,
  },
  in: {
    color: Color.colorDarkslateblue_200,
  },
  text2: {
    color: Color.colorMediumvioletred,
  },
  days: {
    fontFamily: FontFamily.arial,
    color: Color.colorDarkslateblue_200,
  },
  countdownContainer2: {
    width: "100%",
  },
  countdownContainer: {
    fontSize: FontSize.size_lg,
    display: "flex",
    width: 87,
    textAlign: "center",
    alignItems: "center",
  },
  needARide: {
    fontSize: FontSize.size_5xs,
    color: Color.colorRoyalblue,
    width: 50,
    height: 11,
    textDecorationLine: "underline",
    fontFamily: FontFamily.arial,
    textAlign: "center",
  },
  calendarIcon: {
    borderRadius: Border.br_7xl,
    height: 19,
    width: 70,
  },
  appointmentNotes: {
    fontSize: FontSize.size_7xs,
    color: Color.nEW,
    width: 59,
    height: 7,
    textAlign: "center",
  },
  appNotesBtn: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorDarkgray,
    height: 16,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_9xs,
    width: 70,
    alignItems: "center",
  },
  frame2: {
    height: 44,
    paddingRight: Padding.p_12xs,
    gap: Gap.gap_lg,
    justifyContent: "flex-end",
  },
  frame1: {
    height: 60,
    gap: Gap.gap_xs,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    height: 170,
    gap: Gap.gap_2xl,
    zIndex: 0,
    overflow: "hidden",
  },
  aptDateTime: {
    fontSize: FontSize.size_smi,
    color: Color.colorBlack,
    fontFamily: FontFamily.arial,
    textAlign: "center",
    alignSelf: "stretch",
  },
  locationIcon: {
    width: 12,
    height: 12,
    overflow: "hidden",
  },
  clinicName: {
    fontSize: FontSize.size_3xs,
    fontWeight: "500",
    fontFamily: FontFamily.montserrat,
    textAlign: "left",
    width: 113,
    height: 25,
    color: Color.colorBlack,
    textDecorationLine: "underline",
  },
  clinicLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  frame3: {
    position: "absolute",
    top: 45,
    left: 14,
    gap: Gap.gap_md,
    zIndex: 1,
    alignItems: "center",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  directionsButton: {
    marginTop: 20,
    backgroundColor: "#D3D3D3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: "center",
  },
  directionsButtonText: {
    color: "#000",
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  navigationIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  directionsButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AppointmentContainer;
