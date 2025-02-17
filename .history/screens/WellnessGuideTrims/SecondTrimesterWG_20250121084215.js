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
      vitamins,
      avoidTitle,
      avoid,
      nuggetTitle,
      nuggetContent,
      tipsTitle,
      tips,
      bottomText,
    } = tabContent;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={topicImages[activeTab]} style={styles.image} />
        <View style={styles.card}>
          <Text style={styles.heading}>{heading || "Content Unavailable"}</Text>
          {content && <Text style={styles.content}>{content}</Text>}

          {title1 && (
            <>
              <Text style={styles.subheading}>{title1}</Text>
              {Array.isArray(content1) &&
                content1.map((item, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {item}
                  </Text>
                ))}
            </>
          )}

          {title2 && (
            <>
              <Text style={styles.subheading}>{title2}</Text>
              {Array.isArray(content2) &&
                content2.map((item, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {item}
                  </Text>
                ))}
            </>
          )}

          {vitamins && (
            <>
              <Text style={styles.subheading}>Vitamins & Supplements</Text>
              {vitamins.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))}
            </>
          )}

          {avoidTitle && <Text style={styles.subheading}>{avoidTitle}</Text>}
          {avoid &&
            avoid.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}

          {nuggetTitle && <Text style={styles.subheading}>{nuggetTitle}</Text>}
          {nuggetContent && <Text style={styles.content}>{nuggetContent}</Text>}

          {tipsTitle && <Text style={styles.subheading}>{tipsTitle}</Text>}
          {tips &&
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
    backgroundColor: "#f8f8f8",
  },
  tabBar: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabBarContent: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  tabButton: {
    marginHorizontal: 16,
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
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subsection: {
    marginTop: 12,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",
  },
  subtitleBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },
});

export default SecondTrimester;
