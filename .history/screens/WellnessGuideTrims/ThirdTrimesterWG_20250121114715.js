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

const topicImages = {
  nutrition: require("../../assets/NutritionWG2.png"),
  sleep: require("../../assets/SleepWG.png"),
  exercise: require("../../assets/ExerciseWG3.png"),
  symptoms: require("../../assets/symptomsWG3.png"),
  support: require("../../assets/SupportWG.png"),
  labor: require("../../assets/LaborWG.png"),
};

const ThirdTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");
  const [activeTab, setActiveTab] = useState("nutrition");

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
    const tabContent =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};
    const { heading, content, sections, bottomText } = tabContent;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={topicImages[activeTab]} style={styles.image} />
        <View style={styles.section}>
          {heading && <Text style={styles.heading}>{heading}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Render Sections */}
          {sections &&
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

          {/* Render Bottom Text */}
          {bottomText && (
            <View style={styles.bottomSection}>
              {bottomText.title && (
                <Text style={styles.bottomTitle}>{bottomText.title}</Text>
              )}
              {bottomText.content && (
                <Text style={styles.bottomContent}>{bottomText.content}</Text>
              )}
              {bottomText.bulletPoints &&
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
      <ScrollView
        horizontal
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
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
                ? translations[tab]?.Español?.tabName
                : translations[tab]?.English?.tabName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  tabBar: {
    backgroundColor: "#fff",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabBarContent: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#6200EE",
  },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  activeTabText: {
    color: "#6200EE",
    fontWeight: "bold",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
    resizeMode: "cover",
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginVertical: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 10,
    backgroundColor: "#E7E7E7",
    padding: 10,
    borderRadius: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
    paddingLeft: 10,
  },
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
