import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

// Example topics object
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

// TabView Component
const FirstTrimester = () => {
  const initialLayout = { width: Dimensions.get("window").width };

  // State for active tab index
  const [index, setIndex] = useState(0);

  // Routes derived dynamically from topics object
  const [routes] = useState(
    Object.keys(topics).map((key) => ({
      key,
      title: topics[key].title,
    }))
  );

  // Renders the content for each tab
  const renderScene = ({ route }) => {
    const topic = topics[route.key];
    if (!topic) {
      console.error(`No topic found for route: ${route.key}`);
      return <Text>Error: No content available</Text>;
    }

    return (
      <View style={styles.scene}>
        <Text style={styles.sectionHeading}>{topic.title}</Text>
        <Image source={topic.image} style={styles.topicImage} />
        {topic.data.map((item, index) => (
          <Text key={`${route.key}-${index}`} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>
    );
  };

  // Custom TabBar renderer
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
        onIndexChange={(newIndex) => {
          console.log("Tab index changed:", newIndex); // Debugging tab index change
          setIndex(newIndex);
        }}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        lazy={false} // Render all tabs for debugging
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "300",
    color: "#333",
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
    color: "#333",
    marginBottom: 12,
  },
  topicImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  tabBar: {
    backgroundColor: "#6200EE",
  },
  tabLabel: {
    fontSize: 14,
    color: "#FFF",
  },
  indicator: {
    backgroundColor: "#FFC107",
    height: 3,
  },
});

export default FirstTrimester;
