import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
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

const renderCarouselItem = ({ item }) => (
  <View style={styles.carouselItem}>
    <Text style={styles.carouselText}>{item}</Text>
  </View>
);

const renderTabContent = (title, imageKey, dataKey) => (
  <View style={styles.scene}>
    <Text style={styles.sectionHeading}>{title}</Text>
    <Image source={topicImages[imageKey]} style={styles.topicImage} />
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

const FirstTrimester = () => {
  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "sleep", title: "Sleep" },
    { key: "nutrition", title: "Nutrition" },
    { key: "mentalHealth", title: "Mental Health" },
    { key: "exercise", title: "Exercise" },
    { key: "symptoms", title: "Symptoms" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "sleep":
        return renderTabContent("Sleep", "sleep", "sleep");
      case "nutrition":
        return renderTabContent("Nutrition", "nutrition", "nutrition");
      case "mentalHealth":
        return renderTabContent(
          "Mental Health",
          "mentalHealth",
          "mentalHealth"
        );
      case "exercise":
        return renderTabContent("Exercise", "exercise", "exercise");
      case "symptoms":
        return renderTabContent(
          "Symptoms to Look Out For",
          "symptoms",
          "symptoms"
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>First Trimester</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "300",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    margin: 16,
  },
  scene: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 12,
  },
  topicImage: {
    width: "100%",
    height: 150,
    borderRadius: Border.br_xs,
    marginBottom: 16,
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
  tabBar: {
    backgroundColor: Color.colorDarkslateblue_200,
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: FontFamily.montserrat,
    color: "#FFF",
  },
  indicator: {
    backgroundColor: Color.nEW,
    height: 3,
  },
});

export default FirstTrimester;
