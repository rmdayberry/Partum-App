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
import { translations } from "../../translations/firstTrimesterWGTranslations";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

const topicImages = {
  sleep: require("../../assets/SleepWG.png"),
  nutrition: require("../../assets/NutritionWG.png"),
  mentalHealth: require("../../assets/MentalHealthWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
};

const FirstTrimester = () => {
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
    const {
      heading,
      content,
      title,
      vitamins,
      avoidTitle,
      avoid,
      nuggetTitle,
      nuggetContent,
      tipsTitle,
      tips,
      bottomText,
    } =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    return (
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image source={topicImages[activeTab]} style={styles.image} />
          <View style={styles.section}>
            <Text style={styles.heading}>
              {heading || "Content Unavailable"}
            </Text>
            <Text style={styles.content}>{content}</Text>

            {title && <Text style={styles.subheading}>{title}</Text>}
            {Array.isArray(vitamins) &&
              vitamins.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))}

            {avoidTitle && <Text style={styles.subheading}>{avoidTitle}</Text>}
            {Array.isArray(avoid) &&
              avoid.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))}

            {nuggetTitle && (
              <Text style={styles.subheading}>{nuggetTitle}</Text>
            )}
            {nuggetContent && (
              <Text style={styles.content}>{nuggetContent}</Text>
            )}

            {tipsTitle && <Text style={styles.subheading}>{tipsTitle}</Text>}
            {Array.isArray(tips) &&
              tips.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))}

            {bottomText && (
              <Text style={[styles.content, styles.bottomText]}>
                {bottomText}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {[
          {
            key: "sleep",
            label: languagePreference === "Español" ? "Sueño" : "Sleep",
          },
          {
            key: "nutrition",
            label: languagePreference === "Español" ? "Nutrición" : "Nutrition",
          },
          {
            key: "exercise",
            label: languagePreference === "Español" ? "Ejercicio" : "Exercise",
          },
          {
            key: "mentalHealth",
            label:
              languagePreference === "Español"
                ? "Salud Mental"
                : "Mental Health",
          },
          {
            key: "symptoms",
            label: languagePreference === "Español" ? "Síntomas" : "Symptoms",
          },
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
              {tab.label}
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
  contentWrapper: {
    flex: 1,
    minHeight: 400,
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
  },
  bulletPoint: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
    paddingLeft: 10,
  },
  bottomText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6200EE",
    textAlign: "center",
  },
});

export default FirstTrimester;
