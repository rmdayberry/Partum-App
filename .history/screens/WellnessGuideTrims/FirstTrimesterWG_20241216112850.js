import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../../GlobalStyles";

const topicImages = {
  sleep: require("../../assets/SleepWG.png"),
  nutrition: require("../../assets/NutritionWG.png"),
  mentalHealth: require("../../assets/MentalHealthWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
};

const FirstTrimester = () => {
  const [activeTab, setActiveTab] = useState("sleep");

  const renderContent = () => {
    switch (activeTab) {
      case "sleep":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.sleep} style={styles.image} />
            <Text style={styles.tabHeading}>Sleep</Text>
            <Text style={styles.content}>
              Maintain a consistent sleep schedule.
            </Text>
            <Text style={styles.content}>Avoid caffeine late in the day.</Text>
            <Text style={styles.content}>
              Try relaxation techniques before bed.
            </Text>
            <Text style={styles.content}>
              Use a pregnancy pillow for comfort.
            </Text>
          </View>
        );
      case "nutrition":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.nutrition} style={styles.image} />
            <Text style={styles.tabHeading}>Nutrition</Text>
            <Text style={styles.content}>
              Eat a balanced diet with fruits and vegetables.
            </Text>
            <Text style={styles.content}>Drink plenty of water daily.</Text>
            <Text style={styles.content}>Avoid raw or undercooked foods.</Text>
            <Text style={styles.content}>
              Take prenatal vitamins as recommended.
            </Text>
          </View>
        );
      case "mentalHealth":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.mentalHealth} style={styles.image} />
            <Text style={styles.tabHeading}>Mental Health</Text>
            <Text style={styles.content}>
              Practice mindfulness and deep breathing.
            </Text>
            <Text style={styles.content}>
              Seek support from friends and family.
            </Text>
            <Text style={styles.content}>
              Consider joining a prenatal support group.
            </Text>
            <Text style={styles.content}>
              Speak with a counselor if needed.
            </Text>
          </View>
        );
      case "exercise":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.exercise} style={styles.image} />
            <Text style={styles.tabHeading}>Exercise</Text>
            <Text style={styles.content}>
              Engage in light activities like walking.
            </Text>
            <Text style={styles.content}>Avoid high-impact exercises.</Text>
            <Text style={styles.content}>
              Prenatal yoga can help reduce stress.
            </Text>
            <Text style={styles.content}>Stay hydrated during workouts.</Text>
          </View>
        );
      case "symptoms":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.symptoms} style={styles.image} />
            <Text style={styles.tabHeading}>Symptoms to Look Out For</Text>
            <Text style={styles.content}>
              Contact your doctor for severe cramping.
            </Text>
            <Text style={styles.content}>
              Heavy bleeding is a warning sign.
            </Text>
            <Text style={styles.content}>
              Persistent dizziness requires attention.
            </Text>
            <Text style={styles.content}>
              Unusual pain should not be ignored.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {[
          { key: "sleep", label: "Sleep" },
          { key: "nutrition", label: "Nutrition" },
          { key: "mentalHealth", label: "Mental Health" },
          { key: "exercise", label: "Exercise" },
          { key: "symptoms", label: "Symptoms" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Tab Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: Color.nEW,
    paddingVertical: 4,
    maxHeight: 50,
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    color: "#000",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFC107",
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFC107",
  },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  tabHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6200EE",
  },
  content: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: "center",
    color: "#333",
  },
  image: {
    width: "80%",
    height: 120, // Reduced image size
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default FirstTrimester;
