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

          {/* Sections */}
          {title1 && <Text style={styles.subheading}>{title1}</Text>}
          {content1 &&
            content1.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}

          {title2 && <Text style={styles.subheading}>{title2}</Text>}
          {content2 && <Text style={styles.content}>{content2}</Text>}

          {title3 && <Text style={styles.subheading}>{title3}</Text>}
          {content3 &&
            content3.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}

          {title4 && <Text style={styles.subheading}>{title4}</Text>}
          {content4 &&
            content4.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
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
            <Ionicons
              name="ios-heart-outline"
              size={18}
              color={activeTab === tab ? "#6200EE" : "#777"}
            />
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
  ... // Add updated styles for modern aesthetics, improved spacing, and responsiveness
});

export default FirstTrimester;
