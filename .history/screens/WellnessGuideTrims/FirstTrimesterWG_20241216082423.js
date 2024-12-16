import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles";

const topicImages = {
  sleep: require("../../assets/SleepWG.png"),
  nutrition: require("../../assets/NutritionWG.png"),
  mentalHealth: require("../../assets/MentalHealthWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
};

const topicData = {
  sleep: [
    "Maintain a consistent sleep schedule.",
    "Avoid caffeine late in the day.",
    "Try relaxation techniques before bed.",
    "Use a pregnancy pillow for comfort.",
  ],
  nutrition: [
    "Eat a balanced diet with fruits and vegetables.",
    "Drink plenty of water daily.",
    "Avoid raw or undercooked foods.",
    "Take prenatal vitamins as recommended.",
  ],
  mentalHealth: [
    "Practice mindfulness and deep breathing.",
    "Seek support from friends and family.",
    "Consider joining a prenatal support group.",
    "Speak with a counselor if needed.",
  ],
  exercise: [
    "Engage in light activities like walking.",
    "Avoid high-impact exercises.",
    "Prenatal yoga can help reduce stress.",
    "Stay hydrated during workouts.",
  ],
  symptoms: [
    "Contact your doctor for severe cramping.",
    "Heavy bleeding is a warning sign.",
    "Persistent dizziness requires attention.",
    "Unusual pain should not be ignored.",
  ],
};

const FirstTrimester = () => {
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.carouselText}>{item}</Text>
    </View>
  );

  const renderSection = (title, image, dataKey) => (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>{title}</Text>
      <Image source={image} style={styles.topicImage} />
      <FlatList
        data={topicData[dataKey]}
        renderItem={renderCarouselItem}
        keyExtractor={(item, index) => `${dataKey}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page Heading */}
      <Text style={styles.heading}>First Trimester</Text>
      {/* Topics */}
      {renderSection("Sleep", topicImages.sleep, "sleep")}
      {renderSection("Nutrition", topicImages.nutrition, "nutrition")}
      {renderSection("Mental Health", topicImages.mentalHealth, "mentalHealth")}
      {renderSection("Exercise", topicImages.exercise, "exercise")}
      {renderSection(
        "Symptoms to Look Out For",
        topicImages.symptoms,
        "symptoms"
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 8,
  },
  topicImage: {
    width: "100%",
    height: 150,
    borderRadius: Border.br_xs,
    marginBottom: 12,
  },
  carouselContainer: {
    paddingHorizontal: 8,
  },
  carouselItem: {
    width: 250,
    marginHorizontal: 8,
    backgroundColor: Color.nEW,
    borderRadius: Border.br_xs,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  carouselText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.arial,
    color: "#333",
    lineHeight: 22,
  },
});

export default FirstTrimester;
