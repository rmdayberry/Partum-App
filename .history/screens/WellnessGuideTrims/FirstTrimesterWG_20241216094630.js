import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
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

const renderSectionContent = (dataKey) => (
  <FlatList
    data={topicData[dataKey]}
    renderItem={renderCarouselItem}
    keyExtractor={(item, index) => `${dataKey}-${index}`}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.carouselContainer}
  />
);

const SectionTab = ({ title, imageKey, dataKey }) => (
  <View style={styles.scene}>
    <Text style={styles.sectionHeading}>{title}</Text>
    <Image source={topicImages[imageKey]} style={styles.topicImage} />
    {renderSectionContent(dataKey)}
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
        return <SectionTab title="Sleep" imageKey="sleep" dataKey="sleep" />;
      case "nutrition":
        return <SectionTab title="Nutrition" imageKey="nutrition" dataKey="nutrition" />;
      case "mentalHealth":
        return (
          <SectionTab title="Mental Health" imageKey="mentalHealth" dataKey="mentalHealth" />
        );
      case "exercise":
        return <SectionTab title="Exercise" imageKey="exercise" dataKey="exercise" />;
      case "symptoms":
        return (
          <SectionTab title="Symptoms to Look Out For" imageKey="symptoms" dataKey="symptoms" />
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
    fontFamily: FontFamily.

