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
import { translations } from "../../translations/thirdTrimesterWGTranslation";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

// Images for topics
const topicImages = {
  nutrition: require("../../assets/NutritionWG.png"),
  sleep: require("../../assets/SleepWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
  support: require("../../assets/secondTSymptoms.png"),
  labor: require("../../assets/secondTSymptoms.png"),
};

const ThirdTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");
  const [activeTab, setActiveTab] = useState("nutrition");

  // Fetch user language preference
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
    const activeContent =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English;

    if (!activeContent) {
      return <Text style={styles.errorText}>Content not found</Text>;
    }

    const { heading, content, sections, bottomText } = activeContent;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Image */}
        <Image source={topicImages[activeTab]} style={styles.image} />

        <View style={styles.contentContainer}>
          {heading && <Text style={styles.heading}>{heading}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Render Sections as Boxes */}
          {Array.isArray(sections) &&
            sections.map((section, idx) => (
              <View key={idx} style={styles.box}>
                {section.title && (
                  <Text style={styles.subheading}>{section.title}</Text>
                )}
                {section.bulletPoints &&
                  section.bulletPoints.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      • {point}
                    </Text>
                  ))}
              </View>
            ))}

          {/* Bottom Text */}
          {bottomText && (
            <View style={styles.bottomSection}>
              <Text style={styles.bottomTitle}>{bottomText.title}</Text>
              <Text style={styles.bottomContent}>{bottomText.content}</Text>
              {Array.isArray(bottomText.bulletPoints) &&
                bottomText.bulletPoints.map((point, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {point}
                  </Text>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <ScrollView horizontal contentContainerStyle={styles.tabBar}>
        {Object.keys(translations).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {languagePreference === "Español"
                ? translations[tab]?.Español?.heading.split(" ")[0]
                : translations[tab]?.English?.heading.split(" ")[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: screenWidth, height: 200, resizeMode: "cover" },
  contentContainer: { padding: 16 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
    paddingLeft: 10,
  },
  content: { fontSize: 16, marginBottom: 12, color: "#555" },
  box: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#E0F7FA",
    borderRadius: 8,
  },
  bottomTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 8,
  },
  bottomContent: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
});

export default ThirdTrimester;
