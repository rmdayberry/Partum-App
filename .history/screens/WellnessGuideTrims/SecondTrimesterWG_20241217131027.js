import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

// Images for topics
const topicImages = {
  sleep: require("../../assets/SleepWG.png"),
  nutrition: require("../../assets/NutritionWG.png"),
  mentalHealth: require("../../assets/MentalHealthWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
};

// Translations for topics
const translations = {
  sleep: {
    English: {
      heading: "Sleep During Your Second Trimester",
      content: "The second trimester often brings improved energy and rest.",
      sections: [
        {
          subtitleBold: "Finding a Comfortable Position:",
          bulletPoints: [
            "Sleeping on your side, particularly your left side, is best for blood flow.",
            "Use a pregnancy pillow for support under your belly and between knees.",
          ],
        },
      ],
    },
    Español: {
      heading: "El Sueño Durante el Segundo Trimestre",
      content: "El segundo trimestre a menudo mejora la energía y el descanso.",
      sections: [
        {
          subtitleBold: "Encontrar una Posición Cómoda:",
          bulletPoints: [
            "Dormir de lado, especialmente del lado izquierdo, mejora el flujo sanguíneo.",
            "Usa una almohada de embarazo para mayor comodidad.",
          ],
        },
      ],
    },
  },
  // Add exercise, nutrition, mental health here similarly...
};

const SecondTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");
  const [activeTab, setActiveTab] = useState("sleep");

  useEffect(() => {
    const fetchLanguagePreference = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/users/${userId}`
        );
        setLanguagePreference(response.data.languagePreference || "English");
      } catch (error) {
        console.error("Error fetching language preference:", error);
      }
    };
    fetchLanguagePreference();
  }, [userId]);

  const renderContent = () => {
    const topic = translations[activeTab]?.[languagePreference] || {
      heading: "No Data Available",
      content: "Content is coming soon.",
      sections: [],
    };

    return (
      <ScrollView>
        {/* Image */}
        <Image
          source={topicImages[activeTab] || topicImages.default}
          style={styles.image}
        />

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{topic.heading}</Text>
          <Text style={styles.content}>{topic.content}</Text>

          {/* Sections */}
          {topic.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.subtitleBold}>{section.subtitleBold}</Text>
              {section.bulletPoints.map((point, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
                  • {point}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <ScrollView horizontal contentContainerStyle={styles.tabBarContent}>
        {[
          { key: "sleep", label: "Sleep", spanish: "Sueño" },
          { key: "nutrition", label: "Nutrition", spanish: "Nutrición" },
          { key: "exercise", label: "Exercise", spanish: "Ejercicio" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {languagePreference === "Español" ? tab.spanish : tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBarContent: {
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabButton: {
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  activeTabButton: {
    backgroundColor: "#6200EE",
  },
  tabText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: screenWidth,
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6200EE",
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
    marginBottom: 12,
  },
  section: {
    marginTop: 10,
  },
  subtitleBold: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 2,
    color: "#555",
  },
});

export default SecondTrimester;
