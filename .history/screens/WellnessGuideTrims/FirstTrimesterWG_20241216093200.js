import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
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
    { title: "SLEEP", description: "Maintain a consistent sleep schedule." },
    { title: "AVOID CAFFEINE", description: "Avoid caffeine late in the day." },
    {
      title: "RELAXATION",
      description: "Try relaxation techniques before bed.",
    },
    { title: "COMFORT", description: "Use a pregnancy pillow for comfort." },
  ],
  nutrition: [
    {
      title: "BALANCED DIET",
      description: "Eat a balanced diet with fruits and vegetables.",
    },
    { title: "HYDRATION", description: "Drink plenty of water daily." },
    {
      title: "AVOID RAW FOODS",
      description: "Avoid raw or undercooked foods.",
    },
    {
      title: "VITAMINS",
      description: "Take prenatal vitamins as recommended.",
    },
  ],
};

const FirstTrimester = () => {
  const renderCarouselItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: 300, // Adjust width as needed
    height: 400, // Adjust height as needed
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: Border.br_xs, // Adjust to match your border radius
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 0,
    shadowOffset: { width: 2, height: 2 }, // Matches "box-shadow" in CSS
    elevation: 6, // Adds shadow for Android
    marginHorizontal: 8,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagePlaceholder: {
    position: "absolute",
    top: "15%",
    left: "10%",
    right: "10%",
    height: "40%", // Adjust to match the image height in proportion
    backgroundColor: "#D9D9D9",
    zIndex: 1,
  },
  cardTitle: {
    position: "absolute",
    top: "60%",
    left: "7%",
    right: "7%",
    fontFamily: "IBM Plex Mono",
    fontSize: 26,
    fontWeight: "500",
    lineHeight: 42,
    textAlign: "center",
    color: "#000",
    zIndex: 2,
  },
  cardDescription: {
    position: "absolute",
    top: "75%",
    left: "5%",
    right: "5%",
    fontFamily: "IBM Plex Mono",
    fontSize: 18,
    fontWeight: "200",
    lineHeight: 31,
    textAlign: "center",
    color: "#000",
    zIndex: 2,
  },
});

export default FirstTrimester;
