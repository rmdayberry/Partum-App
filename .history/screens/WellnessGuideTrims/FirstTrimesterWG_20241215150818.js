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
        <View style={styles.box}>
          <Text style={styles.boxText}>
            {" "}
            Tips for better sleep: Maintain a consistent sleep schedule, avoid
            caffeine late in the day, and try relaxation techniques like
            breathing exercises.
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Nutrition</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>
            {" "}
            Eat a balanced diet with plenty of fruits, vegetables, and
            wholegrains. Stay hydrated and take prenatal vitamins as recommended
            by your doctor.
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Mental Health</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>
            {" "}
            Take time for self-care. If you feel anxious or overwhelmed,
            consider speaking to a counselor or joining a support group.
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Exercise</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>
            {" "}
            Light exercise, like walking or prenatal yoga, can help reduce
            stress and improve overall well-being. Avoid high-impact activities.
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Symptoms to Look Out For</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>
            {" "}
            Contact your doctor if you experience severe cramping, heavy
            bleeding, or persistent dizziness.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Color.nEW,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 36,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 8,
  },
  box: {
    backgroundColor: Color.nEW,
    borderRadius: Border.br_xs,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  boxText: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.arial,
    color: "#333",
    lineHeight: 22,
  },
});

export default FirstTrimester;
