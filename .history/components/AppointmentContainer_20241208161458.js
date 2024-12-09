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
          <Text style={styles.in}>
            <Text style={styles.in1}>In</Text>
          </Text>
          <Text style={[styles.text, styles.textTypo]}>
            <Text style={styles.in}>{` `}</Text>
            <Text style={styles.text2}>{`X `}</Text>
          </Text>
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
    </View>
    <View style={styles.frame3}>
      <Text></Text>
    </View>
  );
};

export default AppointmentContainer;