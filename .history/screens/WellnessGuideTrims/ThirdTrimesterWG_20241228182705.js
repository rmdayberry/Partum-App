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
  sleep: require("../../assets/SleepWG.png"),
  nutrition: require("../../assets/NutritionWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
  support: require("../../assets/ExerciseWG.png.png"),
  labor: require("../../assets/ExerciseWG.png.png"),
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
        <View style={styles.section}>
          <Text style={styles.heading}>{heading || "Content Unavailable"}</Text>
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Sections */}
          {title1 && <Text style={styles.subheading}>{title1}</Text>}
          {content1 &&
            (Array.isArray(content1) ? (
              content1.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))
            ) : (
              <Text style={styles.content}>{content1}</Text>
            ))}

          {title2 && <Text style={styles.subheading}>{title2}</Text>}
          {content2 && <Text style={styles.content}>{content2}</Text>}

          {title3 && <Text style={styles.subheading}>{title3}</Text>}
          {content3 &&
            (Array.isArray(content3) ? (
              content3.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))
            ) : (
              <Text style={styles.content}>{content3}</Text>
            ))}

          {title4 && <Text style={styles.subheading}>{title4}</Text>}
          {content4 &&
            (Array.isArray(content4) ? (
              content4.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))
            ) : (
              <Text style={styles.content}>{content4}</Text>
            ))}

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

export default ThirdTrimester;
