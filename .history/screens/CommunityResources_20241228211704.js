import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

const CommunityResources = () => {
  const resources = [
    {
      title: "Transportation",
      description:
        "No access to transportation? Your health insurance plan may offer free rides to appointments. Tap to learn how to set up a ride and access these benefits.",
      buttonText: "Learn More",
      onPress: () => {}, // Add navigation or link here
    },
    {
      title: "WIC Program",
      description:
        "Learn how to access nutritional support and resources for you and your baby through the Women, Infants, and Children program.",
      buttonText: "Find Out More",
      icon: require("../assets/wic-icon.png"), // Placeholder for WIC icon
      onPress: () => {}, // Add WIC website link here
    },
    {
      title: "Insurance",
      description:
        "Need insurance? We partner with Portico to help patients apply for public insurance that covers clinic visits, transportation, and more. Tap to learn how we can assist.",
      buttonText: "Learn More",
      onPress: () => {}, // Add navigation or link here
    },
    {
      title: "Food Banks",
      description:
        "Access nutritious food and groceries for you and your family through local food banks and assistance programs.",
      buttonText: "Find Supplies",
      onPress: () => {}, // Add navigation or link here
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Resources</Text>
        <Text style={styles.subtitle}>
          Explore local resources to support you during your pregnancy journey
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cards for Resources */}
        {resources.map((resource, index) => (
          <View key={index} style={styles.card}>
            <Image source={resource.icon} style={styles.icon} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{resource.title}</Text>
              <Text style={styles.cardDescription}>{resource.description}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20, // Space below header
    paddingHorizontal: 16, // Ensure alignment with overall container
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8, // Space between title and subtitle
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
    textAlign: "center",
  },
  content: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default CommunityResources;
