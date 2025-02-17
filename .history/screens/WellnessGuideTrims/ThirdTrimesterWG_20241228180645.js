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
import { translations } from "../translations/thirdTrimesterWGTranslations";

const { width: screenWidth } = Dimensions.get("window");

// Images for topics
const topicImages = {
  nutrition: require("../../assets/NutritionWG.png"),
  sleep: require("../../assets/SleepWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
  support: require("../../assets/SupportWG.png"),
  labor: require("../../assets/LaborPrepWG.png"),
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Image */}
        <Image source={topicImages[activeTab]} style={styles.image} />

        {/* Main Content */}
        <View>
          {heading && <Text style={styles.heading}>{heading}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Sections */}
          {sections?.map((section, index) => (
            <View key={index} style={styles.section}>
              {section.title && (
                <Text style={styles.subheading}>{section.title}</Text>
              )}
              {section.subtitle && (
                <Text style={styles.subtitleBold}>{section.subtitle}</Text>
              )}
              {section.bulletPoints?.map((point, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
                  • {point}
                </Text>
              ))}
            </View>
          ))}

          {/* Bottom Text */}
          {bottomText && (
            <View style={styles.bottomSection}>
              {bottomText.title && (
                <Text style={styles.bottomTitle}>{bottomText.title}</Text>
              )}
              {bottomText.content && (
                <Text style={styles.bottomContent}>{bottomText.content}</Text>
              )}
              {bottomText.bulletPoints?.map((point, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
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
  content: { fontSize: 16, marginBottom: 12, color: "#555" },
  section: { marginVertical: 8 },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    color: "#333",
  },
  subtitleBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
    paddingLeft: 10,
  },
  bottomSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
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
  tabBar: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  tabButton: { marginHorizontal: 10 },
  activeTabButton: { borderBottomWidth: 2, borderBottomColor: "#6200EE" },
  tabText: { fontSize: 16, color: "#777" },
  activeTabText: { color: "#6200EE", fontWeight: "bold" },
});

export default ThirdTrimester;
