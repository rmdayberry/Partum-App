import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { translations } from "../../translations/secondTrimesterWGTranslations";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

const topicImages = {
  sleep: require("../../assets/secondTSleep.png"),
  nutrition: require("../../assets/secondTNutrition.png"),
  mentalHealth: require("../../assets/secondTMentalHealth.png"),
  exercise: require("../../assets/secondTExercise.png"),
  symptoms: require("../../assets/secondTSymptoms.png"),
};

const SecondTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");
  const [activeTab, setActiveTab] = useState("sleep");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguagePreference = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/users/${userId}`
        );
        setLanguagePreference(response.data.languagePreference || "English");
      } catch (error) {
        console.error("Error fetching language preference:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguagePreference();
  }, [userId]);

  const renderContent = () => {
    const tabContent =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    const { heading, content, sections } = tabContent;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={topicImages[activeTab]} style={styles.image} />
        <View style={styles.card}>
          <Text style={styles.heading}>{heading || "Content Unavailable"}</Text>
          {content && <Text style={styles.content}>{content}</Text>}

          {sections &&
            sections.map((section, index) => (
              <View key={index} style={styles.section}>
                {section.title && (
                  <Text style={styles.subheading}>{section.title}</Text>
                )}
                {section.subtitleBold && (
                  <Text style={styles.subtitleBold}>
                    {section.subtitleBold}
                  </Text>
                )}
                {Array.isArray(section.bulletPoints) &&
                  section.bulletPoints.map((point, idx) => (
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

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
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  tabBarContent: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#F9FAFF",
  },
  activeTabButton: {
    backgroundColor: "#E0E7FF",
  },
  tabText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#777",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#6200EE",
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.5,
    resizeMode: "contain",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    width: "95%",
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  section: {
    marginTop: 15,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  subtitleBold: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    fontWeight: "300",
    color: "#000",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#BDB5D5",
    padding: 14,
    borderRadius: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    lineHeight: 22,
    marginLeft: 10,
  },
});

export default SecondTrimester;
