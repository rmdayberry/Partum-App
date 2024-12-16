import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles";

const topics = {
  sleep: {
    title: "Sleep",
    image: require("../../assets/SleepWG.png"),
    data: [
      "Maintain a consistent sleep schedule.",
      "Avoid caffeine late in the day.",
      "Try relaxation techniques before bed.",
      "Use a pregnancy pillow for comfort.",
    ],
  },
  nutrition: {
    title: "Nutrition",
    image: require("../../assets/NutritionWG.png"),
    data: [
      "Eat a balanced diet with fruits and vegetables.",
      "Drink plenty of water daily.",
      "Avoid raw or undercooked foods.",
      "Take prenatal vitamins as recommended.",
    ],
  },
  mentalHealth: {
    title: "Mental Health",
    image: require("../../assets/MentalHealthWG.png"),
    data: [
      "Practice mindfulness and deep breathing.",
      "Seek support from friends and family.",
      "Consider joining a prenatal support group.",
      "Speak with a counselor if needed.",
    ],
  },
  exercise: {
    title: "Exercise",
    image: require("../../assets/ExerciseWG.png"),
    data: [
      "Engage in light activities like walking.",
      "Avoid high-impact exercises.",
      "Prenatal yoga can help reduce stress.",
      "Stay hydrated during workouts.",
    ],
  },
  symptoms: {
    title: "Symptoms to Look Out For",
    image: require("../../assets/SymptomsWG.png"),
    data: [
      "Contact your doctor for severe cramping.",
      "Heavy bleeding is a warning sign.",
      "Persistent dizziness requires attention.",
      "Unusual pain should not be ignored.",
    ],
  },
};

const renderTabContent = (topic) => {
  if (!topic) {
    console.error("No topic provided for this tab.");
    return null;
  }
  console.log(`Rendering content for topic: ${topic.title}`);
  return (
    <View style={styles.scene}>
      <Text style={styles.sectionHeading}>{topic.title}</Text>
      <Image source={topic.image} style={styles.topicImage} />
      {topic.data.map((item, index) => (
        <Text key={`${topic.title}-${index}`} style={styles.listItem}>
          • {item}
        </Text>
      ))}
    </View>
  );
};

const FirstTrimester = () => {
  const initialLayout = { width: Dimensions.get("window").width };

  // Manage the current tab index
  const [index, setIndex] = useState(0);

  // Dynamically create routes from the topics object
  const [routes] = useState(
    Object.keys(topics).map((key) => ({ key, title: topics[key].title }))
  );

  const renderScene = ({ route }) => {
    console.log("Rendering route:", route.key); // Debug which route is being rendered
    console.log("Rendering tab:", route.key);
    return renderTabContent(topics[route.key]);
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
    zIndex: 0,
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
  listItem: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.arial,
    color: "#333",
    marginVertical: 4,
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
