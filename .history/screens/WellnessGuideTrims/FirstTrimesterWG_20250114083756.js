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
import { SafeAreaView } from "react-native-safe-area-context"; // <-- Import SafeAreaView
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
      if (!userId) {
        console.warn("No userId found, skipping language fetch.");
        return;
      }
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
          {content1 && renderParagraph(content1)}

          {title2 && <Text style={styles.subheading}>{title2}</Text>}
          {content2 && renderParagraph(content2)}

          {title3 && <Text style={styles.subheading}>{title3}</Text>}
          {content3 && renderParagraph(content3)}

          {title4 && <Text style={styles.subheading}>{title4}</Text>}
          {content4 && renderParagraph(content4)}

          {/* Vitamins */}
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

          {/* Foods / Items to Avoid */}
          {avoidTitle && <Text style={styles.subheading}>{avoidTitle}</Text>}
          {avoid &&
            avoid.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}

          {/* Nugget */}
          {nuggetTitle && <Text style={styles.subheading}>{nuggetTitle}</Text>}
          {nuggetContent && <Text style={styles.content}>{nuggetContent}</Text>}

          {/* Tips */}
          {tipsTitle && <Text style={styles.subheading}>{tipsTitle}</Text>}
          {tips &&
            tips.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}

          {/* Bottom Text */}
          {bottomText && (
            <Text style={[styles.content, styles.bottomText]}>
              {bottomText}
            </Text>
          )}
        </View>
      </ScrollView>
    );
  };

  // Helper to render a string or a string array as paragraph(s) or bullet points.
  const renderParagraph = (contentBlock) => {
    if (Array.isArray(contentBlock)) {
      return contentBlock.map((item, index) => (
        <Text key={index} style={styles.bulletPoint}>
          • {item}
        </Text>
      ));
    } else {
      return <Text style={styles.content}>{contentBlock}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Horizontal Tabs */}
        <ScrollView
          horizontal
          style={styles.tabBar}
          contentContainerStyle={styles.tabBarContent}
          showsHorizontalScrollIndicator={false}
        >
          {Object.keys(translations).map((tab) => {
            // Attempt to show the first word of the heading for Spanish/English
            const tabHeadingParts =
              translations[tab]?.[languagePreference]?.heading?.split(" ");
            const shortTabLabel = tabHeadingParts ? tabHeadingParts[0] : tab;

            return (
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
                  {shortTabLabel || tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#fff",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabBarContent: {
    alignItems: "center",
    paddingHorizontal: 10,
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

export default FirstTrimester;
