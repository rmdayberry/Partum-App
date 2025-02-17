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
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import { UserContext } from "../../contexts/UserContext";
import { translations } from "../../translations/firstTrimesterWGTranslations";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

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

    const { heading, content, title1, content1, title2, content2, bottomText } =
      tabContent;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={require("../../assets/SleepWG.png")}
          style={styles.image}
        />
        <View style={styles.card}>
          <Text style={styles.heading}>{heading || "Content Unavailable"}</Text>
          {content && <Text style={styles.content}>{content}</Text>}
          {title1 && <Text style={styles.subheading}>{title1}</Text>}
          {content1 && <Text style={styles.content}>{content1}</Text>}
          {title2 && <Text style={styles.subheading}>{title2}</Text>}
          {content2 && <Text style={styles.content}>{content2}</Text>}
          {bottomText && <Text style={styles.bottomText}>{bottomText}</Text>}
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
    <SafeAreaView style={styles.safeAreaContainer}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#F9FAFF", // Same background color as the page
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
    paddingTop: 10, // Add padding to give extra space
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
  bottomText: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#777",
  },
});

export default FirstTrimester;
