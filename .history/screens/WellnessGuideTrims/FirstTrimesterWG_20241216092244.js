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
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "900",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "400",
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
  card: {
    width: 300,
    marginHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: Border.br_xs,
    boxShadow: "12px 12px 0px #000000",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#D9D9D9",
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "IBM Plex Mono",
    fontSize: 28,
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: "IBM Plex Mono",
    fontSize: 24,
    fontWeight: "200",
    color: "#000",
    textAlign: "center",
    lineHeight: 31,
  },
});

export default FirstTrimester;
