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
  SafeAreaView,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { translations } from "../../translations/firstTrimesterWGTranslations";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons"; // For icons

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

    const {
      heading,
      content,
      title1,
      content1,
      title2,
      content2,
      title3,
      content3,
      title4,
      content4,
      vitamins, // May not exist for all tabs
      avoidTitle,
      avoid,
      nuggetTitle,
      nuggetContent,
      tipsTitle,
      tips,
      bottomText,
    } = tabContent;

    const renderSubsections = (subsections) => {
      if (!Array.isArray(subsections)) return null;

      return subsections.map(({ title, content }, index) => (
        <View key={index}>
          {title && <Text style={styles.subheading}>{title}</Text>}
          {content && Array.isArray(content) ? (
            content.map((item, i) => (
              <Text key={i} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))
          ) : (
            <Text style={styles.content}>{content}</Text>
          )}
        </View>
      ));
    };

    const renderSection = (title, contentArrayOrText) => {
      if (
        !title ||
        (!contentArrayOrText && !Array.isArray(contentArrayOrText))
      ) {
        return null;
      }

      return (
        <>
          <Text style={styles.subheading}>{title}</Text>
          {Array.isArray(contentArrayOrText) ? (
            contentArrayOrText.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))
          ) : (
            <Text style={styles.content}>{contentArrayOrText}</Text>
          )}
        </>
      );
    };

    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image source={topicImages[activeTab]} style={styles.image} />
          <View style={styles.card}>
            {/* Heading */}
            <Text style={styles.heading}>
              {heading || "Content Unavailable"}
            </Text>

            {/* Main Content */}
            {content && <Text style={styles.content}>{content}</Text>}

            {/* Dynamic Sections */}
            {renderSection(title1, content1)}
            {renderSection(title2, content2)}

            {/* Subsections under "Common Symptoms in the First Trimester" */}
            {activeTab === "symptoms" && (
              <View>
                <Text style={styles.subheading}>{title2}</Text>
                {renderSubsections([
                  {
                    title: "Nausea and Vomiting",
                    content: [
                      "Eat small, frequent meals.",
                      "Try to eat something every 2 hours.",
                      "Listen to your cravings. Eat what sounds good, even if it’s not your usual diet.",
                      "Eat before getting out of bed. A small snack, like crackers or dry cereal, can help.",
                      "Adjust prenatal vitamins if they worsen nausea; switch to folic acid.",
                      "Try ginger (tea, candies, or ginger ale) or lemon drops.",
                      "Use Sea Bands for acupressure or supplement with Vitamin B-6 (50mg twice a day).",
                      "Consider Unisom for sleep and nausea relief (ask for a prescription).",
                      "Note: If you can’t keep food or fluids down for 24 hours, call us—you may need IV hydration or stronger medication.",
                    ],
                  },
                  {
                    title: "Sore Breasts",
                    content: [
                      "Your breasts may grow larger and feel tender or sensitive.",
                      "Some people notice a small amount of leaking, but most do not.",
                      "Milk production won’t start until after your baby and the placenta are delivered.",
                      "Throughout pregnancy, your body is getting ready to provide the perfect nourishment for your baby. After birth, your milk will adapt by the hour and day to meet their exact needs. It’s a truly miraculous process.",
                    ],
                  },
                ])}
              </View>
            )}

            {renderSection(title3, content3)}
            {renderSection(title4, content4)}

            {/* Vitamins & Supplements */}
            {vitamins?.length > 0 &&
              renderSection("Vitamins & Supplements", vitamins)}

            {/* Avoid List */}
            {renderSection(avoidTitle, avoid)}

            {/* Nutrition Nugget */}
            {nuggetTitle && (
              <Text style={styles.subheading}>{nuggetTitle}</Text>
            )}
            {nuggetContent && (
              <Text style={styles.content}>{nuggetContent}</Text>
            )}

            {/* Quick Tips */}
            {renderSection(tipsTitle, tips)}

            {/* Bottom Text */}
            {bottomText && (
              <Text style={[styles.content, styles.bottomText]}>
                {bottomText}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    fontWeight: "800",
    color: "#555",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#F4ECF8",
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
  bottomText: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#777",
  },
});

export default FirstTrimester;
