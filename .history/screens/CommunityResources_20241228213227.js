import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

// Example Resources Array
const resources = [
  {
    title: "Transportation",
    description:
      "No access to transportation? Your health insurance plan may offer free rides to appointments. Tap to learn how to set up a ride and access these benefits.",
    buttonText: "Learn More",
    icon: require("../../assets/transportationIcon.png"),
    link: "https://example.com/transportation",
  },
  {
    title: "WIC Program",
    description:
      "Learn how to access nutritional support and resources for you and your baby through the Women, Infants, and Children program.",
    buttonText: "Find out more about WIC benefits",
    icon: require("../../assets/wicIcon.png"),
    link: "https://www.fns.usda.gov/wic",
  },
];

const CommunityResources = () => {
  const handleLinkPress = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      console.warn("No URL provided.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Community Resources</Text>
      <Text style={styles.subtitle}>
        Explore local resources to support you during your pregnancy journey
      </Text>
      {resources.map((resource, index) => (
        <View key={index} style={styles.resourceCard}>
          <Image source={resource.icon} style={styles.icon} />
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>
              {resource.description}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLinkPress(resource.link)}
            >
              <Text style={styles.buttonText}>{resource.buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 16 },
  resourceCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: { width: 50, height: 50, marginRight: 16 },
  resourceContent: { flex: 1 },
  resourceTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  resourceDescription: { fontSize: 14, color: "#666", marginBottom: 8 },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 14, textAlign: "center" },
});

export default CommunityResources;
