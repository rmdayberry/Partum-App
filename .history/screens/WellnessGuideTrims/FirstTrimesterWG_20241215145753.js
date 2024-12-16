import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles";

const FirstTrimester = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page Heading */}
      <Text style={styles.heading}>First Trimester</Text>
      {/* Topics */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Sleep</Text>
        <View style={styles.box}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.nEW,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FirstTrimester;
